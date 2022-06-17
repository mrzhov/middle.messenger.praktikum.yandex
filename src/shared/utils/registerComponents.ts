import { Button } from '@/components/button';
import { ErrorPageContent } from '@/components/errorPageContent';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { ChatList } from '@/components/sidebar/chat/chatList';
import { Search } from '@/components/sidebar/chat/search';
import { Navigation } from '@/components/sidebar/navigation';
import { SidebarChat } from '@/components/sidebar/sidebarChat';
import { AuthLayout } from '@/layouts/auth';
import { BaseLayout } from '@/layouts/base';
import { registerComponent } from '@/shared/core';

export default () => {
	registerComponent(AuthLayout);
	registerComponent(BaseLayout);
	registerComponent(Button);
	registerComponent(Link);
	registerComponent(Input);
	registerComponent(ErrorPageContent);
	registerComponent(SidebarChat);
	registerComponent(Search);
	registerComponent(ChatList);
	registerComponent(Navigation);
};
