"use client";
import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";
import {
	DEVNET_PROPOSAL_BOX,
	MAINNET_PROPOSAL_BOX,
	TESTNET_PROPOSAL_BOX,
	DEVNET_PACKAGE_ID,
	MAINNET_PACKAGE_ID,
	TESTNET_PACKAGE_ID,
	LOCAL_PROPOSAL_BOX,
	LOCAL_PACKAGE_ID,
} from "./config";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
	localnet: {
		url: getFullnodeUrl("localnet"),
		variables: {
			proposalbox: LOCAL_PROPOSAL_BOX,
			packageId: LOCAL_PACKAGE_ID,
		},
	},
	devnet: {
		url: getFullnodeUrl("devnet"),
		variables: {
			proposalbox: DEVNET_PROPOSAL_BOX,
			packageId: DEVNET_PACKAGE_ID,
		},
	},
	testnet: {
		url: getFullnodeUrl("testnet"),
		variables: {
			proposalbox: TESTNET_PROPOSAL_BOX,
			packageId: TESTNET_PACKAGE_ID,
		},
	},
	mainnet: {
		url: getFullnodeUrl("mainnet"),
		variables: {
			proposalbox: MAINNET_PROPOSAL_BOX,
			packageId: MAINNET_PACKAGE_ID,
		},
	},
});
export { networkConfig, useNetworkVariable };
