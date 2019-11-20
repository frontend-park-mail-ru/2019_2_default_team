import { PosterView } from '../views/Poster/Poster';
import { Controller } from '../modules/controller';

export class PosterController extends Controller {
    constructor (root, globalEventBus, router) {
        super(root, globalEventBus, router);

        this._view = new PosterView(this._root, this._globalEventBus);
    }

}
