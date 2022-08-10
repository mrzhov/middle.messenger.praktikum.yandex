import { store } from '@/app';
import { UserService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import {
	blurHandler,
	changeRoute,
	findParentElementByCondition,
	focusHandler,
	getValueFromRefs,
} from '@/shared/utils';
import { emailValidator, loginValidator, nameValidator, phoneValidator } from '@/shared/validators';

const initialFieldsState = {
	first_name: '',
	second_name: '',
	phone: '',
	email: '',
	login: '',
};

const initialState = {
	values: null,
	errors: initialFieldsState,
};

async function inputOnChangeHandler(this: any) {
	const { files } = this;
	const file = files ? files[0] : null;
	if (file) {
		const formData = new FormData();
		formData.append('avatar', file);
		const userService = new UserService();
		await userService.changeAvatar(formData);
	}
}

const click = (event: MouseEvent) => {
	event.preventDefault();
	const openChangeAvatarModalButton = findParentElementByCondition(event, (target: any) =>
		target.classList.contains('settings-page-avatar')
	);
	if (openChangeAvatarModalButton) {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = inputOnChangeHandler;
		input.click();
	}
};

class ProfilePage extends Block {
	constructor() {
		super({ events: { click } });
	}

	componentDidMount() {
		store.subscribe(state => {
			this.setState({
				values: state.authUser,
			});
		}, 'authUser');
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
			onFocusHandler: (event: FocusEvent) => {
				focusHandler.call(this, event);
			},
			onBlurHandler: (event: FocusEvent) => {
				blurHandler.call(this, event);
			},
			onSubmit: async (event: MouseEvent) => {
				event.preventDefault();

				const profileData = {
					first_name: getValueFromRefs(this.refs, 'first_name'),
					second_name: getValueFromRefs(this.refs, 'second_name'),
					phone: getValueFromRefs(this.refs, 'phone'),
					email: getValueFromRefs(this.refs, 'email'),
					login: getValueFromRefs(this.refs, 'login'),
					avatar: this.state.values.avatar,
				};

				const nextState = {
					values: { ...profileData },
					errors: initialState.errors,
				};

				nextState.errors.first_name = nameValidator(profileData.first_name);
				nextState.errors.second_name = nameValidator(profileData.second_name);
				nextState.errors.phone = phoneValidator(profileData.phone);
				nextState.errors.email = emailValidator(profileData.email);
				nextState.errors.login = loginValidator(profileData.login);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					const userService = new UserService();
					// eslint-disable-next-line @typescript-eslint/naming-convention
					const display_name = `${profileData.first_name} ${profileData.second_name}`;
					await userService.changeProfile({ ...profileData, display_name });
				}
			},
			linkClickHandler: (event: MouseEvent) => {
				event.preventDefault();
				const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
				changeRoute(path);
			},
		};
	}

	render(): string {
		const { errors, values } = this.state;

		// language=hbs
		return `
			{{#BaseLayout title="Изменить профиль"}}
				<main class="settings-page with-form">
					{{#if this.values}}
						<div class="settings-page-wrapper">
							<div class="flex-center flex-col w-full space-y-6">
								<div class="flex-center">
									<button class="settings-page-avatar flex-center">
										{{#if ${Boolean(values?.avatar)}}}
											<img src="${process.env.RESOURCES_URL}${values?.avatar}" alt="Avatar">
										{{else}}
											${icons.avatarOverlay}
										{{/if}}
										<div class="settings-page-avatar-overlay flex-center">
											<p class="text-base">Поменять аватар</p>
										</div>
									</button>
								</div>
								<form class="space-y-3">
									<fieldset class="space-y-3">
										{{{Input
											ref="first_name"
											name="first_name"
											label="Имя"
											value="${values?.first_name}"
											error="${errors.first_name}"
											onFocus=onFocusHandler
											onBlur=onBlurHandler
										}}}
	
										{{{Input
											ref="second_name"
											name="second_name"
											label="Фамилия"
											value="${values?.second_name}"
											error="${errors.second_name}"
											onFocus=onFocusHandler
											onBlur=onBlurHandler
										}}}
	
										{{{Input
											ref="phone"
											name="phone"
											label="Телефон"
											value="${values?.phone}"
											error="${errors.phone}"
											onFocus=onFocusHandler
											onBlur=onBlurHandler
										}}}
	
										{{{Input
											ref="email"
											name="email"
											label="Почта"
											type="email"
											value="${values?.email}"
											error="${errors.email}"
											onFocus=onFocusHandler
											onBlur=onBlurHandler
										}}}
	
										{{{Input
											ref="login"
											name="login"
											label="Логин"
											value="${values?.login}"
											error="${errors.login}"
											onFocus=onFocusHandler
											onBlur=onBlurHandler
										}}}
									</fieldset>
									<div class="submit-container">
										{{{Button
											text="Сохранить"
											onClick=onSubmit
										}}}
									</div>
								</form>
							</div>
						</div>
					{{else}}
						<div class="h-full flex-center">{{{Loader}}}</div>
					{{/if}}
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ProfilePage;
