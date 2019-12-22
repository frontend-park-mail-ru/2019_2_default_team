import {View} from "../../modules/view";
import template from './Menu.pug'
import {AUTH} from "../../modules/events";

export class MenuView extends View{
    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);
        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    }

    render = (data) => {
        this._globalEventBus.triggerEvent(AUTH.checkAuth);
    }

    _onAuthResponse (data) {
        super.render(data);
        console.log(data);
        if (data.Auth) {
            this._logoutButton = document.getElementById("logout");
            this._logoutButton.addEventListener("click", this._onLogout.bind(this));
        }
    }

    _onLogout = (data = {}) => {
        this._globalEventBus.triggerEvent(AUTH.logout);
    }
}
