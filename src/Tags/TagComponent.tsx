import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from 'moment';
import { Body, Button, Container, Content, Footer, Grid, Header, Icon, Left, Right, Row, Text, Col } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import { ColorStore } from '../Global/ColorStore';
import { DayViewStore } from './DayViewStore';
import { TagStore } from './TagStore';
import { AddTagModalProps, AddTagModal } from './AddTagModal';

@observer
export class TagComponent extends React.Component<{ tagStore: TagStore, dayViewStore: DayViewStore }, null> {
    _colorStore = null;
    constructor(props) {
        super(props);
        this._colorStore = new ColorStore();
    }

    @observable addTagModalState: AddTagModalProps = {
        show: false
    }

    handleAddTagPress = () => {
        this.addTagModalState.show = true;
    }

    handleClear = () => {
        this.props.tagStore.clearStore();
    }

    render() {

        const tagsDisplay = this.props.tagStore.tagsForCurrentDay.map(t => {
            return (
                <Button key={t.id}
                    style={{ backgroundColor: t.colorRGBA }}
                    onPress={() => { t.removeDay(this.props.dayViewStore.currentMomentTicks) }}>
                    <Text>
                        {t.description}
                    </Text>
                </Button>
            );
        });

        const recentTags = this.props.tagStore.tenMostRecentTags.map(t => {
            return (
                <Button key={t.id}
                    style={{ backgroundColor: t.colorRGBA }}
                    onPress={() => { t.addDay(this.props.dayViewStore.currentMomentTicks) }}>
                    <Text>
                        {t.description}
                    </Text>
                </Button>
            );
        });

        return (
            <Container>
                <TagComponentHeader dayViewStore={this.props.dayViewStore} />
                <Content>
                    <View>
                        {tagsDisplay}
                    </View>
                </Content>
                <Footer style={styles.tagFooterControl}>
                    <Grid>
                        <Row>
                            {recentTags}
                        </Row>
                        <Row>
                            <Button onPress={this.handleAddTagPress}>
                                <Text>Add</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button onPress={this.handleClear}>
                                <Text>Clear</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Footer>

                <AddTagModal observableProps={this.addTagModalState} tagStore={this.props.tagStore} />
            </Container >
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
                    <Grid>
                        <Text>{this.props.dayViewStore.currentMomentDisplay}</Text>
                    </Grid>
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
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10
    },
    tagFooterControl: {
        height: 200
    }
});

