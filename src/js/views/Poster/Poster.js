import template from './Poster.pug';
import {View} from '../../modules/view';
import {AUTH} from '../../modules/events'

export class PosterView extends View {
    constructor(root, eventBus, globalEventBus) {
        super(root, template, eventBus, globalEventBus);
        this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    }

    render(data = {}) {
        this.merge(data);
        this.isViewClosed = false;

        this._globalEventBus.triggerEvent(AUTH.checkAuth);
        super.render(data)
    }

    onRender() {
    }

    _onAuthResponse(data) {
        if (this.isViewClosed) {
            return;
        } else {
            this.merge(data);
        }
        super.render(this._data);
    }
}