import AsyncStorage from "@react-native-community/async-storage";
import * as R from "ramda";
import {
	storeCustomGroupActions,
	CustomGroup,
	storeCustomGroupStart,
	storeCustomGroupFinish,
	fetchCustomGroupActions,
	fetchCustomGroupListStart,
	fetchCustomGroupListFinish,
} from "./types";

async function getStoredCustomGroupList(): Promise<[CustomGroup]> {
	const rawCustomGroupList = await AsyncStorage.getItem("custom_group_list");
	return rawCustomGroupList === null ? [] : JSON.parse(rawCustomGroupList);
}

async function storeCustomGroupList(newCustomGroupList: CustomGroup[]) {
	await AsyncStorage.setItem(
		"custom_group_list",
		JSON.stringify(newCustomGroupList),
	);
}

export function fetchCustomGroup() {
	return async (dispatch: (action: typeof fetchCustomGroupActions) => void) => {
		dispatch(fetchCustomGroupListStart());

		const customGroupList = await getStoredCustomGroupList();

		dispatch(fetchCustomGroupListFinish(customGroupList));
	};
}

export function storeCustomGroup(
	groupName: string
) {
	return async (dispatch: (action: typeof storeCustomGroupActions) => void) => {
		const groupItemPayload: CustomGroup = {
			name: groupName
		};

		dispatch(storeCustomGroupStart(groupItemPayload));

		const customGroupList = await getStoredCustomGroupList();
		const newCustomGroupList = R.append(groupItemPayload, customGroupList);
		await storeCustomGroupList(newCustomGroupList);

		dispatch(storeCustomGroupFinish(groupItemPayload));
	};
}
