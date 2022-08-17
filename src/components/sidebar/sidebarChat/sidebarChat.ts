import { store } from '@/app';
import { ChatService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class SidebarChat extends Block {
	static componentName = 'SidebarChat';

	constructor() {
		super();
	}

	async componentDidMount() {
		store.subscribe(state => {
			this.setState({
				chats: state.chats
					? state.chats.map(chat => ({
							...chat,
							unread_count: String(chat.unread_count),
							last_message: JSON.stringify(chat.last_message),
					  }))
					: state.chats,
			});
		}, 'chats');
		const chatService = new ChatService();
		await chatService.getAndSetChats();
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top border-bottom">
					<div class="w-full h-full flex-center relative">
						<div class="app-logo">
							${icons.logo}
							<h2>Messenger</h2>
						</div>
						<div class="sidebar-top-create-btn-container">
							{{{CreateChatDropdown}}}
						</div>
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
