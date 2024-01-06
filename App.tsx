import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootRoute from './src/Routes/RootRoute';
import ReduxWrapper from './src/Redux/ReduxWrapper';

const App = () => {
  return (
    <ReduxWrapper>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaProvider>
        <RootRoute />
      </SafeAreaProvider>
    </ReduxWrapper>
  );
};

export default App;
