import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Icon, Input, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { TagStore } from './TagStore';


export interface AddTagModalProps {
    show: boolean;
}

@observer
export class AddTagModal extends React.Component<{ observableProps: AddTagModalProps, tagStore: TagStore }, any>{

    @observable newTagDescription = '';

    handleCloseModal = () => {
        this.newTagDescription = '';
        this.props.observableProps.show = false;
    }
    handleTagAdd = () => {
        this.props.tagStore.addTag(this.newTagDescription);
        this.handleCloseModal();
    }

    handleTagDescriptionChange = (text: string) => {
        this.newTagDescription = text;
    }

    render() {
        return (
            <Modal
                animationIn="zoomIn"
                animationOut="zoomOut"
                isVisible={this.props.observableProps.show}>
                <View style={styles.modalContent}>
                    <Button transparent small
                        style={styles.modalCloseButton}
                        onPress={this.handleCloseModal}>
                        <Icon style={styles.modalCloseButtonIcon} name="close" />
                    </Button>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Input value={this.newTagDescription} onChangeText={this.handleTagDescriptionChange} />
                    </View>
                    <Button full success onPress={this.handleTagAdd} >
                        <Text>Add Tag</Text>
                    </Button>
                </View>
            </Modal>
        )
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
        marginTop: -10,
        marginRight: -15
    },
    modalCloseButtonIcon: {
        color: '#ff0000',
    },
});