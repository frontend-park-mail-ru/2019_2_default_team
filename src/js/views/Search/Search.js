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
        const genreIn = document.getElementById('js-genre-input');
        console.log(genreIn.value);
        this._submitButton.addEventListener('submit', this._onSubmit.bind(this), false);
        console.log(this._submitButton);
    };

    _onSubmit = (ev) => {
        ev.preventDefault();
      console.log("submit");
      const genreIn = document.getElementById('js-genre-input');
      const actorIn = document.getElementById('js-actor-input');
      const ratingminIn = document.getElementById('js-ratingmin-input');
      const countryIn = document.getElementById('js-country-input');
      const yearMin = document.getElementById('js-yearmin-input');
      const yearMax = document.getElementById('js-yearmax-input');
      const date = document.getElementById('js-date-input');
      const timemin = document.getElementById('js-timemin-input');
      const timemax = document.getElementById('js-timemax-input');
      const pricemin = document.getElementById('js-pricemin-input');
      const pricemax = document.getElementById('js-pricemax-input');
      const search = {
          genre: genreIn.value,
          actors: actorIn.value,
          ratingmin: ratingminIn.value,
          country: countryIn.value,
          year_min: yearMin.value,
          year_max: yearMax.value,
          date: date.value,
          time_min: timemin.value,
          time_max: timemax.value,
          price_min: pricemin.value,
          price_max: pricemax.value,
      };
      console.log(search);
      this._globalEventBus.triggerEvent(FILM.wideSearch, search);
    }
}
