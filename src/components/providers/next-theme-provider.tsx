"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemeProvider = ({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
export default NextThemeProvider;
