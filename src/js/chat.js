import { EventBus } from './modules/eventbus';
import { AUTH, CHAT } from './modules/events';
import authModel from './models/authModel';
import chatModel from './models/chatModel';
import { ChatController } from './controllers/chatController';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.chat');
    console.log("HERE!");
    const globalEventBus = new EventBus([AUTH, CHAT].map(model => Object.values(model)).flat());

    const models = {
        auth: authModel,
        chat: chatModel,
    };

    window.chatModel=chatModel;

    Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));
    console.log("HERE!!!");
    new ChatController(body, globalEventBus).start();
});
