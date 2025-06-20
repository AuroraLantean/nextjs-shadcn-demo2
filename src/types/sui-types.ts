export type SuiID = {
	id: string;
};
//From Move Language
export type ProposalInput = {
	id: SuiID;
	title: string;
	description: string;
	voted_yes_count: string;
	voted_no_count: string;
	expiration: string;
	creator: string;
	voter_registry: string[];
};
export type ProposalOutput = {
	id: SuiID;
	title: string;
	description: string;
	votedYesCount: number;
	votedNoCount: number;
	expiration: number;
	creator: string;
	voter_registry: string[];
};
