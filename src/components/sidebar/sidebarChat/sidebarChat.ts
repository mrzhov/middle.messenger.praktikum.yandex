import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

class SidebarChat extends Block<TitleAndPageId['pageId']> {
	constructor(props: TitleAndPageId['pageId']) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full">
				<div class="sidebar-top">
					{{{Search}}}
				</div>
				{{{ChatList}}}
				{{{Navigation pageId=pageId}}}
			</div>
		`;
	}
}

export default SidebarChat;
