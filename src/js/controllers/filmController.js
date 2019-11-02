import { EventBus } from '../modules/eventbus';
import { FilmView } from '../views/Filmpage/Filmpage';
import { FilmModel } from '../models/filmModel';

const eventList = [
    'loadPage',
    'loadPageSuccess',
    'loadPageFailed'
];

export class PosterController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);

        this.filmView = new FilmView(root, eventBus);
        this.filmModel = new FilmModel(eventBus);
    }
}