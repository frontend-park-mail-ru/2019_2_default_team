import { EventBus } from '../modules/eventbus';
import {RegisterView} from "../views/Register/Register";
import {AUTH} from "../modules/events";
import {Controller} from "../modules/controller";

export class RegisterController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._globalEventBus.subscribeToEvent(AUTH.signUpSuccess, (data) => {
            this._router.redirect('/');
        });

        this._view = new RegisterView(this._root, this._globalEventBus);
    }
}