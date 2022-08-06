import { store } from '@/app';
import { ChatService } from '@/services';
import { mockChatList } from '@/shared/content';
import { Block } from '@/shared/core';

class SidebarChat extends Block {
	static componentName = 'SidebarChat';

	constructor() {
		super();
	}

	async componentDidMount() {
		store.subscribe(state => {
			this.setState({
				chats: state.chats,
			});
		}, 'chats');
		const chatService = new ChatService();
		await chatService.getChats();
	}

	protected getStateFromProps() {
		this.state = {
			chatList: mockChatList,
		};
	}

	render(): string {
		const { chats } = this.state;
		console.log(chats);
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
