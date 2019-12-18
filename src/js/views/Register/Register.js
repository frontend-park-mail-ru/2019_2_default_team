import template from './Register.pug';
import {View} from '../../modules/view';
import Validation from '../../modules/validate';
import {AUTH} from "../../modules/events";

const errInvalidPasswordData = 'Must contain at least 8 chars';

export class RegisterView extends View {

    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
        this._globalEventBus.subscribeToEvent(AUTH.signUpFailed, this._onSubmitFailed.bind(this));
    }

    render(data = {}) {
        super.render(data);

        this._signupForm = this._root.querySelector('form');
        this._signupForm.addEventListener('submit', this._onSubmit.bind(this), false);

        this.setValidationOnChangeListeners();
    }

    setValidationOnChangeListeners() {
        const login = this._signupForm.elements.email;
        const password = this._signupForm.elements.password;
        const nickname = this._signupForm.elements.nickname;
        const firstname = this._signupForm.elements.FirstName;
        const secondname = this._signupForm.elements.SecondName;


        password.addEventListener('input', function (event) {
            const error = event.target.nextElementSibling;
            event.target.className = 'input';
            error.innerHTML = '';
            error.className = 'error';
        }, false);

        login.addEventListener('input', function (event) {
            const notValid = Validation.validateEmail(event.target.value, true);
            const error = event.target.nextElementSibling;
            if (Validation.isEmptyField(event.target.value) || !notValid) {
                event.target.className = 'input';
                error.innerHTML = '';
                error.className = 'error';
            } else {
                event.target.className = 'input invalid ';
                error.innerHTML = 'Некорректный email';
            }
        }, false);
    }

    _onSubmitFailed(data) {
        const login = this._signupForm.querySelector('[name="email"]');
        login.classList.add('invalid');

        const error = login.nextElementSibling;
        error.innerHTML = data.error;
    }

    _onSubmit(ev) {
        console.log("Register");
        ev.preventDefault();
        let wasfail = false;

        const email = this._signupForm.elements.email;
        const password = this._signupForm.elements.password;
        const nickname = this._signupForm.elements.nickname;
        const firstname = this._signupForm.elements.FirstName;
        const secondname = this._signupForm.elements.SecondName;

        const inputs = this._signupForm.querySelectorAll('.input');
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

        if (!email.validity.valid) {
            const error = email.nextElementSibling;
            error.innerHTML = 'Неверный email!';
            error.className = 'error active';
            wasfail = true;
        }

        const testPass = Validation.validatePassword(password.value, true);
        if (testPass) {
            if (testPass === errInvalidPasswordData) {
                const error = password.nextElementSibling;
                error.innerHTML = 'Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре';
                error.className = 'error active';
                password.className = 'input invalid';
                wasfail = true;
            }
        }
        if (wasfail) {
            password.value = '';

        } else {
            const user = {
                email: email.value,
                password: password.value,
                nickname: nickname.value,
                firstname: firstname.value,
                secondname: secondname.value,
            };
            console.log("before trigger");
            this._globalEventBus.triggerEvent(AUTH.signUpCustomer, user);
        }
    }
}
