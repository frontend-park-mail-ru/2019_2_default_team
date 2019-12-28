import template from './Filmpage.pug';
import {FILM, POPUP} from "../../modules/events";
import {View} from "../../modules/view";
import Api from '../../modules/api';

export class FilmpageView extends View{
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
        this._globalEventBus.subscribeToEvent(FILM.getFilmSuccess, this._onLoadFilmSuccess.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.plusRatingSuccess, this._onPlusRatingSuccess.bind(this));
    }

    render(data = {}) {
        super.render(data);
        this._data = data.id;
        this._globalEventBus.triggerEvent(FILM.getFilm, data);
    }

    _addEventListeners(data) {
        // Покупка билета и попап
        this.buyTicketButton = document.getElementById("buyTicketButton");
        this.buyTicketButton.addEventListener('click', this._openPopup.bind(this));
        // Добавить комментарий
        this.submitCommentButton = document.getElementById("submitCommentButton");
        this.submitCommentButton.addEventListener('click', () => {
            this.addCommentArea = document.getElementById("addCommentArea");
            let commentaryText = this.addCommentArea.value;
            // Получение профиля для проставления username комменатотора
            if(commentaryText) {
                Api.getProfileInfo().then(res => {
                    if(res.ok) {
                        res.json().then(profile => {
                            this._sendCommentary({
                                filmID: data.id,
                                commentInfo: {
                                    Username: profile.nickname,
                                    FilmTitle: data.title,
                                    Text: commentaryText
                                }
                            });
                            // TODO: Добавить кастомный тултип о том, что комментарий отправлен
                            this.addCommentArea.value = '';
                        }).catch(err => {
                            console.log(err);
                        }); 
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
        // Очистить комментарий
        this.clearCommentButton = document.getElementById("clearCommentButton");
        this.clearCommentButton.addEventListener('click', () => {
            this.addCommentArea = document.getElementById("addCommentArea");
            this.addCommentArea.value = '';
        });
        // Плюсануть рейтинг
        this.ratingPlusButton = document.getElementById("ratingPlusButton");
        this.ratingPlusButton.addEventListener('click', () => {
            this._globalEventBus.triggerEvent(FILM.plusRating, data.id);
        });
    }

    _sendCommentary(data) {
        this._globalEventBus.triggerEvent(FILM.sendComment, data);
    }

    /**
     * Call if film load is successful
     * @param data
     * @private
     */
    _onLoadFilmSuccess (data) {
        this._data = { ...data, ...this._data };
        super.render(data);
        this._addEventListeners(data);
    }

    _openPopup() {
        this._globalEventBus.triggerEvent(POPUP.openPopup, this._data);
    }

    _onPlusRatingSuccess() {
        let ratingCounter = document.getElementById("ratingCounter");
        ratingCounter.innerText = Number(ratingCounter.innerText) + 1;
        this.ratingPlusButton = document.getElementById("ratingPlusButton");
        this.ratingPlusButton.classList.add('ratingBtn_voted');
    }
}
