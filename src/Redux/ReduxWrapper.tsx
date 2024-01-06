import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store from './Store';

type ReduxWrapperPropsType = {
  children: React.JSX.Element[];
};
const ReduxWrapper = (props: ReduxWrapperPropsType) => (
  <Provider store={Store.stores}>
    <PersistGate persistor={Store.persistor}>{props.children}</PersistGate>
  </Provider>
);

export default ReduxWrapper;
