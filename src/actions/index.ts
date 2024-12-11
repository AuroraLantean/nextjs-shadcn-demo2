"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function updateSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code },
	});
	console.log("updateSnippet()", id, code);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({
		where: { id },
	});
	console.log("deleteSnippet()", id);
	redirect("/");
}
