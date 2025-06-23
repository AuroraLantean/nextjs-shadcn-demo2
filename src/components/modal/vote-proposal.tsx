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
import type { Proposal } from "@/lib/sui-funcs";

type Props = {
	isModalOpen: boolean;
	setModalState: (arg: boolean) => void;
	proposal: Proposal;
	onVote: (votedYes: boolean) => void;
};
export const VoteProposalModal: React.FC<Props> = ({
	isModalOpen,
	setModalState,
	proposal,
	onVote,
}) => {
	const { connectionStatus } = useCurrentWallet();
	const suiClient = useSuiClient();
	const { mutate: signAndExecute } = useSignAndExecuteTransaction();

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
					onVote(Boolean(arg));
				},
			},
		);
		setModalState(false);
	};

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
								className="bg-green-400 grow text-gray-600 hover:text-green-300"
								onClick={() => vote(1)}
							>
								Yes
							</Button>
							<Button
								type="button"
								variant="default"
								className="bg-red-400 grow text-gray-600  hover:text-red-500"
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
