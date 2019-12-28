import api from "../modules/api";
import {CINEMA} from "../modules/events";

class PopupModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;
        this._globalEventBus.subscribeToEvent(CINEMA.getSessions, this._onGetSessions.bind(this));
        this._globalEventBus.subscribeToEvent(CINEMA.getType, this._onGetType.bind(this));

    }

    _onGetSessions(data){
        api.getSessions(data)
            .then(res =>{
                if (res.ok){
                    res.json().then(data =>{
                        this._globalEventBus.triggerEvent(CINEMA.getSessionsSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(CINEMA.getSessionsFailed, {});
                }
            })
    }

    _onGetType(data){
        //TODO Get type of film before getting sessions for popup
    }
}

export default new PopupModel();
