import * as actions from "@/actions";
import SnippetEditForm from "@/components/snippet-edit-form";
import { notFound } from "next/navigation";

type SnippetEditPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function SnippetEditPage(props: SnippetEditPageProps) {
	const { id } = await props.params;
	const snippet = await actions.readSnippet(id);
	if (!snippet) {
		notFound();
	}
	return (
		<div>
			<SnippetEditForm snippet={snippet} />
		</div>
	);
}
