import {Router} from './modules/router';
import {EventBus} from './modules/eventbus';

import PosterModel from './models/posterModel'
import FilmModel from "./models/filmModel";

import {AUTH, FILM, PROFILE} from "./modules/events";

import {MenuController} from "./controllers/menuController";
import {PosterController} from "./controllers/posterController";
import {FilmpageController} from "./controllers/filmController";
import {AboutController} from "./controllers/aboutController";

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page');
    const header = document.querySelector('header');
    const content = document.querySelector('.main-content');
    const globalEventBus = new EventBus([AUTH, PROFILE, FILM].map(model => Object.values(model)).flat());
    const models = {
        poster: PosterModel,
        film: FilmModel,
    };
    Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

    const router = new Router(body);

    const menuController = new MenuController(header, globalEventBus, router);
    const posterController = new PosterController(content, globalEventBus, router);
    const filmController = new FilmpageController(content, globalEventBus, router);
    const aboutController = new AboutController(content,globalEventBus,router);

    menuController.openWithData();
    router.add('/', posterController);
    router.add('/films', filmController);
    router.add('/about', aboutController);
    router.start();
});