import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { blurHandler, changeRoute, focusHandler, getValueFromRefs } from '@/shared/utils';
import { emailValidator, loginValidator, nameValidator, phoneValidator } from '@/shared/validators';

const initialFieldsState = {
	first_name: '',
	second_name: '',
	phone: '',
	email: '',
	login: '',
};

const initialState = {
	values: initialFieldsState,
	errors: initialFieldsState,
};

class ProfilePage extends Block {
	constructor() {
		super();
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
			onSubmit: (event: MouseEvent) => {
				event.preventDefault();

				const profileData = {
					first_name: getValueFromRefs(this.refs, 'first_name'),
					second_name: getValueFromRefs(this.refs, 'second_name'),
					phone: getValueFromRefs(this.refs, 'phone'),
					email: getValueFromRefs(this.refs, 'email'),
					login: getValueFromRefs(this.refs, 'login'),
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
					console.log('registry:', profileData);
					this.setState(initialState);
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
					<div class="settings-page-wrapper">
						<div class="flex-center flex-col w-full space-y-6">
							<div class="flex-center">
								<div class="settings-page-avatar flex-center">
									${icons.avatarOverlay}
									<div class="settings-page-avatar-overlay flex-center">
										<div class="text-base">Поменять аватар</div>
									</div>
								</div>
							</div>
							<form class="space-y-3">
								<fieldset class="space-y-3">
									{{{Input
										ref="first_name"
										name="first_name"
										label="Имя"
										value="${values.first_name}"
										error="${errors.first_name}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										ref="second_name"
										name="second_name"
										label="Фамилия"
										value="${values.second_name}"
										error="${errors.second_name}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										ref="phone"
										name="phone"
										label="Телефон"
										value="${values.phone}"
										error="${errors.phone}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										ref="email"
										name="email"
										label="Почта"
										type="email"
										value="${values.email}"
										error="${errors.email}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										ref="login"
										name="login"
										label="Логин"
										value="${values.login}"
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
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ProfilePage;
