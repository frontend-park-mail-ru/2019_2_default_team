import { Controller } from "../modules/controller";
import { AboutView } from "../views/About/About"

export class AboutController extends Controller {
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._view = new AboutView(this._root, this._globalEventBus);
    }
}