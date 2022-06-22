export type InputProps = {
	variant?: 'standard' | 'gradient' | 'chat-message';
	name: string;
	label: string;
	type?: 'text' | 'password' | 'email';
	value?: string;
	error?: string;
	onFocus: (event: any) => void;
	onBlur: (event: any) => void;
} & BlockEvents;
