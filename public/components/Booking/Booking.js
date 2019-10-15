import {MenuComponent} from '/components/Menu/Menu.js'

export class BookingComponent {
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
        this._parent.innerHTML = '';
        const menu = new MenuComponent(this._parent);
        menu.setData({authorized: this.getData().authorized});
        menu.render();
        this._parent.innerHTML += bookingTemplate(this._data);
    }
}