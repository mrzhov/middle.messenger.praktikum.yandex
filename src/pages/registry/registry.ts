import { Block } from '@/shared/core';
import { changeRoute } from '@/shared/utils';

class RegistryPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			onLogin: () => {
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
							<form class="auth-card__form">
								<fieldset class="space-y-2">
									{{{Input
										variant="gradient"
										name="first_name"
										label="Имя"
									}}}

									{{{Input
										variant="gradient"
										name="second_name"
										label="Фамилия"
									}}}

									{{{Input
										variant="gradient"
										name="phone"
										label="Телефон"
									}}}

									{{{Input
										variant="gradient"
										name="email"
										label="Почта"
										type="email"
									}}}

									{{{Input
										variant="gradient"
										name="login"
										label="Логин"
									}}}

									{{{Input
										variant="gradient"
										name="password"
										label="Пароль"
										type="password"
									}}}

									{{{Input
										variant="gradient"
										name="password-repeat"
										label="Повторите пароль"
										type="password"
									}}}
								</fieldset>
								{{{Button
									text="Зарегистрироваться"
									onClick=buttonClickHandler
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
