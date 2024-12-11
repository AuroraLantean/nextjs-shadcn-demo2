import { db } from "@/db";
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

	const snippet = await db.snippet.findFirst({
		where: { id: Number.parseInt(id) },
	});

	if (!snippet) {
		notFound();
	}
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
					<Link
						href={`/snippets/${snippet.id}/edit`}
						className="p-2 border rounded"
					>
						Delete
					</Link>
				</div>
			</div>
			<pre className="p-3 border rounded bg-gray-700 border-gray-200">
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}
/*[ Server ] Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
  {}
 */
