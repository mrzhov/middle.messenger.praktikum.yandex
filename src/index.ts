import '@/assets/styles/global.css';

import { changeRoute, registerComponents, registerHelpers, routingListener } from '@/shared/utils';

registerHelpers();
registerComponents();
routingListener();

document.addEventListener('DOMContentLoaded', () => {
	changeRoute('/chat/3');
});
