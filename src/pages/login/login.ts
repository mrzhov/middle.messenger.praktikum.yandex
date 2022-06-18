import { Block } from '@/shared/core';

import content from './login.content';

class LoginPage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#AuthLayout }}
				<main class="h-screen flex-center">
					<div class="card auth-card">
						<div class="card-content text-center">
							<h4 class="text-xl font-medium">${content.title}</h4>
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
									text="${content.buttonText}"
								}}}
								{{{Link
									text="${content.linkText}"
									href="${content.linkHref}"
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
