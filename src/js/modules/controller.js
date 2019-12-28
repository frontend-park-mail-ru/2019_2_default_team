import {View} from "./view";

export class Controller {
    _view = new View();
    constructor (root, globalEventBus, router) {
        this._root = root;
        this._globalEventBus = globalEventBus;
        this._router = router;
    }

    openWithData = (data = {}) => {
        this._view.render(data);
    }

    close = () => {
        this._view.hide();
    }
}
