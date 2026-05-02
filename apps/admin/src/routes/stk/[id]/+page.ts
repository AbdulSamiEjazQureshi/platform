import { UserService } from '$lib/services/user.service.js';

export async function load({ params, parent }) {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['users', params.id],
		queryFn: () => UserService.getUserById(parseInt(params.id)),
		staleTime: 30_000
	});

	return {
		user: queryClient.getQueryData(['users', params.id])
	};
}
