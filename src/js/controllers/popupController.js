import { PopupView } from '../views/Popup/Popup';
import { Controller } from '../modules/controller';

export class PopupController extends Controller {
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        console.log('I AM HERE');
        this._view = new PopupView(this._root, this._globalEventBus);
    }

}
