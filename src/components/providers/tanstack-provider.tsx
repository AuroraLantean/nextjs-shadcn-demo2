"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient()); //different from the docs as it is better to track query keys in NextJs

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
	//<ReactQueryDevtools initialIsOpen={false} />
};

export default TanstackProvider;
