"use client";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "@config/networkConfig";

const SuiClientWalletProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<SuiClientProvider defaultNetwork="testnet" networks={networkConfig}>
			<WalletProvider autoConnect>{children}</WalletProvider>
		</SuiClientProvider>
	);
};

export default SuiClientWalletProvider;
