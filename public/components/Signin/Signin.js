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

    render(callback = noop) {
        const menu = new MenuComponent(this._parent);
        menu.render();

        this._parent.innerHTML += signinTemplate(this._data);
        let form = document.getElementById("Sub");
        form.addEventListener("click", function (e) {
            e.preventDefault();
            const email = document.getElementById('Login').value;
            const password = document.getElementById('Pass').value;
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
        document.getElementById("Sub")._parent.appendChild(form);
    }

}
