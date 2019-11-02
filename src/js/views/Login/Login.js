import template from './Login.pug';
import View from '../../modules/view';
import Validation from '../../modules/validate';

export class LoginView extends View {

    constructor (root, eventBus) {
        super(root, template, eventBus);
        this._eventBus.subscribeToEvent('LoginFailed', this._onSubmitFailed.bind(this));
    }

    render (data = {}) {
        super.render(data);

        this._loginForm = this._root.querySelector('.login__form');
        this._loginForm.addEventListener('submit', this._onSubmit.bind(this), false);

        this.setValidationListeners();
    }

    setValidationListeners () {
        const email = this._loginForm.elements['email'];

        email.addEventListener('input', function (event) {
            const notValid = Validation.validateEmail(event.target.value, true);
            const error = event.target.nextElementSibling;
            if (Validation.isEmptyField(event.target.value) || !notValid) {
                event.target.className = 'input';
                error.innerHTML = '';
                error.className = 'error';
            } else {
                event.target.className = 'input invalid';
                error.innerHTML = 'Некорректный email';
            }
        }, false);
    }

    _onSubmitFailed (data) {
        const error = this._root.querySelector('.error-block');
        error.classList.add('error-block_login');
        error.innerHTML = `<p>${data.error}</p>`;
    }

    _onSubmit (ev) {
        ev.preventDefault();
        let wasfail = false;

        const email = this._loginForm.elements['email'];
        const password = this._loginForm.elements['password'];

        const inputs = this._loginForm.querySelectorAll('.input');
        inputs.forEach(input => {
            if (Validation.isEmptyField(input.value)) {
                const error = input.nextElementSibling;
                error.innerHTML = 'Обязательное поле';
                error.className = 'error active';
                input.className = 'input invalid';
                wasfail = true;
            } else {
                const error = input.nextElementSibling;
                error.innerHTML = '';
                error.className = 'error';
                input.className = 'input';
            }
        });

        if (wasfail) {
            password.value = '';
        } else {
            const user = {
                email: email.value,
                password: password.value
            };
            this._eventBus.triggerEvent('login', user);
        }
    }
}