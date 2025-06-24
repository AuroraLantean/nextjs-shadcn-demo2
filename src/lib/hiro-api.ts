import {
	type AddressActivityForRune,
	addressActivityForRuneToClient,
	type AddressBalances,
	addressBalancesToClient,
	type ApiStatus,
	type BlockActivity,
	blockActivityToClient,
	type Etching,
} from "@/lib/rune-funcs";
import { mostFrequent } from "@/lib/utils";

// Get address balances /runes/v1/addresses/{address}/balances
// https://docs.hiro.so/bitcoin/runes/api/balances/address
export async function getAddressBalances(address: string) {
	// fetch api end
	// address must be Taproot address
	//https://docs.hiro.so/bitcoin/runes/api/balances/address
	const response = await fetch(
		`https://api.hiro.so/runes/v1/addresses/${address}/balances?offset=0&limit=60`,
		{
			method: "GET",
			cache: "no-store",
		},
	); //fetch("https://api.hiro.so/runes/v1/addresses/{string}/balances?offset=0&limit=1", {method: "GET"});

	const data = await response.json();

	// check if response has results
	if (data.results.length === 0) {
		return [];
	}

	// map through results array to grab Runes symbol and convert to custom AddressBalances type
	const addressBalances: AddressBalances[] = data.results.map(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async (o: any) => {
			const { symbol } = await getRunesEtchingInfo(o.rune.id);
			o.symbol = symbol;
			const finalObject = addressBalancesToClient(o);
			return finalObject;
		},
	);

	// await Promises
	const completedArrayOfObjects = await Promise.all(addressBalances);

	// sort array in descending order by balances
	completedArrayOfObjects.sort(
		(a: AddressBalances, b: AddressBalances) => b.balance - a.balance,
	);

	// return completed array of AddressBalances
	return completedArrayOfObjects;
}

// Get Runes activity for an address /runes/v1/etchings/{etching}/activity/{address}
// https://docs.hiro.so/bitcoin/runes/api/activities/for-address
export async function getYourRunesActivity(data: AddressBalances[]) {
	if (data.length === 0) {
		return [];
	}

	const responses = data.map(async (eachRune) => {
		const id = eachRune.id;
		const address = eachRune.address;
		const symbol = eachRune.symbol;
		const name = eachRune.name;
		const spaced_name = eachRune.spaced_name;

		const response = await fetch(
			`https://api.hiro.so/runes/v1/etchings/${id}/activity/${address}?offset=0&limit=60`,
			{
				method: "GET",
				cache: "no-store",
			},
		);
		const data = await response.json();

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const results: AddressActivityForRune[] = data.results.map((data: any) => {
			const result = addressActivityForRuneToClient(
				data,
				id,
				symbol,
				name,
				spaced_name,
			);
			return result;
		});

		return results;
	});

	const arrayOfArrays = await Promise.all(responses);
	const flattenedArray = arrayOfArrays.flat(1);
	flattenedArray.sort(
		(a: AddressActivityForRune, b: AddressActivityForRune) =>
			b.timestamp - a.timestamp,
	); //most recent activity is sorted first

	return flattenedArray;
}

// Get activity for a block /runes/v1/blocks/{block}/activity
// https://docs.hiro.so/bitcoin/runes/api/activities/for-block
export async function getBlockActivity(block_height: string) {
	const response = await fetch(
		`https://api.hiro.so/runes/v1/blocks/${block_height}/activity?offset=0&limit=60`,
		{
			method: "GET",
			cache: "no-store",
		},
	);
	const data = await response.json();
	const totalRunesActivity: number = data.total;

	const results: BlockActivity[] = data.results.map(blockActivityToClient);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const mostFrequentRunes = mostFrequent(results, (p: { id: any }) => p.id);

	return { results, totalRunesActivity, mostFrequentRunes };
}

// Get API Status /runes/v1
// https://docs.hiro.so/bitcoin/runes/api/info/status
export async function getApiStatus() {
	const response = await fetch("https://api.hiro.so/runes/v1/", {
		method: "GET",
		cache: "no-store",
	});
	const data = await response.json();
	const api_status: ApiStatus = data;

	return api_status;
}

// Get etching /runes/v1/etchings/{etching}
// https://docs.hiro.so/bitcoin/runes/api/etchings/get-etching
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getRunesEtchingInfo(id: any): Promise<Etching> {
	const response = await fetch(`https://api.hiro.so/runes/v1/etchings/${id}`, {
		method: "GET",
		cache: "no-store",
	});
	const data = await response.json();
	return data;
}
