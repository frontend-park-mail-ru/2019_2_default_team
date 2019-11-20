import { FilmpageView } from '../views/Filmpage/Filmpage';
import {Controller} from "../modules/controller";

export class FilmpageController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._view = new FilmpageView(this._root, this._globalEventBus);
    }
}