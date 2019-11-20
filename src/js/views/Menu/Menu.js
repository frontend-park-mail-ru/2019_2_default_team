import {View} from "../../modules/view";
import template from './Menu.pug'
import {AUTH} from "../../modules/events";

export class MenuView extends View{
    constructor (root, globalEventBus) {
        super(root, template, globalEventBus);

        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    }

    render (data = {}) {
        super.render(data);
    }

    _onAuthResponse (data) {
        super.render(data);
    }
}