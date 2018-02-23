import { TagService } from './TagService'
import { observable, action, computed } from 'mobx';
import { Tag } from './Tag';

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

    @action addTag(tag: Tags.Contracts.ITag) {
        this.tags.push(new Tag(tag));
        TagService.storeTags(this.tags);
    }
}

