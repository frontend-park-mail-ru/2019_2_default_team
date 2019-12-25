import template from './Login.pug';
import {View} from '../../modules/view';
import Validation from '../../modules/validate';
import {AUTH} from "../../modules/events";

export class LoginView extends View {
    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(AUTH.signInFailed, this._onSubmitFailed.bind(this));
    }

    render (data = {}) {
        super.render(data);

        this._loginForm = this._root.querySelector('form');
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
                error.style = "color: red;";
            }
        }, false);
    }

    _onSubmitFailed (data) {
        this.render({invalidLoginTooltip: true});
    }

    _onSubmit (ev) {
        ev.preventDefault();
        let wasfail = false;
        console.log('PRESS ME!');
        const email = this._loginForm.elements['email'];
        const password = this._loginForm.elements['password'];

        let inputs = this._loginForm.querySelectorAll('.input');
        wasfail = View._validateObligatoryInputs(inputs);
        if (wasfail) {
            password.value = '';
        } else {
            const user = {
                email: email.value,
                password: password.value,
            };
            console.log('Here');
            this._globalEventBus.triggerEvent(AUTH.signIn, user);
        }
    }
    _onSubmitSuccess(ev){

    }
}