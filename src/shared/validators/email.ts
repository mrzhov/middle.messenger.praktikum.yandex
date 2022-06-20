export const emailValidator = (value: string) => {
	if (!value) {
		return 'Пожалуйста, введите почту';
	}
	if (!value.match(/^\S+$/)) {
		return 'Пробелы недопустимы';
	}
	if (!value.match(/^([a-z\d]+(?:[._-][a-z\d]+)*)@([a-z\d]+(?:[.-][a-z\d]+)*\.[a-z]{2,})$/i)) {
		return 'Недопустимый формат';
	}
	return '';
};
