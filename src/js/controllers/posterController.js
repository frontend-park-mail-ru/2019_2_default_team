import { EventBus } from '../modules/eventbus';
import { PosterView } from '../views/Poster/Poster';
import { PosterModel } from '../models/posterModel';

const eventList = [
    'loadPage',
    'loadPageSuccess',
    'loadPageFailed'
];

export class PosterController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);

        this.posterView = new PosterView(root, eventBus);
        this.posterModel = new PosterModel(eventBus);
    }
}