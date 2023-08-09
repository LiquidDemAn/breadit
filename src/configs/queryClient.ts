import { QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retryOnMount: false
        }
    },
});
