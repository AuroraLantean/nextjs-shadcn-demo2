"use client";
import { useNetworkVariable } from "@/config/network-func";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { ll } from "@/lib/utils";
import type { SuiID } from "@/config/config";

type ProposalItemsProps = {
	id: string;
};

const ProposalItem: React.FC<ProposalItemsProps> = ({ id }) => {
	return (
		<div className="p-4 border-blue-400 border-1 rounded-lg shadow-sm hover:border-amber-500 transition-colors">
			<p className="text-xl font-semibold mb-2">Title: {id}</p>

			<p className="text-gray-700 dark:text-gray-300">
				Desc: What is your vote ?
			</p>
		</div>
	);
};

const ProposalView = () => {
	const proposalbox = useNetworkVariable("proposalbox");
	ll("proposalbox", proposalbox);
	if (!proposalbox) {
		return (
			<div className="text-center text-gray-500">
				invalid proposalbox: {proposalbox}
			</div>
		);
	}

	const {
		data: objResp,
		isPending,
		error,
	} = useSuiClientQuery("getObject", {
		id: proposalbox,
		options: {
			showContent: true,
			//showBcs, showDisplay, showOwner, showPreviousTransaction, showStorageRebate, showType
		},
	});
	if (isPending)
		return <div className="text-center text-gray-500">Loading...</div>;

	if (error) return <div className="text-red-500">Error: {error.message}</div>;

	if (!objResp.data)
		return <div className="text-center text-red-500">No Proposal Found...</div>;

	return (
		<>
			<h1 className="text-4xl font-bold mb-8">New Proposals</h1>
			<div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
				{getProposalBoxFields(objResp.data)?.proposals_ids.map((id) => (
					<ProposalItem key={id} id={id} />
				))}
			</div>
		</>
	);
};
const getProposalBoxFields = (data: SuiObjectData) => {
	if (data.content?.dataType !== "moveObject") return null;
	return data.content.fields as {
		id: SuiID;
		proposals_ids: string[];
	};
};
export default ProposalView;
