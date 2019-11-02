import {MenuView} from '../Menu/Menu.js';

export class FilmView {
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    getData() {
        return this._data;
    }

    setData(dataToSet = {}) {
        this._data = {...dataToSet};
    }

    render() {
        const menu = new MenuView(this._parent);
    
        menu.setData({authorized: this.getData().authorized});
        menu.render();
        this._parent.innerHTML += filmpageTemplate(this._data)

        document.seatNumber = 0;
        const bookBtn = document.getElementById("bookBtn");
        bookBtn.addEventListener('click', (event) => {
            if(document.seatNumber <= 0) {
                window.alert("Место не выбрано")
            } else {
                window.alert("Выбрано место номер: " + document.seatNumber);
            }
        });
    }
}