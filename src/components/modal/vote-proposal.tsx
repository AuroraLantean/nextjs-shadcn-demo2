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
import { ll } from "@/lib/utils";
import type { ProposalOutput } from "@/types/sui-types";

type Props = {
	isModalOpen: boolean;
	setModalState: (arg: boolean) => void;
	proposal: ProposalOutput;
	onVote: (votedYes: boolean) => void;
};
export const VoteProposal: React.FC<Props> = ({
	isModalOpen,
	setModalState,
	proposal,
	onVote,
}) => {
	const handleClick = (arg: number) => {
		ll(`handleClick${arg}`);
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
					<div className="flex justify-stretch gap-4">
						<Button
							type="button"
							variant="default"
							className="bg-green-400 grow text-gray-600 hover:text-green-300"
							onClick={() => handleClick(1)}
						>
							Yes
						</Button>
						<Button
							type="button"
							variant="default"
							className="bg-red-400 grow text-gray-600  hover:text-red-500"
							onClick={() => handleClick(0)}
						>
							No
						</Button>
					</div>
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
