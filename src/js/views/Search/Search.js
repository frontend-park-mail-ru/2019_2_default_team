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
        super.render(data);
    }

    onRender() {
    }


    _onGetFilmsSearchSuccess = (data) => {
        this._data = {items: data};
        super.render(this._data);
        this._submitButton = this._root.querySelector('.search-form.js-search-form');
        this._submitButton.addEventListener('submit', this._onSubmit.bind(this));
        console.log(this._submitButton);
    };

    _onSubmit = () => {
      console.log("submit");
      const genreIn = document.getElementById('js-genre-input');
      const actorIn = document.getElementById('js-actor-input');
      const ratingminIn = document.getElementById('js-ratingmin-input');
      const countryIn = document.getElementById('js-country-input');
      const yearMin = document.getElementById('js-yearmin-input');
      const yearMax = document.getElementById('js-yearmax-input');
      const search = {
          genre: genreIn.value,
          actors: actorIn.value,
          ratingmin: ratingminIn.value,
          country: countryIn.value,
          year_min: yearMin.value,
          year_max: yearMax.value,
      }
      this._globalEventBus.triggerEvent(FILM.wideSearch, search);
    }
}
