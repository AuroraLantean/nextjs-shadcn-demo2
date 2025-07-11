import { ll } from "@/lib/utils";

export type SuiNetwork =
	| "devnet"
	| "mainnet"
	| "testnet"
	| "localnet"
	| undefined;
export const suiNetwork: SuiNetwork = (process.env.NEXT_PUBLIC_SUI_NETWORK ||
	"testnet") as SuiNetwork;
if (!suiNetwork) {
	throw Error(`invalid Sui network:${suiNetwork}`);
}
if (!["mainnet", "testnet", "devnet", "localnet"].includes(suiNetwork)) {
	throw Error(`invalid Sui network:${suiNetwork}`);
}
export const LOCAL_PACKAGE_ID = process.env.NEXT_PUBLIC_LOCAL_PACKAGE_ID;
export const LOCAL_PROPOSAL_ADMINCAP =
	process.env.NEXT_PUBLIC_LOCAL_PROPOSAL_ADMINCAP;
export const LOCAL_PROPOSAL_BOX = process.env.NEXT_PUBLIC_LOCAL_PROPOSAL_BOX;

export const TESTNET_PACKAGE_ID = process.env.NEXT_PUBLIC_TESTNET_PACKAGE_ID;
export const TESTNET_PROPOSAL_ADMINCAP =
	process.env.NEXT_PUBLIC_TESTNET_PROPOSAL_ADMINCAP;
export const TESTNET_PROPOSAL_BOX =
	process.env.NEXT_PUBLIC_TESTNET_PROPOSAL_BOX;

export const DEVNET_PACKAGE_ID = process.env.NEXT_PUBLIC_DEVNET_PACKAGE_ID;
export const DEVNET_PROPOSAL_ADMINCAP =
	process.env.NEXT_PUBLIC_DEVNET_PROPOSAL_ADMINCAP;
export const DEVNET_PROPOSAL_BOX = process.env.NEXT_PUBLIC_DEVNET_PROPOSAL_BOX;

export const MAINNET_PACKAGE_ID = process.env.NEXT_PUBLIC_MAINNET_PACKAGE_ID;
export const MAINNET_PROPOSAL_ADMINCAP =
	process.env.NEXT_PUBLIC_MAINNET_PROPOSAL_ADMINCAP;
export const MAINNET_PROPOSAL_BOX =
	process.env.NEXT_PUBLIC_MAINNET_PROPOSAL_BOX;

//----------== Cosmos Secret
export const secretNetworkUrl =
	process.env.NEXT_PUBLIC_SECRET_NETWORK_URL || "";
if (!secretNetworkUrl) {
	throw new Error("SECRET_NETWORK_URL invalid");
}
export const secretNetworkId = process.env.NEXT_PUBLIC_SECRET_NETWORK_ID || "";
if (!secretNetworkId) {
	throw new Error("SECRET_NETWORK_ID invalid");
}

export const secretCtrtCodeId = process.env.NEXT_PUBLIC_SECRET_CONTRACT_CODE_ID;
if (!secretCtrtCodeId) {
	throw new Error("SECRET_CONTRACT_CODE_ID invalid");
}
export const secretCtrtCodeHash =
	process.env.NEXT_PUBLIC_SECRET_CONTRACT_CODE_HASH;
if (!secretCtrtCodeHash) {
	throw new Error("SECRET_CONTRACT_CODE_HASH invalid");
}
export const secretCtrtAddress =
	process.env.NEXT_PUBLIC_SECRET_CONTRACT_ADDRESS;
if (!secretCtrtAddress) {
	throw new Error("SECRET_CONTRACT_ADDRESS invalid");
}
