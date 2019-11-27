import template from './Poster.pug';
import {View} from '../../modules/view';
import {AUTH, FILM} from '../../modules/events'

export class PosterView extends View {
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getFilmsSuccess, this._onGetFilmsSuccess.bind(this));
    }

    render(data = {}) {
        this.isViewClosed = false;

        this._globalEventBus.triggerEvent(AUTH.checkAuth);
        this._globalEventBus.triggerEvent(FILM.getFilms);
        super.render(data)
    }

    onRender() {
    }

    _onAuthResponse(data) {
        if (this.isViewClosed) {
            return;
        } else {
            this.merge(data);
        }
        super.render(this._data);
    }

    _onGetFilmsSuccess(data){
        this._data = { ...data, ...this._data };
        console.log(this._data);
        this._data = {items: data};
        console.log(this._data);
        super.render(this._data);
    }
}
