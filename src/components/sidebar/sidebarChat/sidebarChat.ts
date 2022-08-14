import { store } from '@/app';
import { ChatService } from '@/services';
import { Block } from '@/shared/core';

class SidebarChat extends Block {
	static componentName = 'SidebarChat';

	constructor() {
		super();
	}

	async componentDidMount() {
		store.subscribe(state => {
			this.setState({
				chats: !state.chats
					? null
					: state.chats.map(chat => ({
							...chat,
							unread_count: String(chat.unread_count),
							last_message: JSON.stringify(chat.last_message),
					  })),
			});
		}, 'chats');
		const chatService = new ChatService();
		await chatService.getAndSetChats();
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top pr-1">
					<div class="flex items-center justify-between space-x-2">
						{{{Search}}}
						{{{CreateChatDropdown}}}
					</div>
				</div>
				<div class="chat-list">
					{{#if this.chats.length}}
						{{#each this.chats}}
							{{{ChatListItem
								itemId=this.id
								title=this.title
								avatar=this.avatar
								unread_count=this.unread_count
								last_message=this.last_message
							}}}
						{{/each}}
					{{else}}
						<div class="h-full flex-center">
							<p class="text">Начните общение, создайте чат!</p>
						</div>
					{{/if}}
				</div>
				{{{Navigation}}}
			</div>
		`;
	}
}

export default SidebarChat;
