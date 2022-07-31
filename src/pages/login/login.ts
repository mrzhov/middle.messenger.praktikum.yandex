import { AuthService } from '@/services';
import { Block } from '@/shared/core';
import { blurHandler, changeRoute, focusHandler, getValueFromRefs } from '@/shared/utils';
import { loginValidator, passwordValidator } from '@/shared/validators';

type StateKeys = 'login' | 'password';

const initialState: State<StateKeys> = {
	values: {
		login: 'qwerty',
		password: 'qwerty123A',
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
			onSubmit: async (event: MouseEvent) => {
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
					const authService = new AuthService();
					await authService.login(loginData);
					// console.log('login:', loginData);
					// this.setState(initialState);
					// changeRoute('/');
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
