import { FilmpageView } from '../views/Filmpage/Filmpage';
import {Controller} from "../modules/controller";
import api from "../modules/api";
import {FILM} from "../modules/events";

export class FilmpageController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._view = new FilmpageView(this._root, this._globalEventBus);
        this._globalEventBus.subscribeToEvent(FILM.sendComment, this._onSendCommentary.bind(this));
    }

    _onSendCommentary(data) {
        api.sendComment(data);
    }
}