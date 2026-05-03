import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	kit: {
		alias: {
			$lib: 'src/lib'
		}
	},
	extensions: ['.svelte'],
	compilerOptions: {
		runes: true
	},
	vitePlugin: {
		inspector: true
	},
	plugins: [sveltekit()]
};

export default config;
