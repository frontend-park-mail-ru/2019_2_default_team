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
    _onLoadProfileSuccess (data = {}) {
        if(this.isViewClosed){
            return;
        }
        super.render(data);

        this._profileForm = this._root.querySelector('form[name ="profile_form"]');
        this._profileForm.addEventListener('click', this._onSaveProfile.bind(this));

        this._fileInput = this._root.querySelector('input[name="my_file"]');
        this._fileInput.addEventListener('change', this._onHandleFileSelect.bind(this), false);

        this._avatarButton = this._root.querySelector('button[name="save_avatar"]');
        this._avatarButton.addEventListener('click', this._onSaveAvatar.bind(this));

        this._avatar = this._root.querySelector('.thumb');
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
