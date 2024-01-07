import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootRoute from './src/Routes/RootRoute';
import ReduxWrapper from './src/Redux/ReduxWrapper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
