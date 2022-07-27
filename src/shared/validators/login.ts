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
	if (!value.match(/^\S+$/)) {
		return 'Пробелы недопустимы';
	}
	if (value.match(/^\d+$/)) {
		return 'Логин не может состоять только из цифр';
	}
	if (!value.match(/^[a-z\d_-]{3,20}/i)) {
		return 'Недопустимый формат';
	}
	return '';
};
