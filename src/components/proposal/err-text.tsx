type TextProps = {
	text: string;
	isError?: boolean;
	centered?: boolean;
};
export const ErrText: React.FC<TextProps> = ({ text, isError, centered }) => {
	const textClassname = isError ? "text-red-500" : "text-gray-500";

	const centeredClassname = centered ? "text-center" : "";

	return <div className={`${centeredClassname} ${textClassname}`}>{text}</div>;
};
