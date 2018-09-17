import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import authReducer from './auth/reducers';

export default function getRootReducer(persistConfig) {
  return persistCombineReducers(persistConfig, {
    auth: authReducer,
  });
}
