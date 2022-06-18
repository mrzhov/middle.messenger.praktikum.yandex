import { Block } from '@/shared/core';
import { changeRoute } from '@/shared/utils';

class LoginPage extends Block {
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
							<h4 class="text-xl font-medium">Вход</h4>
							<div class="auth-card__form">
								<form class="space-y-3">
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
								</form>
							</div>
							<div class="space-y-2">
								{{{Button
									text="Войти"
									onClick=buttonClickHandler
								}}}
								{{{Link
									text="Нет аккаунта?"
									href="/registry"
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

export default LoginPage;
