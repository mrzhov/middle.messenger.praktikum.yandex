import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import type { Message } from '@/shared/types';

class ChatMessagesItem extends Block<Message> {
	constructor(props: Message) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="message-item">
				<div class="mock-avatar small"></div>
				<div class="message-item-content">
					<div class="message-item-content-top">
						<p class="message-item-author">{{author}}</p>
						<div class="message-item-time-container">
							{{#if (eq read 'true')}}
								${icons.doubleCheck}
							{{/if}}
							<time class="subtext">{{time}}</time>
						</div>
					</div>
					<div class="message-item-content-message">
						<p class="message-item-text">{{text}}</p>
					</div>
				</div>
			</div>
    `;
	}
}

export default ChatMessagesItem;
