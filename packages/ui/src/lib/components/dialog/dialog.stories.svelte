<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { Button } from '../button/index.js';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from './index.js';

	const { Story } = defineMeta({
		title: 'Components/Dialog',
		component: Dialog,
		parameters: {
			layout: 'centered'
		}
	});
</script>

<script lang="ts">
	let controlledOpen = $state(false);
</script>

<Story name="Default" asChild>
	<Dialog>
		<DialogTrigger>
			{#snippet child({ props })}
				<Button {...props}>Open dialog</Button>
			{/snippet}
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Invite team members</DialogTitle>
				<DialogDescription>
					Send an invitation link to collaborators who should be able to access this project.
				</DialogDescription>
			</DialogHeader>
			<div class="rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
				Dialog content can contain any composed Svelte markup.
			</div>
			<DialogFooter showCloseButton>
				<Button>Send invite</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</Story>

<Story name="Initially Open" asChild>
	<Dialog open>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Dialog preview</DialogTitle>
				<DialogDescription>This story starts open so layout and overlay are visible.</DialogDescription>
			</DialogHeader>
			<DialogFooter showCloseButton>
				<Button>Primary action</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</Story>

<Story name="Controlled" asChild>
	<div class="flex flex-col items-center gap-3">
		<Button onclick={() => (controlledOpen = true)}>Open controlled dialog</Button>
		<p class="text-sm text-muted-foreground">Open: {controlledOpen ? 'true' : 'false'}</p>
	</div>

	<Dialog bind:open={controlledOpen}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Controlled dialog</DialogTitle>
				<DialogDescription>The story owns this dialog's open state.</DialogDescription>
			</DialogHeader>
			<DialogFooter showCloseButton>
				<Button onclick={() => (controlledOpen = false)}>Save changes</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</Story>
