import {
	type AddressBalances,
	addressBalancesToClient,
	type Etching,
} from "@/types";

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
export async function getYourRunesActivity(data: AddressBalances[]) {
	return null;
}

// Get activity for a block /runes/v1/blocks/{block}/activity
export async function getBlockActivity(block_height: string) {
	return null;
}

// Get API Status /runes/v1
export async function getApiStatus() {
	return null;
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
