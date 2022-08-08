import { store } from '@/app';
import { ChatService } from '@/services';
import { Block } from '@/shared/core';
import { openCreateChatModal, useParams } from '@/shared/utils';

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
		const { id } = useParams();
		const chatService = new ChatService();
		chatService.getChats().then(() => {
			if (id) {
				chatService.getCurrentChat(id);
			}
		});
	}

	protected getStateFromProps() {
		this.state = {
			openCreateChatModal: () => {
				openCreateChatModal();
			},
		};
	}

	render(): string {
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
								itemId=this.id
								title=this.title
								avatar=this.avatar
								unread_count=this.unread_count
								last_message=this.last_message
							}}}
						{{/each}}
					{{else}}
						<div class="h-full flex-center">{{{Loader}}}</div>
					{{/if}}
				</div>
				{{{Navigation}}}
			</div>
		`;
	}
}

export default SidebarChat;
