import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Footer from "@/components/footer";

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
	title: "Runes + Shadcn NextJs",
	description: "Runes + Shadcn NextJs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
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
						<main className="flex flex-row w-full">
							<section className="flex min-h-screen flex-1 flex-col w-full items-center overflow-hidden">
								<div className="w-full container mx-auto">
									<Header />
									<div className="sm:px-9">
										<SidebarTrigger />
									</div>
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
//max-md:pb-32 sm:px-10
