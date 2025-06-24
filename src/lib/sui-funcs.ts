import type {
	PaginatedObjectsResponse,
	SuiObjectData,
} from "@mysten/sui/client";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

import { useNetworkVariable } from "@/config/network-func";

export const useVoteNfts = () => {
	const account = useCurrentAccount();

	const packageId = useNetworkVariable("packageId");

	return useSuiClientQuery(
		"getOwnedObjects",
		{
			owner: account?.address as string,
			options: {
				showContent: true,
			},
			filter: {
				StructType: `${packageId}::proposal::VoteProofNFT`,
			},
		},
		{
			enabled: !!account,
		},
	);
};

export type SuiID = {
	id: string;
};
export type ProposalStatus = {
	variant: "Active" | "Delisted";
};
export type Proposal = {
	id: SuiID;
	title: string;
	description: string;
	votedYesCount: number;
	votedNoCount: number;
	expiration: number;
	owner: string;
	status: ProposalStatus;
	voter_registry: string[];
};

export const parseVoteNfts = (nftRes: PaginatedObjectsResponse | undefined) => {
	if (!nftRes?.data) return [];

	return nftRes.data.map((nftObject) => parseVoteNft(nftObject.data));
};

export type VoteNft = {
	id: SuiID;
	proposalId: string;
	name: string;
	description: string;
	url: string;
};
export const parseVoteNft = (
	nftData: SuiObjectData | undefined | null,
): VoteNft => {
	if (nftData?.content?.dataType !== "moveObject") {
		return {
			id: { id: "" },
			proposalId: "",
			name: "",
			description: "",
			url: "",
		};
	}

	const { proposal_id: proposalId, ...rest } = nftData.content.fields as {
		id: SuiID;
		proposal_id: string;
		name: string;
		description: string;
		url: string;
	}; /*public struct VoteProofNFT has key {
    id: UID,
    proposal_id: ID,
    name: String,
    description: String,
    url: Url, }*/

	return {
		proposalId,
		...rest,
	};
};

//add ? to make sure it exists
export type VoteEvent = {
	proposal_id?: string;
	voter?: string;
	vote_value?: boolean;
};
