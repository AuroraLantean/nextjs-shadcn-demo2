//import { AppConfig, UserSession } from "@stacks/connect";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const ll = console.log;

// const appConfig = new AppConfig(["store_write", "publish_data"]);
// export const userSession = new UserSession({ appConfig }); // initiate the userSession object just once in your app, then reference it using imports where needed.
