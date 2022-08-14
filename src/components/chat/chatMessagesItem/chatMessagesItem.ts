import { store } from '@/app';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { toTimeTransformer } from '@/shared/utils';

import type { ChatMessagesItemProps } from './chatMessagesItem.types';

class ChatMessagesItem extends Block<ChatMessagesItemProps> {
	static componentName = 'ChatMessagesItem';

	constructor(props: ChatMessagesItemProps) {
		const time = toTimeTransformer(props.message.time);
		super({ ...props, message: { ...props.message, time } });
	}

	protected componentDidMount() {
		store.subscribe(state => {
			const { currentChat } = state;
			if (currentChat) {
				const author = currentChat.users.find(user => user.id === this.props.message.user_id);
				if (author) {
					const authorName = `${author.first_name} ${author.second_name}`;
					this.setState({
						authorName,
					});
				}
			}
		}, 'currentChat');
	}

	render(): string {
		// language=hbs
		return `
			<div class="message-item">
				{{#if authorName}}
					<div class="mock-avatar small"></div>
					<div class="message-item-content">
						<div class="message-item-content-top">
							<p class="message-item-author">{{authorName}}</p>
							<div class="message-item-time-container">
								{{#if (eq message.is_read true)}}
									${icons.doubleCheck}
								{{/if}}
								<time class="subtext">{{message.time}}</time>
							</div>
						</div>
						<div class="message-item-content-message">
							<p class="message-item-text">{{message.content}}</p>
						</div>
					</div>
				{{/if}}
			</div>
    `;
	}
}

export default ChatMessagesItem;
