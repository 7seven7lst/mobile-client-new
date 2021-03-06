import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { REHYDRATE, PURGE, persistCombineReducers, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import getRootReducer from './modules';
import persistConfig from './persistConfig';

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    getRootReducer(persistConfig),
    undefined,
    compose(
      applyMiddleware(...middlewares)
    ),
  );
  
  let persistor = persistStore(
    store,
    null,
    () => { store.getState()}
  );

  return { persistor, store };
};

export default configureStore;
