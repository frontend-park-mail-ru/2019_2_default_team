import api from "../modules/api";
import {AUTH, FILM} from "../modules/events";

class SearchModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;
        this._globalEventBus.subscribeToEvent(FILM.getFilmsSearch, this._onGetFilmsSearch.bind(this));

    }

    _onCheckAuth(){
        // api.authCheck()
        //     .then(res =>{
        //     })
    }

    _onGetFilmsSearch(){
        api.getAllFilms()
            .then(res =>{
                if (res.ok){
                    res.json().then(data =>{
                        this._globalEventBus.triggerEvent(FILM.getFilmsSearchSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
                }
            })
    }
}

export default new SearchModel();
