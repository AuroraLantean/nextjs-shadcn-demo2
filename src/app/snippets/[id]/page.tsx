import * as actions from "@/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

type SnippetShowPageProps = {
	params: Promise<{
		id: string;
	}>;
};
export default async function SnippetShowPage(props: SnippetShowPageProps) {
	//await new Promise((r) => setTimeout(r, 2000));
	const { id } = await props.params;
	const snippet = await actions.readSnippet(id);
	if (!snippet) {
		notFound();
	}

	const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
	//console.log("snippet:", snippet);
	return (
		<div>
			<div className="flex m-4 justify-between items-center">
				<h1 className="text-xl font-bold">{snippet.title}</h1>
				<div className="flex gap-4">
					<Link
						href={`/snippets/${snippet.id}/edit`}
						className="p-2 border rounded"
					>
						Edit
					</Link>
					<form action={deleteSnippetAction}>
						<button type="submit" className="p-2 border rounded">
							Delete
						</button>
					</form>
				</div>
			</div>
			<pre className="p-3 border rounded bg-gray-700 border-gray-200">
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}

export async function generateStaticParams() {
	const snippets = await actions.readSnippets();
	return snippets.map((snippet) => {
		return {
			id: snippet.id.toString(),
		};
	});
}

/*[ Server ] Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
  {}
 */
