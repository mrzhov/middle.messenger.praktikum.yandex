import { store } from '@/app';
import { Block } from '@/shared/core';
import { changeRoute, findParentElementByCondition, useParams } from '@/shared/utils';

import type { ChatListItemProps } from './chatListItem.types';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (!linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		store.setState({
			currentChat: null,
		});
		changeRoute(path);
	}
};

class ChatListItem extends Block<ChatListItemProps & BlockEvents> {
	static componentName = 'ChatListItem';

	constructor(props: ChatListItemProps) {
		super({ ...props, events: { click } });
	}

	render(): string {
		const { id } = useParams();
		const { itemId, avatar } = this.props;

		// language=hbs
		return `
			<div class="chat-list-item${String(itemId) === id ? ' active' : ''}">
				<a href="/chat/{{itemId}}">
					<div class="chat-list-item-avatar">
						{{#if ${Boolean(avatar)}}}
							<img src="${process.env.RESOURCES_URL}${avatar}" alt="Avatar">
						{{else}}
							<div class="mock-avatar"></div>
						{{/if}}
					</div>
					<div class="chat-list-item-content">
						<div class="chat-list-item-content-wrapper">
							<div class="chat-list-item-content-top">
								<p class="text">{{title}}</p>
								<time class="subtext">{{lastMessageTime}}</time>
							</div>
							<div class="chat-list-item-content-message">
								{{#if last_message}}
									<p class="subtext">{{last_message}}</p>
								{{else}}
									<p class="subtext">Здесь пока ничего нет...</p>
								{{/if}}
								{{#if unread_count}}
									<div class="chat-list-item-content-unread-count">
										<div>
											<p class="subtext">{{unread_count}}</p>
										</div>
									</div>
								{{/if}}
							</div>
						</div>
					</div>
				</a>
			</div>
		`;
	}
}

export default ChatListItem;
