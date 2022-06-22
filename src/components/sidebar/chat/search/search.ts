import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class Search extends Block {
	static componentName = 'Search';

	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			<div class="flex items-center justify-between space-x-2">
				<div class="search-form-field">
					<input
						id="search"
						type="text"
						name="search"
						placeholder="Поиск"
					/>
					<label for="search">
						${icons.search}
						<span>Поиск</span>
					</label>
				</div>
				<button class="btn-icon w-10 h-10">${icons.pencil}</button>
			</div>
		`;
	}
}

export default Search;
