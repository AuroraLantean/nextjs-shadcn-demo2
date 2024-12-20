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
//import { Separator } from "@/components/ui/separator";
//import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function FeaturedCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-start gap-2">
					<Sparkles />
					Featured Runes
				</CardTitle>
				<CardDescription>
					Most active Runes in recent Bitcoin block height{" "}
					{"Placeholder block height"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<span>Featured Runes</span>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<Button
					variant="secondary"
					onClick={() =>
						window.open(`https://ordiscan.com/rune/${"x"}`, "_blank")
					}
				>
					View Etching
				</Button>
				<Link
					href={`https://magiceden.us/runes/${"x"}`}
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
