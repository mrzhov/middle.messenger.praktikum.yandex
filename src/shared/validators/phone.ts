export const phoneValidator = (value: string) => {
	if (!value) {
		return 'Пожалуйста, введите телефон';
	}
	if (value.length < 10) {
		return 'Поле должно содержать не менее 10 символов';
	}
	if (value.length > 15) {
		return 'Поле не может содержать более 15 символов';
	}
	if (!value.match(/^\+?\d{10,15}/i)) {
		return 'Недопустимый формат';
	}
	return '';
};
