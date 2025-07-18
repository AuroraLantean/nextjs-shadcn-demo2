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
//import { Separator } from "@ui/separator";
//import { Badge } from "@ui/badge";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ApiStatus, Etching } from "@/lib/rune-funcs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type props = {
	featuredRunes: Etching;
	apiStatus: ApiStatus;
};
export default function FeaturedCard({ featuredRunes, apiStatus }: props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-start gap-2">
					<Sparkles />
					Featured Runes
				</CardTitle>
				<CardDescription>
					Most active Runes in recent Bitcoin block height{" "}
					{apiStatus?.block_height}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					<span className="font-semibold">{featuredRunes?.spaced_name}</span> |{" "}
					{featuredRunes?.id}
				</p>
				<div className="flex items-center justify-between my-4">
					<span className="text-8xl">{featuredRunes?.symbol}</span>
					<Separator orientation="horizontal" />

					<span className="flex flex-col">
						<p className="font-semibold m-0 p-0">Current Supply:</p> <br />
						{Number(featuredRunes?.supply.current).toLocaleString() +
							featuredRunes?.symbol}
					</span>
				</div>
				<span className="flex items-center justify-start gap-2">
					<Badge variant="secondary">
						{featuredRunes?.supply.mintable ? "Mintable" : "Unmintable"}
					</Badge>
					<Badge variant="secondary">
						{featuredRunes?.turbo ? "Turbo" : "Not Turbo"}
					</Badge>
					<Badge variant="secondary">
						{featuredRunes?.location.block_height}
					</Badge>
				</span>
				<br />
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<Button
					variant="secondary"
					onClick={() =>
						window.open(
							`https://ordiscan.com/rune/${featuredRunes?.name}`,
							"_blank",
						)
					}
				>
					View Etching
				</Button>
				<Link
					href={`https://magiceden.us/runes/${featuredRunes?.spaced_name}`}
					className={buttonVariants({ variant: "default" })}
					prefetch={true}
					target="_blank"
				>
					View Market
				</Link>
			</CardFooter>
		</Card>
	);
}
