export async function load(params) {
	console.log('RAN SSR');

	return {
		products: [
			{
				id: 1,
				name: 'Product'
			}
		]
	};
}
