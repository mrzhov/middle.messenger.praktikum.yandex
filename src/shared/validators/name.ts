export const nameValidator = (value: string, field: 'имя' | 'фамилию') => {
	if (!value) {
		return `Пожалуйста, введите ${field}`;
	}
	const firstChar = value.slice(0, 1);
	if (firstChar !== firstChar.toUpperCase()) {
		if (field === 'имя') {
			return `${field.replace('и', 'И')} должно начинаться с заглавной буквы`;
		}
		if (field === 'фамилию') {
			return `${field.replace('ф', 'Ф').replace('ю', 'я')} должна начинаться с заглавной буквы`;
		}
	}
	if (!value.match(/^[a-zа-я-]+$/gi)) {
		return 'Недопустимый формат';
	}
	return '';
};
