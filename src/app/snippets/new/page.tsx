"use client";
import { useActionState, startTransition } from "react";
import * as actions from "@/actions";

//type Props = {};

const SnippetAddPage = (/*props: Props*/) => {
	const [formState, action] = useActionState(actions.addSnippet, {
		message: "",
	}); //action is the updated server action!

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		startTransition(() => {
			action(formData);
		});
	}

	return (
		<form onSubmit={handleSubmit}>
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

				{formState.message ? (
					<div className="my-2 p-2 text-gray-700 bg-red-200 border rounded border-red-400">
						{formState.message}
					</div>
				) : null}

				<button type="submit" className="rounded p-2 text-gray-700 bg-blue-400">
					Add
				</button>
			</div>
		</form>
	);
};

export default SnippetAddPage;
