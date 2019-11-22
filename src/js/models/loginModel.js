import api from '../modules/api';
import {AUTH} from "../modules/events";

class LoginModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(AUTH.signIn, this._onSignIn.bind(this));
    }

    _onSignIn (user) {
        console.log('here');
        console.log(user);
        api.login(user)
            .then(response => {
                if (response.ok) {
                    this._globalEventBus.triggerEvent(AUTH.signInSuccess, {});
                } else {
                    response.json().then(data => {
                        this._globalEventBus.triggerEvent(AUTH.signInFailed, data);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new LoginModel();