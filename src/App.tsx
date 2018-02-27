import { observer } from 'mobx-react';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import { TagComponent } from './Tags/TagComponent';
import { TagStore } from './Tags/TagStore';
import { DayViewStore } from './Tags/DayViewStore';

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
            component={TagComponent}
            tagStore={_tagStore}
            dayViewStore={_dayViewStore} />
        </Stack>
      </Router>
    );
  }
}

AppRegistry.registerComponent('DayTags', () => App);
