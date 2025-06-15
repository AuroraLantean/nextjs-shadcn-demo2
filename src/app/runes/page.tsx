import { Button } from "@ui/button";

export default async function HomePage() {
	return (
		<div className="flex min-h-[600px] flex-col items-center justify-center p-10 gap-10 text-center">
			<img src="/black-runestone.png" alt="black runestone" width="200" />
			<h1 className="text-7xl font-bold">
				Your <span className="text-orange-500">Runes</span> <br /> Your App
			</h1>
			<div className="flex items-center justify-between gap-10 text-left">
				<p>
					Connect your Bitcoin Web3 wallet <br />
					to view your Runes dashboard.
				</p>
				<Button variant="outline">View Dashboard</Button>
			</div>
		</div>
	);
}
/* Footer
			Powered by the &nbsp;{" "}
			<a href="https://www.hiro.so/" target="_blank" rel="noreferrer">
				<img src="/HiroIcon-Rounded-Orange.png" alt="Hiro Logo" width="20" />
			</a>
			&nbsp; Runes API.
 */
