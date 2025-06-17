"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

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

	const { isPending, isFetching, data, error } = useQuery({
		queryKey: ["gitQuery"],
		queryFn: async () => {
			const response = await fetch(
				"https://api.github.com/repos/TanStack/query",
			);
			const data = await response.json();
			return data;
		},
	});
	if (isPending) return "Loading...";
	if (error) return `An error occured: ${error.message}`;

	return (
		<>
			<div className="mb-8">
				<h1 className="text-4xl font-bold">Your Wallet Info</h1>
			</div>

			<h1>{data.full_name}</h1>
			<p>{data.description}</p>
			<strong>{data.forks_count}</strong>
			<div>{isFetching ? "Updating" : ""}</div>
		</>
	);
};

export default WalletPage;
