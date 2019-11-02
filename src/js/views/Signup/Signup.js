import {MenuComponent} from '../Menu/Menu.js';

export class SignupComponent {
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
        menu.render({authorized: false});

        this._parent.innerHTML += signupTemplate(this._data);
        
        const form = document.getElementsByTagName('form')[0];
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = form.elements['email'].value;
            const age = parseInt(form.elements['age'].value);
            const password = form.elements['password'].value;

            AjaxModule.doPost({
                url: '/api/signup',
                body: {email, age, password},
                callback: function (status, responseText) {
                    if (status === 201) {
                        callback();
                        return;
                    }
                    const error = JSON.parse(responseText).error;
                    alert(error);
                }
            });
        });
    }
}