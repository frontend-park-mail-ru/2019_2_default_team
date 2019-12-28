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
        if (!data){
            data = {};
            super.render(data);
        } else {
            this._data = {items: data};
            super.render(this._data);
            let searchInput = document.getElementById('search-input');
            if (data.searchInputValue !== undefined) {
                searchInput.value = data.searchInputValue;
                searchInput.focus();
            }
            searchInput.addEventListener('input', this._onSearch.bind(this));
            this._submitButton = this._root.querySelector('.search-form.js-search-form');
            const genreIn = document.getElementById('js-genre-input');
            this._submitButton.addEventListener('submit', this._onSubmit.bind(this), false);
        }
    };

    _onSubmit = (ev) => {
        ev.preventDefault();
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
      let fulldate = "";
      if (!date.value) {
          let year = new Date().getFullYear();
          let day = new Date().getUTCDate();
          let month = new Date().getMonth() + 1;
          fulldate = year + "-" + month + "-" + day;
      } else {
          fulldate = date.value;
      }
      let tmax = "";
      let tmin = "";

      if (timemax.value){
          tmax = fulldate + "T" + timemax.value + ":00.000Z";
      }
      if (timemin.value){
          tmin = fulldate + "T" + timemin.value + ":00.000Z";
      }
      if (!timemin.value && !timemax.value && date.value){
          tmax = fulldate + "T" + "23:59" + ":00.000Z";
          tmin = fulldate + "T" + "00:00" + ":00.000Z";
      }
      const search = {
          genre: genreIn.value,
          actors: actorIn.value,
          ratingmin: ratingminIn.value,
          country: countryIn.value,
          year_min: yearMin.value,
          year_max: yearMax.value,
          time_min: tmin,
          time_max: tmax,
          price_min: pricemin.value,
          price_max: pricemax.value,
      };
      this._globalEventBus.triggerEvent(FILM.wideSearch, search);
    };

    _onSearch = (ev) => {
        ev.preventDefault();
        let data = document.getElementById('search-input').value;
        this._globalEventBus.triggerEvent(FILTER.search, data);
    };

}
