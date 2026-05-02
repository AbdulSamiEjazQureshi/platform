<script lang="ts">
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
	import SuperDebug from 'sveltekit-superforms/SuperDebug.svelte';
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

<div class="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-100 sm:px-6 lg:px-8">
	<div class="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
		<div class="w-full space-y-6">
			<div class="space-y-2 text-center">
				<p class="text-sm font-medium tracking-[0.25em] text-neutral-400 uppercase">Client Login</p>

				<h1 class="text-3xl font-bold tracking-tight text-white">Welcome back</h1>

				<p class="text-sm text-neutral-400">Sign in to continue to your dashboard.</p>
			</div>

			{#if $message}
				<div
					in:slide
					out:fade
					class="rounded-2xl border px-4 py-3 text-sm shadow-sm
						{$message.status >= 400
						? 'border-red-500/30 bg-red-500/10 text-red-200'
						: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}"
				>
					{$message.message}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance
				class="space-y-5 rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/40 backdrop-blur"
			>
				<div class="space-y-2">
					<label for="email" class="block text-sm font-medium text-neutral-200"> Email </label>

					<input
						id="email"
						name="email"
						type="email"
						placeholder="admin@platform.com"
						aria-invalid={$errors.email ? 'true' : undefined}
						bind:value={$form.email}
						{...$constraints.email}
						class="h-11 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 text-sm text-white transition outline-none placeholder:text-neutral-500 focus:border-white/30 focus:ring-4 focus:ring-white/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/10"
					/>

					{#if $errors.email}
						<p in:slide out:fade class="text-sm text-red-300">
							{$errors.email}
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium text-neutral-200">
						Password
					</label>

					<input
						id="password"
						name="password"
						type="password"
						placeholder="••••••••"
						aria-invalid={$errors.password ? 'true' : undefined}
						bind:value={$form.password}
						{...$constraints.password}
						class="h-11 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 text-sm text-white transition outline-none placeholder:text-neutral-500 focus:border-white/30 focus:ring-4 focus:ring-white/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/10"
					/>

					{#if $errors.password}
						<p in:slide out:fade class="text-sm text-red-300">
							{$errors.password}
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="databaseInput" class="block text-sm font-medium text-neutral-200">
						Databases
					</label>

					<input
						id="databaseInput"
						name="databaseInput"
						type="databaseInput"
						placeholder="••••••••"
						bind:value={database}
						onkeydown={addDatabase}
						class="h-11 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 text-sm text-white transition outline-none placeholder:text-neutral-500 focus:border-white/30 focus:ring-4 focus:ring-white/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/10"
					/>

					{addedDatabases}

					{#if $errors.databases}
						<p in:slide out:fade class="text-sm text-red-300">
							{$errors.databases}
						</p>
					{/if}
				</div>

				<div class="flex items-center justify-between gap-4">
					<label
						for="remember"
						class="flex cursor-pointer items-center gap-3 text-sm text-neutral-300"
					>
						<input
							id="remember"
							name="remember"
							type="checkbox"
							aria-invalid={$errors.remember ? 'true' : undefined}
							bind:checked={$form.remember}
							{...$constraints.remember}
							class="size-4 rounded border-white/20 bg-neutral-900 text-white accent-white"
						/>

						<span>Remember me</span>
					</label>
				</div>

				{#if $errors.remember}
					<p in:slide out:fade class="text-sm text-red-300">
						{$errors.remember}
					</p>
				{/if}

				<button
					type="button"
					disabled={$submitting}
					onclick={submit}
					class="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{#if $submitting}
						<span
							class="mr-2 size-4 animate-spin rounded-full border-2 border-neutral-950/20 border-t-neutral-950"
						></span>
						Signing in...
					{:else}
						Submit
					{/if}
				</button>
			</form>

			<div class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-3">
				<SuperDebug data={$form} />
			</div>
		</div>
	</div>

	{#if $submitting}
		<div
			in:fade
			out:fade
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
		>
			<div
				in:slide
				out:fade
				class="flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white shadow-2xl"
			>
				<span class="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white"
				></span>
				<span class="text-sm font-medium">Loading...</span>
			</div>
		</div>
	{/if}
</div>
