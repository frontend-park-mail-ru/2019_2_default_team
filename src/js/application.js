import Router from './modules/router';
import {EventBus} from './modules/eventbus';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page');
    const header = document.querySelector('header');
    const content = document.querySelector('.main-content');

    const router = new Router(body);

    const globalEventBus = new EventBus([
        'headerLoad',
        'getRoleFromHeader',
    ]);

    router.start();
});