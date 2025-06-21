//import { AppConfig, UserSession } from "@stacks/connect";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const ll = console.log;

export const formatUnixTime = (timestampSec: number) => {
	if (isUnixTimeExpired(timestampSec)) {
		return "Expired";
	}
	return new Date(timestampSec * 1000).toLocaleString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};
export const isUnixTimeExpired = (unixTimeSec: number) =>
	new Date(unixTimeSec * 1000) < new Date();

export const mostFrequent = <T, K extends PropertyKey>(
	arr: T[],
	mapFn: (x: T) => K = (x) => x as unknown as K,
): K | null => {
	const frequencyMap = arr.reduce<Record<PropertyKey, number>>(
		(a, v) => {
			const k = mapFn(v);
			a[k] = (a[k] ?? 0) + 1;
			return a;
		},
		{} as Record<PropertyKey, number>,
	);

	return Object.entries(frequencyMap).reduce<[K | null, number]>(
		(a, [k, v]) => (v >= a[1] ? [k as K, v] : a),
		[null, 0],
	)[0];
};

// const appConfig = new AppConfig(["store_write", "publish_data"]);
// export const userSession = new UserSession({ appConfig }); // initiate the userSession object just once in your app, then reference it using imports where needed.
