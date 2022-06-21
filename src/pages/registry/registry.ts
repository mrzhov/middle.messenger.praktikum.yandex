import { Block } from '@/shared/core';
import { changeRoute, getValueFromRefs } from '@/shared/utils';
import {
	emailValidator,
	loginValidator,
	nameValidator,
	passwordValidator,
	phoneValidator,
} from '@/shared/validators';

const initialState = {
	values: {
		first_name: '',
		second_name: '',
		phone: '',
		email: '',
		login: '',
		password: '',
		password_repeat: '',
	},
	errors: {
		first_name: '',
		second_name: '',
		phone: '',
		email: '',
		login: '',
		password: '',
		password_repeat: '',
	},
};

class RegistryPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
			onSubmit: (event: MouseEvent) => {
				event.preventDefault();

				const registryData = {
					first_name: getValueFromRefs(this.refs, 'first_name'),
					second_name: getValueFromRefs(this.refs, 'second_name'),
					phone: getValueFromRefs(this.refs, 'phone'),
					email: getValueFromRefs(this.refs, 'email'),
					login: getValueFromRefs(this.refs, 'login'),
					password: getValueFromRefs(this.refs, 'password'),
					password_repeat: getValueFromRefs(this.refs, 'password_repeat'),
				};

				const nextState = {
					values: { ...registryData },
					errors: initialState.errors,
				};

				nextState.errors.first_name = nameValidator(registryData.first_name, 'имя');
				nextState.errors.second_name = nameValidator(registryData.second_name, 'фамилию');
				nextState.errors.phone = phoneValidator(registryData.phone);
				nextState.errors.email = emailValidator(registryData.email);
				nextState.errors.login = loginValidator(registryData.login);
				nextState.errors.password = passwordValidator(registryData.password);
				nextState.errors.password_repeat = passwordValidator(registryData.password_repeat);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					if (nextState.values.password !== nextState.values.password_repeat) {
						nextState.errors.password_repeat = 'Пароли не совпадают';
						this.setState(nextState);
					} else {
						console.log('registry:', registryData);
						this.setState(initialState);
						changeRoute('/chat/4');
					}
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
							<h4 class="text-xl font-medium">Регистрация</h4>
							<form class="auth-card__form">
								<fieldset class="space-y-2">
									{{{Input
										variant="gradient"
										ref="first_name"
										name="first_name"
										label="Имя"
										value="${values.first_name}"
										error="${errors.first_name}"
									}}}

									{{{Input
										variant="gradient"
										ref="second_name"
										name="second_name"
										label="Фамилия"
										value="${values.second_name}"
										error="${errors.second_name}"
									}}}

									{{{Input
										variant="gradient"
										ref="phone"
										name="phone"
										label="Телефон"
										value="${values.phone}"
										error="${errors.phone}"
									}}}

									{{{Input
										variant="gradient"
										ref="email"
										name="email"
										label="Почта"
										type="email"
										value="${values.email}"
										error="${errors.email}"
									}}}

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

									{{{Input
										variant="gradient"
										ref="password_repeat"
										name="password_repeat"
										label="Повторите пароль"
										type="password"
										value="${values.password_repeat}"
										error="${errors.password_repeat}"
									}}}
								</fieldset>
								{{{Button
									text="Зарегистрироваться"
									onClick=onSubmit
								}}}
							</form>
							{{{Link
								text="Войти"
								href="/login"
								onClick=linkClickHandler
							}}}
						</div>
					</div>
				</main>
			{{/AuthLayout}}
    `;
	}
}

export default RegistryPage;
