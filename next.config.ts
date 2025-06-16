import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		staleTimes: {
			dynamic: 30,
			static: 180,
		},
	},
};

export default nextConfig;
