import template from './Poster.pug';
import {View} from '../../modules/view';
import {AUTH, FILM, FILTER} from '../../modules/events'

export class PosterView extends View {
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getFilmsSuccess, this._onGetFilmsSuccess.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getTopSuccess, this._onGetFilmsSuccess.bind(this));
        this._globalEventBus.subscribeToEvent(FILM.getFavFilmsSuccess, this._onGetFilmsSuccess.bind(this));
    }

    render(data = {}) {
        this.isViewClosed = false;

        this._globalEventBus.triggerEvent(AUTH.checkAuth);
        this._globalEventBus.triggerEvent(FILM.getFilms);
        super.render(data);
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
        this._data = {items: data};
        super.render(this._data);
        let searchInput = document.getElementById('search-input');
        if(data.searchInputValue !== undefined){
            searchInput.value = data.searchInputValue;
            searchInput.focus();
        }
        searchInput.addEventListener('input', this._onSearch.bind(this));
        this._todayButton = document.getElementById('today');
        this._todayButton.addEventListener('click', this._onTodayFilter.bind(this));
        this._upcomingButton = document.getElementById('upcoming');
        this._upcomingButton.addEventListener('click', this._onUpcomingFilter.bind(this));
        this._searchFilm = document.getElementById('search');
        this._searchFilm.addEventListener('submit', this._onSearch.bind(this), false);
    }

    _onTodayFilter = () => {
        this._globalEventBus.triggerEvent(FILTER.loadTodayFilter);
    };

    _onUpcomingFilter = () => {
       this._globalEventBus.triggerEvent(FILTER.loadUpcomingFilter);
    };

    _onSearch = (ev) => {
        ev.preventDefault();
        console.log("CALL");
        let data = document.getElementById('search-input').value;
        this._globalEventBus.triggerEvent(FILTER.search, data);
    };


}
