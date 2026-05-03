<script lang="ts">
	const { data } = $props();
</script>

<section class="space-y-4">
	<div>
		<p class="text-sm font-medium text-muted-foreground">Static data</p>
		<h1 class="text-2xl font-bold tracking-tight">Pre-render</h1>
	</div>

	<pre class="overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-sm text-foreground">{data.pre}</pre>
</section>
