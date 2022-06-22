import { Block } from '@/shared/core';
import { changeRoute, findParentElementByCondition } from '@/shared/utils';

import type { ChatListItemProps } from './chatListItem.types';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (!linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class ChatListItem extends Block<Omit<ChatListItemProps, 'id'> & { itemId: string } & BlockEvents> {
	static componentName = 'ChatListItem';

	constructor(props: ChatListItemProps) {
		super({ ...props, itemId: props.id, events: { click } });
	}

	render(): string {
		const { pathname } = window.location;
		const currentId = pathname.split('/').pop();

		const { itemId } = this.props;

		// language=hbs
		return `
			<div class="chat-list-item${itemId === currentId ? ' active' : ''}">
				<a href="/chat/{{itemId}}">
					<div class="mock-avatar"></div>
					<div class="chat-list-item-content">
						<div class="chat-list-item-content-wrapper">
							<div class="chat-list-item-content-top">
								<p class="text">{{name}}</p>
								<time class="subtext">{{lastMessageTime}}</time>
							</div>
							<div class="chat-list-item-content-message">
								<div>
									<p class="subtext">{{lastMessageText}}</p>
								</div>
								{{#if unreadCount}}
									<div class="chat-list-item-content-unread-count">
										<div>
											<p class="subtext">{{unreadCount}}</p>
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
