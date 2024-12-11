import { db } from "@/db";
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
	return <div>Snippet: {snippet.title}</div>;
}
/*[ Server ] Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
  {}
 */
