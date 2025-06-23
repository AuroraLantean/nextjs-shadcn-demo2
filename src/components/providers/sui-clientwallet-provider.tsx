"use client";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "@/config/network-func";
import { SUI_NETWORK } from "@/config/config";

const SuiClientWalletProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<SuiClientProvider defaultNetwork={SUI_NETWORK} networks={networkConfig}>
			<WalletProvider autoConnect>{children}</WalletProvider>
		</SuiClientProvider>
	);
};

export default SuiClientWalletProvider;
