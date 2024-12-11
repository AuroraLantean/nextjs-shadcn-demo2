"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function addSnippet(
	formState: { message: string },
	formData: FormData,
) {
	return { message: "string invalid" };

	/*// Get formData from form name properties
	const title = formData.get("title") as string;
	const code = formData.get("code") as string;

	// Create a new record in the database
	const snippet = await db.snippet.create({
		data: {
			title,
			code,
		},
	});
	console.log(snippet);

	// Redirect the user back to the root route
	redirect("/");*/
}

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
