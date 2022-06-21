import { Block } from '@/shared/core';
import { changeRoute, getValueFromRefs } from '@/shared/utils';
import { loginValidator, passwordValidator } from '@/shared/validators';

const initialState = {
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
			onSubmit: (event: MouseEvent) => {
				console.log(event);
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
