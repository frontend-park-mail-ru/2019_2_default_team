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
        let list = document.querySelector('.register-el');
        list.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);
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

        nickname.addEventListener('input', function(event) {
            const error = event.target.nextElementSibling;
            event.target.className = 'input';
            error.innerHTML = '';
            error.className = 'error';
        }, false);
    }

    _onSubmitFailed(errorList) {
        const emailInput = this._signupForm.querySelector('[name="email"]');
        const passwordInput = this._signupForm.querySelector('[name="password"]');
        const nicknameInput = this._signupForm.querySelector('[name="nickname"]');
        if(errorList.includes('invalid_pass')) {
            passwordInput.classList.add('red_border');
            let passwordLabel = document.getElementById('passwordLabel');
            passwordLabel.innerText = 'Пароль не удовлетворяет требованиям безопасности';
        }
        if(errorList.includes('email_registered')) {
            emailInput.classList.add('red_border');
            let emailLabel = document.getElementById('emailLabel');
            emailLabel.innerText = 'Данный email уже зарегестрирован';
        }
        if(errorList.includes('email_invalid')) {
            emailInput.classList.add('red_border');
            let emailLabel = document.getElementById('emailLabel');
            emailLabel.innerText = 'Данный email некорректен';
        }
        if(errorList.includes('nick_registered')) {
            nicknameInput.classList.add('red_border');
            let nicknameLabel = document.getElementById('nicknameLabel');
            nicknameLabel.innerText = 'Данный никнейм уже зарегестрирован';
        }
        if(errorList.includes('invalid_length')) {
            nicknameInput.classList.add('red_border');
            let nicknameLabel = document.getElementById('nicknameLabel');
            nicknameLabel.innerText = 'Никнейм слишком короткий';
        }
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
            const  genre_elements = document.querySelectorAll('.row-el.checked');
            let genres = [];
            genre_elements.forEach(function (elem) {
                genres.push({genre: elem.innerText});
            });
            const user = {
                email: email.value,
                password: password.value,
                nickname: nickname.value,
                first_name: firstname.value,
                last_name: secondname.value,
                genres: genres,
            };
            console.log(genres);
            console.log(user);
            this._globalEventBus.triggerEvent(AUTH.signUpCustomer, user);
        }
    }
}
