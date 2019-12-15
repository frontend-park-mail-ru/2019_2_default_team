import { PopupView } from '../views/Popup/Popup';
import { Controller } from '../modules/controller';
import { POPUP } from '../modules/events';
import api from '../modules/api';

export class PopupController extends Controller {
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        console.log('I AM HERE');
        this._view = new PopupView(this._root, this._globalEventBus);

        this._globalEventBus.subscribeToEvent(POPUP.openPopup, this._onOpenPopup.bind(this));
        this._globalEventBus.subscribeToEvent(POPUP.closePopup, this._onClosePopup.bind(this));
        this._globalEventBus.subscribeToEvent(POPUP.changePopupLayout, this._onChangeLayout.bind(this));
    }

    _onOpenPopup(data) {
        let filmId = data["0"];
        // TODO: Переделать эти callback'и на async/await
        api.getFilmInfo(filmId).then(res => {
            if(res.ok) {
                res.json().then(filmJSON => {
                    api.getSessions(filmId).then(res => {
                        if(res.ok) {
                            res.json().then(sessionsJSON => {
                                let popupJSON = this._constructPopupJSON(filmJSON, sessionsJSON);
                                this._view.render(popupJSON);
                            });
                        } else {
                            this._globalEventBus.triggerEvent(POPUP.openPopupFailure);
                        }
                    });
                });
            } else {
                this._globalEventBus.triggerEvent(POPUP.openPopupFailure);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    _onClosePopup() {
        let popupLayer = document.getElementById("popupLayer");
        popupLayer.innerHTML = '';
    }
    
    _onChangeLayout(data) {
        // NOTE: Выпилить дебаг выводы
        console.log('Inside _onChangeLayout');
        console.log(data);
        if(data.sessionIndex !== undefined) {
            // TODO: Переделать callback'и на async/await
            api.getSeats(data.sessions[data.sessionIndex].ms_id).then(res => {
                console.log('Inside getSeats method');  // NOTE: Выпилить дебаг вывод
                if(res.ok) {
                    res.json().then(json => {
                        console.log(json);  // NOTE:  Выпилить дебаг вывод
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    this._globalEventBus.triggerEvent(POPUP.changePopupLayoutFailure);
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this._globalEventBus.triggerEvent(POPUP.changePopupLayoutFailure);
            console.log("POPUP_CONTROLLER::_onChangeLayout::Session index is not set!") // NOTE: Выпилить дебаг вывод
        }
    }

    _constructPopupJSON(filmJSON, sessionsJSON) {
        let popupJSON = {...filmJSON, sessions: this._getSessionTime(sessionsJSON)};
        popupJSON.timeLayout = true;
        return popupJSON;
    }

    _getSessionTime(sessionsJSON) {
        let sessions = []
        let sessionTimeRegexp = /\d{2}:\d{2}/;
        for(let i = 0; i < sessionsJSON.length; i++) {
            var time = sessionsJSON[i].start_datetime.match(sessionTimeRegexp)[0];
            sessions.push({ms_id: sessionsJSON[i].ms_id, time: time});
        }
        return sessions;
    }
}
