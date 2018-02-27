import { TagService } from './TagService'
import { observable, action, computed, reaction } from 'mobx';
import { Tag } from './Tag';
import * as _ from 'lodash';
import { DayViewStore } from './DayViewStore';

export class TagStore {
    @observable tags: Tag[] = [];
    private dayViewStore: DayViewStore;

    constructor(dayViewStore: DayViewStore) {
        this.dayViewStore = dayViewStore;

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

    @computed get totalNumTags(): number {
        return this.tags.length;
    };

    @computed get tenMostRecentTags(): Tag[] {
        return this.tags.filter(t => { return !t.days.includes(this.dayViewStore.currentMomentTicks) }).sort((a: Tag, b: Tag) => {
            return b.lastUsedTicks - a.lastUsedTicks;
        }).slice(0, 9);
    }

    @computed get tagsForCurrentDay(): Tag[] {
        return this.tags.filter(t => { return t.days.includes(this.dayViewStore.currentMomentTicks) });
    }

    tagsForDay(dayTicks: number): Tag[] {
        return this.tags.filter(t => { return t.days.includes(dayTicks) });
    }

    @action clearStore() {
        this.tags = [];
    }

    @action addTag(tag: Tags.Contracts.ITag) {
        this.tags.push(new Tag(tag));
    }

    @action deleteTag(tag: Tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }
}

