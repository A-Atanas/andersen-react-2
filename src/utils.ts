import { APIResponse } from "./types";

export const sortBy = (
	array: APIResponse["Search"],
	key: string,
	ascending: boolean
): APIResponse["Search"] => {
	if (key === "—") return array;
	return array.sort((a: Record<string, string>, b: Record<string, string>) => {
		if (ascending) {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		} else {
			if (a[key] > b[key]) return -1;
			if (a[key] < b[key]) return 1;
			return 0;
		}
	});
};
