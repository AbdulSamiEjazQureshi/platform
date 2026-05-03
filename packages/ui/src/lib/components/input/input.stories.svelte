<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Input from './input.svelte';

	const { Story } = defineMeta({
		title: 'Components/Input',
		component: Input,
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'email', 'password', 'search', 'number', 'file']
			},
			disabled: { control: 'boolean' },
			placeholder: { control: 'text' }
		},
		args: {
			type: 'text',
			placeholder: 'Enter value',
			disabled: false
		}
	});
</script>

<Story name="Playground" />

<Story name="Types" asChild>
	<div class="grid w-80 gap-3">
		<Input placeholder="Text" />
		<Input type="email" placeholder="Email" />
		<Input type="password" placeholder="Password" />
		<Input type="search" placeholder="Search" />
		<Input type="file" />
	</div>
</Story>

<Story name="States" asChild>
	<div class="grid w-80 gap-3">
		<Input placeholder="Default" />
		<Input placeholder="Disabled" disabled />
		<Input placeholder="Invalid" aria-invalid="true" />
	</div>
</Story>

<Story name="Dark" asChild>
	<div class="dark w-96 rounded-lg bg-background p-4 text-foreground">
		<div class="grid gap-3">
			<Input placeholder="Default" />
			<Input placeholder="Invalid" aria-invalid="true" />
		</div>
	</div>
</Story>
