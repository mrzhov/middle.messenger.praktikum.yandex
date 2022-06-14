import '@/assets/styles/global.css';

import { LoginPage } from '@/pages/login';
import { renderDOM } from '@/shared/core';
import { registerComponents } from '@/shared/utils';

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
	// DEV: Раскомментировать нужную страницу для отображения

	const App = new LoginPage();

	renderDOM(App);
});
