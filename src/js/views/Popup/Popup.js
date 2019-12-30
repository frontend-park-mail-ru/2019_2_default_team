import template from './Popup.pug';
import {View} from '../../modules/view';
import {POPUP} from "../../modules/events";

export class PopupView extends View {
    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);
    }

    render (data = {}) {
        super.render(data);
        this._addEventListeners(data);
    }

    _addEventListeners(data) {
        window.onpopstate = () => {
            this._globalEventBus.triggerEvent(POPUP.closePopup);
        };
        if(data.timeLayout) {
            this.closePopupButton = document.getElementById("closePopupButton");
            this.closePopupButton.addEventListener("click", this._closePopup.bind(this));
            // Назначаем функции на кнопку с выбором времени
            for(let i = 0; i < data.sessions.length; i++) {
                this.timeButton = document.getElementById(`popup-time-${i}`);
                // По клику на кнопку с временем надо подгрузить нужное место
                this.timeButton.addEventListener("click", () => {
                   data.sessionIndex = i;
                   this._globalEventBus.triggerEvent(POPUP.changePopupLayout, data);
                });
            }
        } else {
            this.filmId = data.id;
            this.backPopupSeatsButton = document.getElementById('backPopupSeatsButton');
            this.backPopupSeatsButton.addEventListener('click', this._backPopup.bind(this));
            // Назначаем функции на кнопку с выбором места
            for(let i = 1; i <= data.maxSeatNumber; i++) {
                this.seatButton = document.getElementById(`popup-seat-${i}`);
                if(this.seatButton.classList.contains("popup-seat-item-disabled")) {
                    continue;
                }
                // Получаем seatId для данного seatNumber
                let seatId = (function() {
                    // TODO: Не очень оптимизированная функция для нахождения id места по текущему номеру
                    for(let row = 0; row < data.seatsArray.length; row++) {
                        for(let item of data.seatsArray[row]) {
                            if(item.seatNumber == i) {
                                return item.seatId;
                            }
                        }
                    }
                    return undefined;
                })();
                // Назначаем ивент на кнопку
                this.seatButton.addEventListener('click', () => {
                    this._globalEventBus.triggerEvent(POPUP.popupBookTicket, {
                        apiInfo: {
                            ms_id: data.sessions[data.sessionIndex].ms_id,
                            seat_id: seatId,
                            price: 0
                        },
                        seatNumber: i
                    });
                });
            }
        }

    }

    _closePopup() {
        this._globalEventBus.triggerEvent(POPUP.closePopup);
    }

    //  Возврат из выбора места в выбор времени
    _backPopup() {
        this._globalEventBus.triggerEvent(POPUP.openPopup, {id: this.filmId});
    }
}
