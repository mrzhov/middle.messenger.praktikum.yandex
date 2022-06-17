import '@/assets/styles/global.css';

// import { ServerErrorPage } from '@/pages/500';
import { HomePage } from '@/pages/home';
// import { NotFoundPage } from '@/pages/404';
// import { RegistryPage } from '@/pages/registry';
// import { LoginPage } from '@/pages/login';
import { renderDOM } from '@/shared/core';
import { registerComponents } from '@/shared/utils';

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
	// DEV: Раскомментировать нужную страницу для отображения

	// const App = new LoginPage();
	// const App = new RegistryPage();
	// const App = new NotFoundPage();
	// const App = new ServerErrorPage();
	const App = new HomePage();

	renderDOM(App);
});
