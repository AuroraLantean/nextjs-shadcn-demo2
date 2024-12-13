import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

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
	if (!snippet) {
		notFound();
	}
	return (
		<div>
			<SnippetEditForm snippet={snippet} />
		</div>
	);
}
