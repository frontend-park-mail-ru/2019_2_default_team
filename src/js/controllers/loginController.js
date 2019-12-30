import { LoginView } from '../views/Login/Login';
import {Controller} from "../modules/controller";
import {AUTH, FILM} from "../modules/events";

export class LoginController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._globalEventBus.subscribeToEvent(AUTH.signInSuccess, (data) => {
            this._router.redirect('/');
            this._globalEventBus.triggerEvent(AUTH.checkAuth);
        });

        this._view = new LoginView(this._root, this._globalEventBus);
    }
}
