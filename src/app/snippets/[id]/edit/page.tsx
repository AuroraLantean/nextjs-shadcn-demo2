import { db } from "@/db";

type SnippetEditPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function SnippetEditPage(props: SnippetEditPageProps) {
	const { id } = await props.params;
	const snippetId = Number.parseInt(id);
	const snippet = await db.snippet.findFirst({
		where: { id: snippetId },
	});
	return <div>Editing snippet with id {id}</div>;
}
