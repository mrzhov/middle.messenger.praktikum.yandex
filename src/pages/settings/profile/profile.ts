import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

class ProfilePage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout pageId="profile" title="Изменить профиль"}}
				<main class="settings-page with-form">
					<div class="settings-page-wrapper">
						<div class="flex-center flex-col w-full space-y-6">
							<div class="flex-center">
								<div class="settings-page-avatar flex-center">
									${icons.avatarOverlay}
									<div class="settings-page-avatar-overlay flex-center">
										<div class="text-base">Поменять аватар</div>
									</div>
								</div>
							</div>
							<form class="space-y-3">
								{{{Input
									name="first_name"
									label="Имя"
									value="Ivan"
								}}}
									
								{{{Input
									name="second_name"
									label="Фамилия"
									value="Ivanov"
								}}}
									
								{{{Input
									name="phone"
									label="Телефон"
									value="+7 999 111 22 33"
								}}}
									
								{{{Input
									name="email"
									label="Почта"
									type="email"
									value="test@yandex.ru"
								}}}
									
								{{{Input
									name="login"
									label="Логин"
									value="@ivan123"
								}}}
							</form>
							<div class="submit-container">
								{{{Button text="Сохранить"}}}
							</div>
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ProfilePage;
