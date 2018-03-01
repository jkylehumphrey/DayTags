import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Content, Form, Icon, Input, Item, Label, Text } from 'native-base';
import React from 'react';
import { Keyboard, StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { AddTagModalProps } from './AddTagModal';
import { DayViewStore } from '../DayViewStore';
import { Tag } from '../Tag';
import { TagStore } from '../TagStore';

@observer
export class TagViewFooter extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, any>{

    @observable addTagModalState: AddTagModalProps = {
        show: false,
    }

    @observable displayState = {
        newTagDescription: ''
    }

    @computed get tagsToShow(): Tag[] {
        return this.displayState.newTagDescription.length == 0 ?
            this.props.tagStore.tenMostRecentTags
            :
            this.props.tagStore.searchTags(this.displayState.newTagDescription)
    }

    handleAddTagPress = () => {
        this.props.tagStore.addTag(this.displayState.newTagDescription);
        this.displayState.newTagDescription = '';
        Keyboard.dismiss();
    }

    handleClear = () => {
        this.props.tagStore.clearStore();
    }

    handleNewTagDescriptionChange = (text: string) => {
        this.displayState.newTagDescription = text;
    }

    handleTagPressed = (t: Tag) => {
        t.addDay(this.props.dayViewStore.currentMomentTicks);
        this.displayState.newTagDescription = '';
        Keyboard.dismiss();
    }

    render() {

        const tagsToShow = this.tagsToShow.map(t => {
            return (
                <Button key={t.id}
                    small
                    style={StyleSheet.flatten([{ backgroundColor: t.colorRGBA }, styles.recentTag])}
                    onPress={() => { this.handleTagPressed(t); }}>
                    <Text>
                        {t.description}
                    </Text>
                </Button>
            );
        });

        const addNewTagButton = (
            <Button full success
                onPress={this.handleAddTagPress}>
                <Text>Add New Tag</Text>
            </Button>
        );

        return (
            <KeyboardAvoidingView behavior="position" >
                <View style={styles.tagFooterView}>
                    <Form style={{ flex: 1 }}>
                        <Item regular style={styles.newTagInputItem}>
                            <Input placeholder="Search Tags"
                                value={this.displayState.newTagDescription}
                                returnKeyType="go"
                                onSubmitEditing={this.handleAddTagPress}
                                onChangeText={this.handleNewTagDescriptionChange} />
                            <Icon active name="search" />
                        </Item>
                        {
                            (tagsToShow.length == 0 && this.displayState.newTagDescription.length > 0) ?
                                addNewTagButton :
                                <Item stackedLabel style={styles.recentSearchItem}>

                                    < Label > {this.displayState.newTagDescription.length == 0 ? "Recent Tags" : "Similar Tags"}</Label>
                                    <Content contentContainerStyle={styles.tagDisplayRow}>
                                        {tagsToShow}
                                    </Content>
                                </Item>
                        }
                    </Form>
                </View >
            </KeyboardAvoidingView>


        )
    }
}

const styles = StyleSheet.create({
    tagFooterView: {
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        height: 200
    },
    newTagInputItem: {
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 5,
        backgroundColor: '#eee',
        height: 40
    },
    recentSearchItem: {
        borderBottomWidth: 0,
        height: 150
    },
    tagDisplayRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10
    },
    tagFooterControl: {
        backgroundColor: '#fff',
    },
    tagDisplay: {
        margin: 7
    },
    recentTagDisplay: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10
    },
    recentTag: {
        margin: 5
    }
});