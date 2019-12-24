import template from './Search.pug';
import {View} from '../../modules/view';
import {AUTH, FILM, FILTER} from '../../modules/events'

export class SearchView extends View {
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
        this._globalEventBus.subscribeToEvent(FILM.getFilmsSearchSuccess, this._onGetFilmsSearchSuccess.bind(this));
    }

    render(data = {}) {
        this._globalEventBus.triggerEvent(FILM.getFilmsSearch);
        super.render(data)
    }

    onRender() {
    }


    _onGetFilmsSearchSuccess = (data) => {
        this._data = {items: data};
        super.render(this._data);
    }


}
