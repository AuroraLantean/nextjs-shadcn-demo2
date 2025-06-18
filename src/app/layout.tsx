import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@ui/sidebar";
import { AppSidebar } from "@header_sidebar/app-sidebar";
import NextThemeProvider from "@/components/providers/next-theme-provider";
import TanstackProvider from "@providers/tanstack-provider";
import Footer from "@header_sidebar/footer";
import MobileMenu from "@header_sidebar/mobile-menu";
import { after } from "next/server";
import { ll } from "@lib/utils";
import Header1 from "@header_sidebar/header1";
import SuiClientWalletProvider from "@/components/providers/sui-clientwallet-provider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Shadcn NextJs 15 + React 19",
	description: "Shadcn NextJs 15 + React 19",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	after(() => {
		ll("RootLayout at after()");
	});

	return (
		//suppressHydrationWarning to skip errors caused by browser extensions
		<html lang="en" suppressHydrationWarning className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TanstackProvider>
					<SuiClientWalletProvider>
						<NextThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<SidebarProvider>
								<AppSidebar />
								<div className="block sm:hidden h-8">
									<MobileMenu />
								</div>
								<main className="flex flex-row w-full">
									<section className="flex min-h-screen flex-1 flex-col w-full items-center overflow-hidden">
										<div className="w-full">
											<Header1 />

											{children}
											<Footer />
										</div>
									</section>
								</main>
							</SidebarProvider>
						</NextThemeProvider>
					</SuiClientWalletProvider>
				</TanstackProvider>
			</body>
		</html>
	);
}
//max-md:pb-32 sm:px-10  mx-auto
