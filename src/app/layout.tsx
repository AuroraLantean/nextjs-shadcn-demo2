import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@components/header";
import { SidebarProvider, SidebarTrigger } from "@ui/sidebar";
import { AppSidebar } from "@components/app-sidebar";
import { ThemeProvider } from "@components/theme-provider";
import Footer from "@components/footer";
import MobileMenu from "@/components/mobile-menu";

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
	return (
		//suppressHydrationWarning to skip errors caused by browser extensions
		<html lang="en" suppressHydrationWarning className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
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
									<Header />

									{children}
									<Footer />
								</div>
							</section>
						</main>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
//max-md:pb-32 sm:px-10  mx-auto
