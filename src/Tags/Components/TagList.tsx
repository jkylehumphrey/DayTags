import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Badge, Button, Content, H1, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DayViewStore } from '../DayViewStore';
import { TagStore } from '../TagStore';
import { TagDisplay } from './TagDisplay';
import { Tag } from '../Tag';

@observer
export class TagList extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, null> {
    _colorStore = null;
    constructor(props) {
        super(props);
    }

    render() {

        const tagsDisplay = this.props.tagStore.tagsForCurrentDay.map((t: Tag, i: number) => {
            return (
                <TagDisplay key={i} tag={t} dayTicks={this.props.dayViewStore.currentMomentTicks} />
            );
        });

        return (
            <View style={{ flex: 1 }}>
                <Content contentContainerStyle={styles.tagDisplayRow}>
                    {
                        tagsDisplay.length > 0 ?
                            tagsDisplay :
                            <H1>Add Some Tags 👇</H1>
                    }
                </Content>
            </View>
        )
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

