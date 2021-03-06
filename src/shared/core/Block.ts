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
	private element: Nullable<HTMLElement> = null;
	private readonly eventBus: () => EventBus<Events>;
	protected props: P;
	protected state: any = {};
	protected children: Record<string, Block> = {};
	protected refs: Record<string, HTMLElement> = {};

	protected constructor(props?: P) {
		const eventBus = new EventBus<Events>();
		this.eventBus = () => eventBus;

		this.getStateFromProps();

		this.props = this.makeProxy(props || ({} as P));
		this.state = this.makeProxy(this.state);

		this.registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	private makeProxy(props: P): P {
		const self = this;
		return new Proxy(props as unknown as object, {
			get(target: Record<string, unknown>, p: string) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, p: string, value: unknown): boolean {
				target[p] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
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
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
	}

	private componentDidMount() {}

	private componentDidUpdate() {
		if (!Block.propsComparison()) {
			return;
		}
		this.flowRender();
	}

	private flowRender() {
		const fragment = this.compile();

		this.removeEvents();
		const newElement = fragment.firstElementChild!;

		this.element!.replaceWith(newElement);

		this.element = newElement as HTMLElement;
		this.addEvents();
	}

	private createResources() {
		this.element = Block.createDocumentElement('div');
	}

	private static propsComparison() {
		return true;
	}

	private compile(): DocumentFragment {
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

	private addEvents() {
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

	private removeEvents() {
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
					this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
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

	protected getStateFromProps(): void {
		this.state = {};
	}

	abstract render(): string;
}

export default Block;
