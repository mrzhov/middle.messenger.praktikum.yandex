export const requiredValidator = (value: string) => {
	if (!value) {
		return 'Поле является обязательным';
	}
	return '';
};
