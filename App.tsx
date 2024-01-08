import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootRoute from './src/Routes/RootRoute';
import ReduxWrapper from './src/Redux/ReduxWrapper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//Ignore this warning for now. error in react-navigation internal
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ReduxWrapper>
        <StatusBar translucent backgroundColor="transparent" />
        <SafeAreaProvider>
          <RootRoute />
        </SafeAreaProvider>
      </ReduxWrapper>
    </GestureHandlerRootView>
  );
};

export default App;
