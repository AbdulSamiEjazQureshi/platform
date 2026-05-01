import rootConfig from '../../eslint.config.js';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig(...rootConfig, {
	files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
	languageOptions: {
		parserOptions: {
			projectService: true,
			extraFileExtensions: ['.svelte'],
			parser: ts.parser,
			svelteConfig
		}
	}
});
