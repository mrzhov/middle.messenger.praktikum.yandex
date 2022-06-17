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
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<span>Поиск</span>
					</label>
				</div>
			</div>
		`;
	}
}

export default Search;
