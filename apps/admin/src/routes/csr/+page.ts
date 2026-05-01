export const ssr = false;
export const csr = true;

export async function load() {
	console.log('RAN ON CLIENT');

	return {
		products: [
			{
				id: 1,
				name: 'Product'
			}
		]
	};
}
