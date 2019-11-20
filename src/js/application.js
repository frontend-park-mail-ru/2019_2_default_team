import {Router} from './modules/router';
import {EventBus} from './modules/eventbus';
import {PosterController} from "./controllers/posterController";
import PosterModel from './models/posterModel'
import {AUTH, PROFILE} from "./modules/events";
import {MenuController} from "./controllers/menuController";

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page');
    const header = document.querySelector('header');
    const content = document.querySelector('.main-content');
    const globalEventBus = new EventBus([AUTH, PROFILE].map(model => Object.values(model)).flat());
    const models = {
        poster: PosterModel,
    };
    Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

    const router = new Router(body);

    const menuController = new MenuController(header, globalEventBus, router);
    const posterController = new PosterController(content, globalEventBus, router);
    menuController.openWithData();
    router.add('/', posterController);
    router.start();
});