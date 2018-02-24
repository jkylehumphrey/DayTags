import { observable, action, computed } from 'mobx';

const uuid = require('uuid/v4');
export class Tag implements Tags.Contracts.ITag {
    constructor(rawTag: Tags.Contracts.ITag) {
        Object.assign(this, rawTag);
        this.id = uuid();
    }
    id: string;
    @observable description: string;
}