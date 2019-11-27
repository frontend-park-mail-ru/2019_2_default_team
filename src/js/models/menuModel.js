import api from "../modules/api";
import {AUTH} from "../modules/events";

class MenuModel {
    setGlobalEventBus(globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(AUTH.checkAuth, this._onCheckAuth.bind(this));
    }

    _onCheckAuth = () => {
        api.authCheck()
            .then(res =>{
                if (res.ok){
                    this._globalEventBus.triggerEvent(AUTH.checkAuthResponse, {Auth: true});
                }
                else{
                    this._globalEventBus.triggerEvent(AUTH.checkAuthResponse, {Auth: false});
            }
    })
            .catch(err => {
                console.error(err);
        });
    }
    }
export default new MenuModel();
