"use client";
import React from "react";

const WalletPage = () => {
	const blockchain = "sui";
	switch (blockchain) {
		case "sui":
			{
			}
			break;
		default: {
			return (
				<div className="text-center font-extrabold p-20">
					connect your wallet and choose a blockchain
				</div>
			);
		}
	}

	return (
		<>
			<div className="mb-8">
				<h1 className="text-4xl font-bold">Your Wallet Info</h1>
			</div>
		</>
	);
};

export default WalletPage;
