import { FilmpageView } from '../views/Filmpage/Filmpage';
import {Controller} from "../modules/controller";
import api from "../modules/api";
import {FILM} from "../modules/events";

export class FilmpageController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._view = new FilmpageView(this._root, this._globalEventBus);
        this._globalEventBus.subscribeToEvent(FILM.sendComment, this._onSendCommentary.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.plusRating, this._onPlusRating.bind(this));
    }

    _onSendCommentary(data) {
        api.sendComment(data.commentInfo).then(() => {
            this._globalEventBus.triggerEvent(FILM.getFilm, {id: data.filmID});
        }).catch(err => {
            console.log(err);
        });
    }

    _onPlusRating(filmId) {
        api.getProfileInfo().then(res => {
            if(res.ok) {
                res.json().then(profileInfo => {
                    let ratingJSON = {
                        film_id: filmId,
                        user_id: profileInfo.id
                    }
                    api.voteForFilm(ratingJSON).then(res => {
                        if(res.status == 201) {
                            this._globalEventBus.triggerEvent(FILM.plusRatingSuccess);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                })
            } else {
                alert('Вы не авторизованы!');
            }
        }).catch(err => {
            console.log(err);
        });
    }
}