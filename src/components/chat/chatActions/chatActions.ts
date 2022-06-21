import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class ChatActions extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
      <div class="chat-actions">
				<div class="flex items-center h-full">
					<button class="btn-icon">${icons.staple}</button>
					<div class="grow"></div>
					<button class="btn-icon w-10 h-10">${icons.send}</button>
				</div>
			</div>
    `;
	}
}

export default ChatActions;
