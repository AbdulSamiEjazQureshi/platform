import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/sveltekit';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig, type PluginOption, type TransformPluginContext } from 'vite';

const currentDir = dirname(fileURLToPath(import.meta.url));

type TransformHandler = (
	this: TransformPluginContext,
	code: string,
	id: string,
	...args: unknown[]
) => unknown;

const isDependencySvelteStyle = (id: string) =>
	id.includes('/node_modules/') && id.includes('?svelte&type=style');

const tailwindcssForStorybook = (): PluginOption[] =>
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

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(svelte|ts)'],
	addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	viteFinal: async (config) =>
		mergeConfig(
			{
				...config,
				plugins: [...tailwindcssForStorybook(), ...(config.plugins ?? [])]
			},
			{
				resolve: {
					alias: {
						$lib: resolve(currentDir, '../src/lib')
					}
				},
				optimizeDeps: {
					noDiscovery: true
				}
			}
		)
};

export default config;
