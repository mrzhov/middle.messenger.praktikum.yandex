import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { transformElementAndEvents } from '@/shared/utils';

import EventBus from './EventBus';

type Events = Values<typeof Block.EVENTS>;

abstract class Block<P = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	static createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	id: string = nanoid(6);
	element: Nullable<HTMLElement> = null;
	readonly #eventBus: () => EventBus<Events>;
	protected props: P;
	protected state: any = {};
	protected children: Record<string, Block> = {};
	protected refs: Record<string, HTMLElement> = {};

	#meta: {
		lastCssDisplayProperty: Nullable<string>;
	};

	protected constructor(props?: P) {
		this.#meta = {
			lastCssDisplayProperty: null,
		};

		const eventBus = new EventBus<Events>();
		this.#eventBus = () => eventBus;

		this.props = this.#makeProxy(props || ({} as P));

		this.getStateFromProps();

		this.state = this.#makeProxy(this.state);

		this.#registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	#makeProxy(props: P): P {
		const self = this;
		return new Proxy(props as unknown as object, {
			get(target: Record<string, unknown>, p: string) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, p: string, value: unknown): boolean {
				target[p] = value;
				self.#eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		}) as unknown as P;
	}

	#registerEvents(eventBus: EventBus<Events>) {
		eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this.#flowRender.bind(this));
	}

	#init() {
		this.#createResources();
		this.#eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	#componentDidMount() {
		this.componentDidMount();
	}

	protected componentDidMount() {}

	#componentDidUpdate() {
		if (!this.componentDidUpdate()) {
			return;
		}
		this.#flowRender();
	}

	protected componentDidUpdate() {
		return true;
	}

	#flowRender() {
		const fragment = this.#compile();

		this.#removeEvents();
		const newElement = fragment.firstElementChild!;

		this.element!.replaceWith(newElement);

		this.element = newElement as HTMLElement;
		this.#addEvents();
	}

	#createResources() {
		this.element = Block.createDocumentElement('div');
	}

	#compile(): DocumentFragment {
		const fragment = document.createElement('template');

		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template({
			...this.state,
			...this.props,
			children: this.children,
			refs: this.refs,
		});

		Object.entries(this.children).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`[data-id="${id}"]`);

			if (!stub) {
				return;
			}

			const stubChilds = stub.childNodes.length ? stub.childNodes : [];

			const content = component.getContent();
			stub.replaceWith(content);

			const layoutContent = content.querySelector('[data-layout]');

			if (layoutContent && stubChilds.length) {
				layoutContent.append(...stubChilds);
			}
		});

		return fragment.content;
	}

	#addEvents() {
		const { events } = this.props as any;

		if (!events) {
			return;
		}

		const { onlyEvents, element } = transformElementAndEvents(events, this.element);

		if (element) {
			Object.entries(onlyEvents).forEach(([event, listener]) => {
				element.addEventListener(event, listener as () => any);
			});
		}
	}

	#removeEvents() {
		const { events } = this.props as any;

		if (!events || !this.element) {
			return;
		}

		const { onlyEvents, element } = transformElementAndEvents(events, this.element);

		if (element) {
			Object.entries(onlyEvents).forEach(([event, listener]) => {
				element.removeEventListener(event, listener as () => any);
			});
		}
	}

	getContent(): HTMLElement {
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
					this.#eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
				}
			}, 100);
		}

		return this.element!;
	}

	setProps(nextProps: P) {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	setState = (nextState: any) => {
		if (!nextState) {
			return;
		}

		Object.assign(this.state, nextState);
	};

	show() {
		let cssDisplayProperty: string;
		if (this.element?.style.display !== 'none') {
			cssDisplayProperty = this.#meta.lastCssDisplayProperty ?? '';
		} else {
			cssDisplayProperty = '';
		}

		if (this.element) {
			this.element.style.display = cssDisplayProperty;
		}
	}

	hide() {
		if (!this.element) {
			return;
		}

		if (this.element.style.display !== 'none') {
			this.#meta.lastCssDisplayProperty = this.element.style.display;
		}
		this.element.style.display = 'none';

		setTimeout(() => {
			this.destroy();
		}, 300);
	}

	public destroy() {
		if (this.element) {
			this.element.remove();
			this.onDestroy();
		}
	}

	protected onDestroy() {}

	protected getStateFromProps(): void {
		this.state = {};
	}

	abstract render(): string;
}

export default Block;
