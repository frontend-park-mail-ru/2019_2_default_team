import api from "../modules/api";
import {AUTH, FILM} from "../modules/events";

class PosterModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;
        this._globalEventBus.subscribeToEvent(AUTH.checkAuth, this._onCheckAuth.bind(this))
        this._globalEventBus.subscribeToEvent(FILM.getFilms, this._onGetFilms.bind(this));

    }

    _onCheckAuth(){
        api.authCheck()
            .then(res =>{
            })
    }

    _onGetFilms(){
        api.getAllFilms()
            .then(res =>{
                if (res.ok){
                    res.json().then(data =>{
                        this._globalEventBus.triggerEvent(FILM.getFilmsSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
                }
            })
    }
}

export default new PosterModel();
