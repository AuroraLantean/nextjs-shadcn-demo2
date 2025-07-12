import { type ArrayLog, SecretNetworkClient } from "secretjs";
import {
	secretCtrtAddress,
	secretCtrtCodeHash,
	secretNetworkId,
	secretNetworkUrl,
} from "@/config/config";
import { ll, sleep } from "./utils";

export const connectKeplr = async () => {
	while (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSigner) {
		await sleep(50);
	}

	await window.keplr.enable(secretNetworkId);

	const keplrOfflineSigner = window.keplr.getOfflineSigner(secretNetworkId);
	const [{ address: secretAddr }] = await keplrOfflineSigner.getAccounts();

	const secretClient = new SecretNetworkClient({
		url: secretNetworkUrl,
		chainId: secretNetworkId,
		wallet: keplrOfflineSigner,
		walletAddress: secretAddr,
		encryptionUtils: window.keplr.getEnigmaUtils(secretNetworkId),
	});
	return { secretClient, secretAddr };
	// Note: Using `window.getEnigmaUtils` is optional, it will allow Keplr to use the same encryption seed across sessions for the account.
	// The benefit of this is that `secretjs.query.getTx()` will be able to decrypt the response across sessions.
};

//--------------== Copied from testing repo
export const findTxnData = (
	txArrayLog: ArrayLog | undefined,
	target: string,
) => {
	let logkey = "code_id";
	if (target === "addr") logkey = "contract_address";

	if (!txArrayLog) {
		console.error("txArrayLog invalid");
		return;
	}
	const codeIdObj = txArrayLog?.find(
		(log) => log.type === "message" && log.key === logkey,
	);
	return codeIdObj?.value;
};

export const secretExecute = async (
	client: SecretNetworkClient | null,
	walletAddress: string | null,
	funcName: string,
	arg1: string,
	arg2: string,
) => {
	ll(`secretExecute: 
funcName=${funcName}, arg1: ${arg1}, arg2: ${arg2}`);
	ll("secretCtrtAddress:", secretCtrtAddress);
	if (!secretCtrtAddress) {
		console.error("secretCtrtAddress invalid");
		return;
	}
	ll("secretCtrtCodeHash:", secretCtrtCodeHash);
	if (!secretCtrtCodeHash) {
		console.error("secretCtrtCodeHash invalid");
		return;
	}
	ll("walletAddress:", walletAddress);
	if (!walletAddress) {
		console.error("walletAddress invalid");
		return;
	}
	if (!client) {
		console.error("Secret client is not initialized");
		return;
	}

	let msg = {}; //all snake_case!
	if (funcName === "flip") {
		msg = { flip: {} };
	} else if (funcName === "password") {
		if (!arg1) {
			console.error("password_key invalid");
			return;
		}
		if (!arg2) {
			console.error("password_value invalid");
			return;
		}
		msg = {
			store_password: {
				password_key: arg1,
				password_value: arg2,
			},
		};
	} else {
		console.error("funcName not valid");
		return;
	}

	const tx = await client.tx.compute.executeContract(
		{
			sender: walletAddress,
			contract_address: secretCtrtAddress,
			msg, //all snake_case!
			code_hash: secretCtrtCodeHash,
		},
		{ gasLimit: 100_000 },
	);
	ll("secretExecute:", tx);
};

export const secretQuery = async (
	client: SecretNetworkClient | null,
	funcName: string,
	arg1: string | undefined,
) => {
	ll(`secretQuery: 
funcName=${funcName}, arg1: ${arg1}`);
	if (!client) {
		console.error("Secret client is not initialized");
		return;
	}

	let query = {}; //all snake_case!
	if (funcName === "flip") {
		query = {
			get_flip: {},
		};
	} else if (funcName === "password") {
		if (!arg1) {
			console.error("key invalid");
			return;
		}
		query = {
			get_password: {
				password_key: arg1,
			},
		};
	} else {
		console.error("funcName not valid");
		return;
	}

	const queryResult = await client.query.compute.queryContract({
		contract_address: secretCtrtAddress,
		code_hash: secretCtrtCodeHash,
		query, //all snake_case in query!
	});
	ll("queryResult: ", queryResult);
	return queryResult;
};
