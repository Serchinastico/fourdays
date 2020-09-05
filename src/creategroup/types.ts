import { action, payload, union } from "ts-action";

export interface CustomGroup {
	id: string;
	name: string;
}

export const fetchCustomGroupListStart = action(
	"Fetch custom group list [start]"
);
export const fetchCustomGroupListFinish = action(
	"Fetch custom group list [finish]",
	payload<[CustomGroup]>(),
);
export const storeCustomGroupStart = action(
	"Store custom group [start]",
	payload<CustomGroup>(),
);
export const storeCustomGroupFinish = action(
	"Store custom group [finish]",
	payload<CustomGroup>(),
);

export const fetchCustomGroupActions = union(
	fetchCustomGroupListStart,
	fetchCustomGroupListFinish,
);

export const storeCustomGroupActions = union(
	storeCustomGroupStart,
	storeCustomGroupFinish,
);
