export const patchSchema = {
	name: {
		errorMessage: 'Invalid name. expected a string',
		isEmpty: false,
		isString: true,
	},
}

export const putSchema = {
	id: {
		isEmpty: false,
		isNumeric: true,
		errorMessage: 'Invalid id. expected a number',
	},
	name: {
		isEmpty: false,
		isString: true,
		errorMessage: 'Invalid name. expected a string',
	},
	age: {
		isEmpty: false,
		isNumeric: true,
		errorMessage: 'Invalid age. expected a number',
	},
}
