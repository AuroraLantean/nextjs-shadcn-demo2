import ProposalView from "@components/proposal-view";

const suiDashboard = () => {
	return (
		<div className="min-h-screen">
			<div className="m-auto pt-16">
				<h1 className="text-4xl font-bold mb-4">View All Proposals</h1>
				<ProposalView />
			</div>
		</div>
	);
};

export default suiDashboard;
