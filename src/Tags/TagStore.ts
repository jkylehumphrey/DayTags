import { action, computed, observable, reaction } from 'mobx';
import moment from 'moment';

import { DayViewStore } from './DayViewStore';
import { Tag } from './Tag';
import { TagService } from './TagService';

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

    tagColors = ['#5887CE', '#F2E394', '#F2AE72', '#D96459', '#8C4646'];
    colorIndex = 0;

    @computed get nextColorHex(): string {
        if (this.colorIndex > this.tagColors.length - 1) this.colorIndex = 0;
        return this.tagColors[this.colorIndex++];
    }

    saveHandler = reaction(
        () => this.tags.map(t => t.days.length),
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

    @action addTag(description: string) {
        this.tags.push(new Tag({
            description: description,
            days: [this.dayViewStore.currentMomentTicks],
            colorRGBA: this.nextColorHex,
            lastUsedTicks: moment(new Date()).valueOf()
        }));
    }

    @action deleteTag(tag: Tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }

    searchTags(description: string): Tag[] {
        const regex = new RegExp(`${description.trim()}`, 'i');
        return description.length === 0 ? [] :
            this.tags.filter(tag => tag.description.search(regex) >= 0);
    }
}

