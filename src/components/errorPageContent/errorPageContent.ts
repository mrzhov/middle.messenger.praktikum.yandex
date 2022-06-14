import { Block } from '@/shared/core';
import type { ErrorPageContentProps } from '@/shared/types';

class ErrorPageContent extends Block<ErrorPageContentProps> {
	constructor(props: ErrorPageContentProps) {
		super(props);
	}

	render(): string {
		const { title, subtitle, linkText, linkHref } = this.props;

		// language=hbs
		return `
			<main class="h-screen flex-center flex-col space-y-4">
				<div class="text-center space-y-1">
					<p class="text-4xl">${title}</p>
					<p class="text-xl">${subtitle}</p>
				</div>
				<div class="flex-center">
					{{{Link
						text="${linkText}"
						href="${linkHref}"
					}}}
				</div>
			</main>
		`;
	}
}

export default ErrorPageContent;
