type IconsKeys =
	| 'chat'
	| 'settings'
	| 'logo'
	| 'arrowRight'
	| 'changePassword'
	| 'exitWarning'
	| 'avatarOverlay'
	| 'search'
	| 'dots'
	| 'pencil'
	| 'send'
	| 'staple';

export const icons: Record<IconsKeys, string> = {
	chat: `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
				</svg>
		`,
	settings: `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
		`,
	logo: `
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
		`,
	arrowRight: `
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29303 14.707C7.10556 14.5195 7.00024 14.2652 7.00024 14C7.00024 13.7348 7.10556 13.4805 7.29303 13.293L10.586 10L7.29303 6.707C7.11087 6.51839 7.01008 6.26579 7.01236 6.00359C7.01463 5.7414 7.1198 5.49058 7.30521 5.30518C7.49062 5.11977 7.74143 5.0146 8.00363 5.01232C8.26583 5.01004 8.51843 5.11084 8.70703 5.293L12.707 9.293C12.8945 9.48052 12.9998 9.73483 12.9998 10C12.9998 10.2652 12.8945 10.5195 12.707 10.707L8.70703 14.707C8.5195 14.8945 8.26519 14.9998 8.00003 14.9998C7.73487 14.9998 7.48056 14.8945 7.29303 14.707Z" fill="#647281"/>
				</svg>
		`,
	changePassword: `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
				</svg>
		`,
	exitWarning: `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
		`,
	avatarOverlay: `
				<svg width="40" height="40" viewBox="0 0 40 40" fill="#CDCDCD" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z"/>
				</svg>
		`,
	search: `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
		`,
	dots: `
				<svg width="22" height="6" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.99998 0.333252C1.53331 0.333252 0.333313 1.53325 0.333313 2.99992C0.333313 4.46659 1.53331 5.66659 2.99998 5.66659C4.46665 5.66659 5.66665 4.46659 5.66665 2.99992C5.66665 1.53325 4.46665 0.333252 2.99998 0.333252ZM19 0.333252C17.5333 0.333252 16.3333 1.53325 16.3333 2.99992C16.3333 4.46659 17.5333 5.66659 19 5.66659C20.4666 5.66659 21.6666 4.46659 21.6666 2.99992C21.6666 1.53325 20.4666 0.333252 19 0.333252ZM11 0.333252C9.53331 0.333252 8.33331 1.53325 8.33331 2.99992C8.33331 4.46659 9.53331 5.66659 11 5.66659C12.4666 5.66659 13.6666 4.46659 13.6666 2.99992C13.6666 1.53325 12.4666 0.333252 11 0.333252Z" fill="#3DA7FF"/>
				</svg>
		`,
	pencil: `
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.8406 1.588C16.0531 1.80268 16.0531 2.14996 15.8406 2.3678L14.7 3.52013L12.5156 1.31334L13.6563 0.16101C13.8688 -0.0536701 14.2156 -0.0536701 14.4281 0.16101L15.8406 1.588ZM13.9281 4.29992L11.7438 2.09313L4.30313 9.6101L4.17188 9.82478L3.29376 12.4893C3.24688 12.6346 3.32501 12.7893 3.46876 12.8398H3.64063L6.27813 11.9526L6.49063 11.82L13.9281 4.29992Z" fill="#3DA7FF"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0 14.3457C0 15.2581 0.734375 16 1.6375 16H13.6531C14.5594 16 15.2906 15.2581 15.2906 14.3457V7.72532C15.2906 7.42224 15.0469 7.17284 14.7437 7.17284C14.4406 7.17284 14.1969 7.41909 14.1969 7.72532V14.3457C14.1969 14.6488 13.9531 14.8982 13.65 14.8982H1.6375C1.3375 14.8982 1.09062 14.6519 1.09062 14.3457V2.20677C1.09375 1.9037 1.3375 1.65429 1.6375 1.65429H8.7375C9.0375 1.65429 9.28437 1.40804 9.28437 1.1018C9.28437 0.795567 9.04062 0.549316 8.7375 0.549316H1.6375C0.734375 0.552473 0 1.29123 0 2.20677V14.3457Z" fill="#3DA7FF"/>
				</svg>
		`,
	send: `
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#3DA7FF"/>
				</svg>
		`,
	staple: `
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M7.18661 13.5003L14.7628 5.92413L15.7056 6.86694L8.12942 14.4431L7.18661 13.5003Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M9.70068 16.0139L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70068 16.0139Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6194 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5575 23.8709C14.9423 26.486 10.7118 26.4954 8.10832 23.8919C5.50482 21.2884 5.51425 17.0579 8.12936 14.4428L7.18655 13.5C4.04841 16.6381 4.03711 21.7148 7.1613 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5575 23.8709Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7808L23.5623 14.7236C26.003 12.2828 26.0118 8.33434 23.5819 5.90441C21.152 3.47449 17.2035 3.48328 14.7627 5.92406L15.7055 6.86687C17.6233 4.94911 20.7257 4.9422 22.6349 6.85143C24.5441 8.76066 24.5372 11.863 22.6195 13.7808Z" fill="#ACBFD0"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M9.70093 16.0144C7.95752 17.7578 7.95123 20.5782 9.6869 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41895 20.1518 9.42335 18.1776 10.6437 16.9572L9.70093 16.0144Z" fill="#ACBFD0"/>
				</svg>
		`,
};
