import { PopupView } from '../views/Popup/Popup';
import { Controller } from '../modules/controller';
import { POPUP } from '../modules/events';

export class PopupController extends Controller {
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        console.log('I AM HERE');
        this._view = new PopupView(this._root, this._globalEventBus);

        this._globalEventBus.subscribeToEvent(POPUP.openPopup, this._onOpenPopup.bind(this));
        this._globalEventBus.subscribeToEvent(POPUP.closePopup, this._onClosePopup.bind(this));
    }

    _onOpenPopup() {
        this._view.render();

    }

    _onClosePopup() {
        let popupLayer = document.getElementById("popupLayer");
        popupLayer.innerHTML = '';
    }
}
