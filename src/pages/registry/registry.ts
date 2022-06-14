import { Block } from '@/shared/core';

import content from './registry.content';

class RegistryPage extends Block {
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
										name="first_name"
										label="Имя"
									}}}
										
									{{{Input
										name="second_name"
										label="Фамилия"
									}}}
										
									{{{Input
										name="phone"
										label="Телефон"
									}}}
										
									{{{Input
										name="email"
										label="Почта"
										type="email"
									}}}
										
									{{{Input
										name="login"
										label="Логин"
									}}}

									{{{Input
										name="password"
										label="Пароль"
										type="password"
									}}}

									{{{Input
										name="password-repeat"
										label="Повторите пароль"
										type="password"
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

export default RegistryPage;
