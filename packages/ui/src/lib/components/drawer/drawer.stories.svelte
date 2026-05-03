<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { Button } from '../button/index.js';
	import {
		Drawer,
		DrawerClose,
		DrawerContent,
		DrawerDescription,
		DrawerFooter,
		DrawerHeader,
		DrawerNestedRoot,
		DrawerTitle,
		DrawerTrigger
	} from './index.js';

	const directions = ['top', 'right', 'bottom', 'left'] as const;

	const { Story } = defineMeta({
		title: 'Components/Drawer',
		component: Drawer,
		parameters: {
			layout: 'centered'
		}
	});
</script>

<script lang="ts">
	let controlledOpen = $state(false);
</script>

<Story name="Default" asChild>
	<Drawer>
		<DrawerTrigger>
			{#snippet child({ props })}
				<Button {...props}>Open drawer</Button>
			{/snippet}
		</DrawerTrigger>
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Project settings</DrawerTitle>
				<DrawerDescription>Update drawer content and close it from the footer.</DrawerDescription>
			</DrawerHeader>
			<div class="grid gap-3 px-4 pb-2 text-sm text-muted-foreground">
				<div class="rounded-lg border border-border bg-muted/40 p-3">
					Drawers are useful for contextual tasks that should not replace the current page.
				</div>
				<div class="grid grid-cols-2 gap-2">
					<div class="rounded-lg border border-border p-3">Members</div>
					<div class="rounded-lg border border-border p-3">Permissions</div>
				</div>
			</div>
			<DrawerFooter>
				<Button>Save changes</Button>
				<DrawerClose>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Cancel</Button>
					{/snippet}
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</Story>

<Story name="Directions" asChild>
	<div class="flex flex-wrap items-center justify-center gap-3">
		{#each directions as direction (direction)}
			<Drawer {direction}>
				<DrawerTrigger>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>{direction}</Button>
					{/snippet}
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{direction} drawer</DrawerTitle>
						<DrawerDescription>This drawer opens from the {direction} edge.</DrawerDescription>
					</DrawerHeader>
					<div class="px-4 pb-2 text-sm text-muted-foreground">
						The same component supports each direction through the primitive props.
					</div>
					<DrawerFooter>
						<DrawerClose>
							{#snippet child({ props })}
								<Button {...props}>Close</Button>
							{/snippet}
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		{/each}
	</div>
</Story>

<Story name="Nested" asChild>
	<Drawer>
		<DrawerTrigger>
			{#snippet child({ props })}
				<Button {...props}>Open parent drawer</Button>
			{/snippet}
		</DrawerTrigger>
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Parent drawer</DrawerTitle>
				<DrawerDescription>Open another drawer from this drawer.</DrawerDescription>
			</DrawerHeader>
			<DrawerFooter>
				<DrawerNestedRoot>
					<DrawerTrigger>
						{#snippet child({ props })}
							<Button {...props}>Open nested drawer</Button>
						{/snippet}
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Nested drawer</DrawerTitle>
							<DrawerDescription>This drawer is nested inside the parent drawer.</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<DrawerClose>
								{#snippet child({ props })}
									<Button {...props}>Close nested drawer</Button>
								{/snippet}
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</DrawerNestedRoot>
				<DrawerClose>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Close parent</Button>
					{/snippet}
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</Story>

<Story name="Controlled" asChild>
	<div class="flex flex-col items-center gap-3">
		<Button onclick={() => (controlledOpen = true)}>Open controlled drawer</Button>
		<p class="text-sm text-muted-foreground">Open: {controlledOpen ? 'true' : 'false'}</p>
	</div>

	<Drawer bind:open={controlledOpen}>
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Controlled drawer</DrawerTitle>
				<DrawerDescription>The story owns this drawer's open state.</DrawerDescription>
			</DrawerHeader>
			<DrawerFooter>
				<Button onclick={() => (controlledOpen = false)}>Save and close</Button>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</Story>
