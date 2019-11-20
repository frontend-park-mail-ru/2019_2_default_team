import {MenuView} from "../views/Menu/Menu";
import {Controller} from "../modules/controller";

export class MenuController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        this._view = new MenuView(this._root, this._globalEventBus);
    }
}