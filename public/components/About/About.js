import {MenuComponent} from '/components/Menu/Menu.js';

export class AboutComponent {
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
        menu.render();
        this._parent.innerHTML += aboutTemplate(this._data);
    }
}