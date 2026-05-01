// Reexport your entry components here

export type Lol = {
	st: string;
};

export function cn(q: number, we: string, are: string, t: string[]): string {
	return '';
}
export function change(d: number) {}

export function lol(e: number, hey: string) {}

export { default as Input } from './Input.svelte';

export function clickoutside(node: HTMLElement, callback: () => void) {
	function handler(e: MouseEvent) {
		if (!node.contains(e.target as Node)) callback();
	}

	document.addEventListener('click', handler);

	return {
		update(newCallBack: () => void) {
			callback = newCallBack;
		},
		destroy() {
			document.removeEventListener('click', handler);
		}
	};
}
