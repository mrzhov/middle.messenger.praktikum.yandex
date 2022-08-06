import { store } from '@/app';
import { ChatService } from '@/services';
import { Block } from '@/shared/core';
import { openCreateChatModal } from '@/shared/utils';

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
			openCreateChatModal: () => {
				openCreateChatModal();
			},
		};
	}

	// TODO: last_message может быть null, поэтому не передаются его поля и падает ошибка

	render(): string {
		const { chats } = this.state;
		console.log(chats);
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top pr-1">
					<div class="flex items-center justify-between space-x-2">
						{{{Search}}}
						{{{Button
							icon="pencil"
							onClick=openCreateChatModal
						}}}
					</div>
				</div>
				<div class="chat-list">
					{{#if this.chats}}
						{{#each this.chats}}
							{{{ChatListItem
								id=this.id
								title=this.title
								avatar=this.avatar
								unread_count=this.unread_count
								lastMessageTime=this.last_message.time
								lastMessageContent=this.last_message.content
							}}}
						{{/each}}
					{{else}}
						loading...
					{{/if}}
				</div>
				{{{Navigation}}}
			</div>
		`;
	}
}

export default SidebarChat;
