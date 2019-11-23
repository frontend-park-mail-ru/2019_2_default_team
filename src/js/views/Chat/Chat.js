import template from "./Chat.pug";
import {CHAT} from "../../modules/events";
import {View} from "../../modules/view";
import WebSocket from "../../models/webSocket";

export class ChatView extends View{
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
        this._ws = new WebSocket();

    }

    render(data = {}) {
        super.render(data);
        this._chatForm = this._root.querySelector('form');
      //  this._chatForm.addEventListener('submit', this._onSubmit.bind(this), false);
    }

    _onSubmit(event){
        event.preventDefault();
        const message = this._chatForm.elements['submit'];
        this._ws.send(message);
    }

}
