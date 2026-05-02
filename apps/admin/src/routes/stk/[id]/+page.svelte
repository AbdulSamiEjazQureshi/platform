<script lang="ts">
	import { resolve } from '$app/paths';
	import type { User } from '$lib/types.js';
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
			<p class="text-sm font-medium text-zinc-400">User Details</p>
			<h1 class="text-2xl font-bold tracking-tight text-white">Profile</h1>
		</div>

		<a
			href={resolve('/stk')}
			class="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
		>
			Back to users
		</a>
	</div>

	{#if query.isLoading}
		<div
			in:fade
			class="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
		>
			<div class="flex items-center gap-4">
				<div class="size-16 animate-pulse rounded-2xl bg-white/10"></div>

				<div class="flex-1 space-y-3">
					<div class="h-4 w-40 animate-pulse rounded-full bg-white/10"></div>
					<div class="h-3 w-64 max-w-full animate-pulse rounded-full bg-white/10"></div>
					<div class="h-3 w-32 animate-pulse rounded-full bg-white/10"></div>
				</div>
			</div>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				<div class="h-24 animate-pulse rounded-2xl bg-white/10"></div>
				<div class="h-24 animate-pulse rounded-2xl bg-white/10"></div>
				<div class="h-24 animate-pulse rounded-2xl bg-white/10"></div>
				<div class="h-24 animate-pulse rounded-2xl bg-white/10"></div>
			</div>
		</div>
	{:else if query.isError}
		<div
			in:fly={{ y: 8, duration: 180 }}
			class="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-100 shadow-xl shadow-black/20"
		>
			<p class="text-lg font-semibold">Could not load user</p>
			<p class="mt-1 text-sm text-red-100/80">{query.error.message}</p>

			<button
				type="button"
				onclick={() => query.refetch()}
				class="mt-5 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-950 transition hover:bg-white"
			>
				Try again
			</button>
		</div>
	{:else if query.data}
		{@const user = query.data}

		<article
			in:fly={{ y: 10, duration: 220 }}
			class="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30"
		>
			<div class="border-b border-white/10 bg-white/[0.04] p-6">
				<div class="flex flex-col gap-6 sm:flex-row sm:items-center">
					<div
						class="grid size-24 shrink-0 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-white text-3xl font-black text-zinc-950 shadow-xl shadow-black/20"
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
							<h2 class="text-2xl font-bold tracking-tight text-white">
								{user.firstName}
								{user.lastName}
							</h2>

							<span
								class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
							>
								ID #{user.id}
							</span>
						</div>

						<p class="mt-2 truncate text-zinc-400">{user.email}</p>

						<div class="mt-4 flex flex-wrap gap-2">
							<span
								class="rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1 text-sm text-zinc-300"
							>
								{user.age} years old
							</span>

							{#if user.username}
								<span
									class="rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1 text-sm text-zinc-300"
								>
									@{user.username}
								</span>
							{/if}

							{#if user.birthDate}
								<span
									class="rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1 text-sm text-zinc-300"
								>
									Born {user.birthDate}
								</span>
							{/if}
						</div>
					</div>

					<button
						type="button"
						onclick={() => query.refetch()}
						disabled={query.isFetching}
						class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{query.isFetching ? 'Refreshing...' : 'Refresh'}
					</button>
				</div>
			</div>

			<div class="grid gap-4 p-6 sm:grid-cols-2">
				{@render infoCard('Email', user.email)}
				{@render infoCard('Phone', user.phone ?? 'Not provided')}
				{@render infoCard('Company', user.company?.name ?? 'Not provided')}
				{@render infoCard('Role', user.company?.title ?? 'Not provided')}

				<div class="rounded-2xl border border-white/10 bg-zinc-950/40 p-5 sm:col-span-2">
					<p class="text-sm font-medium text-zinc-400">Address</p>

					<p class="mt-2 text-sm leading-6 text-zinc-200">
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
	<div class="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
		<p class="text-sm font-medium text-zinc-400">{label}</p>
		<p class="mt-2 truncate text-sm font-semibold text-zinc-100">{value}</p>
	</div>
{/snippet}
