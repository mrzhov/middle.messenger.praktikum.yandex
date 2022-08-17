import { store } from '@/app';
import { Block } from '@/shared/core';
import type { Chat } from '@/shared/types';
import {
	changeRoute,
	dateTimeTransformer,
	findParentElementByCondition,
	useParams,
} from '@/shared/utils';

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

class ChatListItem extends Block<
	Omit<ChatListItemProps, 'last_message'> & Pick<Chat, 'last_message'> & BlockEvents
> {
	static componentName = 'ChatListItem';

	constructor(props: ChatListItemProps) {
		const last_message = JSON.parse(props.last_message) as Chat['last_message'];
		if (last_message) {
			last_message.time = dateTimeTransformer(last_message.time);
		}
		super({
			...props,
			unread_count: Number(props.unread_count),
			last_message,
			events: { click },
		});
	}

	render(): string {
		const { id } = useParams();
		const { itemId, avatar } = this.props;

		if (this.props.last_message) {
			dateTimeTransformer(this.props.last_message.time);
		}

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
								{{#if last_message}}
									<time class="subtext">{{last_message.time}}</time>
								{{/if}}
							</div>
							<div class="chat-list-item-content-message">
								{{#if last_message}}
									<p class="subtext">{{last_message.content}}</p>
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
