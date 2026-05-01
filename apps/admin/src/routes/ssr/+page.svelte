<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<pre>{JSON.stringify(data)}</pre>

<button type="button" onclick={() => invalidate(resolve('/ssr'))}>Invalidate Route</button>
