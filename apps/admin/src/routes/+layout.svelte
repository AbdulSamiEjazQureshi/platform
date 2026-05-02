<script lang="ts">
	import '../app.css';

	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	const { children } = $props();
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
	<a href={resolve('/superform/client')}>Superform - Client</a>
</nav>

{@render children()}
