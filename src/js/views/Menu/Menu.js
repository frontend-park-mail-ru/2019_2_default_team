import View from "../../modules/view";
import template from './Menu.pug'

export class MenuView extends View{
    constructor (root, eventBus, globalEventBus) {
        super(root, template, eventBus, globalEventBus);

        this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('signOutResponse', this._onAuthResponse.bind(this));
        this._globalEventBus.subscribeToEvent('headerLoad', this._onRenderHeader.bind(this));
    }

    render (data = {}) {
        super.render(data);
        this._eventBus.triggerEvent('checkAuth');
    }

    _onRenderHeader (data) {
        super.render(data);
        this._role = data.role;

        const signOutButton = this._root.querySelector('input[name=signOut]');
        if (signOutButton) {
            signOutButton.addEventListener('click', (ev) => {
                this._eventBus.triggerEvent('signOut');
            });
        }
    }

    _onAuthResponse (data) {
        this._globalEventBus.triggerEvent('headerLoad', data);
    }
}