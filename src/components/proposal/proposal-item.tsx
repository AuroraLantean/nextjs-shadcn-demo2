import { useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { ErrText } from "@proposal/err-text";
import type { ProposalInput, ProposalOutput } from "@/types/sui-types";
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
const parseProposal = (data: SuiObjectData): ProposalOutput | null => {
	if (data.content?.dataType !== "moveObject") return null;
	//debugger;
	ll(data.content.fields);
	const { voted_yes_count, voted_no_count, expiration, ...rest } = data.content
		.fields as ProposalInput;

	return {
		...rest,
		votedYesCount: Number(voted_yes_count),
		votedNoCount: Number(voted_no_count),
		expiration: Number(expiration),
	};
};

type ProposalItemsProps = {
	id: string;
};
export const ProposalItem: React.FC<ProposalItemsProps> = ({ id }) => {
	const [isModalOpen, setModalState] = useState(false);
	const {
		data: objResp,
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

	if (!objResp.data) return <ErrText text="Not Found" />;

	const proposal = parseProposal(objResp.data);
	if (!proposal) return <ErrText text="No data found!" />;

	const expiration = proposal.expiration;
	//const expiration = 1;
	const isExpired = isUnixTimeExpired(expiration);

	return (
		<>
			<div
				onClick={() => !isExpired && setModalState(true)}
				onKeyUp={() => !isExpired && setModalState(true)}
				className={`p-4 border rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800  transition-colors ${isExpired ? "cursor-not-allowed border-gray-600" : "hover:border-blue-500 cursor-pointer"}`}
			>
				<p
					className={`text-xl font-semibold mb-2 break-all ${isExpired ? "text-gray-600" : "text-primary"}`}
				>
					{proposal.title}
				</p>

				<p
					className={`break-all ${isExpired ? "text-gray-600" : "text-primary"}`}
				>
					{proposal.description}
				</p>
				<p className="break-all">{proposal.id.id}</p>

				<div className="flex items-center justify-between mt-4">
					<div className="flex space-x-4">
						<div
							className={`flex items-center ${isExpired ? "text-green-800" : "text-green-600"}`}
						>
							<span className="mr-1">👍</span>

							{proposal.votedYesCount}
						</div>

						<div
							className={`flex items-center ${isExpired ? "text-red-800" : "text-red-600"}`}
						>
							<span className="mr-1">👎</span>

							{proposal.votedNoCount}
						</div>
						<p
							className={`${isExpired ? "text-gray-600" : "text-primary"} text-sm`}
						>
							{formatUnixTime(expiration)}
						</p>
					</div>
				</div>
			</div>
			<VoteProposalModal
				isModalOpen={isModalOpen}
				setModalState={setModalState}
				proposal={proposal}
				onVote={(votedYes: boolean) => console.log(votedYes)}
			/>
		</>
	);
};
