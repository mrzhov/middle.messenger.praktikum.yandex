import { Button } from '@/components/button';
import { ChatActionsDropdown } from '@/components/chat/chatActionsDropdown';
import { ChatBottomActions } from '@/components/chat/chatBottomActions';
import { ChatMessagesItem } from '@/components/chat/chatMessagesItem';
import { ErrorPageContent } from '@/components/errorPageContent';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { Loader } from '@/components/loader';
import { CreateDialogModal } from '@/components/modals/createDialogModal';
import { CreateGroupModal } from '@/components/modals/createGroupModal';
import { ChatListItem } from '@/components/sidebar/chat/chatListItem';
import { Search } from '@/components/sidebar/chat/search';
import { CreateChatDropdown } from '@/components/sidebar/createChatDropdown';
import { Navigation } from '@/components/sidebar/navigation';
import { CategoryItem } from '@/components/sidebar/settings/categoryItem';
import { Profile } from '@/components/sidebar/settings/profile';
import { SidebarChat } from '@/components/sidebar/sidebarChat';
import { SidebarSettings } from '@/components/sidebar/sidebarSettings';
import { Toast } from '@/components/toast';
import { AuthLayout } from '@/layouts/auth';
import { BaseLayout } from '@/layouts/base';
import { registerComponent } from '@/shared/core/utils';

export const registerComponents = () => {
	registerComponent(AuthLayout);
	registerComponent(BaseLayout);
	registerComponent(Button);
	registerComponent(Link);
	registerComponent(Input);
	registerComponent(ErrorPageContent);
	registerComponent(SidebarChat);
	registerComponent(SidebarSettings);
	registerComponent(Search);
	registerComponent(Navigation);
	registerComponent(Profile);
	registerComponent(CategoryItem);
	registerComponent(ChatListItem);
	registerComponent(ChatBottomActions);
	registerComponent(ChatMessagesItem);
	registerComponent(Toast);
	registerComponent(CreateGroupModal);
	registerComponent(CreateDialogModal);
	registerComponent(Loader);
	registerComponent(ChatActionsDropdown);
	registerComponent(CreateChatDropdown);
};
