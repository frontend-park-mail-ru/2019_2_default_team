import Api from '../modules/api';

export class RegisterModel {

    constructor (eventBus) {
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('register', this._onSignUp.bind(this));
    }

    _onSignUp (user) {
        Api.register(user)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this._eventBus.triggerEvent('registerSuccess', data);
                    });
                } else {
                    res.json().then(data => {
                        this._eventBus.triggerEvent('registerFailed', data);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}