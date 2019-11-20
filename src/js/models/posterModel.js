import api from "../modules/api";
import {AUTH} from "../modules/events";

class PosterModel {
    _loadPage(){
        api.getAllFilms().then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this._globalEventBus.triggerEvent('loadSuccess', data);
                });
            } else {
                response.json().then(data => {
                    this._globalEventBus.triggerEvent('loadFailed', data);
                })
            }
        })
            .catch(error => {
                console.error(error);
            })
    }

    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;
        this._globalEventBus.subscribeToEvent(AUTH.checkAuth, this._onCheckAuth.bind(this))

    }

    _onCheckAuth(){
        api.authCheck()
            .then(res =>{
            })
    }
}

export default new PosterModel();