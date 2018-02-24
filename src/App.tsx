/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Button, Text } from 'native-base';
import * as React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import { TagStore } from './Tags/TagStore';
import { observer } from 'mobx-react';

var _tagStore: TagStore = null;

@observer
export default class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    _tagStore = new TagStore();
  }

  onAddTag = () => {
    _tagStore.addTag({ description: _tagStore.totalNumTags.toString() });
  }

  render() {

    const tags = _tagStore.tags.map((t, i) => {
      return <Button key={i} onPress={() => { _tagStore.removeTag(t); }}><Text>{t.description}</Text></Button>
    });

    return (
      <View style={styles.container}>
        <Button onPress={this.onAddTag}><Text>Add Tag</Text></Button>
        <Button onPress={() => { _tagStore.clearStore(); }}><Text>Clear Tags</Text></Button>
        {tags}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DayTags', () => App);
