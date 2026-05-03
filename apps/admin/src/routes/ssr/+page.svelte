<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '@platform/ui';

	const { data } = $props();
</script>

<section class="space-y-4">
	<div>
		<p class="text-sm font-medium text-muted-foreground">Server-side load</p>
		<h1 class="text-2xl font-bold tracking-tight">SSR</h1>
	</div>

	<pre class="overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-sm text-foreground">{JSON.stringify(data, null, 2)}</pre>

	<Button type="button" onclick={() => invalidate(resolve('/ssr'))}>Invalidate Route</Button>
</section>
