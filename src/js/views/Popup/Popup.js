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
    }

    _closePopup() {
        this._globalEventBus.triggerEvent(POPUP.closePopup);
    }
}
