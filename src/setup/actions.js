import { STORE_FORBIDDEN_FOOD } from './types';

// eslint-disable-next-line import/prefer-default-export
export const storeForbiddenFood = ids => {
	return {
		type: STORE_FORBIDDEN_FOOD,
		payload: ids,
	};
};
