import { Block } from '@/shared/core';
import type { ErrorPageContentProps } from '@/shared/types';
import { changeRoute } from '@/shared/utils';

class ErrorPageContent extends Block<ErrorPageContentProps> {
	static componentName = 'ErrorPageContent';

	constructor(props: ErrorPageContentProps) {
		super(props);
	}

	protected getStateFromProps() {
		this.state = {
			linkClickHandler: (event: MouseEvent) => {
				event.preventDefault();
				const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
				changeRoute(path);
			},
		};
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
						onClick=linkClickHandler
					}}}
				</div>
			</main>
		`;
	}
}

export default ErrorPageContent;
