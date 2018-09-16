import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import AuthLoadingPage from './containers/authLoading';
import LoginPage from './containers/login';
import SignupPage from './containers/signup';
import HomePage from './containers/home';
import NotFoundPage from './containers/notFound';
import configureStore from './configureStore';

const { persistor, store } = configureStore();

const AuthTab = createBottomTabNavigator({
    login: { screen: LoginPage },
    signup: { screen: SignupPage },
},{ 
  navigationOptions: {
    tabBarVisible: false,
  },
  lazyLoad: true,
});

const MainNavigator = createSwitchNavigator({
  authLoading: AuthLoadingPage,
  main: { screen: HomePage},
  auth: AuthTab,
},{
  initialRouteName: 'authLoading',
});

class Root extends React.Component {
  render() {
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
