import { STORE_FORBIDDEN_FOOD_START } from "./types";
import {
	FETCH_FORBIDDEN_FOOD_ERROR,
	FETCH_FORBIDDEN_FOOD_FINISHED,
	FETCH_FORBIDDEN_FOOD_START
} from "../start/types";

const initialSetupState = {
	groups: [
		{
			id: "Group 1",
			nameTranslationKey: "food.group.first"
		},
		{
			id: "Group 2",
			nameTranslationKey: "food.group.second"
		},
		{
			id: "Group 3",
			nameTranslationKey: "food.group.third"
		},
		{
			id: "Group 4",
			nameTranslationKey: "food.group.fourth"
		}
	],
	foods: [
		{
			id: "chard",
			nameTranslationKey: "food.chard",
			thumbnailUrl: "chard",
			groupId: "Group 1"
		},
		{
			id: "avocado",
			nameTranslationKey: "food.avocado",
			thumbnailUrl: "avocado",
			groupId: "Group 4"
		},
		{
			id: "garlic",
			nameTranslationKey: "food.garlic",
			thumbnailUrl: "garlic",
			groupId: "Group 1"
		},
		{
			id: "artichoke",
			nameTranslationKey: "food.artichoke",
			thumbnailUrl: "artichoke",
			groupId: "Group 1"
		},
		{
			id: "alfalfa",
			nameTranslationKey: "food.alfalfa",
			thumbnailUrl: "alfalfa",
			groupId: "Group 1"
		},
		{
			id: "clams",
			nameTranslationKey: "food.clams",
			thumbnailUrl: "clams",
			groupId: "Group 3"
		},
		{
			id: "blueberries",
			nameTranslationKey: "food.blueberries",
			thumbnailUrl: "blueberries",
			imageResourceName: "food/blueberries",
			groupId: "Group 4"
		},
		{
			id: "rice",
			nameTranslationKey: "food.rice",
			thumbnailUrl: "rice",
			imageResourceName: "food/rice",
			groupId: "Group 2"
		},
		{
			id: "tuna",
			nameTranslationKey: "food.tuna",
			thumbnailUrl: "tuna",
			groupId: "Group 3"
		},
		{
			id: "oat",
			nameTranslationKey: "food.oat",
			thumbnailUrl: "oat",
			groupId: "Group 2"
		},
		{
			id: "cod",
			nameTranslationKey: "food.cod",
			thumbnailUrl: "cod",
			groupId: "Group 2"
		},
		{
			id: "sweet potato",
			nameTranslationKey: "food.sweetPotato",
			thumbnailUrl: "sweet_potato",
			groupId: "Group 2"
		},
		{
			id: "cockles",
			nameTranslationKey: "food.cockles",
			thumbnailUrl: "cockles",
			groupId: "Group 3"
		},
		{
			id: "eggplant",
			nameTranslationKey: "food.eggplant",
			thumbnailUrl: "eggplant",
			groupId: "Group 2"
		},
		{
			id: "watercress",
			nameTranslationKey: "food.watercress",
			thumbnailUrl: "watercress",
			groupId: "Group 1"
		},
		{
			id: "anchovy",
			nameTranslationKey: "food.anchovy",
			thumbnailUrl: "anchovy",
			groupId: "Group 3"
		},
		{
			id: "broccoli",
			nameTranslationKey: "food.broccoli",
			thumbnailUrl: "broccoli",
			groupId: "Group 1"
		},
		{
			id: "zucchini",
			nameTranslationKey: "food.zucchini",
			thumbnailUrl: "zucchini",
			groupId: "Group 1"
		},
		{
			id: "pumpkin",
			nameTranslationKey: "food.pumpkin",
			thumbnailUrl: "pumpkin",
			groupId: "Group 1"
		},
		{
			id: "crab",
			nameTranslationKey: "food.crab",
			thumbnailUrl: "crab",
			groupId: "Group 3"
		},
		{
			id: "prawn",
			nameTranslationKey: "food.prawn",
			thumbnailUrl: "prawn",
			groupId: "Group 3"
		},
		{
			id: "thistle",
			nameTranslationKey: "food.thistle",
			thumbnailUrl: "thistle",
			groupId: "Group 1"
		},
		{
			id: "onion",
			nameTranslationKey: "food.onion",
			thumbnailUrl: "onion",
			groupId: "Group 1"
		},
		{
			id: "spring onion",
			nameTranslationKey: "food.springOnion",
			thumbnailUrl: "spring_onion",
			groupId: "Group 1"
		},
		{
			id: "rye",
			nameTranslationKey: "food.rye",
			thumbnailUrl: "rye",
			groupId: "Group 2"
		},
		{
			id: "pork",
			nameTranslationKey: "food.pork",
			thumbnailUrl: "pork",
			groupId: "Group 3"
		},
		{
			id: "cherry",
			nameTranslationKey: "food.cherry",
			thumbnailUrl: "cherry",
			groupId: "Group 4"
		},
		{
			id: "custard apple",
			nameTranslationKey: "food.custardApple",
			thumbnailUrl: "custard_apple",
			groupId: "Group 4"
		},
		{
			// TODO GERSIO Champiñon no va en ningun lado
			id: "mushroom",
			nameTranslationKey: "food.mushroom",
			thumbnailUrl: "mushroom",
			groupId: "Group 1"
		},
		{
			// TODO GERSIO Zanahoria no va en ningun lado
			id: "carrot",
			nameTranslationKey: "food.carrot",
			thumbnailUrl: "carrot",
			groupId: "Group 1"
		},
		{
			id: "cabbage",
			nameTranslationKey: "food.cabbage",
			thumbnailUrl: "cabbage",
			groupId: "Group 1"
		},
		{
			id: "plum",
			nameTranslationKey: "food.plum",
			thumbnailUrl: "plum",
			groupId: "Group 4"
		},
		{
			id: "brussels sprouts",
			nameTranslationKey: "food.brusselsSprouts",
			thumbnailUrl: "brussels_sprouts",
			groupId: "Group 1"
		},
		{
			id: "medlar",
			nameTranslationKey: "food.medlar",
			thumbnailUrl: "medlar",
			groupId: "Group 4"
		},
		{
			id: "cauliflower",
			nameTranslationKey: "food.cauliflower",
			thumbnailUrl: "cauliflower",
			groupId: "Group 1"
		},
		{
			id: "rabbit",
			nameTranslationKey: "food.rabbit",
			thumbnailUrl: "rabbit",
			groupId: "Group 3"
		},
		{
			id: "lamb",
			nameTranslationKey: "food.lamb",
			thumbnailUrl: "lamb",
			groupId: "Group 3"
		},
		{
			id: "endive",
			nameTranslationKey: "food.endive",
			thumbnailUrl: "endive",
			groupId: "Group 1"
		},
		{
			id: "belgian endive",
			nameTranslationKey: "food.belgianEndive",
			thumbnailUrl: "belgian_endive",
			groupId: "Group 1"
		},
		{
			id: "kiwi",
			nameTranslationKey: "food.kiwi",
			thumbnailUrl: "kiwi",
			groupId: "Group 4"
		},
		{
			id: "asparagus",
			nameTranslationKey: "food.asparagus",
			thumbnailUrl: "asparagus",
			groupId: "Group 1"
		},
		{
			id: "spinach",
			nameTranslationKey: "food.spinach",
			thumbnailUrl: "spinach",
			groupId: "Group 1"
		},
		{
			id: "raspberry",
			nameTranslationKey: "food.raspberry",
			thumbnailUrl: "raspberry",
			groupId: "Group 4"
		},
		{
			id: "strawberry",
			nameTranslationKey: "food.strawberry",
			thumbnailUrl: "strawberry",
			groupId: "Group 4"
		},
		{
			id: "lettuce",
			nameTranslationKey: "food.lettuce",
			thumbnailUrl: "lettuce",
			groupId: "Group 1"
		},
		{
			id: "tomato",
			nameTranslationKey: "food.tomato",
			thumbnailUrl: "tomato",
			groupId: "Group 1"
		},
		{
			id: "grape",
			nameTranslationKey: "food.grape",
			thumbnailUrl: "grape",
			groupId: "Group 4"
		},
		{
			id: "trout",
			nameTranslationKey: "food.trout",
			thumbnailUrl: "trout",
			groupId: "Group 3"
		},
		{
			id: "wheat",
			nameTranslationKey: "food.wheat",
			thumbnailUrl: "wheat",
			groupId: "Group 2"
		},
		{
			id: "veal",
			nameTranslationKey: "food.veal",
			thumbnailUrl: "veal",
			groupId: "Group 3"
		},
		{
			id: "sepia",
			nameTranslationKey: "food.sepia",
			thumbnailUrl: "sepia",
			groupId: "Group 3"
		},
		{
			id: "semolina",
			nameTranslationKey: "food.semolina",
			thumbnailUrl: "semolina",
			groupId: "Group 2"
		},
		{
			id: "sardines",
			nameTranslationKey: "food.sardines",
			thumbnailUrl: "sardines",
			groupId: "Group 3"
		},
		{
			id: "watermelon",
			nameTranslationKey: "food.watermelon",
			thumbnailUrl: "watermelon",
			groupId: "Group 4"
		},
		{
			id: "salmon",
			nameTranslationKey: "food.salmon",
			thumbnailUrl: "salmon",
			groupId: "Group 3"
		},
		{
			id: "turbot",
			nameTranslationKey: "food.turbot",
			thumbnailUrl: "turbot",
			groupId: "Group 3"
		},
		{
			// TODO GERSIO Rábano no va en ningun lado
			id: "radish",
			nameTranslationKey: "food.radish",
			thumbnailUrl: "radish",
			groupId: "Group 1"
		},
		{
			id: "octopus",
			nameTranslationKey: "food.octopus",
			thumbnailUrl: "octopus",
			groupId: "Group 3"
		},
		{
			id: "leek",
			nameTranslationKey: "food.leek",
			thumbnailUrl: "leek",
			groupId: "Group 1"
		},
		{
			id: "grapefruit",
			nameTranslationKey: "food.grapefruit",
			thumbnailUrl: "grapefruit",
			groupId: "Group 4"
		},
		{
			id: "banana",
			nameTranslationKey: "food.banana",
			thumbnailUrl: "banana",
			groupId: "Group 4"
		},
		{
			id: "pepper",
			nameTranslationKey: "food.pepper",
			thumbnailUrl: "pepper",
			groupId: "Group 1"
		},
		{
			id: "whiting",
			nameTranslationKey: "food.whiting",
			thumbnailUrl: "whiting",
			groupId: "Group 3"
		},
		{
			id: "chicken",
			nameTranslationKey: "food.chicken",
			thumbnailUrl: "chicken",
			groupId: "Group 3"
		},
		{
			id: "parsley",
			nameTranslationKey: "food.parsley",
			thumbnailUrl: "parsley",
			groupId: "Group 1"
		},
		{
			id: "pear",
			nameTranslationKey: "food.pear",
			thumbnailUrl: "pear",
			groupId: "Group 4"
		},
		{
			id: "cucumber",
			nameTranslationKey: "food.cucumber",
			thumbnailUrl: "cucumber",
			groupId: "Group 1"
		},
		{
			id: "turkey",
			nameTranslationKey: "food.turkey",
			thumbnailUrl: "turkey",
			groupId: "Group 3"
		},
		{
			id: "potato",
			nameTranslationKey: "food.potato",
			thumbnailUrl: "potato",
			groupId: "Group 2"
		},
		{
			id: "snapper",
			nameTranslationKey: "food.snapper",
			thumbnailUrl: "snapper",
			groupId: "Group 3"
		},
		{
			id: "paraguayan",
			nameTranslationKey: "food.paraguayan",
			thumbnailUrl: "paraguayan",
			groupId: "Group 4"
		},
		{
			id: "yam",
			nameTranslationKey: "food.yam",
			thumbnailUrl: "yam",
			groupId: "Group 2"
		},
		{
			id: "oyster",
			nameTranslationKey: "food.oyster",
			thumbnailUrl: "oyster",
			groupId: "Group 3"
		},
		{
			id: "orange",
			nameTranslationKey: "food.orange",
			thumbnailUrl: "orange",
			groupId: "Group 4"
		},
		{
			id: "turnip",
			nameTranslationKey: "food.turnip",
			thumbnailUrl: "turnip",
			groupId: "Group 1"
		},
		{
			id: "hake",
			nameTranslationKey: "food.hake",
			thumbnailUrl: "hake",
			groupId: "Group 3"
		},
		{
			id: "peach",
			nameTranslationKey: "food.peach",
			thumbnailUrl: "peach",
			groupId: "Group 4"
		},
		{
			id: "cantaloupe",
			nameTranslationKey: "food.cantaloupe",
			thumbnailUrl: "cantaloupe",
			groupId: "Group 4"
		},
		{
			id: "apple",
			nameTranslationKey: "food.apple",
			thumbnailUrl: "apple",
			groupId: "Group 4"
		},
		{
			id: "mango",
			nameTranslationKey: "food.mango",
			thumbnailUrl: "mango",
			groupId: "Group 4"
		},
		{
			id: "corn",
			nameTranslationKey: "food.corn",
			thumbnailUrl: "corn",
			groupId: "Group 2"
		},
		{
			id: "beans",
			nameTranslationKey: "food.beans",
			thumbnailUrl: "beans",
			groupId: "Group 2"
		},
		{
			id: "whiteBeans",
			nameTranslationKey: "food.whiteBeans",
			thumbnailUrl: "white_beans",
			groupId: "Group 2"
		},
		{
			id: "yellowBeans",
			nameTranslationKey: "food.yellowBeans",
			thumbnailUrl: "yellow_beans",
			groupId: "Group 2"
		},
		{
			id: "cranberryBeans",
			nameTranslationKey: "food.cranberryBeans",
			thumbnailUrl: "cranberry_beans",
			groupId: "Group 2"
		},
		{
			id: "lemon",
			nameTranslationKey: "food.lemon",
			thumbnailUrl: "lemon",
			groupId: "Group 4"
		},
		{
			id: "lime",
			nameTranslationKey: "food.lime",
			thumbnailUrl: "lime",
			groupId: "Group 4"
		},
		{
			id: "lobster",
			nameTranslationKey: "food.lobster",
			thumbnailUrl: "lobster",
			groupId: "Group 3"
		},
		{
			id: "peas",
			nameTranslationKey: "food.peas",
			thumbnailUrl: "peas",
			groupId: "Group 2"
		},
		{
			id: "lentils",
			nameTranslationKey: "food.lentils",
			thumbnailUrl: "lentils",
			groupId: "Group 2"
		},
		{
			id: "sole",
			nameTranslationKey: "food.sole",
			thumbnailUrl: "sole",
			groupId: "Group 3"
		},
		{
			id: "green beans",
			nameTranslationKey: "food.greenBeans",
			thumbnailUrl: "green_beans",
			groupId: "Group 1"
		}
	],
	forbiddenFoodIds: undefined
};

const onStoreForbiddenFoodStart = (state, action) => {
	return { ...state, forbiddenFoodIds: action.payload };
};

const onFetchForbiddenFoodStart = state => {
	return {
		...state,
		forbiddenFoodIdsError: undefined,
		forbiddenFoodIds: undefined
	};
};

const onFetchForbiddenFoodFinished = (state, action) => {
	return { ...state, forbiddenFoodIds: action.payload };
};

const onFetchForbiddenFoodError = (state, action) => {
	return { ...state, forbiddenFoodIdsError: action.payload };
};

const setupReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case STORE_FORBIDDEN_FOOD_START:
			return onStoreForbiddenFoodStart(state, action);
		case FETCH_FORBIDDEN_FOOD_START:
			return onFetchForbiddenFoodStart(state);
		case FETCH_FORBIDDEN_FOOD_FINISHED:
			return onFetchForbiddenFoodFinished(state, action);
		case FETCH_FORBIDDEN_FOOD_ERROR:
			return onFetchForbiddenFoodError(state, action);
		default:
			return state;
	}
};

export default setupReducer;
