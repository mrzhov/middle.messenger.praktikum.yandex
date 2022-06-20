import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class Search extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			<div class="search">
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
			</div>
		`;
	}
}

export default Search;
