import {Controller} from "../modules/controller";
import {ChatView} from "../views/Chat/Chat";
import {AUTH} from "../modules/events";
import {PosterView} from "../views/Poster/Poster";

export class ChatController{
    constructor (root, globalEventBus, router){
        this._root = root;
        this._globalEventBus = globalEventBus;
        this._router = router;

    }

    start(){
        this._globalEventBus.triggerEvent(AUTH.checkAuth, this._onAuthResponse.bind(this));
        this._view = new PosterView(this._root, this._globalEventBus);
    }

    _onAuthResponse = (data) => {
        if (data.status === 1){
            this._view = new supChatView(this._root, this._globalEventBus);
        } else if (data.status === 0){
            this._view = new clientChatView(this._root, this._globalEventBus);
        } else {
            this._router.redirect('/');
        }
         this._view.render();
    }
}

