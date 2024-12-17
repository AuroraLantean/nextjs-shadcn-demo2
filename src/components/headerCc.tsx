"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderCc() {
	const pathname = usePathname();
	const active = (path: string) =>
		path === pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600";

	//@12:43 of Rune videow-full absolute z-10
	return (
		<div className="flex-row bg-sky-800 hidden sm:block text-white">
			<nav className="contaienr relative flex flex-wrap items-center justify-between mx-auto p-8">
				<Link href="/" className="font-bond text-3xl">
					Home
				</Link>

				<div className="space-x-4 text-xl">
					<Link href="/performance">Performance</Link>
					<Link href="/reliability">Reliability</Link>
					<Link href="/scale">Scale</Link>
				</div>
			</nav>
		</div>
	);
}
