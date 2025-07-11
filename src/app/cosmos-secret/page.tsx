"use client";
import { isConnected } from "@stacks/connect";
import React, { useState } from "react";
import type { SecretNetworkClient } from "secretjs";
import { Button } from "@/components/ui/button";
import { connectKeplr } from "@/lib/cosmos-secret";
import { ll } from "@/lib/utils";

type Props = {};

const CosmosSecretPage = (props: Props) => {
	const [secretClient, setSecretClient] = useState<SecretNetworkClient | null>(
		null,
	);
	const [walletAddr, setWalletAddr] = useState(null);
	const votingDisabled = false;

	const walletButton = async () => {
		ll("walletButton");
		if (walletAddr) {
		} else {
			const { secretClient, secretAddr } = await connectKeplr();
			setSecretClient(secretClient);
			setWalletAddr(secretAddr);
			ll("secretClient:", secretClient);
			ll("secretAddr:", secretAddr);
		}
	};
	//TODO: 20:45
	return (
		<div>
			<h1 className="font-extrabold">CosmosSecretNetwork</h1>
			{walletAddr ? (
				<span>Secret Wallet connected: {walletAddr}</span>
			) : (
				<span>Secret Wallet not connected</span>
			)}

			<div>
				<Button
					type="button"
					variant="default"
					className="bg-green-400 grow text-gray-600 hover:text-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
					disabled={votingDisabled}
					onClick={() => walletButton()}
				>
					Connect To Keplr
				</Button>
			</div>
		</div>
	);
};

export default CosmosSecretPage;
