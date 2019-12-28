import template from "../About/About.pug";
import {View} from "../../modules/view";

export class AboutView extends View{
    constructor(root, globalEventBus) {
        super(root, template, globalEventBus);
    }

    render() {
       super.render(this._data);
    }
}