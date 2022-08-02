import type { Store } from './Store';

export type StoreEvents = Values<typeof Store.EVENTS>;
export type StoreState = IObject;
export type StoreSubscribers = Record<string, (state: StoreState) => void>;
