"use client";
import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";
import {
	DEVNET_PROPOSAL_BOX,
	MAINNET_PROPOSAL_BOX,
	TESTNET_PROPOSAL_BOX,
} from "./config";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
	devnet: {
		url: getFullnodeUrl("devnet"),
		variables: {
			proposalbox: DEVNET_PROPOSAL_BOX,
		},
	},
	testnet: {
		url: getFullnodeUrl("testnet"),
		variables: {
			proposalbox: TESTNET_PROPOSAL_BOX,
		},
	},
	mainnet: {
		url: getFullnodeUrl("mainnet"),
		variables: {
			proposalbox: MAINNET_PROPOSAL_BOX,
		},
	},
});
export { networkConfig, useNetworkVariable };
