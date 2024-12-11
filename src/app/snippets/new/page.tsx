"use client";
import { useActionState } from "react";
import * as actions from "@/actions";

//type Props = {};

const SnippetAddPage = (/*props: Props*/) => {
	const [formState, action] = useActionState(actions.addSnippet, {
		message: "",
	}); //action is the updated server action!

	return (
		<form action={action}>
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

				<div>{formState.message}</div>

				<button type="submit" className="rounded p-2 bg-blue-400">
					Add
				</button>
			</div>
		</form>
	);
};

export default SnippetAddPage;
