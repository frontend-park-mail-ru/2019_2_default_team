import { CHAT } from '../modules/events';

const ChatUrl = 'ws://127.0.0.1:8080/chat';

class ChatModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(CHAT.sendMessage, this._onSend.bind(this));
        this._globalEventBus.subscribeToEvent(CHAT.receive, this._onReceive.bind(this));

        this.ws = new WebSocket(ChatUrl);

        this.ws.onopen = () => {
            console.log('Connected');
            this._globalEventBus.triggerEvent(CHAT.openWebSocket);
        };

        this.ws.onerror = (err) => {
            console.log(`Websocket error ===> ${err}`);
        };

        this.ws.onclose = (ev) => {
            console.log('Error: ' + ev.code);
        };
    }

    _onSend =(message) => {
        this.ws.send(message);
    }

    _onReceive = () => {
        this.ws.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log(`Chat Received() ===> ${message}`);

            this._globalEventBus.triggerEvent(CHAT.receive, message);
        };
    }

}

window.chatModel=new ChatModel();
export default new ChatModel();
