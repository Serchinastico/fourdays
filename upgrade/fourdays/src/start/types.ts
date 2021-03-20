import { action, payload, union } from "ts-action";

export const fetchForbiddenFoodStart = action("Fetch forbidden food [start]");
export const fetchForbiddenFoodFinish = action(
	"Fetch forbidden food [finish]",
	payload<string[]>(),
);
export const fetchForbiddenFoodError = action(
	"Fetch forbidden food [error]",
	payload<string>(),
);

export const actions = union(
	fetchForbiddenFoodStart,
	fetchForbiddenFoodFinish,
	fetchForbiddenFoodError,
);
