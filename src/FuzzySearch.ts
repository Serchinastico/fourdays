import Fuse from "fuse.js";

export default function fuzzySearch<T>(
	searchExpression: string,
	key: string,
	items: T[]
) {
	const options = {
		keys: [key],
		threshold: 0.3,
		distance: 100
	};
	const fuse = new Fuse(items, options);
	return fuse.search(searchExpression);
}
