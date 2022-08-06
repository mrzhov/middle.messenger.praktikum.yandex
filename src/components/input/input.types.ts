export type InputVariant = 'standard' | 'standard-black' | 'gradient' | 'chat-message';

export type InputProps = {
	variant?: InputVariant;
	name: string;
	label: string;
	type?: 'text' | 'password' | 'email';
	value?: string;
	error?: string;
	onFocus: (event: any) => void;
	onBlur: (event: any) => void;
} & BlockEvents;
