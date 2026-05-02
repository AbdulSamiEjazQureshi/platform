export type User = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	phone?: string;
	username?: string;
	image?: string;
	birthDate?: string;
	address?: {
		address?: string;
		city?: string;
		state?: string;
		country?: string;
	};
	company?: {
		name?: string;
		title?: string;
		department?: string;
	};
};
