<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';

	const { data } = $props();

	function invalidateLoad() {
		invalidate(resolve('/csr'));
	}
</script>

<pre>{JSON.stringify(data)}</pre>

<button type="button" onclick={invalidateLoad}>Invalidate load</button>
