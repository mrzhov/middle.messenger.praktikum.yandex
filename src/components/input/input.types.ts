export type InputProps = {
	name: string;
	label: string;
	type?: 'text' | 'password' | 'email';
	value?: string;
	error?: string;
	onChange?: () => void;
	variant?: 'standard' | 'gradient';
};
