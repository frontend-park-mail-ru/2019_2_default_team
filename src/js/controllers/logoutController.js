import {Controller} from "../modules/controller";
import {AUTH, FILM} from "../modules/events";
import api from "../modules/api";
import {PosterView} from "../views/Poster/Poster";

export class LogoutController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        this._globalEventBus.subscribeToEvent(AUTH.logout, this._onLogout.bind(this));
        this._globalEventBus.subscribeToEvent(AUTH.logoutSuccess, (data) => {
            this._router.redirect('/');
            this._globalEventBus.triggerEvent(AUTH.checkAuth);
        });
        this._view = new  PosterView(this._root, this._globalEventBus);
    }

    _onLogout = () => {
        api.logout()
            .then(res => {
                    if (res.ok) {
                    this._globalEventBus.triggerEvent(AUTH.logoutSuccess, {});
                }
                else {
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
}
