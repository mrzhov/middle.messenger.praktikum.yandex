import { Block } from '@/shared/core';
import { blurHandler, changeRoute, getValueFromRefs } from '@/shared/utils';
import { focusHandler } from '@/shared/utils/helpers';
import { loginValidator, passwordValidator } from '@/shared/validators';

type StateKeys = 'login' | 'password';

const initialState: State<StateKeys> = {
	values: {
		login: '',
		password: '',
	},
	errors: {
		login: '',
		password: '',
	},
};

class LoginPage extends Block {
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

				const loginData = {
					login: getValueFromRefs(this.refs, 'login'),
					password: getValueFromRefs(this.refs, 'password'),
				};

				const nextState = {
					values: { ...loginData },
					errors: initialState.errors,
				};

				nextState.errors.login = loginValidator(loginData.login);
				nextState.errors.password = passwordValidator(loginData.password);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					console.log('login:', loginData);
					this.setState(initialState);
					changeRoute('/chat/4');
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
			{{#AuthLayout }}
				<main class="h-screen flex-center">
					<div class="card auth-card">
						<div class="card-content text-center">
							<h4 class="text-xl font-medium">Вход</h4>
							<form class="auth-card__form">
								<fieldset class="space-y-2">
									{{{Input
										variant="gradient"
										ref="login"
										name="login"
										label="Логин"
										value="${values.login}"
										error="${errors.login}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}

									{{{Input
										variant="gradient"
										ref="password"
										name="password"
										label="Пароль"
										type="password"
										value="${values.password}"
										error="${errors.password}"
										onFocus=onFocusHandler
										onBlur=onBlurHandler
									}}}
								</fieldset>
								{{{Button
									text="Войти"
									onClick=onSubmit
								}}}
							</form>
							{{{Link
								text="Нет аккаунта?"
								href="/registry"
								onClick=linkClickHandler
							}}}
						</div>
					</div>
				</main>
			{{/AuthLayout}}
    `;
	}
}

export default LoginPage;
