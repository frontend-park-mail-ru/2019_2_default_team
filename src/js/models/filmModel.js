import api from "../modules/api";
import {FILM} from "../modules/events";

class FilmModel {
    setGlobalEventBus(globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(FILM.getFilm, this._onLoadFilm.bind(this));
    }

    _onLoadFilm = (id) => {
        // NOTE: Получаем информацию о фильме
        api.getFilmInfo(id.id)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        // NOTE: Получаем рекомендации для текущего фильма
                        api.getRecommendations(data.genre).then(res => {
                            if (res.ok) {
                                res.json().then(recomJSON => {
                                    data.recommendations = recomJSON;
                                    // NOTE: Получаем комментарии для текущего фильма
                                    api.getFilmComments(data.title)
                                    .then(res => {
                                        if(res.ok) {
                                            res.json().then(json => {
                                                data.comments = json.comments;
                                                this._globalEventBus.triggerEvent(FILM.getFilmSuccess, data);
                                            }).catch(err => {
                                                console.log(err);
                                            });
                                        } else {
                                            this._globalEventBus.triggerEvent(FILM.getFilmCommentsFailed);
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                    });
                                }).catch(err => {
                                    console.log(err);
                                });
                            } else {

                            }
                        }).catch(err => {
                            console.log(err);
                        });
                        
                    });
                } else {
                    res.json().then(data => {
                        console.log(data.title);
                        this._globalEventBus.triggerEvent(FILM.getFilmFailed, data);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export default new FilmModel();