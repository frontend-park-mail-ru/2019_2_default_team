import {MenuComponent} from '/components/Menu/Menu.js';

export class PosterComponent {
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
        const menu = new MenuComponent(this._parent);
        menu.setData({authorized: this.getData().authorized});
        menu.render();
        this._parent.innerHTML += posterTemplate(this._data);
    }
}