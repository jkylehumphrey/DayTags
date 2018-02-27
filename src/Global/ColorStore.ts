import { observable, action, computed, reaction } from 'mobx';
import * as _ from 'lodash';

export class ColorStore {

    colors = ['#5887CE', '#F2E394', '#F2AE72', '#D96459', '#8C4646'];
    currentIndex = 0;

    @computed get nextColorHex(): string {
        if (this.currentIndex > this.colors.length - 1) this.currentIndex = 0;
        return this.colors[this.currentIndex++];
    }

}

