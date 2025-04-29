export default class SafeBroadcastChannel<T> {
	name: string;
	self: BroadcastChannel;

	constructor(name: string) {
		this.name = name;
		this.self = new BroadcastChannel(name);
	}

	postMessage(message: T) {
		this.self.postMessage(message);
	}

	close() {
		this.self.close();
	}

	addEventListener<K extends keyof BroadcastChannelEventMapExt<T>>(
		type: K,
		listener: (this: BroadcastChannel, ev: BroadcastChannelEventMapExt<T>[K]) => void,
		options?: boolean | AddEventListenerOptions
	): void {
		this.self.addEventListener(type, listener, options);
	}

	removeEventListener<K extends keyof BroadcastChannelEventMapExt<T>>(
		type: K,
		listener: (this: BroadcastChannel, ev: BroadcastChannelEventMapExt<T>[K]) => void,
		options?: boolean | EventListenerOptions
	): void {
		this.self.removeEventListener(type, listener, options);
	}
}

interface BroadcastChannelEventMapExt<T> {
	message: MessageEvent<T>;
	messageerror: MessageEvent;
}
