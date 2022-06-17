import { Block } from '@/shared/core';

class SidebarChat extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top">
					{{{Search}}}
				</div>
			</div>
		`;
	}
}

export default SidebarChat;
