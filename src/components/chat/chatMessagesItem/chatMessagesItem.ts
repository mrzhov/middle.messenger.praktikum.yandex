import { store } from '@/app';
import { ResourcesService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { formatBytes, toTimeTransformer } from '@/shared/utils';

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

	protected getStateFromProps() {
		this.state = {
			linkClickHandler: async () => {
				if ('file' in this.props.message && this.props.message.file) {
					const { path, filename } = this.props.message.file;
					const resourcesService = new ResourcesService();
					await resourcesService.downloadResource(path, filename);
				}
			},
		};
	}

	render(): string {
		const { message } = this.props;
		const content_size =
			'file' in message && message.file ? formatBytes(message.file.content_size, 0) : '';

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
							{{#if message.file}}
								<div class="flex mt-1">
									<div class="message-item-file-icon">
										${icons.file}
									</div>
									<div class="flex flex-col justify-center">
										<p class="message-item-text">{{message.file.filename}}</p>
										<div class="flex items-center mt-2px">
											<p class="message-item-subtext">${content_size}&nbsp;-&nbsp;</p>
											{{{Link
												text="Загрузить"
												href="/registry"
												onClick=linkClickHandler
												classes="link-small"
											}}}
										</div>
									</div>
								</div>
							{{else}}
								<p class="message-item-text">{{message.content}}</p>
							{{/if}}
						</div>
					</div>
				{{/if}}
			</div>
    `;
	}
}

export default ChatMessagesItem;
