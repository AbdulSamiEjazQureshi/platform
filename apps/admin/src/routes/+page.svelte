<script lang="ts">
	import { Button, Input } from '@platform/ui';
	import { flip } from 'svelte/animate';
	import { Tween } from 'svelte/motion';
	import { fade, slide } from 'svelte/transition';

	// export const snapshot = {
	//   capture: () => scrollY,
	//   restore: (value) => scrollTo(value)
	// }

	let value = $state('');
	let arr = $state(['start', 'the', 'input']);

	let visible = $state(false);

	function add(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			arr.push(value);
			value = '';
		}
	}

	const tween = new Tween(0, {
		delay: 200
	});
</script>

<svelte:head>
	<title>{value}</title>
</svelte:head>

<section class="min-h-[120rem] space-y-6">
	<div>
		<p class="text-sm font-medium text-muted-foreground">Svelte playground</p>
		<h1 class="text-2xl font-bold tracking-tight">Home</h1>
	</div>

	<div class="space-y-4 rounded-xl border border-border bg-muted/40 p-5">
		<div class="flex flex-col gap-3 sm:flex-row">
			<Input bind:value onkeydown={add} placeholder="Add Value" />
			<Button type="button" onclick={() => (visible = !visible)}>Animate</Button>
		</div>

		{#if visible}
			<div in:slide out:fade class="rounded-lg border border-border bg-card p-4 text-sm">
				Slide & Fase
			</div>
		{/if}

		<div class="space-y-2">
			{#each arr as a (a)}
				<div
					animate:flip={{ duration: 300 }}
					class="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm"
				>
					<span>{a}</span>
					<Button
						type="button"
						variant="ghost"
						size="xs"
						onclick={() => (arr = arr.filter((x) => x !== a))}
					>
						x
					</Button>
				</div>
			{/each}
		</div>

		<div class="grid gap-3">
			<Input type="range" bind:value={tween.target} />
			<Input type="range" bind:value={tween.current} disabled />
		</div>

		<div class="grid size-50 place-items-center rounded-xl border border-border bg-card">
			<div class="grid size-25 place-items-center rounded-lg border border-border bg-muted">
				<h2 class="text-lg font-semibold">Hey</h2>
			</div>
		</div>
	</div>
</section>
