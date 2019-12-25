import api from "../modules/api";
import {AUTH, FILM} from "../modules/events";

class SearchModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;
        this._globalEventBus.subscribeToEvent(FILM.getFilmsSearch, this._onGetFilmsSearch.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.wideSearch, this._onWideSearch.bind(this));
    }

    _onWideSearch(search){
      api.wideSearch(search)
          .then(res =>{
              if (res.ok) {
                  res.json()
                      .then(data => {
                          this._globalEventBus.triggerEvent(FILM.getFilmsSearchSuccess, data);
                      })
              } else {
                  this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
              }
          })
    };

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
