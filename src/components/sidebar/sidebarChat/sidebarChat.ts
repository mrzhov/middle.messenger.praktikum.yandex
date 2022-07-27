import { mockChatList } from '@/shared/content';
import { Block } from '@/shared/core';

class SidebarChat extends Block {
	static componentName = 'SidebarChat';

	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			chatList: mockChatList,
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top pr-1">
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
