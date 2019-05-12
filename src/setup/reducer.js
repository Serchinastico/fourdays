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
			thumbnail: require("../images/food/chard.jpg"),
			groupId: "Group 1"
		},
		{
			id: "avocado",
			nameTranslationKey: "food.avocado",
			thumbnail: require("../images/food/avocado.jpg"),
			groupId: "Group 4"
		},
		{
			id: "garlic",
			nameTranslationKey: "food.garlic",
			thumbnail: require("../images/food/garlic.jpg"),
			groupId: "Group 1"
		},
		{
			id: "artichoke",
			nameTranslationKey: "food.artichoke",
			thumbnail: require("../images/food/artichoke.jpg"),
			groupId: "Group 1"
		},
		{
			id: "alfalfa",
			nameTranslationKey: "food.alfalfa",
			thumbnail: require("../images/food/alfalfa.jpg"),
			groupId: "Group 1"
		},
		{
			id: "clams",
			nameTranslationKey: "food.clams",
			thumbnail: require("../images/food/clams.jpg"),
			groupId: "Group 3"
		},
		{
			id: "blueberries",
			nameTranslationKey: "food.blueberries",
			thumbnail: require("../images/food/blueberries.jpg"),
			imageResourceName: "food/blueberries.jpg",
			groupId: "Group 4"
		},
		{
			id: "rice",
			nameTranslationKey: "food.rice",
			thumbnail: require("../images/food/rice.jpg"),
			imageResourceName: "food/rice.jpg",
			groupId: "Group 2"
		},
		{
			id: "tuna",
			nameTranslationKey: "food.tuna",
			thumbnail: require("../images/food/tuna.jpg"),
			groupId: "Group 3"
		},
		{
			id: "oat",
			nameTranslationKey: "food.oat",
			thumbnail: require("../images/food/oat.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cod",
			nameTranslationKey: "food.cod",
			thumbnail: require("../images/food/cod.jpg"),
			groupId: "Group 3"
		},
		{
			id: "sweet potato",
			nameTranslationKey: "food.sweetPotato",
			thumbnail: require("../images/food/sweetPotato.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cockles",
			nameTranslationKey: "food.cockles",
			thumbnail: require("../images/food/cockles.jpg"),
			groupId: "Group 3"
		},
		{
			id: "eggplant",
			nameTranslationKey: "food.eggplant",
			thumbnail: require("../images/food/eggplant.jpg"),
			groupId: "Group 2"
		},
		{
			id: "watercress",
			nameTranslationKey: "food.watercress",
			thumbnail: require("../images/food/watercress.jpg"),
			groupId: "Group 1"
		},
		{
			id: "anchovy",
			nameTranslationKey: "food.anchovy",
			thumbnail: require("../images/food/anchovy.jpg"),
			groupId: "Group 3"
		},
		{
			id: "broccoli",
			nameTranslationKey: "food.broccoli",
			thumbnail: require("../images/food/broccoli.jpg"),
			groupId: "Group 1"
		},
		{
			id: "zucchini",
			nameTranslationKey: "food.zucchini",
			thumbnail: require("../images/food/zucchini.jpg"),
			groupId: "Group 1"
		},
		{
			id: "pumpkin",
			nameTranslationKey: "food.pumpkin",
			thumbnail: require("../images/food/pumpkin.jpg"),
			groupId: "Group 1"
		},
		{
			id: "crab",
			nameTranslationKey: "food.crab",
			thumbnail: require("../images/food/crab.jpg"),
			groupId: "Group 3"
		},
		{
			id: "prawn",
			nameTranslationKey: "food.prawn",
			thumbnail: require("../images/food/prawn.jpg"),
			groupId: "Group 3"
		},
		{
			id: "thistle",
			nameTranslationKey: "food.thistle",
			thumbnail: require("../images/food/thistle.jpg"),
			groupId: "Group 1"
		},
		{
			id: "onion",
			nameTranslationKey: "food.onion",
			thumbnail: require("../images/food/onion.jpg"),
			groupId: "Group 1"
		},
		{
			id: "spring onion",
			nameTranslationKey: "food.springOnion",
			thumbnail: require("../images/food/springOnion.jpg"),
			groupId: "Group 1"
		},
		{
			id: "rye",
			nameTranslationKey: "food.rye",
			thumbnail: require("../images/food/rye.jpg"),
			groupId: "Group 2"
		},
		{
			id: "pork",
			nameTranslationKey: "food.pork",
			thumbnail: require("../images/food/pork.jpg"),
			groupId: "Group 3"
		},
		{
			id: "cherry",
			nameTranslationKey: "food.cherry",
			thumbnail: require("../images/food/cherry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "custard apple",
			nameTranslationKey: "food.custardApple",
			thumbnail: require("../images/food/custardApple.jpg"),
			groupId: "Group 4"
		},
		{
			id: "mushroom",
			nameTranslationKey: "food.mushroom",
			thumbnail: require("../images/food/mushroom.jpg"),
			groupId: "Group 1"
		},
		{
			id: "carrot",
			nameTranslationKey: "food.carrot",
			thumbnail: require("../images/food/carrot.jpg"),
			groupId: "Group 1"
		},
		{
			id: "cabbage",
			nameTranslationKey: "food.cabbage",
			thumbnail: require("../images/food/cabbage.jpg"),
			groupId: "Group 1"
		},
		{
			id: "plum",
			nameTranslationKey: "food.plum",
			thumbnail: require("../images/food/plum.jpg"),
			groupId: "Group 4"
		},
		{
			id: "brussels sprouts",
			nameTranslationKey: "food.brusselsSprouts",
			thumbnail: require("../images/food/brusselsSprouts.jpg"),
			groupId: "Group 1"
		},
		{
			id: "medlar",
			nameTranslationKey: "food.medlar",
			thumbnail: require("../images/food/medlar.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cauliflower",
			nameTranslationKey: "food.cauliflower",
			thumbnail: require("../images/food/cauliflower.jpg"),
			groupId: "Group 1"
		},
		{
			id: "rabbit",
			nameTranslationKey: "food.rabbit",
			thumbnail: require("../images/food/rabbit.jpg"),
			groupId: "Group 3"
		},
		{
			id: "lamb",
			nameTranslationKey: "food.lamb",
			thumbnail: require("../images/food/lamb.jpg"),
			groupId: "Group 3"
		},
		{
			id: "endive",
			nameTranslationKey: "food.endive",
			thumbnail: require("../images/food/endive.jpg"),
			groupId: "Group 1"
		},
		{
			id: "belgian endive",
			nameTranslationKey: "food.belgianEndive",
			thumbnail: require("../images/food/belgianEndive.jpg"),
			groupId: "Group 1"
		},
		{
			id: "kiwi",
			nameTranslationKey: "food.kiwi",
			thumbnail: require("../images/food/kiwi.jpg"),
			groupId: "Group 4"
		},
		{
			id: "asparagus",
			nameTranslationKey: "food.asparagus",
			thumbnail: require("../images/food/asparagus.jpg"),
			groupId: "Group 1"
		},
		{
			id: "spinach",
			nameTranslationKey: "food.spinach",
			thumbnail: require("../images/food/spinach.jpg"),
			groupId: "Group 1"
		},
		{
			id: "raspberry",
			nameTranslationKey: "food.raspberry",
			thumbnail: require("../images/food/raspberry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "strawberry",
			nameTranslationKey: "food.strawberry",
			thumbnail: require("../images/food/strawberry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lettuce",
			nameTranslationKey: "food.lettuce",
			thumbnail: require("../images/food/lettuce.jpg"),
			groupId: "Group 1"
		},
		{
			id: "tomato",
			nameTranslationKey: "food.tomato",
			thumbnail: require("../images/food/tomato.jpg"),
			groupId: "Group 1"
		},
		{
			id: "grape",
			nameTranslationKey: "food.grape",
			thumbnail: require("../images/food/grape.jpg"),
			groupId: "Group 4"
		},
		{
			id: "trout",
			nameTranslationKey: "food.trout",
			thumbnail: require("../images/food/trout.jpg"),
			groupId: "Group 3"
		},
		{
			id: "wheat",
			nameTranslationKey: "food.wheat",
			thumbnail: require("../images/food/wheat.jpg"),
			groupId: "Group 2"
		},
		{
			id: "veal",
			nameTranslationKey: "food.veal",
			thumbnail: require("../images/food/veal.jpg"),
			groupId: "Group 3"
		},
		{
			id: "sepia",
			nameTranslationKey: "food.sepia",
			thumbnail: require("../images/food/sepia.jpg"),
			groupId: "Group 3"
		},
		{
			id: "semolina",
			nameTranslationKey: "food.semolina",
			thumbnail: require("../images/food/semolina.jpg"),
			groupId: "Group 2"
		},
		{
			id: "sardines",
			nameTranslationKey: "food.sardines",
			thumbnail: require("../images/food/sardines.jpg"),
			groupId: "Group 3"
		},
		{
			id: "watermelon",
			nameTranslationKey: "food.watermelon",
			thumbnail: require("../images/food/watermelon.jpg"),
			groupId: "Group 4"
		},
		{
			id: "salmon",
			nameTranslationKey: "food.salmon",
			thumbnail: require("../images/food/salmon.jpg"),
			groupId: "Group 3"
		},
		{
			id: "turbot",
			nameTranslationKey: "food.turbot",
			thumbnail: require("../images/food/turbot.jpg"),
			groupId: "Group 3"
		},
		{
			id: "radish",
			nameTranslationKey: "food.radish",
			thumbnail: require("../images/food/radish.jpg"),
			groupId: "Group 1"
		},
		{
			id: "octopus",
			nameTranslationKey: "food.octopus",
			thumbnail: require("../images/food/octopus.jpg"),
			groupId: "Group 3"
		},
		{
			id: "leek",
			nameTranslationKey: "food.leek",
			thumbnail: require("../images/food/leek.jpg"),
			groupId: "Group 1"
		},
		{
			id: "grapefruit",
			nameTranslationKey: "food.grapefruit",
			thumbnail: require("../images/food/grapefruit.jpg"),
			groupId: "Group 4"
		},
		{
			id: "banana",
			nameTranslationKey: "food.banana",
			thumbnail: require("../images/food/banana.jpg"),
			groupId: "Group 4"
		},
		{
			id: "pepper",
			nameTranslationKey: "food.pepper",
			thumbnail: require("../images/food/pepper.jpg"),
			groupId: "Group 1"
		},
		{
			id: "whiting",
			nameTranslationKey: "food.whiting",
			thumbnail: require("../images/food/whiting.jpg"),
			groupId: "Group 3"
		},
		{
			id: "chicken",
			nameTranslationKey: "food.chicken",
			thumbnail: require("../images/food/chicken.jpg"),
			groupId: "Group 3"
		},
		{
			id: "parsley",
			nameTranslationKey: "food.parsley",
			thumbnail: require("../images/food/parsley.jpg"),
			groupId: "Group 1"
		},
		{
			id: "pear",
			nameTranslationKey: "food.pear",
			thumbnail: require("../images/food/pear.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cucumber",
			nameTranslationKey: "food.cucumber",
			thumbnail: require("../images/food/cucumber.jpg"),
			groupId: "Group 1"
		},
		{
			id: "turkey",
			nameTranslationKey: "food.turkey",
			thumbnail: require("../images/food/turkey.jpg"),
			groupId: "Group 3"
		},
		{
			id: "potato",
			nameTranslationKey: "food.potato",
			thumbnail: require("../images/food/potato.jpg"),
			groupId: "Group 2"
		},
		{
			id: "snapper",
			nameTranslationKey: "food.snapper",
			thumbnail: require("../images/food/snapper.jpg"),
			groupId: "Group 3"
		},
		{
			id: "paraguayan",
			nameTranslationKey: "food.paraguayan",
			thumbnail: require("../images/food/paraguayan.jpg"),
			groupId: "Group 4"
		},
		{
			id: "yam",
			nameTranslationKey: "food.yam",
			thumbnail: require("../images/food/yam.jpg"),
			groupId: "Group 2"
		},
		{
			id: "oyster",
			nameTranslationKey: "food.oyster",
			thumbnail: require("../images/food/oyster.jpg"),
			groupId: "Group 3"
		},
		{
			id: "orange",
			nameTranslationKey: "food.orange",
			thumbnail: require("../images/food/orange.jpg"),
			groupId: "Group 4"
		},
		{
			id: "turnip",
			nameTranslationKey: "food.turnip",
			thumbnail: require("../images/food/turnip.jpg"),
			groupId: "Group 1"
		},
		{
			id: "hake",
			nameTranslationKey: "food.hake",
			thumbnail: require("../images/food/hake.jpg"),
			groupId: "Group 3"
		},
		{
			id: "peach",
			nameTranslationKey: "food.peach",
			thumbnail: require("../images/food/peach.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cantaloupe",
			nameTranslationKey: "food.cantaloupe",
			thumbnail: require("../images/food/cantaloupe.jpg"),
			groupId: "Group 4"
		},
		{
			id: "apple",
			nameTranslationKey: "food.apple",
			thumbnail: require("../images/food/apple.jpg"),
			groupId: "Group 4"
		},
		{
			id: "mango",
			nameTranslationKey: "food.mango",
			thumbnail: require("../images/food/mango.jpg"),
			groupId: "Group 4"
		},
		{
			id: "corn",
			nameTranslationKey: "food.corn",
			thumbnail: require("../images/food/corn.jpg"),
			groupId: "Group 2"
		},
		{
			id: "beans",
			nameTranslationKey: "food.beans",
			thumbnail: require("../images/food/beans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "whiteBeans",
			nameTranslationKey: "food.whiteBeans",
			thumbnail: require("../images/food/whiteBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "yellowBeans",
			nameTranslationKey: "food.yellowBeans",
			thumbnail: require("../images/food/yellowBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cranberryBeans",
			nameTranslationKey: "food.cranberryBeans",
			thumbnail: require("../images/food/cranberryBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "lemon",
			nameTranslationKey: "food.lemon",
			thumbnail: require("../images/food/lemon.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lime",
			nameTranslationKey: "food.lime",
			thumbnail: require("../images/food/lime.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lobster",
			nameTranslationKey: "food.lobster",
			thumbnail: require("../images/food/lobster.jpg"),
			groupId: "Group 3"
		},
		{
			id: "peas",
			nameTranslationKey: "food.peas",
			thumbnail: require("../images/food/peas.jpg"),
			groupId: "Group 2"
		},
		{
			id: "lentils",
			nameTranslationKey: "food.lentils",
			thumbnail: require("../images/food/lentils.jpg"),
			groupId: "Group 2"
		},
		{
			id: "sole",
			nameTranslationKey: "food.sole",
			thumbnail: require("../images/food/sole.jpg"),
			groupId: "Group 3"
		},
		{
			id: "green beans",
			nameTranslationKey: "food.greenBeans",
			thumbnail: require("../images/food/greenBeans.jpg"),
			groupId: "Group 1"
		},
		{
			id: "wholemeal bread",
			nameTranslationKey: "food.wholemealBread",
			thumbnail: require("../images/food/wholemealBread.jpg"),
			groupId: "Group 2"
		},
		{
			id: "soy",
			nameTranslationKey: "food.soy",
			thumbnail: require("../images/food/soy.jpg"),
			groupId: "Group 2"
		},
		{
			id: "spelled wheat",
			nameTranslationKey: "food.spelledWheat",
			thumbnail: require("../images/food/spelledWheat.jpg"),
			groupId: "Group 2"
		},
		{
			id: "italian pasta",
			nameTranslationKey: "food.italianPasta",
			thumbnail: require("../images/food/italianPasta.jpg"),
			groupId: "Group 2"
		},
		{
			id: "bass",
			nameTranslationKey: "food.bass",
			thumbnail: require("../images/food/bass.jpg"),
			groupId: "Group 3"
		},
		{
			id: "gilt-head seabream",
			nameTranslationKey: "food.giltHeadSeabream",
			thumbnail: require("../images/food/giltHeadSeabream.jpg"),
			groupId: "Group 3"
		},
		{
			id: "squid",
			nameTranslationKey: "food.squid",
			thumbnail: require("../images/food/squid.jpg"),
			groupId: "Group 3"
		},
		{
			id: "egg",
			nameTranslationKey: "food.egg",
			thumbnail: require("../images/food/egg.jpg"),
			groupId: "Group 3"
		},
		{
			id: "scallops",
			nameTranslationKey: "food.scallops",
			thumbnail: require("../images/food/scallops.jpg"),
			groupId: "Group 3"
		},
		{
			id: "cheese",
			nameTranslationKey: "food.cheese",
			thumbnail: require("../images/food/cheese.jpg"),
			groupId: "Group 3"
		},
		{
			id: "yogurt",
			nameTranslationKey: "food.yogurt",
			thumbnail: require("../images/food/yogurt.jpg"),
			groupId: "Group 3"
		},
		{
			id: "pineapple",
			nameTranslationKey: "food.pineapple",
			thumbnail: require("../images/food/pineapple.jpg"),
			groupId: "Group 4"
		},
		{
			id: "apricot",
			nameTranslationKey: "food.apricot",
			thumbnail: require("../images/food/apricot.jpg"),
			groupId: "Group 4"
		},
		{
			id: "papaya",
			nameTranslationKey: "food.papaya",
			thumbnail: require("../images/food/papaya.jpg"),
			groupId: "Group 4"
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
