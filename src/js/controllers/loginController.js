import { EventBus } from '../modules/eventbus';
import { LoginView } from '../views/Login/Login';
import { LoginModel } from '../models/loginModel';

const eventList = [
    'signIn',
    'signInSuccess',
    'signInFailed',
];

export class LoginController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signInSuccess', (data) => {
            globalEventBus.triggerEvent('headerLoad', data);
            router.startPage();
        });

        this.loginView = new LoginView(root, eventBus);
        this.loginModel = new LoginModel(eventBus);
    }
}