import template from './Filmpage.pug';
import {FILM, POPUP} from "../../modules/events";
import {View} from "../../modules/view";

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

    _addEventListeners() {
        this.buyTicketButton = document.getElementById("buyTicketButton");
        this.buyTicketButton.addEventListener('click', this._openPopup.bind(this));
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
        this._addEventListeners();
    }

    _openPopup() {
        this._globalEventBus.triggerEvent(POPUP.openPopup, this._data);
    }
}