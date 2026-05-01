<script lang="ts">
	import '../app.css';

	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { Input } from '@platform/ui';

	const { children } = $props();

	let value = $state('');

	let value2 = $state('');

	const title = $derived.by(() => value + '-' + value2);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve('/dashboard')} data-sveltekit-noscroll>Dashboard</a>
	<a href={resolve('/login')} data-sveltekit-replacestate>Login</a>
	<a href={resolve('/csr')}>CSR</a>
	<a href={resolve('/ssr')}>SSR</a>
	<a href={resolve('/prerender')}>PRE-Render</a>
</nav>

{@render children()}

<h1 class="text-5xl text-brand-600">{title}</h1>

<input
	type="text"
	class="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-800 transition duration-150 ease-in-out focus:bg-gray-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
/>

<Input bind:value placeholder="Value One" />
<Input bind:value={value2} placeholder="Value Two" />
