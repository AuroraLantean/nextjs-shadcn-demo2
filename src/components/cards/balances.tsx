"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/card";
import { Button, buttonVariants } from "@ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@ui/collapsible";
import { ChevronsUpDown, WalletCards } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DashboardLineItem from "../dashboard-line-item";
import type { AddressBalances } from "@/lib/rune-funcs";

type props = {
	addressBalances: AddressBalances[];
};
export default function BalancesCard({ addressBalances }: props) {
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
					<DashboardLineItem
						a={
							addressBalances[0] !== undefined
								? addressBalances[0].spaced_name
								: "."
						}
						b={addressBalances[0] !== undefined ? addressBalances[0].id : "."}
						d={
							addressBalances[0] !== undefined ? addressBalances[0].balance : 0
						}
						e={
							addressBalances[0] !== undefined ? addressBalances[0].symbol : "."
						}
					/>
					<CollapsibleContent className="space-y-2">
						<DashboardLineItem
							a={
								addressBalances[1] !== undefined
									? addressBalances[1].spaced_name
									: "."
							}
							b={addressBalances[1] !== undefined ? addressBalances[1].id : "."}
							d={
								addressBalances[1] !== undefined
									? addressBalances[1].balance
									: 0
							}
							e={
								addressBalances[1] !== undefined
									? addressBalances[1].symbol
									: "."
							}
						/>
						<DashboardLineItem
							a={
								addressBalances[2] !== undefined
									? addressBalances[2].spaced_name
									: "."
							}
							b={addressBalances[2] !== undefined ? addressBalances[2].id : "."}
							d={
								addressBalances[2] !== undefined
									? addressBalances[2].balance
									: 0
							}
							e={
								addressBalances[2] !== undefined
									? addressBalances[2].symbol
									: "."
							}
						/>
					</CollapsibleContent>
				</Collapsible>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<Button
					variant="secondary"
					onClick={() =>
						window.open(
							`https://ordinals.hiro.so/address/${addressBalances}`,
							"_blank",
						)
					}
				>
					Ordinals?
				</Button>

				<Button disabled>View More</Button>
			</CardFooter>
		</Card>
	);
}
