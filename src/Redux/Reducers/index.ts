import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';
import InformationReducer from './InformationReducer';

export default combineReducers({
  default: DefaultReducer,
  user: UserReducer,
  information: InformationReducer,
});
