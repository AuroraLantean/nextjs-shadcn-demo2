import Activity from "@/components/cards/activity";
import BalancesCard from "@/components/cards/balances";
import FeaturedCard from "@/components/cards/featured";
import RecentBlockActivity from "@/components/cards/recent-block-activity";
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

export default async function Dashboard() {
	const userAddress =
		"bc1p768t5v00693p6mtdrqhelqxhuecme27wqme4w5n5fnmhy8vg7pcsgrtnwy"; //found from https://www.oklink.com/btc/token/runes/1-0
	//const userAddress =	("bc1pwsssl9jrvazgew6rdw8lxu3ghk4tmmmhnffht86mlkev42k4r0cs9jqk0g");
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
