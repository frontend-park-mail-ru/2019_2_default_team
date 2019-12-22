import template from './Profile.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validate';
import { AUTH, PROFILE } from '../../modules/events';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const immutableFields = [
    'passwordConfirm',
    'path_to_img'
];

export class ProfileView extends View {

    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(PROFILE.loadProfileSuccess, this._onLoadProfileSuccess.bind(this));
        this._globalEventBus.subscribeToEvent(PROFILE.loadProfileFailed, this._onLoadProfileFailed.bind(this));

        this._globalEventBus.subscribeToEvent(PROFILE.saveAvatarFailed, this._onSaveAvatarFailed.bind(this));
        this._globalEventBus.subscribeToEvent(PROFILE.saveAvatarSuccess, this._onSaveAvatarSuccess.bind(this));
    }

    render (data = {}) {
        console.log("RENDER");
        this.isViewClosed=false;
        this._globalEventBus.triggerEvent(PROFILE.loadProfile);
        console.log("done");
    }

    /**
     * Успешное получении профиля, ставит слушатели на сохранение профиля, загрузки и сохранения аватарки
     * @param data
     * @private
     */
    _onLoadProfileSuccess (data) {
        console.log(data);
        if(this.isViewClosed){
            return;
        }
        super.render(data);
        // Переход в режим редактирования   
        this.editProfileButton = document.getElementById('editProfileButton');
        if(this.editProfileButton) {
            this.editProfileButton.addEventListener('click', () => {
                data.isEditingMode = true;
                this._onLoadProfileSuccess(data);
            });
        }
        if(data.isEditingMode) {
            this.addEditingModeEventListeners(data);
        }
    }

    addEditingModeEventListeners(data) {
        // Кнопки управления в режиме редактирования
        // Кнопка назад (без сохранения)
        this.backProfileButton = document.getElementById('backProfileButton');
        this.backProfileButton.addEventListener('click', () => {
            data.isEditingMode = false;
            this._onLoadProfileSuccess(data);
        })
        // Кнопка сохранить 
        this.saveProfileButton = document.getElementById('saveProfileButton');
        this.saveProfileButton.addEventListener('click', () => {
            let inputsArray = document.getElementsByTagName('input');
            
            if(this._validateProfileData()) {
                let profileJSON = {
                    nickname: inputsArray[1].value,
                    first_name: inputsArray[2].value,
                    last_name: inputsArray[3].value,
                    password: inputsArray[5].value
                };
                if(this.isEmailChanged) {
                    profileJSON.email = inputsArray[4].value;
                }
                this._globalEventBus.triggerEvent(PROFILE.saveProfile, profileJSON);
                data.isEditingMode = false;
                this._globalEventBus.triggerEvent(PROFILE.loadProfile);
            }
        });
        // Ставим вотчеры на все редактируемые поля
        let inputsArray = document.getElementsByTagName('input');
        let labelsArray = document.getElementsByClassName('profile-info__fieldname');
        this.isNicknameValidated = true;
        this.isFirstnameValidated = true;
        this.isSurnameValidated = true;
        this.isEmailValidated = true;
        this.isEmailChanged = false;
        this.isPasswordValidated = true;
        inputsArray[1].addEventListener('input', () => {
            this._validateOnChange(inputsArray[1], labelsArray[0], (value) => {
                // Валидация имени
                this.isNicknameValidated = value.length > 0 && value.match(/^[a-zA-Z].*/) !== null;
                return this.isNicknameValidated;
            });
        });
        inputsArray[2].addEventListener('input', () => {
            this._validateOnChange(inputsArray[2], labelsArray[1], (value) => {
                // Валидация имени
                this.isFirstnameValidated = value.length > 0 && value.match(/^[a-zA-Z].*/) !== null;
                return this.isFirstnameValidated;
            });
        });
        inputsArray[3].addEventListener('input', () => {
            this._validateOnChange(inputsArray[3], labelsArray[2], (value) => {
                // Валидация фамилии
                this.isSurnameValidated = value.length > 0 && value.match(/^[a-zA-Z].*/) !== null;
                return this.isSurnameValidated;
            });
        });
        inputsArray[4].addEventListener('input', () => {
            this._validateOnChange(inputsArray[4], labelsArray[3], (value) => {
                // Валидация email
                this.isEmailChanged = true;
                this.isEmailValidated = value.length > 0 && value.match(/^[a-zA-Z].*@[a-zA-Z].*\.[a-zA-Z].*/) !== null;
                return this.isEmailValidated;
            });
        });
        inputsArray[5].addEventListener('input', () => {
            this._validatePassword(inputsArray, labelsArray);
        });
        inputsArray[6].addEventListener('input', () => {
            this._validatePassword(inputsArray, labelsArray);
        });
    }

    _validateProfileData() {
        return this.isNicknameValidated && this.isFirstnameValidated && this.isSurnameValidated && this.isEmailValidated && this.isPasswordValidated;
    }

    _validateOnChange(observableField, labelField, validationFunc) {
        if(!validationFunc(observableField.value)) {
            labelField.classList.add('profile-info__fieldname_error');
        } else {
            labelField.classList.remove('profile-info__fieldname_error');
        }
    }

    _validatePassword(inputsArray, labelsArray) {
        // Валидация пароля
        let thisPass = inputsArray[5].value;
        let thisPassLabel = labelsArray[4];
        let otherPass = inputsArray[6].value;
        let otherPassLabel = labelsArray[5];
        if(thisPass && otherPass && thisPass === otherPass) {
            thisPassLabel.classList.remove('profile-info__fieldname_error');
            otherPassLabel.classList.remove('profile-info__fieldname_error');
            this.isPasswordValidated = true;
        } else {
            thisPassLabel.classList.add('profile-info__fieldname_error');
            otherPassLabel.classList.add('profile-info__fieldname_error');
            this.isEmailValidated = false;
        }
    }

    /**
     * Ошибка получения профиля
     * @param data
     * @private
     */
    _onLoadProfileFailed (data) {
        console.log("infailed");
        if(this.isViewClosed){
            return;
        }
        console.log("AFter if");
        super.render(data);
        this._role = data.role;
    }

    /**
     * Выбор файла для аватарки
     * @param event
     * @private
     */
    _onHandleFileSelect (event) {
        const file = event.target.files[0];
        const errMsg = this._avatar.nextElementSibling;

        const err = Validation.validateAvatar(file);
        if (err) {
            errMsg.innerHTML = err;
        } else {
            errMsg.innerHTML = '';
            let reader = new FileReader();

            this._avatar.title = file.name;

            reader.onload = function (event) {
                this._avatar.src = event.target.result;
            }.bind(this);

            reader.readAsDataURL(file);

            this._avatarButton.removeAttribute('disabled');
            this._avatarButton.classList.remove('button_disabled');
            this._avatarButton.classList.add('button_blue');
        }
    }

    /**
     * Нажати кнопки сохранения аватарки
     * @private
     */
    _onSaveAvatar () {
        const avatar = this._fileInput.files[0] || null;
        this._globalEventBus.triggerEvent(PROFILE.saveAvatar, avatar);
    }

    /**
     * Ошибка от модели при сохранении автарки
     * @param data
     * @private
     */
    _onSaveAvatarFailed (data) {
        this._avatar.nextElementSibling.innerHTML = data.error;
    }

    /**
     * Аватарка успешна сохранена
     * @param data
     * @private
     */
    _onSaveAvatarSuccess (data) {
        this._avatarButton.classList.remove('button_blue');
        this._avatarButton.classList.add('button_disabled');
        this._avatarButton.setAttribute('disabled', true);
    }

    /**
     * Нажата кнопка сохранения профиля
     * @param ev
     * @private
     */
    _onSaveProfile (ev) {
        ev.preventDefault();
        let wasfail = false;

        const password = this._profileForm.elements['password'];
        const passwordConfirm = this._profileForm.elements['passwordConfirm'];

        let testPass = Validation.validatePassword(password.value, true);
        if (testPass) {
            if (testPass === errInvalidPasswordData) {
                let error = password.nextElementSibling;
                View._addInputError(password, error, 'Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре');
                View._addInputError(passwordConfirm);
                wasfail = true;
            }
        } else {
            // let test = Validation.validateRepass(passwordConfirm.value, password.value);
            // if (test === errNotEqualPassRePass) {
            //     let error = passwordConfirm.nextElementSibling;
            //     View._addInputError(password, error, 'Пароли не совпадают');
            //     View._addInputError(passwordConfirm);
            //     wasfail = true;
            // }
        }
        console.log("HERE!!!!!!!!");
        if (wasfail) {
            passwordConfirm.value = '';
            password.value = '';
        } else {
            const profile = {};
            Array.prototype.forEach.call(this._profileForm.elements, elem => {
                if (!immutableFields.includes(elem.name)) {
                    profile[elem.name] = elem.value;
                }
            });
            profile['path_to_img'] = this._avatar.src;
            console.log("HERE!!!!!!!!");
            this._globalEventBus.triggerEvent(PROFILE.saveProfile, profile);
        }
    }
}
