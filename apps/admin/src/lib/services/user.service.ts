import type { User } from '$lib/types';

export const UserService = {
	getUserById: async (id: number): Promise<User> => {
		const response = await fetch(`https://dummyjson.com/users/${id}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		const user = await response.json();
		return user;
	}
};
