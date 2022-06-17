import { Block } from '@/shared/core';
import type { PropsWithPageId } from '@/shared/types';

class SidebarChat extends Block<PropsWithPageId> {
	constructor(props: PropsWithPageId) {
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
