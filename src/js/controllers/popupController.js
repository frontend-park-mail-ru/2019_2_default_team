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
        this._globalEventBus.subscribeToEvent(POPUP.popupBookTicket, this._onBookTicket.bind(this));
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
                                popupJSON.timeLayout = true;
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
        if(data.sessionIndex !== undefined) {
            // TODO: Переделать callback'и на async/await
            api.getSeats(data.sessions[data.sessionIndex].ms_id).then(res => {
                if(res.ok) {
                    res.json().then(json => {
                        data = {...data, ...this._constructSeatsArray(json)};
                        data.timeLayout = false;
                        this._view.render(data);
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
        }
    }

    _onBookTicket(data) {
        api.bookSeat(data.apiInfo).then(res => {
            if(res.ok) {
                this._onClosePopup();
                alert('Вы заказали билет ' + data.seatNumber);
            } else {
                console.log("Could't book a ticket");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    _constructPopupJSON(filmJSON, sessionsJSON) {
        let popupJSON = {...filmJSON, sessions: this._getSessionTime(sessionsJSON)};
        return popupJSON;
    }

    _constructSeatsArray(seatsJSON) {
        let maxRow = 0;
        let maxSeatNumber= 0;
        let layoutMap = new Map();
        // Собираем мапу, в которой ключ: номер ряда, а значение: массив мест
        for(let i = 0; i < seatsJSON.length; i++) {
            if(seatsJSON[i].row > maxRow) {
                maxRow = seatsJSON[i].row;
            }
            if(seatsJSON[i].seat_number > maxSeatNumber) {
                maxSeatNumber = seatsJSON[i].seat_number;
            }
            if(layoutMap.has(seatsJSON[i].row)) {
                layoutMap.get(seatsJSON[i].row).push({
                    seatNumber: seatsJSON[i].seat_number,
                    isTaken: seatsJSON[i].is_taken,
                    seatId: seatsJSON[i].seat_id
                });
            } else {
                layoutMap.set(seatsJSON[i].row, [{
                    seatNumber: seatsJSON[i].seat_number,
                    isTaken: seatsJSON[i].is_taken,
                    seatId: seatsJSON[i].seat_id
                }])
            }
        }

        let seatsArray = [];
        // Перекладываем массивы мест из мапы в массив
        for(let i = 1; i <= maxRow; i++) {
            layoutMap.get(i).sort((a, b) => {
                return a.seatNumber - b.seatNumber;
            })
            seatsArray.push(layoutMap.get(i));
        }

        return {maxSeatNumber: maxSeatNumber, seatsArray: seatsArray};
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
