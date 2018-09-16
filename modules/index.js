import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import authReducer from './auth/reducers';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(persistConfig, {
   auth: authReducer,
});

export default rootReducer;
