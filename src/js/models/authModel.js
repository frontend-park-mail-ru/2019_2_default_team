import api from '../modules/api';
import {AUTH} from "../modules/events";

class AuthModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(AUTH.signIn, this._onSignIn.bind(this));
        this._globalEventBus.subscribeToEvent(AUTH.signUpCustomer, this._onSignUpCustomer.bind(this));
    }

    _onSignIn (user) {
        api.login(user)
            .then(response => {
                if (response.ok) {
                    this._globalEventBus.triggerEvent(AUTH.signInSuccess, {});
                } else {
                    this._globalEventBus.triggerEvent(AUTH.signInFailed, {});
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    _onSignUpCustomer = (user) => {
        api.register(user)
            .then(res => {
                if (res.status === 200) {
                    let token = res.headers.get('X-Csrf-Token');
                    localStorage.setItem('token', token);
                        this._globalEventBus.triggerEvent(AUTH.signUpSuccess, {});
                } else {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(AUTH.signUpFailed, data);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new AuthModel();
