import {Controller} from "../modules/controller";
import {FILM, FILTER} from "../modules/events";
import api from "../modules/api";
import {PosterView} from "../views/Poster/Poster";

export class FilterController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        this._globalEventBus.subscribeToEvent(FILTER.loadWithFilter, this._onLoadUpcoming.bind(this));
        this._globalEventBus.subscribeToEvent(FILTER.loadTodayFilter, this._onLoadToday.bind(this));
        this._globalEventBus.subscribeToEvent(FILTER.loadUpcomingFilter, this._onLoadUpcoming.bind(this));
        this._globalEventBus.subscribeToEvent(FILTER.search, this._onSearch.bind(this));
        this._globalEventBus.subscribeToEvent(FILTER.loadWithFilterSuccess, (data) => {
            this._router.redirect('/');
        });
        this._view = new  PosterView(this._root, this._globalEventBus);
    }

    _onLoadToday = () => {
        api.getFilmsForToday()
            .then(res =>{
                if (res.ok){
                    res.json().then(data =>{
                        this._globalEventBus.triggerEvent(FILM.getFilmsSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
                }
            } )
    }

    _onLoadUpcoming = () => {
        api.getFilmsUpcoming()
            .then(res =>{
                if (res.ok){
                    res.json().then(data =>{
                        this._globalEventBus.triggerEvent(FILM.getFilmsSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
                }
            } )
    }

    _onSearch = (searchValue) => {
        api.searchFilm(searchValue)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    if(!data) {
                        data = {
                            items: []
                        }
                    }
                    data.searchInputValue = searchValue;
                    this._globalEventBus.triggerEvent(FILM.getFilmsSuccess, data);
                });
            } else {
                this._globalEventBus.triggerEvent(FILM.getFilmsFailed, {});
            }
        })    
    }
}
