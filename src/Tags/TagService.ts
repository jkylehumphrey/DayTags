import { AsyncStorage } from "react-native";
import { observable, computed, action } from "mobx";
const _TAG_STORAGE = "@DayTags.tags"

export class TagService {
    public static getAll = (): Promise<Tags.Contracts.ITag[]> => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(_TAG_STORAGE)
                .then(listString => {
                    resolve(JSON.parse(listString));
                })
                .catch(err => reject(err));
        });
    }

    public static storeTags = (tags: Tags.Contracts.ITag[]) => {
        AsyncStorage.setItem(_TAG_STORAGE, JSON.stringify(tags));
    }
}
