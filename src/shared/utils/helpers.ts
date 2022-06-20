export const findParentElementByCondition = (event: any, condition: (target: any) => boolean) => {
	let { target } = event;
	while (target) {
		if (condition(target)) {
			return target;
		}
		target = target.parentElement;
	}
	return undefined;
};
