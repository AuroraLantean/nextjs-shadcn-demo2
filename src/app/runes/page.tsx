import Activity from "@cards/activity";
import BalancesCard from "@cards/balances";
import FeaturedCard from "@cards/featured";
import RecentBlockActivity from "@cards/recent-block-activity";
import {
	getAddressBalances,
	getApiStatus,
	getBlockActivity,
	getRunesEtchingInfo,
	getYourRunesActivity,
} from "@/lib/hiro-api";
import { ll } from "@/lib/utils";

async function retrieveAllData(userAddress: string) {
	const addressBalances = await getAddressBalances(userAddress);
	//return { response: addressBalances };

	const addressActivityForRune = await getYourRunesActivity(addressBalances);

	const apiStatus = await getApiStatus();

	const { results, totalRunesActivity, mostFrequentRunes } =
		await getBlockActivity(apiStatus.block_height.toString());

	const featuredRunes = await getRunesEtchingInfo(mostFrequentRunes);

	return {
		addressBalances,
		addressActivityForRune,
		apiStatus,
		blockActivity: results,
		totalActivityCount: totalRunesActivity,
		featuredRunes,
	};
}

export default async function Dashboard({
	params,
}: { params: Promise<{ userAddress: string }> }) {
	const userAddress = (await params).userAddress;
	//process.env.NEXT_PUBLIC_BITCOIN_RUNES_ADDR1 || "";
	//found from https://www.oklink.com/btc/token/runes/1-0
	console.log("Dashboard userAddress:", userAddress);
	const {
		addressBalances,
		addressActivityForRune,
		apiStatus,
		blockActivity,
		totalActivityCount,
		featuredRunes,
	} = await retrieveAllData(userAddress);
	//ll("out:", response.length);

	return (
		<div className="flex flex-col sm:flex-row mt-12 sm:mt-0 sm:p-4 h-[968px] items-start justify-center gap-2">
			<div className="flex flex-col flex-1 gap-2">
				<Activity addressActivityForRune={addressActivityForRune} />
				<FeaturedCard featuredRunes={featuredRunes} apiStatus={apiStatus} />
			</div>
			<div className="flex flex-col flex-1 gap-2">
				<BalancesCard addressBalances={addressBalances} />
				<RecentBlockActivity
					blockActivity={blockActivity}
					apiStatus={apiStatus}
					totalActivityCount={totalActivityCount}
				/>
			</div>
		</div>
	);
}
/*  <div className="flex min-h-[600px] flex-col items-center justify-center p-10 gap-10 text-center">
			<img src="/black-runestone.png" alt="black runestone" width="200" />
			<h1 className="text-7xl font-bold">
				Your <span className="text-orange-500">Runes</span> <br /> Your App
			</h1>
			<div className="flex items-center justify-between gap-10 text-left">
				<p>
					Connect your Bitcoin Web3 wallet <br />
					to view your Runes dashboard.
				</p>
				<Button variant="outline">View Dashboard</Button>
			</div>
		</div>
*/