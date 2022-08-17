import Handlebars from 'handlebars';

export const registerHelpers = () => {
	Handlebars.registerHelper('eq', (a, b) => a === b);
};
