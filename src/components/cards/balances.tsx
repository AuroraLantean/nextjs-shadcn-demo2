"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, WalletCards } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BalancesCard() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-start gap-2">
					<WalletCards />
					Your Runes Balances
				</CardTitle>
				<CardDescription>Snapshot of your Runes balances</CardDescription>
			</CardHeader>
			<CardContent>
				<Collapsible
					open={isOpen}
					onOpenChange={setIsOpen}
					className="space-y-2"
				>
					<div className="flex items-center justify-between space-x-4 px-4">
						<h4 className="text-sm font-semibold">
							Balances of your top 3 Runes
						</h4>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="sm" className="w-9 p-0">
								<ChevronsUpDown className="h-4 w-4" />
								<span className="sr-only">Toggle</span>
							</Button>
						</CollapsibleTrigger>
					</div>
					<div className="rounded-md border px-4 py-3 font-mono text-sm">
						@radix-ui/primitives
					</div>
					<CollapsibleContent className="space-y-2">
						<div className="rounded-md border px-4 py-3 font-mono text-sm">
							@radix-ui/primitives
						</div>
						<div className="rounded-md border px-4 py-3 font-mono text-sm">
							@radix-ui/primitives
						</div>
					</CollapsibleContent>
				</Collapsible>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<Button
					variant="secondary"
					onClick={() =>
						window.open(`https://ordinals.hiro.so/address/${"x"}`, "_blank")
					}
				>
					Ordinals?
				</Button>

				<Button disabled>View More</Button>
			</CardFooter>
		</Card>
	);
}
