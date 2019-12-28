import {MenuView} from "../views/Menu/Menu";
import {Controller} from "../modules/controller";
import {FILM} from "../modules/events";
import api from "../modules/api";

export class MenuController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        this._globalEventBus.subscribeToEvent(FILM.getFavFilms, this._onGetFavFilms.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getTop, this._onGetTop.bind(this));
        this._view = new MenuView(this._root, this._globalEventBus);
    }

    _onGetFavFilms = () => {
        api.getFavFilms()
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getFavFilmsSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getFavFilmsFailed);
                }
            })
    }

    _onGetTop = () => {
        api.getTop()
            .then(res => {
                if (res.ok){
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getTopSuccess,data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getTopFailed);
                }
            })
    }
}
