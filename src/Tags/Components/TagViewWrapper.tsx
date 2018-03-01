import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Badge, Button, Container, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DayViewStore } from '../DayViewStore';
import { TagStore } from '../TagStore';
import { TagList } from './TagList';
import { TagViewFooter } from './TagViewFooter';
import { TagViewHeader } from './TagViewHeader';

@observer
export class TagViewWrapper extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, null> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <TagViewHeader dayViewStore={this.props.dayViewStore} />
                <TagList tagStore={this.props.tagStore} dayViewStore={this.props.dayViewStore} />
                <TagViewFooter tagStore={this.props.tagStore} dayViewStore={this.props.dayViewStore} />
            </Container >
        )
    }
}


