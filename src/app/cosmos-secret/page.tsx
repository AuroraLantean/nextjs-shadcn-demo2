"use client";
import { useState } from "react";
import type { SecretNetworkClient } from "secretjs";
import { Button } from "@/components/ui/button";
import { connectKeplr, secretExecute, secretQuery } from "@/lib/cosmos-secret";
import { ll } from "@/lib/utils";

type Props = {};

const CosmosSecretPage = (props: Props) => {
	const [secretClient, setSecretClient] = useState<SecretNetworkClient | null>(
		null,
	);
	const [walletAddr, setWalletAddr] = useState(null);
	const [queryResult, setQueryResult] = useState<number[]>([]);
	const [buttonDisabled, setButtonDisabled] = useState(false);

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
	const secretQueryClick = async () => {
		const queryRes = await secretQuery(secretClient, "flip", "");
		const value = (queryRes as { flip: number[] }).flip;
		setQueryResult(value);
	};
	const secretExecuteClick = async () => {
		setButtonDisabled(true);
		await secretExecute(secretClient, walletAddr, "flip", "", "");
		setButtonDisabled(false);
	};
	return (
		<div>
			<h1 className="font-extrabold">CosmosSecretNetwork</h1>
			{walletAddr ? (
				<span>Secret Wallet connected: {walletAddr}</span>
			) : (
				<span>Secret Wallet not connected</span>
			)}

			<div className="flex flex-col gap-1">
				<div className="space-x-2">
					<Button
						type="button"
						variant="default"
						className="bg-blue-400 grow text-gray-600 hover:text-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={buttonDisabled}
						onClick={() => walletButton()}
					>
						Connect To Keplr
					</Button>

					<Button
						type="button"
						variant="default"
						className="bg-green-400 grow text-gray-600 hover:text-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={buttonDisabled}
						onClick={secretExecuteClick}
					>
						Flip
					</Button>

					<Button
						type="button"
						variant="default"
						className="bg-green-400 grow text-gray-600 hover:text-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={buttonDisabled}
						onClick={secretQueryClick}
					>
						Query Flip
					</Button>
				</div>

				<span>queryResult: {JSON.stringify(queryResult)}</span>
			</div>
		</div>
	);
};

export default CosmosSecretPage;
