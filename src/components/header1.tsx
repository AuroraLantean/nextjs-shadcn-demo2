"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "@ui/sidebar";
import MobileMenu from "./mobile-menu";

/*const ConnectWallet = dynamic(() => import('@components/connect-wallet'), {
  ssr: false
});
*/
export default function Header1() {
	const pathname = usePathname();
	const active = (path: string) =>
		path === pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600";

	//videow-full absolute z-10
	//contaienr relative text-xl flex-wrap mx-auto
	return (
		<header className="flex-row w-full  justify-between bg-sky-800 hidden sm:block">
			<div className="flex items-center w-full justify-between gap-x-2  p-4">
				<div className="flex items-center space-x-2 ">
					<Link href="/" className="font-bond text-3xl">
						<img src="/nextjs.svg" alt="NextJs logo" width="40" height="40" />
					</Link>

					<Link
						href={"https://coinmarketcap.com/"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						CryptoMarketCap
					</Link>
					<Link
						href={"https://nextjs.org/"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						NextJs
					</Link>
					<Link
						href={"https://tanstack.com/"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						Tanstack
					</Link>
				</div>
				<div className="flex items-center gap-x-2">
					<div className="md:hidden">
						<MobileMenu />
					</div>
					<ModeToggle />
					<div>Connect Wallet</div>
				</div>
			</div>
		</header>
	);
}
/*
<div className="md:hidden bg-white dark:bg-black h-[2.2rem] w-[2.2rem] rounded-lg pt-1 pl-1"><SidebarTrigger />
</div>

<StacksConnect buttonLabel="Connect" />

<Button className="text-black bg-white dark:text-white dark:bg-black">Connect</Button>
  <Link href="/performance">Performance</Link>
	<Link href="/reliability">Reliability</Link>
	<Link href="/scale">Scale</Link>
 */
