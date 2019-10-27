/**
 * Events creation
 * @class
 * @type {EventBus}
 */

export class EventBus {
    events: Map<any, any>;
    /**
     * @param listOfEvents Array[string] available events
     */
    constructor (listOfEvents=[{}]) {
        this.events = new Map();
        listOfEvents.forEach((eventName) =>
            this.events.set(eventName, [])
        );
    }

    /**
     * Subscription to event
     * @param {string} eventName
     * @param {function} callback
     */
    subscribeToEvent (eventName: string, callback) {
        if (!this.events.has(eventName)) {
            throw new Error(`EventBus: Unknown event ${eventName}`);
        }

        this.events.get(eventName).push(callback);
    }

    /**
     * Trigger all callbacks for events
     * @param {string} eventName
     * @param {object} args
     */
    triggerEvent (eventName: string, ...args) {
        if (!this.events.has(eventName)) {
            throw new Error(`EventBus: Unknown event ${eventName}`);
        }
        let eventListeners = this.events.get(eventName);
        eventListeners.forEach((callback) =>
            callback(...args)
        );
    }
    /**
     * Call func by event
     * @param {string} eventName
     * @param {object} args
     * @return {*}
     */
    dispatchEvent(eventName: string, ...args) {
        if (eventName === undefined) {
            console.log('No event value');
            return;
        }

        if (this.events[eventName] === undefined) {
            console.log('No such event: ' + eventName);
            return;
        }

        return this.events[eventName](...args);
    }
}