import {Router} from './modules/router';
import {EventBus} from './modules/eventbus';

import PosterModel from './models/posterModel'
import FilmModel from "./models/filmModel";
import LoginModel from './models/authModel';
import ChatModel from './models/chatModel'

import {AUTH, FILM, PROFILE, CHAT} from "./modules/events";

import {MenuController} from "./controllers/menuController";
import {PosterController} from "./controllers/posterController";
import {FilmpageController} from "./controllers/filmController";
import {AboutController} from "./controllers/aboutController";
import {LoginController} from "./controllers/loginController";
import {RegisterController} from "./controllers/registerController";
import {ChatController} from "./controllers/chatController";

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page');
    const header = document.querySelector('header');
    const content = document.querySelector('.main-content');
    const iframe = document.querySelector('.iframe');
    const globalEventBus = new EventBus([AUTH, PROFILE, FILM, CHAT].map(model => Object.values(model)).flat());
    const models = {
        poster: PosterModel,
        film: FilmModel,
        login: LoginModel,
        chat: ChatModel,
    };
    Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

    const router = new Router(body);

    const menuController = new MenuController(header, globalEventBus, router);
    const posterController = new PosterController(content, globalEventBus, router);
    const filmController = new FilmpageController(content, globalEventBus, router);
    const aboutController = new AboutController(content,globalEventBus,router);
    const loginController = new LoginController(content, globalEventBus, router);
    const registerController = new RegisterController(content, globalEventBus, router);
    const chatController = new ChatController(iframe, globalEventBus, router);

    menuController.openWithData();
    router.add('/', posterController);
    router.add('/film', filmController);
    router.add('/about', aboutController);
    router.add('/login', loginController);
    router.add('/register', registerController);
    router.start();
});
