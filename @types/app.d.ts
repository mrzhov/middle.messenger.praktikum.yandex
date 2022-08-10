import type Block from '@/shared/core';

declare global {
	export type IObject<T = unknown> = Record<string, T>;
	export type Nullable<T> = T | null;
	export type Keys<T extends IObject> = keyof T;
	export type Values<T extends IObject> = T[Keys<T>];
	export interface BlockConstructable<Props = any> {
		new (props: Props): Block;
	}
	export interface BlockConstructableWithComponentName<Props = any> {
		componentName: string;
		new (props: Props): Block;
	}
	export type BlockEvents = {
		events: Record<string, ((...args: any) => any) | string>;
	};
	export type State<T extends string> = {
		values: Record<T, string>;
		errors: Record<T, string>;
	};
	export type StringBoolean = 'true' | 'false';
}

export {};
