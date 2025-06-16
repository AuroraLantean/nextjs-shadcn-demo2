const PROPOSAL_COUNT = 7;

const ProposalItem = () => {
	return (
		<div className="p-4 border-blue-400 border-1 rounded-lg shadow-sm hover:border-amber-500 transition-colors">
			<p className="text-xl font-semibold mb-2">Title: Hello There</p>

			<p className="text-gray-700 dark:text-gray-300">
				Desc: What is your vote ?
			</p>
		</div>
	);
};

const ProposalView = () => {
	return (
		<>
			<h1 className="text-4xl font-bold mb-8">New Proposals</h1>
			<div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
				{new Array(PROPOSAL_COUNT).fill(1).map((id) => (
					<ProposalItem key={id * Math.random()} />
				))}
			</div>
		</>
	);
};

export default ProposalView;
