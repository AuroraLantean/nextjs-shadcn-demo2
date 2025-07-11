import { Button } from "@ui/button";

//import Hero from "@components/hero";
//import homeImg from "@public/home.jpg";
type Props = {};
const HomePage = (props: Props) => {
	return (
		<div className="flex min-h-[600px] flex-col items-center justify-center p-10 gap-10 text-center">
			<span>Hello World</span>
		</div>
	);
};
export default HomePage;
/*
<div className="flex min-h-[600px] flex-col items-center justify-center p-10 gap-10 text-center">
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
