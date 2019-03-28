import { concat, without } from 'lodash';
import { SETUP_SELECT_FOOD, SETUP_SELECT_GROUP } from './types';

const initialSetupState = {
	groups: [
		{
			id: 'Group 1',
			nameTranslationKey: 'food.group.first',
		},
		{
			id: 'Group 2',
			nameTranslationKey: 'food.group.second',
		},
		{
			id: 'Group 3',
			nameTranslationKey: 'food.group.third',
		},
		{
			id: 'Group 4',
			nameTranslationKey: 'food.group.fourth',
		},
	],
	foods: [
		{
			id: 'chard',
			nameTranslationKey: 'food.chard',
			imageResourceName: 'food/chard.jpg',
			groupId: 'Group 1',
		},
		{
			id: 'avocado',
			nameTranslationKey: 'food.avocado',
			imageResourceName: 'food/avocado.jpg',
			groupId: 'Group 4',
		},
		{
			id: 'garlic',
			nameTranslationKey: 'food.garlic',
			imageResourceName: 'food/garlic.png',
			groupId: 'Group 1',
		},
		{
			id: 'artichoke',
			nameTranslationKey: 'food.artichoke',
			imageResourceName: 'food/artichoke.jpg',
			groupId: 'Group 1',
		},
		{
			id: 'alfalfa',
			nameTranslationKey: 'food.alfalfa',
			imageResourceName: 'food/alfalfa.png',
			groupId: 'Group 1',
		},
		{
			id: 'clams',
			nameTranslationKey: 'food.clams',
			imageResourceName: 'food/clams.jpg',
			groupId: 'Group 3',
		},
		{
			id: 'blueberries',
			nameTranslationKey: 'food.blueberries',
			imageResourceName: 'food/blueberries.jpg',
			groupId: 'Group 4',
		},
		{
			id: 'rice',
			nameTranslationKey: 'food.rice',
			imageResourceName: 'food/rice.jpg',
			groupId: 'Group 2',
		},
		{
			id: 'tuna',
			nameTranslationKey: 'food.tuna',
			imageResourceName: 'food/tuna.jpg',
			groupId: 'Group 3',
		},
		{
			id: 'oat',
			nameTranslationKey: 'food.oat',
			imageResourceName: 'food/oat.jpg',
			groupId: 'Group 2',
		},
		{
			id: 'cod',
			nameTranslationKey: 'food.cod',
			imageResourceName: 'food/cod.png',
			groupId: 'Group 2',
		},
		{
			id: 'sweet potato',
			nameTranslationKey: 'food.sweetPotato',
			imageResourceName: 'food/sweetPotato.jpg',
			groupId: 'Group 2',
		},
	],
	selectedFoodIndices: [],
	selectedGroupIndices: [],
};

const onSelectFood = (state, action) => {
	if (state.selectedFoodIds.includes(action.payload)) {
		return {
			...state,
			selectedFoodIndices: without(state.selectedFoodIds, action.payload),
		};
	} else {
		return {
			...state,
			selectedFoodIndices: concat(state.selectedFoodIds, action.payload),
		};
	}
};

const onSelectGroup = (state, action) => {
	if (state.selectedGroupIds.includes(action.payload)) {
		return {
			...state,
			selectedGroupIndices: without(state.selectedGroupIds, action.payload),
		};
	} else {
		return {
			...state,
			selectedGroupIndices: concat(state.selectedGroupIds, action.payload),
		};
	}
};

const setupReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case SETUP_SELECT_FOOD:
			return onSelectFood(state, action);
		case SETUP_SELECT_GROUP:
			return onSelectGroup(state, action);
		default:
			return state;
	}
};

export default setupReducer;
