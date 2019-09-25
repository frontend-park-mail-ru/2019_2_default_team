import {MenuComponent} from '/components/Menu/Menu.js';

export class ProfileComponent {
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
        menu.data = {authorized: true};
        menu.render();
        this._parent.innerHTML += profileTemplate(this._data);
    }
}