import Fuse from "fuse.js";

export default function fuzzySearch<T>(
	searchExpression: string,
	key: string,
	items: T[]
) {
	const options = {
		distance: 100,
		keys: [key],
		threshold: 0.3
	};
	const fuse = new Fuse(items, options);
	return fuse.search(searchExpression).map(result => result.item);
}
