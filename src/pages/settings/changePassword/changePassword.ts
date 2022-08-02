import { AccountService } from '@/services';
import { Block } from '@/shared/core';
import { blurHandler, focusHandler, getValueFromRefs } from '@/shared/utils';
import { passwordValidator } from '@/shared/validators';

const initialState = {
	values: {
		old_password: '',
		new_password: '',
		new_password_repeat: '',
	},
	errors: {
		old_password: '',
		new_password: '',
		new_password_repeat: '',
	},
};

class ChangePasswordPage extends Block {
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
			onSubmit: async (event: MouseEvent) => {
				event.preventDefault();

				const changePasswordData = {
					old_password: getValueFromRefs(this.refs, 'old_password'),
					new_password: getValueFromRefs(this.refs, 'new_password'),
					new_password_repeat: getValueFromRefs(this.refs, 'new_password_repeat'),
				};

				const nextState = {
					values: { ...changePasswordData },
					errors: initialState.errors,
				};

				nextState.errors.old_password = passwordValidator(changePasswordData.old_password);
				nextState.errors.new_password = passwordValidator(changePasswordData.new_password);
				nextState.errors.new_password_repeat = passwordValidator(
					changePasswordData.new_password_repeat
				);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					if (nextState.values.new_password !== nextState.values.new_password_repeat) {
						nextState.errors.new_password_repeat = 'Пароли не совпадают';
						this.setState(nextState);
					} else {
						const accountService = new AccountService();
						await accountService.changePassword({
							oldPassword: changePasswordData.old_password,
							newPassword: changePasswordData.new_password,
						});
						this.setState(initialState);
					}
				}
			},
		};
	}

	render(): string {
		const { errors, values } = this.state;

		// language=hbs
		return `
			{{#BaseLayout title="Изменить пароль"}}
				<main class="settings-page with-form">
					<div class="settings-page-wrapper">
						<div class="flex-center flex-col w-full space-y-4">
							<form class="space-y-3">
								<fieldset class="space-y-3">
									{{{Input
										ref="old_password"
										name="old_password"
										label="Старый пароль"
										type="password"
										value="${values.old_password}"
										error="${errors.old_password}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										ref="new_password"
										name="new_password"
										label="Новый пароль"
										type="password"
										value="${values.new_password}"
										error="${errors.new_password}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}
	
									{{{Input
										ref="new_password_repeat"
										name="new_password_repeat"
										label="Повторите новый пароль"
										type="password"
										value="${values.new_password_repeat}"
										error="${errors.new_password_repeat}"
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

export default ChangePasswordPage;
