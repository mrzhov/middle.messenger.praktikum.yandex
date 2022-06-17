import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

class SidebarSettings extends Block<TitleAndPageId['pageId']> {
	constructor(props: TitleAndPageId['pageId']) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full flex flex-col">
				<div class="sidebar-top border-bottom">
					<div class="w-full h-full flex-center">
						<div class="app-logo">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_1103_2)">
									<path d="M12.005 24.01C18.6352 24.01 24.01 18.6352 24.01 12.005C24.01 5.37482 18.6352 0 12.005 0C5.37482 0 0 5.37482 0 12.005C0 18.6352 5.37482 24.01 12.005 24.01Z" fill="url(#paint0_linear_1103_2)"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M5.4277 11.8751C8.92624 10.3557 11.2553 9.34611 12.4248 8.85631C15.7534 7.46689 16.4531 7.22699 16.9029 7.217C17.0029 7.217 17.2228 7.23699 17.3727 7.35694C17.4927 7.4569 17.5227 7.58684 17.5427 7.6868C17.5626 7.78676 17.5826 7.99667 17.5626 8.1566C17.3827 10.0558 16.603 14.6639 16.2032 16.783C16.0333 17.6826 15.7034 17.9825 15.3835 18.0125C14.6838 18.0725 14.1541 17.5527 13.4843 17.1129C12.4248 16.4232 11.835 15.9933 10.8055 15.3136C9.61595 14.5339 10.3856 14.1041 11.0653 13.4044C11.2453 13.2245 14.314 10.4257 14.374 10.1758C14.384 10.1458 14.384 10.0258 14.314 9.96585C14.244 9.90587 14.1441 9.92587 14.0641 9.94586C13.9541 9.96585 12.2748 11.0854 9.00621 13.2945C8.52641 13.6243 8.09659 13.7843 7.70675 13.7743C7.27693 13.7643 6.45727 13.5344 5.83753 13.3344C5.08784 13.0945 4.48809 12.9646 4.53807 12.5448C4.56806 12.3249 4.86793 12.105 5.4277 11.8751Z" fill="white"/>
								</g>
								<defs>
									<linearGradient id="paint0_linear_1103_2" x1="11.995" y1="0" x2="11.995" y2="23.8201" gradientUnits="userSpaceOnUse">
										<stop stop-color="#2AABEE"/>
										<stop offset="1" stop-color="#D922BC"/>
									</linearGradient>
									<clipPath id="clip0_1103_2">
										<rect width="24" height="24" fill="white"/>
									</clipPath>
								</defs>
							</svg>
							<h2>Messenger</h2>
						</div>
					</div>
				</div>
				<div class="grow">
					{{{Profile pageId=pageId}}}
					{{{Categories pageId=pageId}}}
				</div>
				{{{Navigation pageId=pageId}}}
			</div>
		`;
	}
}

export default SidebarSettings;
