import type { SuiObjectResponse } from "@mysten/sui/client";

type SuiObjectProps = {
	objectRes: SuiObjectResponse;
};

export const SuiObject: React.FC<SuiObjectProps> = ({ objectRes }) => {
	const owner = objectRes.data?.owner;
	const objectDataType = objectRes.data?.type;
	const isCoin = objectDataType?.includes("0x2::coin::Coin");
	const balance = isCoin
		? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(objectRes.data?.content as any).fields?.balance
		: -1;

	return (
		<div
			key={objectRes.data?.objectId}
			className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
		>
			<p className="break-words">
				<strong>ID:</strong> {objectRes.data?.objectId}
			</p>

			<p className="break-words">
				<strong>Type:</strong> {objectDataType}
			</p>

			<p className="break-words">
				<strong>Owner:</strong>{" "}
				{typeof owner === "object" && owner !== null && "AddressOwner" in owner
					? owner.AddressOwner
					: "Unknown"}
			</p>

			{isCoin && (
				<p className="text-blue-400">
					<strong>Balance:</strong> {balance}
				</p>
			)}
		</div>
	);
};
