import { ll } from "@/lib/utils";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { SuiOwnedObjects } from "./sui-owned-objects";

export const WalletStatus = () => {
	const account = useCurrentAccount();
	ll("Sui account:", account, account?.chains);

	return (
		<div className="my-2 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
			<h2 className="mb-2 text-xl font-bold">Wallet Status</h2>
			{account ? (
				<div className="flex flex-col space-y-1 ">
					<p className="">Wallet connected</p>

					<p className="">
						Address:{" "}
						<span className="font-mono break-words">{account?.address}</span>
					</p>
				</div>
			) : (
				<p className="">Wallet not connected</p>
			)}

			<SuiOwnedObjects />
		</div>
	);
};
