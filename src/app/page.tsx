import { Button } from "@/components/ui/button";
//import Hero from "@/components/hero";
//import homeImg from "@public/home.jpg";

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
} /*
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline">View Dashboard</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>First connect your wallet in the top right corner.</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					
return(<Hero
			imgData={homeImg}
			imgAlt="car factory"
			title="Professional Cloud Hosting"
		/>);*/
