export type WeeksKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeeksValues = 'Вс' | 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб';

export const weeks: Record<WeeksKeys, WeeksValues> = {
	0: 'Вс',
	1: 'Пн',
	2: 'Вт',
	3: 'Ср',
	4: 'Чт',
	5: 'Пт',
	6: 'Сб',
};
