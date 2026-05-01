<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type InputProps = Omit<HTMLInputAttributes, 'type'> & {
		value: string;
	};

	let { value = $bindable(), ...restProps }: InputProps = $props();
</script>

<input
	type="text"
	class="mb-4 rounded-md border-0 bg-gray-100 p-2 text-brand-600 transition duration-150 ease-in-out focus:bg-gray-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
	{...restProps}
	bind:value
/>
