import { icons, mockChatList } from '@/shared/content';
import { Block } from '@/shared/core';
import { useParams } from '@/shared/utils';

import type { ChatProps } from './chat.types';

const getChatInfo = (id: string) => mockChatList.find(item => item.id === id);

class ChatPage extends Block {
	constructor(props: ChatProps) {
		super(props);
	}

	protected getStateFromProps() {
		const { id } = useParams();
		console.log(id);
		this.state = {
			chatInfo: getChatInfo(id),
		};
	}

	render(): string {
		const { chatInfo } = this.state;

		// language=hbs
		return `
			{{#BaseLayout}}
				<main class="flex flex-col h-full">
					<header class="page-header flex items-center justify-between">
						<div class="flex-center">
							<div class="mock-avatar small"></div>
							<h3 class="text">${chatInfo.name}</h3>
						</div>
						<button class="btn-icon w-10 h-10">${icons.dots}</button>
					</header>
					<div class="chat-messages">
						<div class="space-y-2">
							{{#each chatInfo.sortedMessages}}
								<div class="chat-messages-item space-y-2">
									<div class="chat-messages-item-date">
										<p class="subtext">{{this.date}}</p>
									</div>
									<div class="space-y-4">
										{{#each this.messages}}
											{{{ChatMessagesItem
												author=this.author
												time=this.time
												text=this.text
												read=this.read
											}}}
										{{/each}}
									</div>
								</div>
							{{/each}}
						</div>
					</div>
					{{{ChatActions}}}
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChatPage;
