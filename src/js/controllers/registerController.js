import { EventBus } from '../modules/eventbus';
import { RegisterView } from '../views/SignupSeeker/SignupSeekerView';
import { RegisterModel } from '../models/registerModel';

const eventList = [
    'register',
    'registerSuccess',
    'registerFailed',
];

export class RegisterController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('registerSuccess', (data) => {
            globalEventBus.triggerEvent('headerLoad', data);
            router.startPage();
        });

        this.registerView = new RegisterView(root, eventBus);
        this.registerModel = new RegisterModel(eventBus);
    }
}