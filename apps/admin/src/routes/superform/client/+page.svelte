<script lang="ts">
	import { Button, Input } from '@platform/ui';
	import { defaults, setError, superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import {
		array,
		boolean,
		email,
		maxLength,
		minLength,
		number,
		object,
		pipe,
		string,
		type InferOutput
	} from 'valibot';
	import { fade, slide } from 'svelte/transition';

	const schema = object({
		email: pipe(string(), email('use correct email')),
		password: pipe(
			string(),
			minLength(8, 'must be atleast 8 chars'),
			maxLength(60, 'must be less than 60 chars')
		),
		remember: boolean(),
		databases: pipe(
			array(
				object({
					id: number(),
					name: string()
				})
			),
			minLength(2, 'Added atleast two databases'),
			maxLength(5, 'cannot add databases more than 5')
		)
	});

	const initialData: InferOutput<typeof schema> = {
		email: 'admin@platform.com',
		password: '',
		remember: false,
		databases: []
	};

	const { form, errors, message, constraints, enhance, submitting, submit } = superForm(
		defaults(initialData, valibotClient(schema)),
		{
			SPA: true,
			resetForm: true,
			clearOnSubmit: 'errors-and-message',
			validators: valibotClient(schema),
			onUpdate: async ({ form }) => {
				if (form.data.email.includes('spam')) {
					setError(form, 'email', 'Spam Email');
					return;
				}

				if (!form.valid) return;

				try {
					console.log(form.data);
					await new Promise((r) => setTimeout(r, 2000));

					form.message = { status: 200, message: 'Updated' };
				} catch {
					form.message = { status: 500, message: 'Something went wrong' };
				}
			}
		}
	);

	const addedDatabases = $derived($form.databases.map((r) => r.name).join('~~~'));

	let database = $state('');

	function addDatabase(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			$form.databases = [
				...$form.databases,
				{
					id: $form.databases.length + 1,
					name: database
				}
			];

			database = '';
		}
	}
</script>

<svelte:head>
	<title>Login | Client</title>
</svelte:head>

<div class="px-4 py-4 text-foreground sm:px-6 lg:px-8">
	<div class="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
		<div class="w-full space-y-6">
			<div class="space-y-2 text-center">
				<p class="text-sm font-medium tracking-[0.25em] text-muted-foreground uppercase">
					Client Login
				</p>

				<h1 class="text-3xl font-bold tracking-tight">Welcome back</h1>

				<p class="text-sm text-muted-foreground">Sign in to continue to your dashboard.</p>
			</div>

			{#if $message}
				<div
					in:slide
					out:fade
					class="rounded-xl border px-4 py-3 text-sm shadow-sm
						{$message.status >= 400
						? 'border-destructive/30 bg-destructive/10 text-destructive'
						: 'border-primary/30 bg-primary/10 text-primary'}"
				>
					{$message.message}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance
				class="space-y-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
			>
				<div class="space-y-2">
					<label for="email" class="block text-sm font-medium"> Email </label>

					<Input
						id="email"
						name="email"
						type="email"
						placeholder="admin@platform.com"
						aria-invalid={$errors.email ? 'true' : undefined}
						bind:value={$form.email}
						{...$constraints.email}
						class="h-11"
					/>

					{#if $errors.email}
						<p in:slide out:fade class="text-sm text-destructive">
							{$errors.email}
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium"> Password </label>

					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Password"
						aria-invalid={$errors.password ? 'true' : undefined}
						bind:value={$form.password}
						{...$constraints.password}
						class="h-11"
					/>

					{#if $errors.password}
						<p in:slide out:fade class="text-sm text-destructive">
							{$errors.password}
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="databaseInput" class="block text-sm font-medium"> Databases </label>

					<Input
						id="databaseInput"
						name="databaseInput"
						type="text"
						placeholder="Add a database"
						bind:value={database}
						onkeydown={addDatabase}
						class="h-11"
					/>

					<p class="text-sm text-muted-foreground">{addedDatabases}</p>

					{#if $errors.databases}
						<p in:slide out:fade class="text-sm text-destructive">
							{$errors.databases}
						</p>
					{/if}
				</div>

				<div class="flex items-center justify-between gap-4">
					<label
						for="remember"
						class="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"
					>
						<input
							id="remember"
							name="remember"
							type="checkbox"
							aria-invalid={$errors.remember ? 'true' : undefined}
							bind:checked={$form.remember}
							{...$constraints.remember}
							class="size-4 rounded border-border bg-input/50 accent-primary focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
						/>

						<span>Remember me</span>
					</label>
				</div>

				{#if $errors.remember}
					<p in:slide out:fade class="text-sm text-destructive">
						{$errors.remember}
					</p>
				{/if}

				<Button
					type="button"
					disabled={$submitting}
					onclick={submit}
					class="h-11 w-full"
				>
					{#if $submitting}
						<span
							class="mr-2 size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
						></span>
						Signing in...
					{:else}
						Submit
					{/if}
				</Button>
			</form>
		</div>
	</div>

	{#if $submitting}
		<div
			in:fade
			out:fade
			class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
		>
			<div
				in:slide
				out:fade
				class="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-card-foreground shadow-sm"
			>
				<span class="size-5 animate-spin rounded-full border-2 border-muted border-t-primary"
				></span>
				<span class="text-sm font-medium">Loading...</span>
			</div>
		</div>
	{/if}
</div>
