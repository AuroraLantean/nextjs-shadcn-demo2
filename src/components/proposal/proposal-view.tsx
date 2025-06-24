"use client";
import { useNetworkVariable } from "@/config/network-func";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { ll } from "@/lib/utils";
import { ProposalItem } from "@proposal/proposal-item";
import { parseVoteNfts, type VoteNft, type SuiID } from "@/lib/sui-funcs";
import { useVoteNfts } from "@/lib/sui-funcs";

const ProposalView = () => {
	const proposalbox_id = useNetworkVariable("proposalbox");
	ll("proposalbox_id", proposalbox_id);
	if (!proposalbox_id) {
		return (
			<div className="text-center text-gray-500">
				invalid proposalbox_id: {proposalbox_id}
			</div>
		);
	}
	const { data: voteNftsRes, refetch: refetchNfts } = useVoteNfts(); //Must be called before useSuiClientQuery()

	const {
		data: objResp,
		isPending,
		error,
	} = useSuiClientQuery("getObject", {
		id: proposalbox_id,
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

	const voteNfts = parseVoteNfts(voteNftsRes);
	ll("voteNfts:", voteNfts);

	return (
		<>
			<h1 className="text-4xl font-bold mb-8">New Proposals</h1>
			<div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
				{parseProposalBoxData(objResp.data)?.proposals_ids.map((id) => (
					<ProposalItem
						key={id}
						id={id}
						onProposalview={() => refetchNfts()}
						voteNft={voteNfts.find((nft) => nft.proposalId === id)}
						//hasVoted={checkVoteNfts(voteNfts, id)}
					/>
				))}
			</div>
		</>
	);
};
const checkVoteNfts = (nfts: VoteNft[], proposalId: string) => {
	return nfts.some((nft) => nft.proposalId === proposalId);
};

const parseProposalBoxData = (data: SuiObjectData) => {
	if (data.content?.dataType !== "moveObject") return null;
	return data.content.fields as {
		id: SuiID;
		proposals_ids: string[];
	};
};
export default ProposalView;
