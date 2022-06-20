export const loginValidator = (value: string) => {
	if (!value) {
		return 'Пожалуйста, введите логин';
	}
	if (value.length < 3) {
		return 'Логин должен содержать не менее 3 символов';
	}
	if (value.length > 20) {
		return 'Логин не может содержать более 20 символов';
	}
	if (!value.match(/[a-z]/i)) {
		return 'Допустимы только латинские символы';
	}
	if (!value.match(/' '/)) {
		return 'Пробелы недопустимы';
	}
	return '';
};
