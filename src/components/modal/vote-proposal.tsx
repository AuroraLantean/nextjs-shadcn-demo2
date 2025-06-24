import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
	ConnectButton,
	useCurrentWallet,
	useSignAndExecuteTransaction,
	useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network-func";
import { ll } from "@/lib/utils";
import type { Proposal, VoteEvent } from "@/lib/sui-funcs";

type Props = {
	isModalOpen: boolean;
	setModalState: (arg: boolean) => void;
	proposal: Proposal;
	hasVoted: boolean;
	onProposalItem: (votedYes: boolean) => void;
};
export const VoteProposalModal: React.FC<Props> = ({
	isModalOpen,
	setModalState,
	proposal,
	hasVoted,
	onProposalItem,
}) => {
	const { connectionStatus } = useCurrentWallet();
	const suiClient = useSuiClient();
	const {
		mutate: signAndExecute,
		isPending,
		isSuccess,
		reset, //resets isPending and isSuccess values so other accounts(from the same wallet) can have those initial conditions
	} = useSignAndExecuteTransaction();

	const packageId = useNetworkVariable("packageId");
	const proposalbox = useNetworkVariable("proposalbox");
	ll("connectionStatus:", connectionStatus);

	const vote = (arg: number) => {
		ll(`vote: ${arg}`);
		ll("packageId:", packageId);
		ll("proposal id:", proposal.id.id);
		ll("proposalbox:", proposalbox);

		//public fun vote(self: &mut Proposal, vote_boo: bool, clock: &Clock,  ctx: &mut TxContext){}
		const tx = new Transaction();
		tx.moveCall({
			arguments: [
				tx.object(proposal.id.id),
				tx.pure.bool(Boolean(arg)),
				tx.object("0x6"), //clock object
			],
			target: `${packageId}::proposal::vote`,
		});
		toast("About to sign the transaction");

		signAndExecute(
			{
				transaction: tx,
			},
			{
				onError: () => {
					toast.error("Voting failed", {
						style: {
							background: "red",
						},
					});
				},
				onSuccess: async ({ digest }) => {
					const { effects } = await suiClient.waitForTransaction({
						digest,
						options: {
							showEffects: true,
						},
					});
					ll("effects", effects);
					ll("digest:", digest);
					const nftId = effects?.created?.[0]?.reference.objectId;
					ll("nft id:", nftId);
					toast.success("Voting Successful", {
						description: digest,
						style: {
							background: "green",
						},
					});

					//Catch VoteEvent
					const eventResult = await suiClient.queryEvents({
						query: { Transaction: digest },
					});
					if (eventResult.data.length > 0) {
						ll("eventResult.data", eventResult.data);
						const firstEvent = eventResult.data[0].parsedJson as VoteEvent;

						const id = firstEvent.proposal_id || "proposal_id not found";

						const voter = firstEvent.voter || "voter not found";

						let voteValue: any = firstEvent.vote_value;
						if (voteValue === undefined) voteValue = "vote_value not found";

						ll(
							`Event captured. id: ${id}, voter: ${voter}, voteValue: ${voteValue}`,
						);
					} else {
						ll("No event found!");
					}
					reset();
					onProposalItem(Boolean(arg));
				},
			},
		);
		setModalState(false);
	};
	const votingDisabled = hasVoted || isPending || isSuccess;

	return (
		<Dialog open={isModalOpen} onOpenChange={setModalState}>
			<form>
				<DialogContent className="max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold ">
							{proposal.title}
						</DialogTitle>
						<DialogDescription>{proposal.description}</DialogDescription>
					</DialogHeader>
					<div className="">
						<p className="mb-6 break-all">{proposal.id.id}</p>
						<div className="flex flex-col gap-4">
							{hasVoted || isSuccess ? (
								<div className="w-full font-extrabold p-1 rounded-full text-center text-2xl">
									Voted
								</div>
							) : (
								<div className="w-full font-extrabold p-1 rounded-full text-center text-2xl">
									Not Voted
								</div>
							)}
							<div className="flex justify-between text-sm ">
								<span>👍Yes votes: {proposal.votedYesCount}</span>

								<span>👎No votes: {proposal.votedNoCount}</span>
							</div>
						</div>
					</div>
					{connectionStatus === "connected" ? (
						<div className="flex justify-stretch gap-4">
							<Button
								type="button"
								variant="default"
								className="bg-green-400 grow text-gray-600 hover:text-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
								disabled={votingDisabled}
								onClick={() => vote(1)}
							>
								Yes
							</Button>
							<Button
								type="button"
								variant="default"
								className="bg-red-400 grow text-gray-600  hover:text-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
								disabled={votingDisabled}
								onClick={() => vote(0)}
							>
								No
							</Button>
						</div>
					) : (
						<div>
							<ConnectButton connectText="Connect to vote" />
						</div>
					)}
					<div className="w-full">
						<DialogClose asChild>
							<Button
								variant="default"
								className="w-full bg-blue-400 text-gray-600  hover:text-blue-400"
							>
								Cancel
							</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
};
/*
				<DialogTrigger asChild>
					<Button variant="outline">Vote1</Button>
				</DialogTrigger>
        
        <Form><form>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              className="primary-color">
              Buy Now
            </Button>
        </form></Form>
 */
