export const messageValidator = (value: string) => {
	if (!value) {
		return 'Пожалуйста, введите сообщение';
	}
	return '';
};
