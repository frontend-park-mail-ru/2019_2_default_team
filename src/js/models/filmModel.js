import api from "../modules/api";
import {FILM} from "../modules/events";

class FilmModel {
    setGlobalEventBus(globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(FILM.getFilm, this._onLoadFilm.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getFilms, this._onLoadFilms.bind(this));
    }

    _onLoadFilm = (id) => {
        api.getFilmInfo(id.id)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getFilmSuccess, data);
                    });
                } else {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getFilmFailed, data);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    _onLoadFilms = () => {
        api.getAllFilms()
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getFilmsSuccess, data);
                    });
                } else {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(FILM.getFilmsFailed, data);
                    });
                }
            });
    };
}

export default new FilmModel();