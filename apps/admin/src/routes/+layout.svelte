<script lang="ts">
	import '../app.css';

	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { Moon, Sun } from '@lucide/svelte';
	import { Button } from '@platform/ui';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { type Pathname } from '$app/types';
	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';

	const { children, data } = $props();

	const links: Array<{ href: Pathname; label: string; replaceState?: boolean }> = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/login', label: 'Login', replaceState: true },
		{ href: '/csr', label: 'CSR' },
		{ href: '/ssr', label: 'SSR' },
		{ href: '/prerender', label: 'Pre-render' },
		{ href: '/superform/client', label: 'Superform Client' },
		{ href: '/stk', label: 'Tanstack Query' },
		{ href: '/shadcn', label: 'Shadcn' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<ModeWatcher />

	<div class="min-h-screen bg-background text-foreground">
		<header class="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
			<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
				<a
					href={resolve('/')}
					class="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
					aria-label="Go home"
				>
					<div
						class="grid size-9 place-items-center rounded-lg bg-primary text-sm font-black text-primary-foreground shadow-sm"
					>
						S
					</div>

					<div class="leading-tight">
						<p class="text-sm font-semibold tracking-tight">SvelteKit</p>
						<p class="text-xs text-muted-foreground">Playground</p>
					</div>
				</a>

				<nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
					{#each links as link (link.href)}
						<Button
							href={resolve(link.href)}
							variant="ghost"
							size="sm"
							data-sveltekit-noscroll
							data-sveltekit-replacestate={link.replaceState ? true : undefined}
						>
							{link.label}
						</Button>
					{/each}

					<Button
						variant="ghost"
						size="icon-sm"
						onclick={toggleMode}
						aria-label={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
						title={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
					>
						{#if mode.current === 'dark'}
							<Sun />
						{:else}
							<Moon />
						{/if}
					</Button>
				</nav>
			</div>

			<nav
				class="scrollbar-none flex gap-2 overflow-x-auto border-t border-border px-4 py-3 md:hidden"
				aria-label="Mobile navigation"
			>
				<Button
					variant="outline"
					size="icon-sm"
					onclick={toggleMode}
					aria-label={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
					title={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
					class="shrink-0"
				>
					{#if mode.current === 'dark'}
						<Sun />
					{:else}
						<Moon />
					{/if}
				</Button>

				{#each links as link (link.href)}
					<Button
						href={resolve(link.href)}
						variant="outline"
						size="sm"
						data-sveltekit-noscroll
						data-sveltekit-replacestate={link.replaceState ? true : undefined}
						class="shrink-0"
					>
						{link.label}
					</Button>
				{/each}
			</nav>
		</header>

		<main class="mx-auto w-full max-w-6xl px-4 py-8">
			<div class="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
				{@render children()}
			</div>
		</main>
	</div>
</QueryClientProvider>
