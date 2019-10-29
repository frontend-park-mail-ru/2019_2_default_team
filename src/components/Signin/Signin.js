import {MenuComponent} from '../Menu/Menu.js';

export class SigninComponent {
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

    render(callback) {
        const menu = new MenuComponent(this._parent);
        menu.render();

        this._parent.innerHTML += signinTemplate(this._data);
        const form = document.getElementsByTagName('form')[0];
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = form.elements['email'].value;
            const password = form.elements['password'].value;
            AjaxModule.doPost({
                url: '/api/signin',
                body: {email, password},
                callback: function (status, response) {
                    if (status === 200) {
                        callback();
                    } else {
                        const {error} = JSON.parse(response);
                        alert(error);
                    }
                }
            });
        });
    }

}
