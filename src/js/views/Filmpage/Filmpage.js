import template from './Filmpage.pug';
import {FILM} from "../../modules/events";
import {View} from "../../modules/view";

export class FilmpageView extends View{
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(FILM.getFilmsSuccess, this._onLoadFilmSuccess.bind(this));
    }

    render(data = {}) {
        // const menu = new MenuView(this._parent);
        //
        // menu.setData({authorized: this.getData().authorized});
        // menu.render();
        // this._parent.innerHTML += filmpageTemplate(this._data)/film/1
        //
        // document.seatNumber = 0;
        // const bookBtn = document.getElementById("bookBtn");
        // bookBtn.addEventListener('click', (event) => {
        //     if(document.seatNumber <= 0) {
        //         window.alert("Место не выбрано")
        //     } else {
        //         window.alert("Выбрано место номер: " + document.seatNumber);
        //     }
        // });
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
    _onLoadFilmSuccess (data) {
        this._data = { ...data, ...this._data };

        super.render(data);
    }
}