import { EventBus } from '../modules/eventbus';
import { ProfileView } from '../views/Profile/Profile';
import { ProfileModel } from '../models/profileModel';

const eventList = [
    'loadProfile',
    'loadProfileSuccess',
    'loadProfileFailed',
    'saveButtonClicked',
    'saveProfile',
    'saveProfileSuccess',
    'saveProfileFailed',
    'saveAvatar',
    'saveAvatarSuccess',
    'saveAvatarFailed'
];

export class ProfileController {
    constructor (root, router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('saveProfileSuccess', () => {
            router.startPage();
        });

        this.profileView = new ProfileView(root, eventBus);
        this.profileModel = new ProfileModel(eventBus);
    }
}