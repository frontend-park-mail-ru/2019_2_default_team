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
        menu.render();
        this._parent.innerHTML += profileTemplate(this._data);
    }
}







// application.innerHTML = '';
// const form = document.createElement('form');

// const emailInput = document.createElement('input');
// emailInput.type = 'email';
// emailInput.name = 'email';
// emailInput.placeholder = 'Емайл';

// const passwordInput = document.createElement('input');
// passwordInput.type = 'password';
// passwordInput.name = 'password';
// passwordInput.placeholder = 'Пароль';

// const ageInput = document.createElement('input');
// ageInput.type = 'number';
// ageInput.name = 'age';
// ageInput.placeholder = 'Возраст';

// const submitBtn = document.createElement('input');
// submitBtn.type = 'submit';
// submitBtn.value = 'Зарегистрироваться!';

// form.appendChild(emailInput);
// form.appendChild(passwordInput);
// form.appendChild(ageInput);
// form.appendChild(submitBtn);

// form.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const email = form.elements['email'].value;
//     const age = parseInt(form.elements['age'].value);
//     const password = form.elements['password'].value;

//     AjaxModule.doPost({
//         url: '/signup',
//         body: {email, age, password},
//         callback: function (status, responseText) {
//             if (status === 201) {
//                 createProfile();
//                 return;
//             }
//             const {error} = JSON.parse(responseText);
//             alert(error);
//         }
//     });
// });

// const back = document.createElement('a');
// back.href = '/about';
// back.textContent = 'Назад';
// back.dataset.section = 'about';

// application.innerHTML = '';
// application.appendChild(form);
// application.appendChild(back);