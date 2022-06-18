import { Block } from '@/shared/core';
import { changeRoute } from '@/shared/utils';

class RegistryPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			buttonClickHandler: () => {
				changeRoute('/');
			},
			linkClickHandler: (event: MouseEvent) => {
				event.preventDefault();
				const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
				changeRoute(path);
			},
		};
	}

	render(): string {
		// language=hbs
		return `
			{{#AuthLayout }}
				<main class="h-screen flex-center">
					<div class="card auth-card">
						<div class="card-content text-center">
							<h4 class="text-xl font-medium">Регистрация</h4>
							<div class="auth-card__form">
								<form class="space-y-3">
									{{{Input
										name="first_name"
										label="Имя"
										classes="auth-form-field"
									}}}
										
									{{{Input
										name="second_name"
										label="Фамилия"
										classes="auth-form-field"
									}}}
										
									{{{Input
										name="phone"
										label="Телефон"
										classes="auth-form-field"
									}}}
										
									{{{Input
										name="email"
										label="Почта"
										type="email"
										classes="auth-form-field"
									}}}
										
									{{{Input
										name="login"
										label="Логин"
										classes="auth-form-field"
									}}}

									{{{Input
										name="password"
										label="Пароль"
										type="password"
										classes="auth-form-field"
									}}}

									{{{Input
										name="password-repeat"
										label="Повторите пароль"
										type="password"
										classes="auth-form-field"
									}}}
								</form>
							</div>
							<div class="space-y-2">
								{{{Button
									text="Зарегистрироваться"
									onClick=buttonClickHandler
								}}}
								{{{Link
									text="Войти"
									href="/login"
									onClick=linkClickHandler
								}}}
							</div>
						</div>
					</div>
				</main>
			{{/AuthLayout}}
    `;
	}
}

export default RegistryPage;
