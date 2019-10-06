import {
	fetchForbiddenFoodError,
	fetchForbiddenFoodFinish,
	fetchForbiddenFoodStart
} from "../start/types";
import { STORE_FORBIDDEN_FOOD_START } from "./types";
import I18n from "../translations/i18n";

const initialSetupState = {
	groups: [
		{
			id: "Group 1",
			name: I18n.t("food.group.first")
		},
		{
			id: "Group 2",
			name: I18n.t("food.group.second")
		},
		{
			id: "Group 3",
			name: I18n.t("food.group.third")
		},
		{
			id: "Group 4",
			name: I18n.t("food.group.fourth")
		}
	],
	foods: [
		{
			id: "chard",
			name: I18n.t("food.chard"),
			image: { type: "Require", data: require("../images/food/chard.jpg") },
			groupId: "Group 1"
		},
		{
			id: "avocado",
			name: I18n.t("food.avocado"),
			image: { type: "Require", data: require("../images/food/avocado.jpg") },
			groupId: "Group 4"
		},
		{
			id: "garlic",
			name: I18n.t("food.garlic"),
			image: { type: "Require", data: require("../images/food/garlic.jpg") },
			groupId: "Group 1"
		},
		{
			id: "artichoke",
			name: I18n.t("food.artichoke"),
			image: { type: "Require", data: require("../images/food/artichoke.jpg") },
			groupId: "Group 1"
		},
		{
			id: "alfalfa",
			name: I18n.t("food.alfalfa"),
			image: { type: "Require", data: require("../images/food/alfalfa.jpg") },
			groupId: "Group 1"
		},
		{
			id: "clams",
			name: I18n.t("food.clams"),
			image: { type: "Require", data: require("../images/food/clams.jpg") },
			groupId: "Group 3"
		},
		{
			id: "blueberries",
			name: I18n.t("food.blueberries"),
			image: {
				type: "Require",
				data: require("../images/food/blueberries.jpg")
			},
			imageResourceName: "food/blueberries.jpg",
			groupId: "Group 4"
		},
		{
			id: "rice",
			name: I18n.t("food.rice"),
			image: { type: "Require", data: require("../images/food/rice.jpg") },
			imageResourceName: "food/rice.jpg",
			groupId: "Group 2"
		},
		{
			id: "tuna",
			name: I18n.t("food.tuna"),
			image: { type: "Require", data: require("../images/food/tuna.jpg") },
			groupId: "Group 3"
		},
		{
			id: "oat",
			name: I18n.t("food.oat"),
			image: { type: "Require", data: require("../images/food/oat.jpg") },
			groupId: "Group 2"
		},
		{
			id: "cod",
			name: I18n.t("food.cod"),
			image: { type: "Require", data: require("../images/food/cod.jpg") },
			groupId: "Group 3"
		},
		{
			id: "sweet potato",
			name: I18n.t("food.sweetPotato"),
			image: {
				type: "Require",
				data: require("../images/food/sweetPotato.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "cockles",
			name: I18n.t("food.cockles"),
			image: { type: "Require", data: require("../images/food/cockles.jpg") },
			groupId: "Group 3"
		},
		{
			id: "eggplant",
			name: I18n.t("food.eggplant"),
			image: { type: "Require", data: require("../images/food/eggplant.jpg") },
			groupId: "Group 2"
		},
		{
			id: "watercress",
			name: I18n.t("food.watercress"),
			image: {
				type: "Require",
				data: require("../images/food/watercress.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "anchovy",
			name: I18n.t("food.anchovy"),
			image: { type: "Require", data: require("../images/food/anchovy.jpg") },
			groupId: "Group 3"
		},
		{
			id: "broccoli",
			name: I18n.t("food.broccoli"),
			image: { type: "Require", data: require("../images/food/broccoli.jpg") },
			groupId: "Group 1"
		},
		{
			id: "zucchini",
			name: I18n.t("food.zucchini"),
			image: { type: "Require", data: require("../images/food/zucchini.jpg") },
			groupId: "Group 1"
		},
		{
			id: "pumpkin",
			name: I18n.t("food.pumpkin"),
			image: { type: "Require", data: require("../images/food/pumpkin.jpg") },
			groupId: "Group 1"
		},
		{
			id: "crab",
			name: I18n.t("food.crab"),
			image: { type: "Require", data: require("../images/food/crab.jpg") },
			groupId: "Group 3"
		},
		{
			id: "prawn",
			name: I18n.t("food.prawn"),
			image: { type: "Require", data: require("../images/food/prawn.jpg") },
			groupId: "Group 3"
		},
		{
			id: "thistle",
			name: I18n.t("food.thistle"),
			image: { type: "Require", data: require("../images/food/thistle.jpg") },
			groupId: "Group 1"
		},
		{
			id: "onion",
			name: I18n.t("food.onion"),
			image: { type: "Require", data: require("../images/food/onion.jpg") },
			groupId: "Group 1"
		},
		{
			id: "spring onion",
			name: I18n.t("food.springOnion"),
			image: {
				type: "Require",
				data: require("../images/food/springOnion.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "rye",
			name: I18n.t("food.rye"),
			image: { type: "Require", data: require("../images/food/rye.jpg") },
			groupId: "Group 2"
		},
		{
			id: "pork",
			name: I18n.t("food.pork"),
			image: { type: "Require", data: require("../images/food/pork.jpg") },
			groupId: "Group 3"
		},
		{
			id: "cherry",
			name: I18n.t("food.cherry"),
			image: { type: "Require", data: require("../images/food/cherry.jpg") },
			groupId: "Group 4"
		},
		{
			id: "custard apple",
			name: I18n.t("food.custardApple"),
			image: {
				type: "Require",
				data: require("../images/food/custardApple.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "mushroom",
			name: I18n.t("food.mushroom"),
			image: { type: "Require", data: require("../images/food/mushroom.jpg") },
			groupId: "Group 1"
		},
		{
			id: "carrot",
			name: I18n.t("food.carrot"),
			image: { type: "Require", data: require("../images/food/carrot.jpg") },
			groupId: "Group 1"
		},
		{
			id: "cabbage",
			name: I18n.t("food.cabbage"),
			image: { type: "Require", data: require("../images/food/cabbage.jpg") },
			groupId: "Group 1"
		},
		{
			id: "plum",
			name: I18n.t("food.plum"),
			image: { type: "Require", data: require("../images/food/plum.jpg") },
			groupId: "Group 4"
		},
		{
			id: "brussels sprouts",
			name: I18n.t("food.brusselsSprouts"),
			image: {
				type: "Require",
				data: require("../images/food/brusselsSprouts.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "medlar",
			name: I18n.t("food.medlar"),
			image: { type: "Require", data: require("../images/food/medlar.jpg") },
			groupId: "Group 4"
		},
		{
			id: "cauliflower",
			name: I18n.t("food.cauliflower"),
			image: {
				type: "Require",
				data: require("../images/food/cauliflower.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "rabbit",
			name: I18n.t("food.rabbit"),
			image: { type: "Require", data: require("../images/food/rabbit.jpg") },
			groupId: "Group 3"
		},
		{
			id: "lamb",
			name: I18n.t("food.lamb"),
			image: { type: "Require", data: require("../images/food/lamb.jpg") },
			groupId: "Group 3"
		},
		{
			id: "endive",
			name: I18n.t("food.endive"),
			image: { type: "Require", data: require("../images/food/endive.jpg") },
			groupId: "Group 1"
		},
		{
			id: "belgian endive",
			name: I18n.t("food.belgianEndive"),
			image: {
				type: "Require",
				data: require("../images/food/belgianEndive.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "kiwi",
			name: I18n.t("food.kiwi"),
			image: { type: "Require", data: require("../images/food/kiwi.jpg") },
			groupId: "Group 4"
		},
		{
			id: "asparagus",
			name: I18n.t("food.asparagus"),
			image: { type: "Require", data: require("../images/food/asparagus.jpg") },
			groupId: "Group 1"
		},
		{
			id: "spinach",
			name: I18n.t("food.spinach"),
			image: { type: "Require", data: require("../images/food/spinach.jpg") },
			groupId: "Group 1"
		},
		{
			id: "raspberry",
			name: I18n.t("food.raspberry"),
			image: { type: "Require", data: require("../images/food/raspberry.jpg") },
			groupId: "Group 4"
		},
		{
			id: "strawberry",
			name: I18n.t("food.strawberry"),
			image: {
				type: "Require",
				data: require("../images/food/strawberry.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "lettuce",
			name: I18n.t("food.lettuce"),
			image: { type: "Require", data: require("../images/food/lettuce.jpg") },
			groupId: "Group 1"
		},
		{
			id: "tomato",
			name: I18n.t("food.tomato"),
			image: { type: "Require", data: require("../images/food/tomato.jpg") },
			groupId: "Group 1"
		},
		{
			id: "grape",
			name: I18n.t("food.grape"),
			image: { type: "Require", data: require("../images/food/grape.jpg") },
			groupId: "Group 4"
		},
		{
			id: "trout",
			name: I18n.t("food.trout"),
			image: { type: "Require", data: require("../images/food/trout.jpg") },
			groupId: "Group 3"
		},
		{
			id: "wheat",
			name: I18n.t("food.wheat"),
			image: { type: "Require", data: require("../images/food/wheat.jpg") },
			groupId: "Group 2"
		},
		{
			id: "veal",
			name: I18n.t("food.veal"),
			image: { type: "Require", data: require("../images/food/veal.jpg") },
			groupId: "Group 3"
		},
		{
			id: "sepia",
			name: I18n.t("food.sepia"),
			image: { type: "Require", data: require("../images/food/sepia.jpg") },
			groupId: "Group 3"
		},
		{
			id: "semolina",
			name: I18n.t("food.semolina"),
			image: { type: "Require", data: require("../images/food/semolina.jpg") },
			groupId: "Group 2"
		},
		{
			id: "sardines",
			name: I18n.t("food.sardines"),
			image: { type: "Require", data: require("../images/food/sardines.jpg") },
			groupId: "Group 3"
		},
		{
			id: "watermelon",
			name: I18n.t("food.watermelon"),
			image: {
				type: "Require",
				data: require("../images/food/watermelon.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "salmon",
			name: I18n.t("food.salmon"),
			image: { type: "Require", data: require("../images/food/salmon.jpg") },
			groupId: "Group 3"
		},
		{
			id: "turbot",
			name: I18n.t("food.turbot"),
			image: { type: "Require", data: require("../images/food/turbot.jpg") },
			groupId: "Group 3"
		},
		{
			id: "radish",
			name: I18n.t("food.radish"),
			image: { type: "Require", data: require("../images/food/radish.jpg") },
			groupId: "Group 1"
		},
		{
			id: "octopus",
			name: I18n.t("food.octopus"),
			image: { type: "Require", data: require("../images/food/octopus.jpg") },
			groupId: "Group 3"
		},
		{
			id: "leek",
			name: I18n.t("food.leek"),
			image: { type: "Require", data: require("../images/food/leek.jpg") },
			groupId: "Group 1"
		},
		{
			id: "grapefruit",
			name: I18n.t("food.grapefruit"),
			image: {
				type: "Require",
				data: require("../images/food/grapefruit.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "banana",
			name: I18n.t("food.banana"),
			image: { type: "Require", data: require("../images/food/banana.jpg") },
			groupId: "Group 4"
		},
		{
			id: "pepper",
			name: I18n.t("food.pepper"),
			image: { type: "Require", data: require("../images/food/pepper.jpg") },
			groupId: "Group 1"
		},
		{
			id: "whiting",
			name: I18n.t("food.whiting"),
			image: { type: "Require", data: require("../images/food/whiting.jpg") },
			groupId: "Group 3"
		},
		{
			id: "chicken",
			name: I18n.t("food.chicken"),
			image: { type: "Require", data: require("../images/food/chicken.jpg") },
			groupId: "Group 3"
		},
		{
			id: "parsley",
			name: I18n.t("food.parsley"),
			image: { type: "Require", data: require("../images/food/parsley.jpg") },
			groupId: "Group 1"
		},
		{
			id: "pear",
			name: I18n.t("food.pear"),
			image: { type: "Require", data: require("../images/food/pear.jpg") },
			groupId: "Group 4"
		},
		{
			id: "cucumber",
			name: I18n.t("food.cucumber"),
			image: { type: "Require", data: require("../images/food/cucumber.jpg") },
			groupId: "Group 1"
		},
		{
			id: "turkey",
			name: I18n.t("food.turkey"),
			image: { type: "Require", data: require("../images/food/turkey.jpg") },
			groupId: "Group 3"
		},
		{
			id: "potato",
			name: I18n.t("food.potato"),
			image: { type: "Require", data: require("../images/food/potato.jpg") },
			groupId: "Group 2"
		},
		{
			id: "snapper",
			name: I18n.t("food.snapper"),
			image: { type: "Require", data: require("../images/food/snapper.jpg") },
			groupId: "Group 3"
		},
		{
			id: "açai",
			name: "food.açai",
			image: { type: "Require", data: require("../images/food/acai.jpg") },
			groupId: "Group 4"
		},
		{
			id: "chickpeas",
			name: I18n.t("food.chickpeas"),
			image: { type: "Require", data: require("../images/food/chickpeas.jpg") },
			groupId: "Group 2"
		},
		{
			id: "paraguayan",
			name: I18n.t("food.paraguayan"),
			image: {
				type: "Require",
				data: require("../images/food/paraguayan.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "yam",
			name: I18n.t("food.yam"),
			image: { type: "Require", data: require("../images/food/yam.jpg") },
			groupId: "Group 2"
		},
		{
			id: "oyster",
			name: I18n.t("food.oyster"),
			image: { type: "Require", data: require("../images/food/oyster.jpg") },
			groupId: "Group 3"
		},
		{
			id: "orange",
			name: I18n.t("food.orange"),
			image: { type: "Require", data: require("../images/food/orange.jpg") },
			groupId: "Group 4"
		},
		{
			id: "turnip",
			name: I18n.t("food.turnip"),
			image: { type: "Require", data: require("../images/food/turnip.jpg") },
			groupId: "Group 1"
		},
		{
			id: "hake",
			name: I18n.t("food.hake"),
			image: { type: "Require", data: require("../images/food/hake.jpg") },
			groupId: "Group 3"
		},
		{
			id: "peach",
			name: I18n.t("food.peach"),
			image: { type: "Require", data: require("../images/food/peach.jpg") },
			groupId: "Group 4"
		},
		{
			id: "cantaloupe",
			name: I18n.t("food.cantaloupe"),
			image: {
				type: "Require",
				data: require("../images/food/cantaloupe.jpg")
			},
			groupId: "Group 4"
		},
		{
			id: "apple",
			name: I18n.t("food.apple"),
			image: { type: "Require", data: require("../images/food/apple.jpg") },
			groupId: "Group 4"
		},
		{
			id: "mango",
			name: I18n.t("food.mango"),
			image: { type: "Require", data: require("../images/food/mango.jpg") },
			groupId: "Group 4"
		},
		{
			id: "corn",
			name: I18n.t("food.corn"),
			image: { type: "Require", data: require("../images/food/corn.jpg") },
			groupId: "Group 2"
		},
		{
			id: "beans",
			name: I18n.t("food.beans"),
			image: { type: "Require", data: require("../images/food/beans.jpg") },
			groupId: "Group 2"
		},
		{
			id: "whiteBeans",
			name: I18n.t("food.whiteBeans"),
			image: {
				type: "Require",
				data: require("../images/food/whiteBeans.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "yellowBeans",
			name: I18n.t("food.yellowBeans"),
			image: {
				type: "Require",
				data: require("../images/food/yellowBeans.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "cranberryBeans",
			name: I18n.t("food.cranberryBeans"),
			image: {
				type: "Require",
				data: require("../images/food/cranberryBeans.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "lemon",
			name: I18n.t("food.lemon"),
			image: { type: "Require", data: require("../images/food/lemon.jpg") },
			groupId: "Group 4"
		},
		{
			id: "lime",
			name: I18n.t("food.lime"),
			image: { type: "Require", data: require("../images/food/lime.jpg") },
			groupId: "Group 4"
		},
		{
			id: "lobster",
			name: I18n.t("food.lobster"),
			image: { type: "Require", data: require("../images/food/lobster.jpg") },
			groupId: "Group 3"
		},
		{
			id: "peas",
			name: I18n.t("food.peas"),
			image: { type: "Require", data: require("../images/food/peas.jpg") },
			groupId: "Group 2"
		},
		{
			id: "lentils",
			name: I18n.t("food.lentils"),
			image: { type: "Require", data: require("../images/food/lentils.jpg") },
			groupId: "Group 2"
		},
		{
			id: "sole",
			name: I18n.t("food.sole"),
			image: { type: "Require", data: require("../images/food/sole.jpg") },
			groupId: "Group 3"
		},
		{
			id: "green beans",
			name: I18n.t("food.greenBeans"),
			image: {
				type: "Require",
				data: require("../images/food/greenBeans.jpg")
			},
			groupId: "Group 1"
		},
		{
			id: "wholemeal bread",
			name: I18n.t("food.wholemealBread"),
			image: {
				type: "Require",
				data: require("../images/food/wholemealBread.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "soy",
			name: I18n.t("food.soy"),
			image: { type: "Require", data: require("../images/food/soy.jpg") },
			groupId: "Group 2"
		},
		{
			id: "spelled wheat",
			name: I18n.t("food.spelledWheat"),
			image: {
				type: "Require",
				data: require("../images/food/spelledWheat.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "italian pasta",
			name: I18n.t("food.italianPasta"),
			image: {
				type: "Require",
				data: require("../images/food/italianPasta.jpg")
			},
			groupId: "Group 2"
		},
		{
			id: "bass",
			name: I18n.t("food.bass"),
			image: { type: "Require", data: require("../images/food/bass.jpg") },
			groupId: "Group 3"
		},
		{
			id: "gilt-head seabream",
			name: I18n.t("food.giltHeadSeabream"),
			image: {
				type: "Require",
				data: require("../images/food/giltHeadSeabream.jpg")
			},
			groupId: "Group 3"
		},
		{
			id: "squid",
			name: I18n.t("food.squid"),
			image: { type: "Require", data: require("../images/food/squid.jpg") },
			groupId: "Group 3"
		},
		{
			id: "egg",
			name: I18n.t("food.egg"),
			image: { type: "Require", data: require("../images/food/egg.jpg") },
			groupId: "Group 3"
		},
		{
			id: "scallops",
			name: I18n.t("food.scallops"),
			image: { type: "Require", data: require("../images/food/scallops.jpg") },
			groupId: "Group 3"
		},
		{
			id: "cheese",
			name: I18n.t("food.cheese"),
			image: { type: "Require", data: require("../images/food/cheese.jpg") },
			groupId: "Group 3"
		},
		{
			id: "yogurt",
			name: I18n.t("food.yogurt"),
			image: { type: "Require", data: require("../images/food/yogurt.jpg") },
			groupId: "Group 3"
		},
		{
			id: "pineapple",
			name: I18n.t("food.pineapple"),
			image: { type: "Require", data: require("../images/food/pineapple.jpg") },
			groupId: "Group 4"
		},
		{
			id: "apricot",
			name: I18n.t("food.apricot"),
			image: { type: "Require", data: require("../images/food/apricot.jpg") },
			groupId: "Group 4"
		},
		{
			id: "papaya",
			name: I18n.t("food.papaya"),
			image: { type: "Require", data: require("../images/food/papaya.jpg") },
			groupId: "Group 4"
		}
	],
	forbiddenFoodIds: undefined,
	isCustomFoodLoaded: false
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

const onFetchCustomFood = (state, action) => {
	return {
		...state,
		foods: [...state.foods, ...action.payload],
		isCustomFoodLoaded: true
	};
};

const onStoreCustomFood = (state, action) => {
	const { id, name, groupId, image } = action.payload;

	return {
		...state,
		foods: [...state.foods, { id, name, image, groupId }]
	};
};

const setupReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case STORE_FORBIDDEN_FOOD_START:
			return onStoreForbiddenFoodStart(state, action);
		case fetchForbiddenFoodStart.type:
			return onFetchForbiddenFoodStart(state);
		case fetchForbiddenFoodFinish.type:
			return onFetchForbiddenFoodFinished(state, action);
		case fetchForbiddenFoodError.type:
			return onFetchForbiddenFoodError(state, action);
		case "Fetch custom food finish":
			return onFetchCustomFood(state, action);
		case "Store custom food start":
			return onStoreCustomFood(state, action);
		default:
			return state;
	}
};

export default setupReducer;
