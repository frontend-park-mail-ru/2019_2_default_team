import template from './Filmpage.pug';
import {FILM, POPUP} from "../../modules/events";
import {View} from "../../modules/view";
import Api from '../../modules/api';

export class FilmpageView extends View{
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
        this._globalEventBus.subscribeToEvent(FILM.getFilmSuccess, this._onLoadFilmSuccess.bind(this));
    }

    render(data = {}) {
        super.render(data);
        this._data = data.id;
        console.log(data);
        this._globalEventBus.triggerEvent(FILM.getFilm, data);
    }

    _addEventListeners(data) {
        this.buyTicketButton = document.getElementById("buyTicketButton");
        this.buyTicketButton.addEventListener('click', this._openPopup.bind(this));
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
                                Username: profile.nickname,
                                FilmTitle: data.title,
                                Text: commentaryText
                            });
                        }).catch(err => {
                            console.log(err);
                        }); 
                    } else {
                        alert("Вы не авторизованы!");
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
        this.clearCommentButton = document.getElementById("clearCommentButton");
        this.clearCommentButton.addEventListener('click', () => {
            this.addCommentArea = document.getElementById("addCommentArea");
            this.addCommentArea.value = '';
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
        console.log(this._data);
        this._data = { ...data, ...this._data };
        console.log(this._data);
        super.render(data);
        this._addEventListeners(data);
    }

    _openPopup() {
        this._globalEventBus.triggerEvent(POPUP.openPopup, this._data);
    }
}
