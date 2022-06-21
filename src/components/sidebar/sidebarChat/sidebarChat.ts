import { Block } from '@/shared/core';

import content from './sidebarChat.content';

class SidebarChat extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			chatList: content.mockChatList,
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top">
					{{{Search}}}
				</div>
				<div class="chat-list">
					{{#each chatList}}
						{{{ChatListItem
							id=this.id
							name=this.name
							unreadCount=this.unreadCount
							lastMessageText=this.lastMessage.text
							lastMessageTime=this.lastMessage.time
						}}}
					{{/each}}
				</div>
				{{{Navigation}}}
			</div>
		`;
	}
}

export default SidebarChat;
