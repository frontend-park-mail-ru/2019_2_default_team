/**
 * Creates a new View model. Used for extension other views.
 * @class
 * @type {View}
 */
export default class View {
    /**
     * @constructor
     * @param {object} eventBus
     * @param {function} template
     * @param {object} root
     * @param {object} globalEventBus
     */
    constructor (root, template, eventBus, globalEventBus) {
        this._root = root;
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
        this._template = template;
    }

    /**
     * Renders the template
     * @param {object} data
     */
    render(data = {}) {
        this._root.innerHTML = this._template(data);
    }

    /**
     * Hides page
     * @method
     * @static
     */
    hide() {
        this._root.innerHTML = '';
    }

}