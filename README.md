# platform

SvelteKit/pnpm workspace with:

- `apps/admin`: the admin SvelteKit app
- `packages/ui`: shared Svelte components, shadcn-svelte components, and Storybook
- `packages/config`: shared CSS/theme config

## Setup

```sh
pnpm install
```

This repo uses `pnpm@10.33.2`.

## Run Apps

Run the admin app:

```sh
pnpm admin
```

Equivalent direct command:

```sh
pnpm -F admin run dev
```

Build the admin app:

```sh
pnpm build:admin
```

Preview the admin production build:

```sh
pnpm -F admin run preview
```

## Storybook

Run Storybook for `@platform/ui`:

```sh
pnpm storybook
```

If port `6006` is busy, run it directly on another port:

```sh
pnpm -F @platform/ui exec storybook dev -p 6011 --host 127.0.0.1 --ci
```

Build Storybook:

```sh
pnpm build:storybook
```

Stories live next to components:

```text
packages/ui/src/lib/components/button/button.stories.svelte
packages/ui/src/lib/components/dialog/dialog.stories.svelte
packages/ui/src/lib/components/drawer/drawer.stories.svelte
packages/ui/src/lib/components/input/input.stories.svelte
```

## Add UI Components

Add shadcn-svelte components directly into `packages/ui`:

```sh
pnpm -F @platform/ui exec shadcn-svelte add dialog
```

Use the component name you need:

```sh
pnpm -F @platform/ui exec shadcn-svelte add drawer
pnpm -F @platform/ui exec shadcn-svelte add dropdown-menu
```

After adding a generated component:

1. Export the public names from `packages/ui/src/lib/index.ts`.
2. Add a Storybook story beside the component.
3. Move runtime packages imported by exported components from `devDependencies` to `dependencies`.
4. Replace generated internal `$lib/...` imports with relative imports if consumers type-check workspace source.
5. Add keys to every story `#each` block, for example `{#each variants as variant (variant)}`.
6. Run checks, lint, and Storybook build.

## Checks

Check the admin app:

```sh
pnpm -F admin run check
```

Check the UI package:

```sh
pnpm -F @platform/ui exec svelte-check --tsconfig ./tsconfig.json
```

Run ESLint for the workspace:

```sh
pnpm exec eslint .
```

Run ESLint with auto-fixes:

```sh
pnpm exec eslint . --fix
```

Format everything with Prettier:

```sh
pnpm exec prettier . --write
```

Check formatting without writing:

```sh
pnpm exec prettier . --check
```

## Recommended Verification

Before handing off UI changes, run:

```sh
pnpm exec eslint .
pnpm -F @platform/ui exec svelte-check --tsconfig ./tsconfig.json
pnpm -F @platform/ui run build-storybook
pnpm -F admin run check
pnpm -F admin run build
```

Existing demo/admin code may produce lint warnings. New UI work should not add lint errors or Svelte diagnostics.

## Dependency Rules

- `packages/ui` runtime imports belong in `dependencies`.
- Storybook, shadcn-svelte CLI, SvelteKit package tooling, and checks belong in `devDependencies`.
- `svelte` stays a peer dependency of `@platform/ui`.
- `packages/config` owns shared CSS/theme dependencies that its exported CSS imports.
