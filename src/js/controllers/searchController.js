import {Controller} from "../modules/controller";
import {SearchView} from "../views/Search/Search";

export class SearchController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);
        this._view = new  SearchView(this._root, this._globalEventBus);
    }

}
