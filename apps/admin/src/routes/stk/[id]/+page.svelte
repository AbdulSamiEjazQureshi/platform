<script lang="ts">
	import { resolve } from '$app/paths';
	import type { User } from '$lib/types.js';
	import { Button } from '@platform/ui';
	import { createQuery } from '@tanstack/svelte-query';
	import { fade, fly } from 'svelte/transition';

	const { params, data } = $props();

	const query = createQuery(() => ({
		queryKey: ['users', params.id],
		queryFn: async () => {
			const response = await fetch(`https://dummyjson.com/users/${params.id}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch user: ${response.status}`);
			}

			const user: User = await response.json();
			return user;
		},
		staleTime: 30_000,
		initialData: data.user as User
	}));
</script>

<section class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-sm font-medium text-muted-foreground">User Details</p>
			<h1 class="text-2xl font-bold tracking-tight">Profile</h1>
		</div>

		<Button
			href={resolve('/stk')}
			variant="outline"
			class="w-fit"
		>
			Back to users
		</Button>
	</div>

	{#if query.isLoading}
		<div
			in:fade
			class="rounded-xl border border-border bg-card p-6 shadow-sm"
		>
			<div class="flex items-center gap-4">
				<div class="size-16 animate-pulse rounded-lg bg-muted"></div>

				<div class="flex-1 space-y-3">
					<div class="h-4 w-40 animate-pulse rounded-full bg-muted"></div>
					<div class="h-3 w-64 max-w-full animate-pulse rounded-full bg-muted"></div>
					<div class="h-3 w-32 animate-pulse rounded-full bg-muted"></div>
				</div>
			</div>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				<div class="h-24 animate-pulse rounded-lg bg-muted"></div>
				<div class="h-24 animate-pulse rounded-lg bg-muted"></div>
				<div class="h-24 animate-pulse rounded-lg bg-muted"></div>
				<div class="h-24 animate-pulse rounded-lg bg-muted"></div>
			</div>
		</div>
	{:else if query.isError}
		<div
			in:fly={{ y: 8, duration: 180 }}
			class="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-destructive shadow-sm"
		>
			<p class="text-lg font-semibold">Could not load user</p>
			<p class="mt-1 text-sm">{query.error.message}</p>

			<Button
				type="button"
				variant="destructive"
				onclick={() => query.refetch()}
				class="mt-5"
			>
				Try again
			</Button>
		</div>
	{:else if query.data}
		{@const user = query.data}

		<article
			in:fly={{ y: 10, duration: 220 }}
			class="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm"
		>
			<div class="border-b border-border bg-muted/40 p-6">
				<div class="flex flex-col gap-6 sm:flex-row sm:items-center">
					<div
						class="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-primary text-3xl font-black text-primary-foreground shadow-sm"
					>
						{#if user.image}
							<img
								src={user.image}
								alt={`${user.firstName} ${user.lastName}`}
								class="size-full object-cover"
							/>
						{:else}
							{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
						{/if}
					</div>

					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<h2 class="text-2xl font-bold tracking-tight">
								{user.firstName}
								{user.lastName}
							</h2>

							<span
								class="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
							>
								ID #{user.id}
							</span>
						</div>

						<p class="mt-2 truncate text-muted-foreground">{user.email}</p>

						<div class="mt-4 flex flex-wrap gap-2">
							<span
								class="rounded-lg border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
							>
								{user.age} years old
							</span>

							{#if user.username}
								<span
									class="rounded-lg border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
								>
									@{user.username}
								</span>
							{/if}

							{#if user.birthDate}
								<span
									class="rounded-lg border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
								>
									Born {user.birthDate}
								</span>
							{/if}
						</div>
					</div>

					<Button
						type="button"
						onclick={() => query.refetch()}
						disabled={query.isFetching}
					>
						{query.isFetching ? 'Refreshing...' : 'Refresh'}
					</Button>
				</div>
			</div>

			<div class="grid gap-4 p-6 sm:grid-cols-2">
				{@render infoCard('Email', user.email)}
				{@render infoCard('Phone', user.phone ?? 'Not provided')}
				{@render infoCard('Company', user.company?.name ?? 'Not provided')}
				{@render infoCard('Role', user.company?.title ?? 'Not provided')}

				<div class="rounded-xl border border-border bg-muted/40 p-5 sm:col-span-2">
					<p class="text-sm font-medium text-muted-foreground">Address</p>

					<p class="mt-2 text-sm leading-6">
						{[user.address?.address, user.address?.city, user.address?.state, user.address?.country]
							.filter(Boolean)
							.join(', ') || 'Not provided'}
					</p>
				</div>
			</div>
		</article>
	{/if}
</section>

{#snippet infoCard(label: string, value: string)}
	<div class="rounded-xl border border-border bg-muted/40 p-5">
		<p class="text-sm font-medium text-muted-foreground">{label}</p>
		<p class="mt-2 truncate text-sm font-semibold">{value}</p>
	</div>
{/snippet}
