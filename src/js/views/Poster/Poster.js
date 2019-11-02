import template from './Poster.pug';
import View from '../../modules/view';

export class PosterView extends View {

    constructor (root, eventBus) {
        super(root, template, eventBus);

        this._eventBus.subscribeToEvent('loadSuccess', this._onLoadSuccess.bind(this));
    }

    render (data = {}) {
        this._eventBus.triggerEvent('loadPage', data);
    }

    _onLoadSuccess(data){
        super.render(data);
    }
}