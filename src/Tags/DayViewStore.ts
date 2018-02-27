import { observable, computed, action } from "mobx";
import moment from 'moment';

export class DayViewStore {
    @observable currentMoment: moment.Moment;

    @computed get currentMomentDisplay(): string {
        return this.currentMoment.calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: `dddd`
        })
    }

    @computed get currentMomentTicks(): number {
        return this.currentMoment.valueOf();
    }

    constructor(startDate?: Date) {
        this.currentMoment = moment(startDate || new Date()).startOf('day');
    }

    @computed get isToday(): boolean {
        return this.currentMoment.diff(moment(new Date()), 'days') === 0;
    }

    @action goBack() {
        this.currentMoment = moment(this.currentMoment.subtract(1, 'days'));
    }

    @action goForward() {
        this.currentMoment = moment(this.currentMoment.add(1, 'days'));
    }
}