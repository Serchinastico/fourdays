/* eslint-disable no-unused-vars */
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
			thumbnailProvider: _ => require('../images/food/chard.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'avocado',
			nameTranslationKey: 'food.avocado',
			thumbnailProvider: _ => require('../images/food/avocado.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'garlic',
			nameTranslationKey: 'food.garlic',
			thumbnailProvider: _ => require('../images/food/garlic.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'artichoke',
			nameTranslationKey: 'food.artichoke',
			thumbnailProvider: _ => require('../images/food/artichoke.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'alfalfa',
			nameTranslationKey: 'food.alfalfa',
			thumbnailProvider: _ => require('../images/food/alfalfa.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'clams',
			nameTranslationKey: 'food.clams',
			thumbnailProvider: _ => require('../images/food/clams.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'blueberries',
			nameTranslationKey: 'food.blueberries',
			thumbnailProvider: _ => require('../images/food/blueberries.jpg'),
			imageResourceName: 'food/blueberries.jpg',
			groupId: 'Group 4',
		},
		{
			id: 'rice',
			nameTranslationKey: 'food.rice',
			thumbnailProvider: _ => require('../images/food/rice.jpg'),
			imageResourceName: 'food/rice.jpg',
			groupId: 'Group 2',
		},
		{
			id: 'tuna',
			nameTranslationKey: 'food.tuna',
			thumbnailProvider: _ => require('../images/food/tuna.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'oat',
			nameTranslationKey: 'food.oat',
			thumbnailProvider: _ => require('../images/food/oat.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'cod',
			nameTranslationKey: 'food.cod',
			thumbnailProvider: _ => require('../images/food/cod.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'sweet potato',
			nameTranslationKey: 'food.sweetPotato',
			thumbnailProvider: _ => require('../images/food/sweetPotato.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'cockles',
			nameTranslationKey: 'food.cockles',
			thumbnailProvider: _ => require('../images/food/cockles.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'eggplant',
			nameTranslationKey: 'food.eggplant',
			thumbnailProvider: _ => require('../images/food/eggplant.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'watercress',
			nameTranslationKey: 'food.watercress',
			thumbnailProvider: _ => require('../images/food/watercress.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'anchovy',
			nameTranslationKey: 'food.anchovy',
			thumbnailProvider: _ => require('../images/food/anchovy.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'broccoli',
			nameTranslationKey: 'food.broccoli',
			thumbnailProvider: _ => require('../images/food/broccoli.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'zucchini',
			nameTranslationKey: 'food.zucchini',
			thumbnailProvider: _ => require('../images/food/zucchini.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'pumpkin',
			nameTranslationKey: 'food.pumpkin',
			thumbnailProvider: _ => require('../images/food/pumpkin.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'crab',
			nameTranslationKey: 'food.crab',
			thumbnailProvider: _ => require('../images/food/crab.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'prawn',
			nameTranslationKey: 'food.prawn',
			thumbnailProvider: _ => require('../images/food/prawn.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'thistle',
			nameTranslationKey: 'food.thistle',
			thumbnailProvider: _ => require('../images/food/thistle.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'onion',
			nameTranslationKey: 'food.onion',
			thumbnailProvider: _ => require('../images/food/onion.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'spring onion',
			nameTranslationKey: 'food.springOnion',
			thumbnailProvider: _ => require('../images/food/springOnion.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'rye',
			nameTranslationKey: 'food.rye',
			thumbnailProvider: _ => require('../images/food/rye.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'pork',
			nameTranslationKey: 'food.pork',
			thumbnailProvider: _ => require('../images/food/pork.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'cherry',
			nameTranslationKey: 'food.cherry',
			thumbnailProvider: _ => require('../images/food/cherry.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'custard apple',
			nameTranslationKey: 'food.custardApple',
			thumbnailProvider: _ => require('../images/food/custardApple.jpg'),
			groupId: 'Group 4',
		},
		{
			// TODO GERSIO Champiñon no va en ningun lado
			id: 'mushroom',
			nameTranslationKey: 'food.mushroom',
			thumbnailProvider: _ => require('../images/food/mushroom.jpg'),
			groupId: 'Group 1',
		},
		{
			// TODO GERSIO Zanahoria no va en ningun lado
			id: 'carrot',
			nameTranslationKey: 'food.carrot',
			thumbnailProvider: _ => require('../images/food/carrot.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'cabbage',
			nameTranslationKey: 'food.cabbage',
			thumbnailProvider: _ => require('../images/food/cabbage.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'plum',
			nameTranslationKey: 'food.plum',
			thumbnailProvider: _ => require('../images/food/plum.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'brussels sprouts',
			nameTranslationKey: 'food.brusselsSprouts',
			thumbnailProvider: _ => require('../images/food/brusselsSprouts.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'medlar',
			nameTranslationKey: 'food.medlar',
			thumbnailProvider: _ => require('../images/food/medlar.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'cauliflower',
			nameTranslationKey: 'food.cauliflower',
			thumbnailProvider: _ => require('../images/food/cauliflower.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'rabbit',
			nameTranslationKey: 'food.rabbit',
			thumbnailProvider: _ => require('../images/food/rabbit.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'lamb',
			nameTranslationKey: 'food.lamb',
			thumbnailProvider: _ => require('../images/food/lamb.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'endive',
			nameTranslationKey: 'food.endive',
			thumbnailProvider: _ => require('../images/food/endive.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'belgian endive',
			nameTranslationKey: 'food.belgianEndive',
			thumbnailProvider: _ => require('../images/food/belgianEndive.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'kiwi',
			nameTranslationKey: 'food.kiwi',
			thumbnailProvider: _ => require('../images/food/kiwi.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'asparagus',
			nameTranslationKey: 'food.asparagus',
			thumbnailProvider: _ => require('../images/food/asparagus.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'spinach',
			nameTranslationKey: 'food.spinach',
			thumbnailProvider: _ => require('../images/food/spinach.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'raspberry',
			nameTranslationKey: 'food.raspberry',
			thumbnailProvider: _ => require('../images/food/raspberry.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'strawberry',
			nameTranslationKey: 'food.strawberry',
			thumbnailProvider: _ => require('../images/food/strawberry.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'lettuce',
			nameTranslationKey: 'food.lettuce',
			thumbnailProvider: _ => require('../images/food/lettuce.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'tomato',
			nameTranslationKey: 'food.tomato',
			thumbnailProvider: _ => require('../images/food/tomato.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'grape',
			nameTranslationKey: 'food.grape',
			thumbnailProvider: _ => require('../images/food/grape.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'trout',
			nameTranslationKey: 'food.trout',
			thumbnailProvider: _ => require('../images/food/trout.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'wheat',
			nameTranslationKey: 'food.wheat',
			thumbnailProvider: _ => require('../images/food/wheat.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'veal',
			nameTranslationKey: 'food.veal',
			thumbnailProvider: _ => require('../images/food/veal.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'sepia',
			nameTranslationKey: 'food.sepia',
			thumbnailProvider: _ => require('../images/food/sepia.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'semolina',
			nameTranslationKey: 'food.semolina',
			thumbnailProvider: _ => require('../images/food/semolina.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'sardines',
			nameTranslationKey: 'food.sardines',
			thumbnailProvider: _ => require('../images/food/sardines.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'watermelon',
			nameTranslationKey: 'food.watermelon',
			thumbnailProvider: _ => require('../images/food/watermelon.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'salmon',
			nameTranslationKey: 'food.salmon',
			thumbnailProvider: _ => require('../images/food/salmon.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'turbot',
			nameTranslationKey: 'food.turbot',
			thumbnailProvider: _ => require('../images/food/turbot.jpg'),
			groupId: 'Group 3',
		},
		{
			// TODO GERSIO Rábano no va en ningun lado
			id: 'radish',
			nameTranslationKey: 'food.radish',
			thumbnailProvider: _ => require('../images/food/radish.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'octopus',
			nameTranslationKey: 'food.octopus',
			thumbnailProvider: _ => require('../images/food/octopus.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'leek',
			nameTranslationKey: 'food.leek',
			thumbnailProvider: _ => require('../images/food/leek.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'grapefruit',
			nameTranslationKey: 'food.grapefruit',
			thumbnailProvider: _ => require('../images/food/grapefruit.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'banana',
			nameTranslationKey: 'food.banana',
			thumbnailProvider: _ => require('../images/food/banana.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'pepper',
			nameTranslationKey: 'food.pepper',
			thumbnailProvider: _ => require('../images/food/pepper.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'whiting',
			nameTranslationKey: 'food.whiting',
			thumbnailProvider: _ => require('../images/food/whiting.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'chicken',
			nameTranslationKey: 'food.chicken',
			thumbnailProvider: _ => require('../images/food/chicken.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'parsley',
			nameTranslationKey: 'food.parsley',
			thumbnailProvider: _ => require('../images/food/parsley.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'pear',
			nameTranslationKey: 'food.pear',
			thumbnailProvider: _ => require('../images/food/pear.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'cucumber',
			nameTranslationKey: 'food.cucumber',
			thumbnailProvider: _ => require('../images/food/cucumber.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'turkey',
			nameTranslationKey: 'food.turkey',
			thumbnailProvider: _ => require('../images/food/turkey.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'potato',
			nameTranslationKey: 'food.potato',
			thumbnailProvider: _ => require('../images/food/potato.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'snapper',
			nameTranslationKey: 'food.snapper',
			thumbnailProvider: _ => require('../images/food/snapper.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'paraguayan',
			nameTranslationKey: 'food.paraguayan',
			thumbnailProvider: _ => require('../images/food/paraguayan.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'yam',
			nameTranslationKey: 'food.yam',
			thumbnailProvider: _ => require('../images/food/yam.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'oyster',
			nameTranslationKey: 'food.oyster',
			thumbnailProvider: _ => require('../images/food/oyster.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'orange',
			nameTranslationKey: 'food.orange',
			thumbnailProvider: _ => require('../images/food/orange.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'turnip',
			nameTranslationKey: 'food.turnip',
			thumbnailProvider: _ => require('../images/food/turnip.jpg'),
			groupId: 'Group 1',
		},
		{
			id: 'hake',
			nameTranslationKey: 'food.hake',
			thumbnailProvider: _ => require('../images/food/hake.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'peach',
			nameTranslationKey: 'food.peach',
			thumbnailProvider: _ => require('../images/food/peach.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'cantaloupe',
			nameTranslationKey: 'food.cantaloupe',
			thumbnailProvider: _ => require('../images/food/cantaloupe.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'apple',
			nameTranslationKey: 'food.apple',
			thumbnailProvider: _ => require('../images/food/apple.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'mango',
			nameTranslationKey: 'food.mango',
			thumbnailProvider: _ => require('../images/food/mango.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'corn',
			nameTranslationKey: 'food.corn',
			thumbnailProvider: _ => require('../images/food/corn.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'beans',
			nameTranslationKey: 'food.beans',
			thumbnailProvider: _ => require('../images/food/beans.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'whiteBeans',
			nameTranslationKey: 'food.whiteBeans',
			thumbnailProvider: _ => require('../images/food/whiteBeans.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'yellowBeans',
			nameTranslationKey: 'food.yellowBeans',
			thumbnailProvider: _ => require('../images/food/yellowBeans.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'cranberryBeans',
			nameTranslationKey: 'food.cranberryBeans',
			thumbnailProvider: _ => require('../images/food/cranberryBeans.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'lemon',
			nameTranslationKey: 'food.lemon',
			thumbnailProvider: _ => require('../images/food/lemon.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'lime',
			nameTranslationKey: 'food.lime',
			thumbnailProvider: _ => require('../images/food/lime.jpg'),
			groupId: 'Group 4',
		},
		{
			id: 'lobster',
			nameTranslationKey: 'food.lobster',
			thumbnailProvider: _ => require('../images/food/lobster.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'peas',
			nameTranslationKey: 'food.peas',
			thumbnailProvider: _ => require('../images/food/peas.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'lentils',
			nameTranslationKey: 'food.lentils',
			thumbnailProvider: _ => require('../images/food/lentils.jpg'),
			groupId: 'Group 2',
		},
		{
			id: 'sole',
			nameTranslationKey: 'food.sole',
			thumbnailProvider: _ => require('../images/food/sole.jpg'),
			groupId: 'Group 3',
		},
		{
			id: 'green beans',
			nameTranslationKey: 'food.greenBeans',
			thumbnailProvider: _ => require('../images/food/greenBeans.jpg'),
			groupId: 'Group 1',
		},
	],
	selectedFoodIds: [],
	selectedGroupIds: [],
};

const onSelectFood = (state, action) => {
	if (state.selectedFoodIds.includes(action.payload)) {
		return {
			...state,
			selectedFoodIds: without(state.selectedFoodIds, action.payload),
		};
	} else {
		return {
			...state,
			selectedFoodIds: concat(state.selectedFoodIds, action.payload),
		};
	}
};

const onSelectGroup = (state, action) => {
	if (state.selectedGroupIds.includes(action.payload)) {
		return {
			...state,
			selectedGroupIds: without(state.selectedGroupIds, action.payload),
		};
	} else {
		return {
			...state,
			selectedGroupIds: concat(state.selectedGroupIds, action.payload),
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
