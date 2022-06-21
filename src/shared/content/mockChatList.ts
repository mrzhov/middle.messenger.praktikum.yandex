import type { ChatListItemType } from '@/shared/types';

export const mockChatList: Array<ChatListItemType> = [
	{
		id: '1',
		name: 'Илья',
		unreadCount: '4',
		lastMessage: {
			text: 'Друзья, у меня для вас особенный выпуск новостей!',
			time: '15:12',
		},
		sortedMessages: [],
	},
	{
		id: '2',
		name: 'Вадим',
		unreadCount: '2',
		lastMessage: {
			text: 'И Human Interface Guidelines и Material Design рекомендуют',
			time: '15:12',
		},
		sortedMessages: [],
	},
	{
		id: '3',
		name: '1, 2, 3',
		unreadCount: '3',
		lastMessage: {
			text: 'Миллионы россиян ежедневно проводят десятки часов свое',
			time: 'Пн',
		},
		sortedMessages: [],
	},
	{
		id: '4',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать.',
			time: '12:00',
		},
		sortedMessages: [
			{
				date: '12 мая',
				messages: [
					{
						author: 'Design Destroyer',
						time: '09:12',
						text:
							'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
							'\n' +
							'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:23',
						text: 'Круто!\n' + 'Как у тебя дела?',
						read: 'true',
					},
					{
						author: 'Design Destroyer',
						time: '09:31',
						text: 'У меня все отлично!\nВот кстати эта камера.\n' + 'Ты как? Что нового?',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:46',
						read: 'true',
						text: 'Прикольно выглядит.\nУ меня тоже все хорошо, работаю и занимаюсь учебой',
					},
					{
						author: 'Иван Иванов',
						time: '09:48',
						read: 'true',
						text: 'Ладно, мне нужно бежать, надеюсь скоро увидимся!',
					},
				],
			},
			{
				date: '14 июня',
				messages: [
					{
						author: 'Design Destroyer',
						time: '09:12',
						text:
							'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
							'\n' +
							'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:23',
						text: 'Круто!\n' + 'Как у тебя дела?',
						read: 'true',
					},
					{
						author: 'Design Destroyer',
						time: '09:31',
						text: 'У меня все отлично!\nВот кстати эта камера.\n' + 'Ты как? Что нового?',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:46',
						read: 'true',
						text: 'Прикольно выглядит.\nУ меня тоже все хорошо, работаю и занимаюсь учебой',
					},
					{
						author: 'Иван Иванов',
						time: '09:48',
						read: 'true',
						text: 'Ладно, мне нужно бежать, надеюсь скоро увидимся!',
					},
				],
			},
			{
				date: '20 июня',
				messages: [
					{
						author: 'Design Destroyer',
						time: '09:12',
						text:
							'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
							'\n' +
							'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:23',
						text: 'Круто!\n' + 'Как у тебя дела?',
						read: 'true',
					},
					{
						author: 'Design Destroyer',
						time: '09:31',
						text: 'У меня все отлично!\nВот кстати эта камера.\n' + 'Ты как? Что нового?',
						read: 'false',
					},
					{
						author: 'Иван Иванов',
						time: '09:46',
						read: 'true',
						text: 'Прикольно выглядит.\nУ меня тоже все хорошо, работаю и занимаюсь учебой',
					},
					{
						author: 'Иван Иванов',
						time: '09:48',
						read: 'true',
						text: 'Ладно, мне нужно бежать, надеюсь скоро увидимся!',
					},
				],
			},
		],
	},
	{
		id: '5',
		name: 'тет-а-теты',
		lastMessage: {
			text: 'В 2008 году художник Jon Rafman начал собирать',
			time: 'Ср',
		},
		sortedMessages: [],
	},
	{
		id: '6',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '7',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '8',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '9',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '10',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '11',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '12',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '13',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '14',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '15',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
	{
		id: '16',
		name: 'Design Destroyer',
		lastMessage: {
			text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
			time: '12:00',
		},
		sortedMessages: [],
	},
];
