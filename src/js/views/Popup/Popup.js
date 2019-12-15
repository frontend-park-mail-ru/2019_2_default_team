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
        this.closePopupButton = document.getElementById("closePopupButton");
        this.closePopupButton.addEventListener("click", this._closePopup.bind(this));
        // Назначаем функцию на кнопку с выбором времени
        for(let i = 0; i < data.sessions.length; i++) {
            console.log(`Popup time button ${i}`);
            this.timeButton = document.getElementById(`popup-time-${i}`);
            // По клику на кнопку с временем надо подгрузить нужное место
            this.timeButton.addEventListener("click", () => {
               data.sessionIndex = i;
               this._globalEventBus.triggerEvent(POPUP.changePopupLayout, data);
            });
        }
    }

    _closePopup() {
        this._globalEventBus.triggerEvent(POPUP.closePopup);
    }
}
