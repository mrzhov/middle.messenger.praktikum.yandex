import { Block } from '@/shared/core';
import { changeRoute } from '@/shared/utils';
import { loginValidator } from '@/shared/validators';

class LoginPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			values: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			onLogin: (event: MouseEvent) => {
				event.preventDefault();

				const loginData = {
					login: (this.refs.login.firstElementChild as HTMLInputElement).value.trim(),
					password: (this.refs.password.firstElementChild as HTMLInputElement).value.trim(),
				};

				const nextState = {
					values: { ...loginData },
					errors: {
						login: '',
						password: '',
					},
				};

				nextState.errors.login = loginValidator(loginData.login);

				// if (!loginData.login) {
				// 	nextState.errors.login = 'Пожалуйста, введите логин';
				// }
				//
				// if (loginData.login.length < 4) {
				// 	nextState.errors.login = 'Login should contain more than 3 chars';
				// }
				//
				// if (!loginData.password) {
				// 	nextState.errors.password = 'Пожалуйста, введите пароль';
				// }

				this.setState(nextState);

				console.log('login:', loginData);
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
									}}}

									{{{Input
										variant="gradient"
										ref="password"
										name="password"
										label="Пароль"
										type="password"
										value="${values.password}"
										error="${errors.password}"
									}}}
								</fieldset>
								{{{Button
									text="Войти"
									onClick=onLogin
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
