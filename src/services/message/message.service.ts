import type { MessageData, MessageItem, WSSParams } from '@/shared/types';
import { openToast } from '@/shared/utils';

const ABNORMAL_CLOSURE = 1006;

export class MessageService {
	readonly #baseURL: string;
	#wss: WebSocket;
	#userId: number;
	#chatId: string;
	#token: string;
	#ping: NodeJS.Timer;

	constructor(params: WSSParams) {
		this.#baseURL = process.env.API_WSS_URL!;
		this.#connect(params);
	}

	#addEvents() {
		this.#wss.addEventListener('open', this.#onOpen.bind(this));
		this.#wss.addEventListener('message', MessageService.#onMessage.bind(this));
		this.#wss.addEventListener('error', MessageService.#onError.bind(this));
		this.#wss.addEventListener('close', this.#onClose.bind(this));
	}

	#removeEvents() {
		this.#wss.removeEventListener('open', this.#onOpen.bind(this));
		this.#wss.removeEventListener('message', MessageService.#onMessage.bind(this));
		this.#wss.removeEventListener('error', MessageService.#onError.bind(this));
		this.#wss.removeEventListener('close', this.#onClose.bind(this));
	}

	#onOpen() {
		this.getMessages(0);
		this.#ping = setInterval(() => {
			this.#wss.send(
				JSON.stringify({
					type: 'ping',
				})
			);
		}, 5000);
	}

	static #onMessage(event: MessageEvent) {
		const data = JSON.parse(event.data) as Array<MessageItem>;
		console.log(data);
	}

	static #onError(event: Event & { reason?: string }) {
		openToast(event.reason ? event.reason : 'Something went wrong');
	}

	#onClose(event: CloseEventInit) {
		this.#removeEvents();
		if (event.code === ABNORMAL_CLOSURE) {
			this.#reconnect();
			return;
		}
		if (!event.wasClean) {
			openToast('Network error');
		}
	}

	#connect(params: WSSParams) {
		const { userId, chatId, token } = params;
		this.#userId = userId;
		this.#chatId = chatId;
		this.#token = token;
		this.#wss = new WebSocket(`${this.#baseURL}/chats/${userId}/${chatId}/${token}`);
		this.#addEvents();
	}

	#reconnect() {
		this.#connect({
			userId: this.#userId,
			chatId: this.#chatId,
			token: this.#token,
		});
	}

	closeConnection() {
		if (this.#ping) {
			clearInterval(this.#ping);
		}
		this.#wss.close();
		this.#removeEvents();
	}

	getMessages(offset: number) {
		this.#wss.send(
			JSON.stringify({
				content: String(offset),
				type: 'get old',
			})
		);
	}

	sendMessage(data: MessageData) {
		this.#wss.send(
			JSON.stringify({
				content: data.message,
				type: 'message',
			})
		);
	}
}
