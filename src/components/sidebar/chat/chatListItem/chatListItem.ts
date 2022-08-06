import { Block } from '@/shared/core';
import { changeRoute, findParentElementByCondition, useParams } from '@/shared/utils';

import type { ChatListItemProps } from './chatListItem.types';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (!linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class ChatListItem extends Block<Omit<ChatListItemProps, 'id'> & { itemId: number } & BlockEvents> {
	static componentName = 'ChatListItem';

	constructor(props: ChatListItemProps) {
		super({ ...props, itemId: props.id, events: { click } });
	}

	render(): string {
		const { id } = useParams();
		const { itemId } = this.props;

		// language=hbs
		return `
			<div class="chat-list-item${String(itemId) === id ? ' active' : ''}">
				<a href="/chat/{{itemId}}">
					<div class="mock-avatar"></div>
					<div class="chat-list-item-content">
						<div class="chat-list-item-content-wrapper">
							<div class="chat-list-item-content-top">
								<p class="text">{{title}}</p>
								<time class="subtext">{{lastMessageTime}}</time>
							</div>
							<div class="chat-list-item-content-message">
								<div>
									<p class="subtext">{{lastMessageContent}}</p>
								</div>
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
