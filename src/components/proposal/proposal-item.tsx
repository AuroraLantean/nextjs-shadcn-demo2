import { useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { ErrText } from "@proposal/err-text";
import type { ProposalInput, ProposalOutput } from "@/types/sui-types";
import { formatUnixTime, ll } from "@/lib/utils";
import { VoteProposal } from "../modal/vote-proposal";
import { useState } from "react";

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

	return (
		<>
			<div
				onClick={() => setModalState(true)}
				onKeyUp={() => setModalState(true)}
				className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:border-blue-500 transition-colors"
			>
				<p className="text-xl font-semibold mb-2 break-all">{proposal.title}</p>

				<p className="break-all">{proposal.description}</p>

				<div className="flex items-center justify-between mt-4">
					<div className="flex space-x-4">
						<div className="flex items-center text-green-600">
							<span className="mr-1">👍</span>

							{proposal.votedYesCount}
						</div>

						<div className="flex items-center text-red-600">
							<span className="mr-1">👎</span>

							{proposal.votedNoCount}
						</div>
						<ErrText text={formatUnixTime(proposal.expiration)} />
					</div>
				</div>
			</div>
			<VoteProposal isModalOpen={isModalOpen} setModalState={setModalState} />
		</>
	);
};

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
