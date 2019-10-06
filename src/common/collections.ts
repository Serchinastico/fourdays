import * as R from "ramda";

export default function addItemToListIfPresentRemoveOtherwise<T>(
	item: T,
	list: T[]
) {
	// @ts-ignore
	if (list.includes(item)) {
		return R.without([item], list);
	} else {
		return R.append(item, list);
	}
}
