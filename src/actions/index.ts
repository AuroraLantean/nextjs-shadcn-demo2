"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const snippetFake = { code: "code", title: "title", id: 0 };
export async function addSnippet(
	formState: { message: string },
	formData: FormData,
) {
	try {
		// Get formData from form name properties
		const title = formData.get("title"); //as string
		const code = formData.get("code");

		if (typeof title !== "string" || title.length < 3) {
			return {
				message: "Title must be longer",
			};
		}
		if (typeof code !== "string" || code.length < 10) {
			return {
				message: "Code must be longer",
			};
		}

		// add a new record in the database
		/*const snippet = await db.snippet.create({
			data: {
				title,
				code,
			},
		});
		console.log("add a new snippet:", snippet);*/
		//throw new Error("database failed");
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				message: err.message,
			};
		}
		return {
			message: "Something went wrong...",
		};
	}
	revalidatePath("/");
	//Redirect the user back to the root route
	redirect("/"); //should be the last, else NEXT_REDIRECT
}

export async function readSnippet(id: string) {
	return snippetFake;
	/*const snippetId = Number.parseInt(id);
	const snippet = await db.snippet.findFirst({
		where: { id: snippetId },
	});
	return snippet;*/
}
export async function readSnippets() {
	return [snippetFake, snippetFake, snippetFake];
	/*const snippets = await db.snippet.findMany();
	return snippets;*/
}

export async function updateSnippet(id: number, code: string) {
	/*await db.snippet.update({
		where: { id },
		data: { code },
	});
	console.log("updateSnippet()", id, code);*/
	revalidatePath(`/snippets/${id}`);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	/*await db.snippet.delete({
		where: { id },
	});*/
	console.log("deleteSnippet()", id);
	revalidatePath("/");
	redirect("/");
}
