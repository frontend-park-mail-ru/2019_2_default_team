import {MenuComponent} from '../Menu/Menu.js';

export class AboutComponent {
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
        menu.render();
        this._parent.innerHTML += aboutTemplate(this._data);
    }
}