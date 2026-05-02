<script lang="ts">
	import { resolve } from '$app/paths';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { fade, slide } from 'svelte/transition';

	const queryClient = useQueryClient();

	type User = {
		id: number;
		firstName: string;
		lastName: string;
		age: number;
		email: string;
	};

	type UserResponse = {
		users: Array<User>;
		total: number;
		skip: number;
		limit: number;
	};

	const query = createQuery(() => ({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await fetch('https://dummyjson.com/users');

			if (!response.ok) {
				throw new Error(`Failed to fetch users: ${response.status}`);
			}

			const users: UserResponse = await response.json();
			return users;
		}
	}));

	async function invalidateQuery() {
		await queryClient.invalidateQueries({
			queryKey: ['users']
		});
	}
</script>

<section class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-sm font-medium text-zinc-400">TanStack Query</p>
			<h1 class="text-2xl font-bold tracking-tight text-white">Users</h1>
		</div>

		{#if query.data}
			<p class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">
				{query.data.total} total users
			</p>
		{/if}
	</div>

	{#if query.isLoading}
		<div
			in:slide
			out:fade
			class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-zinc-300"
		>
			<div class="flex items-center gap-3">
				<div class="size-5 animate-spin rounded-full border-2 border-zinc-600 border-t-white"></div>
				<p class="font-medium">Loading users...</p>
			</div>
		</div>
	{:else if query.isError}
		<div class="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
			<p class="font-semibold">Something went wrong</p>
			<p class="mt-1 text-sm text-red-200/80">{query.error.message}</p>
		</div>
	{:else if query.data}
		<div class="flex flex-wrap items-center gap-2">
			<button
				type="button"
				onclick={() => query.refetch()}
				disabled={query.isFetching}
				class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{query.isFetching ? 'Refetching...' : 'Refetch'}
			</button>

			<button
				type="button"
				onclick={invalidateQuery}
				disabled={query.isFetching}
				class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
			>
				Invalidate Query
			</button>
		</div>

		{#if query.isFetching}
			<p in:fade class="text-sm text-zinc-400">Refreshing data...</p>
		{/if}

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each query.data.users as user (user.id)}
				{@render userCard(user)}
			{/each}
		</div>
	{/if}
</section>

{#snippet userCard(user: User)}
	<a
		href={resolve('/stk/[id]', {
			id: user.id.toString()
		})}
	>
		<article
			in:fade
			class="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
		>
			<div class="flex items-start gap-4">
				<div
					class="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-base font-black text-zinc-950"
				>
					{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
				</div>

				<div class="min-w-0 flex-1">
					<h2 class="truncate text-base font-semibold text-white">
						{user.firstName}
						{user.lastName}
					</h2>

					<p class="mt-1 truncate text-sm text-zinc-400">
						{user.email}
					</p>

					<div class="mt-4 flex items-center gap-2">
						<span
							class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
						>
							ID #{user.id}
						</span>

						<span
							class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
						>
							{user.age} years
						</span>
					</div>
				</div>
			</div>
		</article>
	</a>
{/snippet}
