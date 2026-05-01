import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),

	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,

	prettier,
	svelte.configs.prettier,
	{
		plugins: {
			'unused-imports': unusedImports
		}
	},
	{
		ignores: ['**/.svelte-kit/**', '**/build/**', '**/dist/**', '**/coverage/**', '**/.vercel/**']
	},

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'no-undef': 'off',

			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'no-duplicate-imports': 'error',
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
			'@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
			'@typescript-eslint/no-empty-object-type': 'off',

			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['../../*'],
							message:
								'Prefer workspace package imports or aliases instead of deep relative imports.'
						},
						{
							group: ['@repo/*/src/*', '@repo/*/dist/*'],
							message: 'Import from the package public API instead of src/dist internals.'
						}
					]
				}
			],

			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/no-unused-svelte-ignore': 'warn'
		}
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		},
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off'
		}
	},
	{
		files: ['**/*.server.ts', '**/+page.server.ts', '**/+layout.server.ts'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			]
		}
	}
);
