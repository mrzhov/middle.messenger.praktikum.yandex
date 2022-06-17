import '@/assets/styles/global.css';

import { ProfilePage } from '@/pages/profile';
// import { ChangePasswordPage } from '@/pages/changePassword';
// import { ExitWarningPage } from '@/pages/exitWarning';
// import { ServerErrorPage } from '@/pages/500';
// import { HomePage } from '@/pages/home';
// import { NotFoundPage } from '@/pages/404';
// import { RegistryPage } from '@/pages/registry';
// import { LoginPage } from '@/pages/login';
import { renderDOM } from '@/shared/core';
import { registerComponents, registerHelpers } from '@/shared/utils';

registerHelpers();
registerComponents();

document.addEventListener('DOMContentLoaded', () => {
	// DEV: Раскомментировать нужную страницу для отображения

	// const App = new LoginPage();
	// const App = new RegistryPage();
	// const App = new NotFoundPage();
	// const App = new ServerErrorPage();
	// const App = new HomePage();
	const App = new ProfilePage();
	// const App = new ChangePasswordPage();
	// const App = new ExitWarningPage();

	renderDOM(App);
});
