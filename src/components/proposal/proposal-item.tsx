import { useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { ErrText } from "@proposal/err-text";
import type { Proposal, ProposalStatus, SuiID, VoteNft } from "@/lib/sui-funcs";
import { formatUnixTime, isUnixTimeExpired, ll } from "@/lib/utils";
import { VoteProposalModal } from "../modal/vote-proposal";
import { useState } from "react";

/*public struct Proposal has key {
    id: UID,
    title: String,
    description: String,
    voted_yes_count: u64,
    voted_no_count: u64,
    expiration: u64,
    owner: address,
    status: ProposalStatus,
    voters: Table<address, bool>,
} */
const parseProposal = (data: SuiObjectData): Proposal | null => {
	if (data.content?.dataType !== "moveObject") return null;
	//debugger;
	ll("parseProposal:", data.content.fields);
	const { voted_yes_count, voted_no_count, expiration, ...rest } = data.content
		.fields as {
		id: SuiID;
		title: string;
		description: string;
		voted_yes_count: string;
		voted_no_count: string;
		expiration: string;
		owner: string;
		status: ProposalStatus;
		voter_registry: string[];
	};

	return {
		...rest,
		votedYesCount: Number(voted_yes_count),
		votedNoCount: Number(voted_no_count),
		expiration: Number(expiration),
	};
};

type ProposalItemsProps = {
	id: string;
	voteNft: VoteNft | undefined;
	onProposalview: () => void;
};
export const ProposalItem: React.FC<ProposalItemsProps> = ({
	id,
	voteNft,
	onProposalview,
}) => {
	const [isModalOpen, setModalState] = useState(false);
	const {
		data: objResp,
		refetch: refetchProposal,
		error,
		isPending,
	} = useSuiClientQuery("getObject", {
		id,
		options: {
			showContent: true,
		},
	});
	if (isPending) return <ErrText centered text="Loading..." />;

	if (error) return <ErrText isError text={`Error: ${error.message}`} />;

	//if the proposal has been deleted
	if (!objResp.data) return null;

	const proposal = parseProposal(objResp.data);
	ll("proposal:", proposal);
	if (!proposal) return <ErrText text="No data found!" />;

	const expiration = proposal.expiration;
	//const expiration = 1;
	const isDelisted = proposal.status.variant === "Delisted";
	const isNonActive = isUnixTimeExpired(expiration) || isDelisted;

	return (
		<>
			<div
				onClick={() => !isNonActive && setModalState(true)}
				onKeyUp={() => !isNonActive && setModalState(true)}
				className={`p-4 border rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800  transition-colors ${isNonActive ? "cursor-not-allowed border-gray-600" : "hover:border-blue-500 cursor-pointer"}`}
			>
				<div className="flex justify-between">
					<p
						className={`text-xl font-semibold mb-2 break-all ${isNonActive ? "text-gray-600" : "text-primary"}`}
					>
						{proposal.title}
					</p>
					{!!voteNft && (
						<img className="w-8 h-8 rounded-full" src={voteNft?.url} />
					)}
				</div>

				<p
					className={`break-all ${isNonActive ? "text-gray-600" : "text-primary"}`}
				>
					{proposal.description}
				</p>
				<p
					className={`break-all ${isNonActive ? "text-gray-600" : "text-primary"}`}
				>
					{proposal.id.id}
				</p>

				<div className="flex items-center justify-between mt-4">
					<div className="flex space-x-4">
						<div
							className={`flex items-center ${isNonActive ? "text-green-800" : "text-green-600"}`}
						>
							<span className="mr-1">👍</span>

							{proposal.votedYesCount}
						</div>

						<div
							className={`flex items-center ${isNonActive ? "text-red-800" : "text-red-600"}`}
						>
							<span className="mr-1">👎</span>

							{proposal.votedNoCount}
						</div>
						<p
							className={`${isNonActive ? "text-gray-600" : "text-primary"} text-sm`}
						>
							{isDelisted ? "Delisted" : formatUnixTime(expiration)}
						</p>
					</div>
				</div>
			</div>
			<VoteProposalModal
				isModalOpen={isModalOpen}
				setModalState={setModalState}
				proposal={proposal}
				hasVoted={!!voteNft}
				onProposalItem={(voteBool: boolean) => {
					ll("onProposalItem:", voteBool);
					refetchProposal(); //update yes/no votes
					onProposalview();
				}}
			/>
		</>
	);
};
