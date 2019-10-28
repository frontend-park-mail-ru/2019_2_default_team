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

        const form = document.createElement('form');

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.placeholder = 'Емайл';

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.placeholder = 'Пароль';

        const ageInput = document.createElement('input');
        ageInput.type = 'number';
        ageInput.name = 'age';
        ageInput.placeholder = 'Возраст!';

        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = 'Зарегистрироваться!';

        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(ageInput);
        form.appendChild(submitBtn);

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
                    const {error} = JSON.parse(responseText);
                    alert(error);
                }
            });
        });
        this._parent.appendChild(form);
    }
}