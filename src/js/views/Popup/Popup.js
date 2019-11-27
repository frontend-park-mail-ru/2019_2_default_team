import template from './Popup.pug';
import {View} from '../../modules/view';
import {CINEMA} from "../../modules/events";

export class PopupView extends View {
    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(CINEMA.getTypeSuccess, this._onGetTypeSuccess.bind(this));
        this._globalEventBus.subscribeToEvent(CINEMA.getSessionsSuccess, this._onGetSessionsSuccess.bind(this));
    }

    render (data = {}) {
        super.render(data);
    }
    _onGetTypeSuccess = () => {
        //TODO Selector of types, when backend sends its types
    }

    _onGetSessionsSuccess = (data) => {
        this._data(data);
        super.render(data);
    }
}