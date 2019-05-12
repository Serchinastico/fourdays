import * as R from "ramda";

export default function addItemToListIfPresentRemoveOtherwise(item, list) {
	if (list.includes(item)) {
		return R.without([item], list);
	} else {
		return R.append(item, list);
	}
}
