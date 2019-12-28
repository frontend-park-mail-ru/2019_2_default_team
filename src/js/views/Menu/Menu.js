import {View} from "../../modules/view";
import template from './Menu.pug'
import {AUTH, FILM} from "../../modules/events";

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
        if (!data.Auth) {
            this._logoutButton = document.getElementById("logout");
            this._logoutButton.addEventListener("click", this._onLogout.bind(this));
            this._favoriteGenre = document.getElementById("Favorite_genres");
            this._favoriteGenre.addEventListener("click", this._onGetFavFilms.bind(this));
        }
        this._topButton = document.getElementById("top");
        this._topButton.addEventListener("click", this._onGetTop.bind(this));
    }

    _onLogout = (data = {}) => {
        this._globalEventBus.triggerEvent(AUTH.logout);
    }

    _onGetTop = (data = {}) => {
        this._globalEventBus.triggerEvent(FILM.getTop)
    }

    _onGetFavFilms = (data = {}) => {
        this._globalEventBus.triggerEvent(FILM.getFavFilms)
    }
}
