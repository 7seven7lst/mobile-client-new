import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import LoginPage from './containers/login';
import SignupPage from './containers/signup';
import HomePage from './containers/home';
import NotFoundPage from './containers/notFound';
import configureStore from './configureStore';

const { persistor, store } = configureStore();

class Root extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      login: { screen: LoginPage },
      signup: { screen: SignupPage },
      main: { screen: HomePage},
    },
    {
      navigationOptions: {
        tabBarVisible: false,
      },
      lazyLoad: true
    });

    return (
      <Provider store={store}>
        <PersistGate
          loading={<NotFoundPage />}
          onBeforeLift={() => {}}
          persistor={persistor}
        >
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Root;
