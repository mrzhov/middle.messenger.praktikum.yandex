import { getValueFromRefs } from '@/shared/utils/helpers/shared';
import {
	emailValidator,
	loginValidator,
	messageValidator,
	nameValidator,
	passwordValidator,
	phoneValidator,
} from '@/shared/validators';

const getValidator = (id: string) => {
	if (id === 'login') {
		return loginValidator;
	}
	if (
		id === 'password' ||
		id === 'password_repeat' ||
		id === 'old_password' ||
		id === 'new_password' ||
		id === 'new_password_repeat'
	) {
		return passwordValidator;
	}
	if (id === 'first_name' || id === 'second_name') {
		return nameValidator;
	}
	if (id === 'phone') {
		return phoneValidator;
	}
	if (id === 'email') {
		return emailValidator;
	}
	if (id === 'message') {
		return messageValidator;
	}
	return (value: string) => value;
};

const focusBlurHandler = (params: {
	targetElementId: string;
	state: any;
	refs: Record<string, HTMLElement>;
	setState: (nextState: any) => void;
	validator: (value: string) => string;
}) => {
	const { targetElementId, state, refs, setState, validator } = params;

	const data = {
		...state.values,
		[targetElementId]: getValueFromRefs(refs, targetElementId),
	};

	const nextState = {
		values: { ...data },
		errors: { ...state.errors },
	};

	nextState.errors[targetElementId] = validator(data[targetElementId]);

	setState(nextState);
};

export function focusHandler<T extends string>(this: any, event: FocusEvent) {
	// @ts-ignore
	if (event.sourceCapabilities) {
		const targetElementId = (event.target as HTMLInputElement).id as T;
		const validator = getValidator(targetElementId);
		focusBlurHandler({
			targetElementId,
			state: this.state,
			refs: this.refs,
			setState: this.setState,
			validator,
		});
		document.getElementById(targetElementId)!.focus();
	}
}

export function blurHandler<T extends string>(this: any, event: FocusEvent) {
	// @ts-ignore
	if (event.sourceCapabilities) {
		const targetElementId = (event.target as HTMLInputElement).id as T;
		const validator = getValidator(targetElementId);
		focusBlurHandler({
			targetElementId,
			state: this.state,
			refs: this.refs,
			setState: this.setState,
			validator,
		});
	}
}
