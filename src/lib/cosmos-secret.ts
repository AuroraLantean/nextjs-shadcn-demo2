import { SecretNetworkClient } from "secretjs";
import { secretNetworkId, secretNetworkUrl } from "@/config/config";
import { sleep } from "./utils";

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
