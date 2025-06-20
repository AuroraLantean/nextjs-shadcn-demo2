import { ll } from "@/lib/utils";

export type SuiID = {
	id: string;
};
export type SuiNetwork = "devnet" | "mainnet" | "testnet" | undefined;
export const SUI_NETWORK: SuiNetwork = (process.env.NEXT_PUBLIC_SUI_NETWORK ||
	"testnet") as SuiNetwork;
if (!SUI_NETWORK) {
	throw Error(`invalid Sui network:${SUI_NETWORK}`);
}
if (!["mainnet", "testnet", "devnet"].includes(SUI_NETWORK)) {
	throw Error(`invalid Sui network:${SUI_NETWORK}`);
}
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
