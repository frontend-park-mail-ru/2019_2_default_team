import {Controller} from "../modules/controller";
import {AUTH, CHAT} from "../modules/events";
import {PosterView} from "../views/Poster/Poster";
import template from "../../chat.html"
import {ChatView} from "../views/Chat/Chat";

export class ChatController{
    constructor (root, globalEventBus,template, router){
        this._root = root;
        this._globalEventBus = globalEventBus;
        this._router = router;
        this._root = template;

        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse().bind(this));
    }

    start(){
        this._globalEventBus.triggerEvent(AUTH.checkAuth, this._onAuthResponse.bind(this));
        console.log('here!');
        this._view = new ChatView(this._root, this._globalEventBus);
    }

    _onAuthResponse = (data) => {
        this._view.render();
    }

    _onSubmit = (ev) => {
        ev.preventDefault();
        const mes = this._submit.elements['button'];
        this._globalEventBus.triggerEvent(CHAT.sendMessage, mes);

    }

}

