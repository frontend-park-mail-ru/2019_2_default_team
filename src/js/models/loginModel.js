import Api from '../modules/api';

export class LoginModel {

    constructor (eventBus) {
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('login', this._onSignIn.bind(this));
    }

    _onSignIn (user) {
        Api.login(user)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        this._eventBus.triggerEvent('loginSuccessful', data);
                    });
                } else {
                    response.json().then(data => {
                        this._eventBus.triggerEvent('loginFailed', data);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}