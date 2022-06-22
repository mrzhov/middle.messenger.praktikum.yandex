import type { HelperOptions } from 'handlebars';
import Handlebars from 'handlebars';

function registerComponent<Props extends any>(Component: BlockConstructable<Props>) {
	Handlebars.registerHelper(
		Component.componentName,
		function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
			if (!data.root.children) {
				data.root.children = {};
			}

			if (!data.root.refs) {
				data.root.refs = {};
			}

			const { children, refs } = data.root;

			(Object.keys(hash) as any).forEach((key: keyof Props) => {
				if (this[key]) {
					hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
				}
			});

			const component = new Component(hash);

			children[component.id] = component;

			if (ref) {
				refs[ref] = component.getContent();
			}

			const contents = fn ? fn(this) : '';

			return `<div data-id="${component.id}">${contents}</div>`;
		}
	);
}

export default registerComponent;
