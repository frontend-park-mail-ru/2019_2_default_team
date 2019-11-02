import {EventBus} from '../modules/eventbus';
import {MenuView} from "../views/Menu/Menu";
import {MenuModel} from "../models/menuModel";

const eventList = [
    'checkAuth',
    'checkAuthResponse',
    'signOut',
    'signOutResponse'
];

export class MenuController {
    constructor(root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signOutResponse', () => {
            router.startPage();
        });

        this.headerView = new MenuView(root, eventBus, globalEventBus);
        this.headerModel = new MenuModel(eventBus);
    }
}