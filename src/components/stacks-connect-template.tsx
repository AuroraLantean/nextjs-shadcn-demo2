"use client";
//https://github.com/hirosystems/stacks.js-starters
import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

const userSession = new UserSession({ appConfig });

function authenticate() {
	showConnect({
		appDetails: {
			name: "Stacks Next.js Starter",
			icon: "/HiroIcon-Rounded-Orange.png",
		},
		redirectTo: "/",
		onFinish: () => {
			window.location.reload();
		},
		userSession,
	});
}

function disconnect() {
	userSession.signUserOut("/");
}

const StacksConnectTemplate = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (mounted && userSession.isUserSignedIn()) {
		return (
			<div className="Container">
				<button className="Connect" type="button" onClick={disconnect}>
					Disconnect Wallet
				</button>
				<p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
				<p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
			</div>
		);
	}

	return (
		<button className="Connect" type="button" onClick={authenticate}>
			Connect Wallet
		</button>
	);
};

export default StacksConnectTemplate;
