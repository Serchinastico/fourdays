import { STORE_FORBIDDEN_FOOD_FINISHED } from "./types";

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
			thumbnailProvider: () => require("../images/food/chard.jpg"),
			groupId: "Group 1"
		},
		{
			id: "avocado",
			nameTranslationKey: "food.avocado",
			thumbnailProvider: () => require("../images/food/avocado.jpg"),
			groupId: "Group 4"
		},
		{
			id: "garlic",
			nameTranslationKey: "food.garlic",
			thumbnailProvider: () => require("../images/food/garlic.jpg"),
			groupId: "Group 1"
		},
		{
			id: "artichoke",
			nameTranslationKey: "food.artichoke",
			thumbnailProvider: () => require("../images/food/artichoke.jpg"),
			groupId: "Group 1"
		},
		{
			id: "alfalfa",
			nameTranslationKey: "food.alfalfa",
			thumbnailProvider: () => require("../images/food/alfalfa.jpg"),
			groupId: "Group 1"
		},
		{
			id: "clams",
			nameTranslationKey: "food.clams",
			thumbnailProvider: () => require("../images/food/clams.jpg"),
			groupId: "Group 3"
		},
		{
			id: "blueberries",
			nameTranslationKey: "food.blueberries",
			thumbnailProvider: () => require("../images/food/blueberries.jpg"),
			imageResourceName: "food/blueberries.jpg",
			groupId: "Group 4"
		},
		{
			id: "rice",
			nameTranslationKey: "food.rice",
			thumbnailProvider: () => require("../images/food/rice.jpg"),
			imageResourceName: "food/rice.jpg",
			groupId: "Group 2"
		},
		{
			id: "tuna",
			nameTranslationKey: "food.tuna",
			thumbnailProvider: () => require("../images/food/tuna.jpg"),
			groupId: "Group 3"
		},
		{
			id: "oat",
			nameTranslationKey: "food.oat",
			thumbnailProvider: () => require("../images/food/oat.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cod",
			nameTranslationKey: "food.cod",
			thumbnailProvider: () => require("../images/food/cod.jpg"),
			groupId: "Group 2"
		},
		{
			id: "sweet potato",
			nameTranslationKey: "food.sweetPotato",
			thumbnailProvider: () => require("../images/food/sweetPotato.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cockles",
			nameTranslationKey: "food.cockles",
			thumbnailProvider: () => require("../images/food/cockles.jpg"),
			groupId: "Group 3"
		},
		{
			id: "eggplant",
			nameTranslationKey: "food.eggplant",
			thumbnailProvider: () => require("../images/food/eggplant.jpg"),
			groupId: "Group 2"
		},
		{
			id: "watercress",
			nameTranslationKey: "food.watercress",
			thumbnailProvider: () => require("../images/food/watercress.jpg"),
			groupId: "Group 1"
		},
		{
			id: "anchovy",
			nameTranslationKey: "food.anchovy",
			thumbnailProvider: () => require("../images/food/anchovy.jpg"),
			groupId: "Group 3"
		},
		{
			id: "broccoli",
			nameTranslationKey: "food.broccoli",
			thumbnailProvider: () => require("../images/food/broccoli.jpg"),
			groupId: "Group 1"
		},
		{
			id: "zucchini",
			nameTranslationKey: "food.zucchini",
			thumbnailProvider: () => require("../images/food/zucchini.jpg"),
			groupId: "Group 1"
		},
		{
			id: "pumpkin",
			nameTranslationKey: "food.pumpkin",
			thumbnailProvider: () => require("../images/food/pumpkin.jpg"),
			groupId: "Group 1"
		},
		{
			id: "crab",
			nameTranslationKey: "food.crab",
			thumbnailProvider: () => require("../images/food/crab.jpg"),
			groupId: "Group 3"
		},
		{
			id: "prawn",
			nameTranslationKey: "food.prawn",
			thumbnailProvider: () => require("../images/food/prawn.jpg"),
			groupId: "Group 3"
		},
		{
			id: "thistle",
			nameTranslationKey: "food.thistle",
			thumbnailProvider: () => require("../images/food/thistle.jpg"),
			groupId: "Group 1"
		},
		{
			id: "onion",
			nameTranslationKey: "food.onion",
			thumbnailProvider: () => require("../images/food/onion.jpg"),
			groupId: "Group 1"
		},
		{
			id: "spring onion",
			nameTranslationKey: "food.springOnion",
			thumbnailProvider: () => require("../images/food/springOnion.jpg"),
			groupId: "Group 1"
		},
		{
			id: "rye",
			nameTranslationKey: "food.rye",
			thumbnailProvider: () => require("../images/food/rye.jpg"),
			groupId: "Group 2"
		},
		{
			id: "pork",
			nameTranslationKey: "food.pork",
			thumbnailProvider: () => require("../images/food/pork.jpg"),
			groupId: "Group 3"
		},
		{
			id: "cherry",
			nameTranslationKey: "food.cherry",
			thumbnailProvider: () => require("../images/food/cherry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "custard apple",
			nameTranslationKey: "food.custardApple",
			thumbnailProvider: () => require("../images/food/custardApple.jpg"),
			groupId: "Group 4"
		},
		{
			// TODO GERSIO Champiñon no va en ningun lado
			id: "mushroom",
			nameTranslationKey: "food.mushroom",
			thumbnailProvider: () => require("../images/food/mushroom.jpg"),
			groupId: "Group 1"
		},
		{
			// TODO GERSIO Zanahoria no va en ningun lado
			id: "carrot",
			nameTranslationKey: "food.carrot",
			thumbnailProvider: () => require("../images/food/carrot.jpg"),
			groupId: "Group 1"
		},
		{
			id: "cabbage",
			nameTranslationKey: "food.cabbage",
			thumbnailProvider: () => require("../images/food/cabbage.jpg"),
			groupId: "Group 1"
		},
		{
			id: "plum",
			nameTranslationKey: "food.plum",
			thumbnailProvider: () => require("../images/food/plum.jpg"),
			groupId: "Group 4"
		},
		{
			id: "brussels sprouts",
			nameTranslationKey: "food.brusselsSprouts",
			thumbnailProvider: () => require("../images/food/brusselsSprouts.jpg"),
			groupId: "Group 1"
		},
		{
			id: "medlar",
			nameTranslationKey: "food.medlar",
			thumbnailProvider: () => require("../images/food/medlar.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cauliflower",
			nameTranslationKey: "food.cauliflower",
			thumbnailProvider: () => require("../images/food/cauliflower.jpg"),
			groupId: "Group 1"
		},
		{
			id: "rabbit",
			nameTranslationKey: "food.rabbit",
			thumbnailProvider: () => require("../images/food/rabbit.jpg"),
			groupId: "Group 3"
		},
		{
			id: "lamb",
			nameTranslationKey: "food.lamb",
			thumbnailProvider: () => require("../images/food/lamb.jpg"),
			groupId: "Group 3"
		},
		{
			id: "endive",
			nameTranslationKey: "food.endive",
			thumbnailProvider: () => require("../images/food/endive.jpg"),
			groupId: "Group 1"
		},
		{
			id: "belgian endive",
			nameTranslationKey: "food.belgianEndive",
			thumbnailProvider: () => require("../images/food/belgianEndive.jpg"),
			groupId: "Group 1"
		},
		{
			id: "kiwi",
			nameTranslationKey: "food.kiwi",
			thumbnailProvider: () => require("../images/food/kiwi.jpg"),
			groupId: "Group 4"
		},
		{
			id: "asparagus",
			nameTranslationKey: "food.asparagus",
			thumbnailProvider: () => require("../images/food/asparagus.jpg"),
			groupId: "Group 1"
		},
		{
			id: "spinach",
			nameTranslationKey: "food.spinach",
			thumbnailProvider: () => require("../images/food/spinach.jpg"),
			groupId: "Group 1"
		},
		{
			id: "raspberry",
			nameTranslationKey: "food.raspberry",
			thumbnailProvider: () => require("../images/food/raspberry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "strawberry",
			nameTranslationKey: "food.strawberry",
			thumbnailProvider: () => require("../images/food/strawberry.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lettuce",
			nameTranslationKey: "food.lettuce",
			thumbnailProvider: () => require("../images/food/lettuce.jpg"),
			groupId: "Group 1"
		},
		{
			id: "tomato",
			nameTranslationKey: "food.tomato",
			thumbnailProvider: () => require("../images/food/tomato.jpg"),
			groupId: "Group 1"
		},
		{
			id: "grape",
			nameTranslationKey: "food.grape",
			thumbnailProvider: () => require("../images/food/grape.jpg"),
			groupId: "Group 4"
		},
		{
			id: "trout",
			nameTranslationKey: "food.trout",
			thumbnailProvider: () => require("../images/food/trout.jpg"),
			groupId: "Group 3"
		},
		{
			id: "wheat",
			nameTranslationKey: "food.wheat",
			thumbnailProvider: () => require("../images/food/wheat.jpg"),
			groupId: "Group 2"
		},
		{
			id: "veal",
			nameTranslationKey: "food.veal",
			thumbnailProvider: () => require("../images/food/veal.jpg"),
			groupId: "Group 3"
		},
		{
			id: "sepia",
			nameTranslationKey: "food.sepia",
			thumbnailProvider: () => require("../images/food/sepia.jpg"),
			groupId: "Group 3"
		},
		{
			id: "semolina",
			nameTranslationKey: "food.semolina",
			thumbnailProvider: () => require("../images/food/semolina.jpg"),
			groupId: "Group 2"
		},
		{
			id: "sardines",
			nameTranslationKey: "food.sardines",
			thumbnailProvider: () => require("../images/food/sardines.jpg"),
			groupId: "Group 3"
		},
		{
			id: "watermelon",
			nameTranslationKey: "food.watermelon",
			thumbnailProvider: () => require("../images/food/watermelon.jpg"),
			groupId: "Group 4"
		},
		{
			id: "salmon",
			nameTranslationKey: "food.salmon",
			thumbnailProvider: () => require("../images/food/salmon.jpg"),
			groupId: "Group 3"
		},
		{
			id: "turbot",
			nameTranslationKey: "food.turbot",
			thumbnailProvider: () => require("../images/food/turbot.jpg"),
			groupId: "Group 3"
		},
		{
			// TODO GERSIO Rábano no va en ningun lado
			id: "radish",
			nameTranslationKey: "food.radish",
			thumbnailProvider: () => require("../images/food/radish.jpg"),
			groupId: "Group 1"
		},
		{
			id: "octopus",
			nameTranslationKey: "food.octopus",
			thumbnailProvider: () => require("../images/food/octopus.jpg"),
			groupId: "Group 3"
		},
		{
			id: "leek",
			nameTranslationKey: "food.leek",
			thumbnailProvider: () => require("../images/food/leek.jpg"),
			groupId: "Group 1"
		},
		{
			id: "grapefruit",
			nameTranslationKey: "food.grapefruit",
			thumbnailProvider: () => require("../images/food/grapefruit.jpg"),
			groupId: "Group 4"
		},
		{
			id: "banana",
			nameTranslationKey: "food.banana",
			thumbnailProvider: () => require("../images/food/banana.jpg"),
			groupId: "Group 4"
		},
		{
			id: "pepper",
			nameTranslationKey: "food.pepper",
			thumbnailProvider: () => require("../images/food/pepper.jpg"),
			groupId: "Group 1"
		},
		{
			id: "whiting",
			nameTranslationKey: "food.whiting",
			thumbnailProvider: () => require("../images/food/whiting.jpg"),
			groupId: "Group 3"
		},
		{
			id: "chicken",
			nameTranslationKey: "food.chicken",
			thumbnailProvider: () => require("../images/food/chicken.jpg"),
			groupId: "Group 3"
		},
		{
			id: "parsley",
			nameTranslationKey: "food.parsley",
			thumbnailProvider: () => require("../images/food/parsley.jpg"),
			groupId: "Group 1"
		},
		{
			id: "pear",
			nameTranslationKey: "food.pear",
			thumbnailProvider: () => require("../images/food/pear.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cucumber",
			nameTranslationKey: "food.cucumber",
			thumbnailProvider: () => require("../images/food/cucumber.jpg"),
			groupId: "Group 1"
		},
		{
			id: "turkey",
			nameTranslationKey: "food.turkey",
			thumbnailProvider: () => require("../images/food/turkey.jpg"),
			groupId: "Group 3"
		},
		{
			id: "potato",
			nameTranslationKey: "food.potato",
			thumbnailProvider: () => require("../images/food/potato.jpg"),
			groupId: "Group 2"
		},
		{
			id: "snapper",
			nameTranslationKey: "food.snapper",
			thumbnailProvider: () => require("../images/food/snapper.jpg"),
			groupId: "Group 3"
		},
		{
			id: "paraguayan",
			nameTranslationKey: "food.paraguayan",
			thumbnailProvider: () => require("../images/food/paraguayan.jpg"),
			groupId: "Group 4"
		},
		{
			id: "yam",
			nameTranslationKey: "food.yam",
			thumbnailProvider: () => require("../images/food/yam.jpg"),
			groupId: "Group 2"
		},
		{
			id: "oyster",
			nameTranslationKey: "food.oyster",
			thumbnailProvider: () => require("../images/food/oyster.jpg"),
			groupId: "Group 3"
		},
		{
			id: "orange",
			nameTranslationKey: "food.orange",
			thumbnailProvider: () => require("../images/food/orange.jpg"),
			groupId: "Group 4"
		},
		{
			id: "turnip",
			nameTranslationKey: "food.turnip",
			thumbnailProvider: () => require("../images/food/turnip.jpg"),
			groupId: "Group 1"
		},
		{
			id: "hake",
			nameTranslationKey: "food.hake",
			thumbnailProvider: () => require("../images/food/hake.jpg"),
			groupId: "Group 3"
		},
		{
			id: "peach",
			nameTranslationKey: "food.peach",
			thumbnailProvider: () => require("../images/food/peach.jpg"),
			groupId: "Group 4"
		},
		{
			id: "cantaloupe",
			nameTranslationKey: "food.cantaloupe",
			thumbnailProvider: () => require("../images/food/cantaloupe.jpg"),
			groupId: "Group 4"
		},
		{
			id: "apple",
			nameTranslationKey: "food.apple",
			thumbnailProvider: () => require("../images/food/apple.jpg"),
			groupId: "Group 4"
		},
		{
			id: "mango",
			nameTranslationKey: "food.mango",
			thumbnailProvider: () => require("../images/food/mango.jpg"),
			groupId: "Group 4"
		},
		{
			id: "corn",
			nameTranslationKey: "food.corn",
			thumbnailProvider: () => require("../images/food/corn.jpg"),
			groupId: "Group 2"
		},
		{
			id: "beans",
			nameTranslationKey: "food.beans",
			thumbnailProvider: () => require("../images/food/beans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "whiteBeans",
			nameTranslationKey: "food.whiteBeans",
			thumbnailProvider: () => require("../images/food/whiteBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "yellowBeans",
			nameTranslationKey: "food.yellowBeans",
			thumbnailProvider: () => require("../images/food/yellowBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "cranberryBeans",
			nameTranslationKey: "food.cranberryBeans",
			thumbnailProvider: () => require("../images/food/cranberryBeans.jpg"),
			groupId: "Group 2"
		},
		{
			id: "lemon",
			nameTranslationKey: "food.lemon",
			thumbnailProvider: () => require("../images/food/lemon.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lime",
			nameTranslationKey: "food.lime",
			thumbnailProvider: () => require("../images/food/lime.jpg"),
			groupId: "Group 4"
		},
		{
			id: "lobster",
			nameTranslationKey: "food.lobster",
			thumbnailProvider: () => require("../images/food/lobster.jpg"),
			groupId: "Group 3"
		},
		{
			id: "peas",
			nameTranslationKey: "food.peas",
			thumbnailProvider: () => require("../images/food/peas.jpg"),
			groupId: "Group 2"
		},
		{
			id: "lentils",
			nameTranslationKey: "food.lentils",
			thumbnailProvider: () => require("../images/food/lentils.jpg"),
			groupId: "Group 2"
		},
		{
			id: "sole",
			nameTranslationKey: "food.sole",
			thumbnailProvider: () => require("../images/food/sole.jpg"),
			groupId: "Group 3"
		},
		{
			id: "green beans",
			nameTranslationKey: "food.greenBeans",
			thumbnailProvider: () => require("../images/food/greenBeans.jpg"),
			groupId: "Group 1"
		}
	],
	forbiddenFoodIds: []
};

const onStoreForbiddenFoodFinished = (state, action) => {
	return { ...state, forbiddenFoodIds: action.payload };
};

const setupReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case STORE_FORBIDDEN_FOOD_FINISHED:
			return onStoreForbiddenFoodFinished(state, action);
		default:
			return state;
	}
};

export default setupReducer;
