import { Button } from '@/components/button';
import { ErrorPageContent } from '@/components/errorPageContent';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { Search } from '@/components/sidebar/chat/search';
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
};
