export class MenuComponent {
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
        this._parent.innerHTML = '';
        this._parent.innerHTML += menuTemplate(this._data)
    }
}