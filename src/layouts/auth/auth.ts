import { Block } from '@/shared/core';

class AuthLayout extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			<div>
				<div class="bg-img-container">
					<canvas class="bg-img" width="50" height="50"></canvas>
				</div>
				<div data-layout></div>
			</div>
    `;
	}
}

export default AuthLayout;
