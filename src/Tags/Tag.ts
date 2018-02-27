import { observable, action, computed, reaction } from 'mobx';
import moment from 'moment';

const uuid = require('uuid/v4');
export class Tag implements Tags.Contracts.ITag {
    constructor(rawTag: Tags.Contracts.ITag) {
        this.days = [];
        Object.assign(this, rawTag);
        this.id = uuid();
    }

    id: string;
    description: string;
    @observable days: number[];
    @observable colorRGBA: string;
    @observable lastUsedTicks: number;

    @action addDay(dayInTicks: number) {
        this.days.push(dayInTicks);
        this.lastUsedTicks = moment(new Date()).valueOf();
    }

    @action removeDay(dayInTicks: number) {
        this.days.splice(this.days.indexOf(dayInTicks), 1);
    }
}