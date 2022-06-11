import Handlebars from 'handlebars';

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

	private element: Nullable<HTMLElement> = null;
	protected readonly props: P;
	private readonly eventBus: EventBus<Events>;

	protected constructor(props?: P) {
		this.eventBus = new EventBus<Events>();

		this.props = this.makePropsProxy(props || ({} as P));

		this.registerEvents(this.eventBus);

		this.eventBus.emit(Block.EVENTS.INIT);
	}

	private makePropsProxy(props: P): P {
		const self = this;
		return new Proxy(props as unknown as object, {
			get(target: Record<string, unknown>, p: string) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, p: string, value: unknown): boolean {
				target[p] = value;
				self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		}) as unknown as P;
	}

	private registerEvents(eventBus: EventBus<Events>) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this.flowRender.bind(this));
	}

	private init() {
		this.createResources();
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
	}

	private componentDidMount(props: P) {}

	private componentDidUpdate(oldProps: P, newProps: P) {
		if (!this.propsComparison(oldProps, newProps)) {
			return;
		}
		this.flowRender();
	}

	private flowRender() {
		const fragment = this.compile();

		// this._removeEvents();
		const newElement = fragment.firstElementChild!;

		this.element!.replaceWith(newElement);

		this.element = newElement as HTMLElement;
		// this._addEvents();
	}

	private createResources() {
		this.element = Block.createDocumentElement('div');
	}

	private propsComparison(oldProps: P, newProps: P) {
		return true;
	}

	private compile(): DocumentFragment {
		const fragment = document.createElement('template');

		/**
		 * Рендерим шаблон
		 */
		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template({
			// ...this.state,
			...this.props,
			// children: this.children,
			// refs: this.refs,
		});

		// /**
		//  * Заменяем заглушки на компоненты
		//  */
		// Object.entries(this.children).forEach(([id, component]) => {
		// 	/**
		// 	 * Ищем заглушку по id
		// 	 */
		// 	const stub = fragment.content.querySelector(`[data-id="${id}"]`);
		//
		// 	if (!stub) {
		// 		return;
		// 	}
		//
		// 	const stubChilds = stub.childNodes.length ? stub.childNodes : [];
		//
		// 	/**
		// 	 * Заменяем заглушку на component._element
		// 	 */
		// 	const content = component.getContent();
		// 	stub.replaceWith(content);
		//
		// 	/**
		// 	 * Ищем элемент layout-а, куда вставлять детей
		// 	 */
		// 	const layoutContent = content.querySelector('[data-layout="1"]');
		//
		// 	if (layoutContent && stubChilds.length) {
		// 		layoutContent.append(...stubChilds);
		// 	}
		// });

		/**
		 * Возвращаем фрагмент
		 */
		return fragment.content;
	}

	getContent(): HTMLElement {
		// Хак, чтобы вызвать CDM только после добавления в DOM
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
					this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
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

	abstract render(): string;
}

export default Block;
