import * as actions from "@/actions";
import Link from "next/link";
//import Hero from "@/components/hero";
//import homeImg from "@public/home.jpg";

export default async function HomePage() {
	const snippets = await actions.readSnippets();

	const renderedSnippets = snippets.map((snippet) => {
		return (
			<Link
				key={snippet.id}
				href={`/snippets/${snippet.id}`}
				className="flex justify-between items-center p-2 border rounded"
			>
				<div>{snippet.title}</div>
				<div>View</div>
			</Link>
		);
	});

	return (
		<div>
			<div className="flex m-2 justify-between items-center">
				<h1 className="text-xl font-bold">Snippets</h1>
				<Link href="/snippets/new" className="border p-2 rounded">
					New
				</Link>
			</div>
			<div className="flex flex-col gap-2">{renderedSnippets}</div>
		</div>
	);
	/*return(<Hero
			imgData={homeImg}
			imgAlt="car factory"
			title="Professional Cloud Hosting"
		/>);*/
}
