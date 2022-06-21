import { Block } from '@/shared/core';

class ChatMessages extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
      <div class="chat-messages">
				Messages
			</div>
    `;
	}
}

export default ChatMessages;
