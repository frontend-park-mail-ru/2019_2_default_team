import template from './Filmpage.pug';
import {FILM} from "../../modules/events";
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

    /**
     * Call if film load is successful
     * @param data
     * @private
     */
    _onLoadFilmsSuccess (data) {
        this._data = { ...data, ...this._data };
        console.log(this._data);
        this._data = {items: data};
        console.log(this._data);
        super.render(data);
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
    }
}
