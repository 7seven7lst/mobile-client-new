import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './modules';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
    autoRehydrate(),
  );
  persistStore(store, persistConfig);
  return store;
};

export default configureStore;
