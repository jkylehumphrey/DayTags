import { observable, action, computed } from 'mobx';

export class Tag implements Tags.Contracts.ITag {
    constructor(rawTag: Tags.Contracts.ITag){
        Object.assign(this, rawTag);
    }
    @observable description: string;
}