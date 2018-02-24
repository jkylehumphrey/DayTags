import { TagService } from './TagService'
import { observable, action, computed, reaction } from 'mobx';
import { Tag } from './Tag';
import * as _ from 'lodash';

export class TagStore {
    @observable tags: Tag[] = [];
    @computed get totalNumTags(): number {
        return this.tags.length;
    };

    constructor() {
        TagService.getAll()
            .then(tags => {
                console.log(tags);
                if (tags) {
                    this.tags = tags.map(t => new Tag(t));
                }
                else { // create empty store
                    this.tags = [];
                    TagService.storeTags(this.tags);
                }
            })
            .catch(err => alert(err));
    }

    saveHandler = reaction(
        () => this.tags.length,
        tags => { TagService.storeTags(this.tags) }
    );

    @action clearStore() {
        this.tags = [];
    }
    @action addTag(tag: Tags.Contracts.ITag) {
        this.tags.push(new Tag(tag));
    }

    @action removeTag(tag: Tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }
}

