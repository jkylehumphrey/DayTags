import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Badge, Body, Button, Container, Content, Footer, Form, Grid, H1, Header, Icon, Input, Item, Label, Left, Right, Row, Text } from 'native-base';
import React from 'react';
import { StyleSheet, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ColorStore } from '../Global/ColorStore';
import { AddTagModal, AddTagModalProps } from './AddTagModal';
import { DayViewStore } from './DayViewStore';
import { TagStore } from './TagStore';
import { Tag } from './Tag';

interface TagComponentOberservableState {
    tagEditing: boolean;
}
@observer
export class TagComponent extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, null> {
    _colorStore = null;
    constructor(props) {
        super(props);
        this._colorStore = new ColorStore();
    }

    @observable displayState: TagComponentOberservableState = {
        tagEditing: false
    }

    render() {

        const tagsDisplay = this.props.tagStore.tagsForCurrentDay.map(t => {
            return (
                <View key={t.id} style={styles.tagDisplay}>
                    <Button
                        style={{ backgroundColor: t.colorRGBA }}
                        onLongPress={() => { this.displayState.tagEditing = true }}
                    >
                        <Text>
                            {t.description}
                        </Text>
                    </Button>
                    {
                        !this.displayState.tagEditing ? null :
                            <Button transparent
                                style={styles.tagRemoveButton}
                                onPress={() => { t.removeDay(this.props.dayViewStore.currentMomentTicks) }}>
                                <Badge style={styles.tagRemoveBadge}>
                                    <Icon name="close" style={styles.tagRemoveButtonIcon} />
                                </Badge>
                            </Button>

                    }
                </View>
            );
        });

        return (
            <Container>
                <TagComponentHeader dayViewStore={this.props.dayViewStore} />
                <View style={{ flex: 1 }}>
                    <Content contentContainerStyle={styles.tagDisplayRow}>
                        {
                            tagsDisplay.length > 0 ?
                                tagsDisplay :
                                <H1>Add Some Tags 👇</H1>
                        }
                    </Content>
                    {
                        !this.displayState.tagEditing ? null :
                            <Button full danger onPress={() => { this.displayState.tagEditing = false }}>
                                <Text>Done Editing</Text>
                            </Button>
                    }
                </View>
                <KeyboardAvoidingView behavior="position" >
                    <View style={{ left: 0, right: 0, bottom: 0, backgroundColor: 'blue' }}>
                        <TagComponentFooter tagStore={this.props.tagStore} dayViewStore={this.props.dayViewStore} />
                    </View>
                </KeyboardAvoidingView>
            </Container >
        )
    }
}

@observer
class TagComponentFooter extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, any>{

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

        const recentTags = this.tagsToShow.map(t => {
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

        return (
            <View style={{ backgroundColor: '#fff', height: 200 }}>
                <Form style={{ flex: 1 }}>
                    <Item>
                        <Input placeholder="Add Tag"
                            value={this.displayState.newTagDescription}
                            returnKeyType="go"
                            onSubmitEditing={this.handleAddTagPress}
                            onChangeText={this.handleNewTagDescriptionChange} />
                        <Icon name="add-circle" onPress={this.handleAddTagPress} />
                    </Item>
                    <Item stackedLabel style={{ borderBottomWidth: 0, height: 150 }}>
                        <Label>{this.displayState.newTagDescription.length == 0 ? "Recent Tags" : "Similar Tags"}</Label>
                        <Content contentContainerStyle={styles.tagDisplayRow}>
                            {recentTags}
                        </Content>
                    </Item>
                </Form>
            </View>
  
        )
    }
}

@observer
class TagComponentHeader extends React.Component<{ dayViewStore: DayViewStore }, any>{

    handleDayBackPress = () => {
        this.props.dayViewStore.goBack();
    }

    handleDayForwardPress = () => {
        this.props.dayViewStore.goForward();
    }

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.handleDayBackPress}><Icon name="arrow-back"></Icon></Button>
                </Left>
                <Body>
                    <Text>{this.props.dayViewStore.currentMomentDisplay}</Text>
                    <Text style={{ fontSize: 12 }}>{this.props.dayViewStore.currentMoment.format('MMMM D, YYYY')}</Text>
                </Body>
                <Right>
                    {
                        this.props.dayViewStore.isToday ? null :
                            <Button transparent onPress={this.handleDayForwardPress}><Icon name="arrow-forward"></Icon></Button>
                    }
                </Right>
            </Header>
        );

    }
}

const styles = StyleSheet.create({
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
    tagRemoveButton: {
        position: 'absolute',
        margin: 0,
        padding: 0,
        right: -7,
        top: -7
    },
    tagRemoveBadge: {
        backgroundColor: '#ff0000',
        paddingTop: 5,
        height: 20,
    },
    tagRemoveButtonIcon: {
        color: '#ffffff',
        fontSize: 23,
        fontWeight: 'bold'
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

