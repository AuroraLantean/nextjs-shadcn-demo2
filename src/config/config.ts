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
