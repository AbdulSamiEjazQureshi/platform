<script lang="ts">
	import '../app.css';

	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { type Pathname } from '$app/types';

	const { children, data } = $props();

	const links: Array<{ href: Pathname; label: string; replaceState?: boolean }> = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/login', label: 'Login', replaceState: true },
		{ href: '/csr', label: 'CSR' },
		{ href: '/ssr', label: 'SSR' },
		{ href: '/prerender', label: 'Pre-render' },
		{ href: '/superform/client', label: 'Superform Client' },
		{ href: '/stk', label: 'Tanstack Query' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<div class="min-h-screen bg-zinc-950 text-zinc-100">
		<header class="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
			<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
				<a
					href={resolve('/')}
					class="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white/5"
					aria-label="Go home"
				>
					<div
						class="grid size-9 place-items-center rounded-xl bg-white text-sm font-black text-zinc-950 shadow-lg shadow-white/10"
					>
						S
					</div>

					<div class="leading-tight">
						<p class="text-sm font-semibold tracking-tight">SvelteKit</p>
						<p class="text-xs text-zinc-400">Playground</p>
					</div>
				</a>

				<nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
					{#each links as link (link.href)}
						<a
							href={resolve(link.href)}
							data-sveltekit-noscroll
							data-sveltekit-replacestate={link.replaceState ? true : undefined}
							class="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>

			<nav
				class="scrollbar-none flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 md:hidden"
				aria-label="Mobile navigation"
			>
				{#each links as link (link.href)}
					<a
						href={resolve(link.href)}
						data-sveltekit-noscroll
						data-sveltekit-replacestate={link.replaceState ? true : undefined}
						class="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</header>

		<main class="mx-auto w-full max-w-6xl px-4 py-8">
			<div class="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/30">
				{@render children()}
			</div>
		</main>
	</div>
</QueryClientProvider>
