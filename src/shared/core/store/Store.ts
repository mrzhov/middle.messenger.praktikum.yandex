import EventBus from '@/shared/core/EventBus';
import { cloneDeep, isEqual, merge } from '@/shared/utils';

import type { StoreEvents, StoreState, StoreSubscribers } from './Store.types';

export class Store {
	static EVENTS = {
		INIT: 'init',
		STORE_DM: 'flow:store-did-mount',
		STORE_DU: 'flow:store-did-update',
		STORE_EMIT: 'flow:store-emit',
	};

	static #instance: Store;
	readonly #eventBus: () => EventBus<StoreEvents>;
	readonly #state: StoreState;
	subscribers: StoreSubscribers;

	constructor(initialState: StoreState) {
		const eventBus = new EventBus<StoreEvents>();
		this.#eventBus = () => eventBus;

		this.#state = this.#makeProxy(initialState);
		this.subscribers = {};

		this.#registerEvents(eventBus);
		eventBus.emit(Store.EVENTS.INIT);
	}

	static getInstance(initialState?: StoreState): Store {
		if (this.#instance) {
			return this.#instance;
		}
		if (!initialState) {
			throw Error('First initialization required initial state!');
		}
		this.#instance = new Store(initialState);
		return this.#instance;
	}

	#makeProxy(obj: StoreState) {
		const self = this;
		return new Proxy<StoreState>(obj, {
			set(target: StoreState, p: Keys<StoreState>, value: any): boolean {
				const oldState = cloneDeep(self.#state);
				target[p] = value;
				self.#eventBus().emit(Store.EVENTS.STORE_DU, oldState, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	#registerEvents(eventBus: EventBus<StoreEvents>) {
		eventBus.on(Store.EVENTS.INIT, this.#init.bind(this));
		eventBus.on(Store.EVENTS.STORE_DM, this.#storeDidMount.bind(this));
		eventBus.on(Store.EVENTS.STORE_DU, this.#storeDidUpdate.bind(this));
		eventBus.on(Store.EVENTS.STORE_EMIT, this.#emit.bind(this));
	}

	#init() {
		this.#eventBus().emit(Store.EVENTS.STORE_DM);
	}

	#storeDidMount() {
		this.storeDidMount();
	}

	#storeDidUpdate(oldState: StoreState, newState: StoreState) {
		if (this.storeDidUpdate(oldState, newState)) {
			this.#eventBus().emit(Store.EVENTS.STORE_EMIT);
		}
	}

	#emit() {
		Object.values(this.subscribers).forEach(subscriber => {
			subscriber(this.#state);
		});
	}

	storeDidMount() {}

	storeDidUpdate(oldState: StoreState = {}, newState: StoreState = {}): boolean {
		return !isEqual(oldState, newState);
	}

	setState(newState: StoreState) {
		if (!newState) {
			return;
		}
		const merged = merge(cloneDeep<any>(this.#state), newState);
		Object.assign(this.#state, merged);
	}

	getState() {
		return this.#state;
	}

	subscribe(subscriber: (state: StoreState) => void, id: string) {
		this.subscribers[id] = subscriber;
		subscriber(this.#state);
	}
}
