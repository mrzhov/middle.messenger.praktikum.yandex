import type { ChatListItem } from '@/shared/types';

type Content = { mockChatList: Array<ChatListItem> } & Record<string, unknown>;

const content: Content = {
	mockChatList: [
		{
			id: '1',
			name: 'Илья',
			unreadCount: '4',
			lastMessage: {
				text: 'Друзья, у меня для вас особенный выпуск новостей!',
				time: '15:12',
			},
		},
		{
			id: '2',
			name: 'Вадим',
			unreadCount: '2',
			lastMessage: {
				text: 'И Human Interface Guidelines и Material Design рекомендуют',
				time: '15:12',
			},
		},
		{
			id: '3',
			name: '1, 2, 3',
			unreadCount: '3',
			lastMessage: {
				text: 'Миллионы россиян ежедневно проводят десятки часов свое',
				time: 'Пн',
			},
		},
		{
			id: '4',
			name: 'тет-а-теты',
			lastMessage: {
				text: 'В 2008 году художник Jon Rafman начал собирать',
				time: 'Ср',
			},
		},
		{
			id: '5',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать.',
				time: '12:00',
			},
		},
		{
			id: '6',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
				time: '12:00',
			},
		},
		{
			id: '7',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
				time: '12:00',
			},
		},
		{
			id: '8',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
				time: '12:00',
			},
		},
		{
			id: '9',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dignissim volutpat. Vivamus viverra, tortor in ornare convallis, dui velit ullamcorper augue, a posuere risus libero sed turpis. Vivamus ut justo eu velit sodales ornare at at metus. Vivamus sit amet ornare dolor, vitae consectetur nisl. Mauris laoreet varius mattis. In tristique euismod tempor. Etiam a nibh commodo, elementum massa at, semper diam.',
				time: '12:00',
			},
		},
		{
			id: '10',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '11',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '12',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '13',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '14',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '15',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
		{
			id: '16',
			name: 'Design Destroyer',
			lastMessage: {
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
				time: '12:00',
			},
		},
	],
};

export default content;
