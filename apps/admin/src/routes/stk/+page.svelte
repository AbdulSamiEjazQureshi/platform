<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '@platform/ui';
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
			<p class="text-sm font-medium text-muted-foreground">TanStack Query</p>
			<h1 class="text-2xl font-bold tracking-tight">Users</h1>
		</div>

		{#if query.data}
			<p class="rounded-lg border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
				{query.data.total} total users
			</p>
		{/if}
	</div>

	{#if query.isLoading}
		<div
			in:slide
			out:fade
			class="rounded-xl border border-border bg-muted/40 p-6 text-muted-foreground"
		>
			<div class="flex items-center gap-3">
				<div class="size-5 animate-spin rounded-full border-2 border-muted border-t-primary"></div>
				<p class="font-medium">Loading users...</p>
			</div>
		</div>
	{:else if query.isError}
		<div class="rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-destructive">
			<p class="font-semibold">Something went wrong</p>
			<p class="mt-1 text-sm">{query.error.message}</p>
		</div>
	{:else if query.data}
		<div class="flex flex-wrap items-center gap-2">
			<Button
				type="button"
				onclick={() => query.refetch()}
				disabled={query.isFetching}
			>
				{query.isFetching ? 'Refetching...' : 'Refetch'}
			</Button>

			<Button
				type="button"
				variant="outline"
				onclick={invalidateQuery}
				disabled={query.isFetching}
			>
				Invalidate Query
			</Button>
		</div>

		{#if query.isFetching}
			<p in:fade class="text-sm text-muted-foreground">Refreshing data...</p>
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
			class="group rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40"
		>
			<div class="flex items-start gap-4">
				<div
					class="grid size-12 shrink-0 place-items-center rounded-lg bg-primary text-base font-black text-primary-foreground"
				>
					{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
				</div>

				<div class="min-w-0 flex-1">
					<h2 class="truncate text-base font-semibold">
						{user.firstName}
						{user.lastName}
					</h2>

					<p class="mt-1 truncate text-sm text-muted-foreground">
						{user.email}
					</p>

					<div class="mt-4 flex items-center gap-2">
						<span
							class="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
						>
							ID #{user.id}
						</span>

						<span
							class="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
						>
							{user.age} years
						</span>
					</div>
				</div>
			</div>
		</article>
	</a>
{/snippet}
