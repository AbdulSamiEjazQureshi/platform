export async function load({ data }) {
	console.log('ran universal');
	return {
		products: data.products,
		fromClient: true
	};
}
