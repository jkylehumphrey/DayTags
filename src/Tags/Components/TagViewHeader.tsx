import { observer } from 'mobx-react';
import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base';
import React from 'react';

import { DayViewStore } from '../DayViewStore';

@observer
export class TagViewHeader extends React.Component<{ dayViewStore: DayViewStore }, any>{

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