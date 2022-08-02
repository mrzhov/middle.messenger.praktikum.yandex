type PlainObject<T = any> = {
	[k in string]: T;
};

function isObject<T>(value: any): value is IObject<T> {
	return Object.prototype.toString.call(value) === '[object Object]';
}

function isArray<T>(value: any): value is Array<T> {
	return Array.isArray(value);
}

function isArrayOrObject<T>(value: unknown): value is Array<T> | IObject<T> {
	return isObject(value) || isArray(value);
}

export const omit = <T>(keys: Array<string>, obj: T) =>
	Object.fromEntries<T>(Object.entries(obj).filter(([k]) => !keys.includes(k)));

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export function cloneDeep<T = unknown>(obj: IObject<T> | Array<T> | T): IObject<T> | Array<T> | T {
	let result = obj;
	if (isArray(obj)) {
		result = [];
		obj.forEach(value => {
			(result as Array<unknown>).push(cloneDeep(value));
		});
	}
	if (isObject(obj)) {
		result = {};
		Object.keys(obj).forEach(key => {
			(result as IObject)[key] = obj[key];
		});
	}
	return result;
}

export function merge(lhs: IObject, rhs: IObject): IObject {
	if (lhs === null) {
		return rhs;
	}
	if (rhs === null) {
		return lhs;
	}
	let result = {};
	if (isObject(lhs) && isObject(rhs)) {
		for (const key in rhs) {
			if (isObject(rhs[key])) {
				if (!lhs[key]) {
					result = { ...lhs, [key]: {} };
				}
				result = { ...lhs, [key]: merge(lhs[key] as IObject, rhs[key] as IObject) };
			} else {
				result = { ...lhs, [key]: rhs[key] };
			}
		}
	}
	return result;
}
