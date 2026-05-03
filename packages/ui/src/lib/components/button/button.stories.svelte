<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import SearchIcon from '@lucide/svelte/icons/search';

	import Button , { type ButtonSize, type ButtonVariant } from './button.svelte';

	const variants: ButtonVariant[] = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'];
	const sizes: ButtonSize[] = ['xs', 'sm', 'default', 'lg'];
	const iconSizes: ButtonSize[] = ['icon-xs', 'icon-sm', 'icon', 'icon-lg'];

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		argTypes: {
			variant: { control: 'select', options: variants },
			size: { control: 'select', options: [...sizes, ...iconSizes] },
			disabled: { control: 'boolean' }
		},
		args: {
			variant: 'default',
			size: 'default',
			disabled: false
		}
	});
</script>

<Story name="Playground">
	{#snippet template(args)}
		<Button {...args}>Button</Button>
	{/snippet}
</Story>

<Story name="Variants" asChild>
	<div class="grid min-w-96 gap-4">
		<div class="flex flex-wrap items-center gap-3">
			{#each variants as variant (variant)}
				<Button {variant}>{variant}</Button>
			{/each}
		</div>
		<div class="dark rounded-lg bg-background p-4 text-foreground">
			<div class="flex flex-wrap items-center gap-3">
				{#each variants as variant (variant)}
					<Button {variant}>{variant}</Button>
				{/each}
			</div>
		</div>
	</div>
</Story>

<Story name="Sizes" asChild>
	<div class="flex flex-wrap items-center gap-3">
		{#each sizes as size (size)}
			<Button {size}>{size}</Button>
		{/each}
		{#each iconSizes as size (size)}
			<Button {size} aria-label={size}>
				<SearchIcon />
			</Button>
		{/each}
	</div>
</Story>

<Story name="States" asChild>
	<div class="flex flex-wrap items-center gap-3">
		<Button disabled>Disabled</Button>
		<Button variant="outline">
			<SearchIcon data-icon="inline-start" />
			Search
		</Button>
		<Button>
			Continue
			<ArrowRightIcon data-icon="inline-end" />
		</Button>
		<Button href="https://example.com" variant="link">Anchor button</Button>
	</div>
</Story>
