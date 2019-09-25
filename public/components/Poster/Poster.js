import {MenuComponent} from '/components/Menu/Menu.js';

export class PosterComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    get data() {
        return this._data;
    }

    set data(dataToSet = {}) {
        this._data = {...dataToSet};
    }

    render() {
        const menu = new MenuComponent(this._parent);
        menu.data = {authorized: this._data['authorized']};
        menu.render();
        this._parent.innerHTML += posterTemplate(this._data);
    }
}