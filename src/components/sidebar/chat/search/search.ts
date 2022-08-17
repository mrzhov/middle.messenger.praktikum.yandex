import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class Search extends Block {
	static componentName = 'Search';

	constructor() {
		super({
			events: {
				submit: (event: SubmitEvent) => {
					event.preventDefault();
					const form = event.target as HTMLFormElement;
					const input = form.querySelector('input')!;
					console.log('submit', input.value);
				},
			},
		});
	}

	protected getStateFromProps() {
		this.state = {
			showCloseBtn: true,
			onClose: () => {
				console.log('Close Search');
			},
		};
	}

	render(): string {
		const { showCloseBtn } = this.state;

		// language=hbs
		return `
			<form class="search-form">
				<div class="search-form-field ${showCloseBtn ? 'showCloseBtn' : ''}">
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
					{{{Button
						icon="closeModal"
						onClick=onClose
					}}}
				</div>
			</form>
		`;
	}
}

export default Search;
