import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

export async function load() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				enabled: browser
			}
		}
	});

	return {
		queryClient
	};
}
