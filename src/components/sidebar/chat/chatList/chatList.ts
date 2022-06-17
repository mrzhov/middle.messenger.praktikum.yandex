import { Block } from '@/shared/core';

import chatListContent from './chatList.content';

class ChatList extends Block {
	protected getStateFromProps() {
		this.state = {
			chatList: chatListContent.mockChatList,
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="chat-list">
				{{#each chatList}}
					<div class="chat-list-item {{#if this.selected}}selected{{/if}}">
						<div class="mock-avatar"></div>
						<div class="chat-list-item-content">
							<div class="chat-list-item-content-wrapper">
								<div class="chat-list-item-content-top">
									<p class="text">{{this.name}}</p>
									<p class="subtext">{{this.lastMessage.time}}</p>
								</div>
								<div class="chat-list-item-content-message">
									<div>
										<p class="subtext">{{this.lastMessage.text}}</p>
									</div>
									{{#if this.unreadCount}}
										<div class="chat-list-item-content-unread-count">
											<div>
												<p class="subtext">{{this.unreadCount}}</p>
											</div>
										</div>
									{{/if}}
								</div>
							</div>
						</div>
					</div>
				{{/each}}
			</div>
		`;
	}
}

export default ChatList;
