import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Badge, Button, Content, H1, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DayViewStore } from '../DayViewStore';
import { TagStore } from '../TagStore';
import { Tag } from '../Tag';

interface TagDisplayState {
    deletingTag: boolean;
}

@observer
export class TagDisplay extends React.Component<{ tag: Tag, dayTicks: number }, null> {
    constructor(props) {
        super(props);
    }

    @observable displayState: TagDisplayState = {
        deletingTag: false
    }

    handleRemoveTag = () => {
        if (this.displayState.deletingTag) this.props.tag.removeDay(this.props.dayTicks);
        this.displayState.deletingTag = false;
    }

    render() {

        return (
            <View key={this.props.tag.id} style={styles.tagDisplay}>
                <Button
                    bordered={this.displayState.deletingTag}
                    danger={this.displayState.deletingTag}
                    style={{ backgroundColor: this.displayState.deletingTag ? null : this.props.tag.colorRGBA }}
                    onLongPress={() => { this.displayState.deletingTag = true }}
                    onPressOut={this.handleRemoveTag}>
                    <Text>
                        {this.props.tag.description}
                    </Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    }
});

