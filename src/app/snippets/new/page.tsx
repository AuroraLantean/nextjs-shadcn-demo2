import { db } from "@/db";
import { redirect } from "next/navigation";
import React from "react";

//type Props = {};

const SnippetAddPage = (/*props: Props*/) => {
	async function addDbSnippet(formData: FormData) {
		"use server";

		// Get formData from form name properties
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
		redirect("/");
	}

	return (
		<form action={addDbSnippet}>
			<h3 className="font-bold m-3">Add a Snippet</h3>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<label className="w-12" htmlFor="title">
						Title
					</label>
					<input
						name="title"
						className="border rounded p-2 w-full bg-slate-700"
						id="title"
					/>
				</div>

				<div className="flex gap-4">
					<label className="w-12" htmlFor="code">
						Code
					</label>
					<textarea
						name="code"
						className="border rounded p-2 w-full bg-slate-800"
						id="code"
					/>
				</div>

				<button type="submit" className="rounded p-2 bg-blue-400">
					Add
				</button>
			</div>
		</form>
	);
};

export default SnippetAddPage;
