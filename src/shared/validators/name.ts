export const nameValidator = (value: string) => {
	if (!value) {
		return `Пожалуйста, введите значение`;
	}
	const firstChar = value.slice(0, 1);
	if (firstChar !== firstChar.toUpperCase()) {
		return `Поле должно начинаться с заглавной буквы`;
	}
	if (!value.match(/^[a-zа-я-]+$/gi)) {
		return 'Недопустимый формат';
	}
	return '';
};
