import { observer } from 'mobx-react';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import { TagViewWrapper } from './Tags/Components/TagViewWrapper';
import { DayViewStore } from './Tags/DayViewStore';
import { TagStore } from './Tags/TagStore';

var _tagStore: TagStore = null;
var _dayViewStore: DayViewStore = null;

@observer
export default class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    _dayViewStore = new DayViewStore();
    _tagStore = new TagStore(_dayViewStore);
  }

  render() {
    return (
      <Router>
        <Stack>
          <Scene key="tagDay" hideNavBar initial
            component={TagViewWrapper}
            tagStore={_tagStore}
            dayViewStore={_dayViewStore} />
        </Stack>
      </Router>
    );
  }
}

AppRegistry.registerComponent('DayTags', () => App);
