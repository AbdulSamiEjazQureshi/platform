<script lang="ts">
	import { clickoutside, Input } from '@platform/ui';
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

<div style="min-height: 2000px;">
	<Input bind:value onkeydown={add} placeholder="Add Value" />

	<button type="button" onclick={() => (visible = !visible)}>Animate</button>

	{#if visible}
		<div in:slide out:fade>Slide & Fase</div>
	{/if}
	{#each arr as a (a)}
		<div animate:flip={{ duration: 300 }}>
			{a}
			<button onclick={() => (arr = arr.filter((x) => x !== a))}>x</button>
		</div>
	{/each}

	<input type="range" bind:value={tween.target} />
	<input type="range" bind:value={tween.current} disabled />

	<div style="width: 200px;height: 200px;">
		<div style="width: 100px;height: 100px;">
			<h1 use:clickoutside={() => console.log('Hey not clicked')}>Hey</h1>
		</div>
	</div>
</div>
