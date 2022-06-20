export const passwordValidator = (value: string) => {
	if (!value) {
		return 'Пожалуйста, введите пароль';
	}
	if (value.length < 8) {
		return 'Пароль должен содержать не менее 8 символов';
	}
	if (value.length > 40) {
		return 'Пароль не может содержать более 40 символов';
	}
	if (!value.match(/[A-ZА-Я]/)) {
		return 'Пароль должен содержать хотя бы одну заглавную букву';
	}
	if (!value.match(/\d+/)) {
		return 'Пароль должен содержать хотя бы одну цифру';
	}
	return '';
};
