import { registerComponents } from './registerComponents';
import { registerHelpers } from './registerHelpers';

export const registerData = () => {
	registerHelpers();
	registerComponents();
};
