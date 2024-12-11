"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { SetStateAction, useState } from "react";
import * as actions from "@/actions";

type SnippetEditFormProps = {
	snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
	const [code, setCode] = useState(snippet.code);

	//string = '' to avoid undefined value
	const handleEditorChange = (value = "") => {
		//console.log(value);
		setCode(value);
	};
	const updateSnippetAction = actions.updateSnippet.bind(
		null,
		snippet.id,
		code,
	);

	return (
		<div>
			<Editor
				height="40vh"
				theme="vs-dark"
				language="javascript"
				defaultValue={snippet.code}
				options={{ minimap: { enabled: false } }}
				onChange={handleEditorChange}
			/>
			<form action={updateSnippetAction}>
				<button type="submit" className="p-2 border rounded">
					Save
				</button>
			</form>
		</div>
	);
}
