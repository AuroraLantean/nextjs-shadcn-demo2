import { db } from "@/db";
//import Hero from "@/components/hero";
//import homeImg from "@public/home.jpg";

export default async function HomePage() {
	const snippets = await db.snippet.findMany();

	const renderedSnippets = snippets.map((snippet) => {
		return <div key={snippet.id}>{snippet.title}</div>;
	});

	return <div>{renderedSnippets}</div>;
	/*return(<Hero
			imgData={homeImg}
			imgAlt="car factory"
			title="Professional Cloud Hosting"
		/>);*/
}
