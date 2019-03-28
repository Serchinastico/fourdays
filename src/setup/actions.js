import { SETUP_SELECT_FOOD, SETUP_SELECT_GROUP } from './types';

export const selectFood = id => {
	return {
		type: SETUP_SELECT_FOOD,
		payload: id,
	};
};
export const selectGroup = id => {
	return {
		type: SETUP_SELECT_GROUP,
		payload: id,
	};
};
