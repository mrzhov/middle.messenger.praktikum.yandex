import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { changeRoute } from '@/shared/utils';

import type { CategoryItemProps } from './categoryItem.types';

const getBgColor = (iconName: CategoryItemProps['iconName']) => {
	if (iconName === 'changePassword') return 'bg-orange';
	if (iconName === 'exitWarning') return 'bg-red';
	return '';
};

const click = (event: MouseEvent) => {
	event.preventDefault();
	const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
	changeRoute(path);
};

class CategoryItem extends Block<CategoryItemProps> {
	constructor(props: CategoryItemProps) {
		super({ ...props, events: { click } });
	}

	render(): string {
		const { iconName } = this.props;
		const bgColor = getBgColor(iconName);

		// language=hbs
		return `
			<a href="{{href}}">
				<div class="flex items-center">
					<div class="flex-center sidebar-categories-item-icon ${bgColor}">
						${icons[iconName]}
					</div>
					<p class="text">{{text}}</p>
				</div>
				<div class="sidebar-settings-arrow">
					${icons.arrowRight}
				</div>
			</a>
		`;
	}
}

export default CategoryItem;
