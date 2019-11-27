import {Controller} from "../modules/controller";
import {AUTH} from "../modules/events";
import api from "../modules/api";
import {PosterView} from "../views/Poster/Poster";

export class LogoutController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._globalEventBus.subscribeToEvent(AUTH.logoutSuccess, (data) => {
            this._router.redirect('/');
        });

        this._onLogout();
        this._view = new  PosterView(this._root, this._globalEventBus);
    }

    _onLogout = () => {
        api.logout()
            .then(res => {
                if (res.ok) {
                    console.log("Logged out");
                    this._globalEventBus.triggerEvent(AUTH.logoutSuccess, {});
                }
                else {
                    console.log("Logout Failed")
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
}
