import { registerComponents } from './registerComponents';
import { registerHelpers } from './registerHelpers';

export { registerComponent } from './registerComponent';
export { renderComponent } from './renderComponent';

export const registerData = () => {
	registerHelpers();
	registerComponents();
};
