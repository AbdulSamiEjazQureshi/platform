import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type PluginOption, type TransformPluginContext } from 'vite';

type TransformHandler = (
	this: TransformPluginContext,
	code: string,
	id: string,
	...args: unknown[]
) => unknown;

const isDependencySvelteStyle = (id: string) =>
	id.includes('/node_modules/') && id.includes('?svelte&type=style');

const tailwindcssForSvelte = (): PluginOption[] =>
	tailwindcss().map((plugin) => {
		if (plugin.name !== '@tailwindcss/vite:generate:serve') {
			return plugin;
		}

		const transform = plugin.transform;

		if (!transform || typeof transform === 'function') {
			return plugin;
		}

		const handler = transform.handler as TransformHandler;

		return {
			...plugin,
			transform: {
				...transform,
				handler(this: TransformPluginContext, code: string, id: string, ...args: unknown[]) {
					if (isDependencySvelteStyle(id)) {
						return code;
					}

					return handler.call(this, code, id, ...args);
				}
			}
		};
	});

export default defineConfig({
	plugins: [...tailwindcssForSvelte(), sveltekit()]
});
