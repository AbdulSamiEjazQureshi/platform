export const prerender = true;

export async function load() {
	console.log('ran during build');
	return {
		pre: [1, 2, 3, 4]
	};
}
