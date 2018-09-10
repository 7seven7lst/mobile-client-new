import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import LoginPage from './containers/login';
import HomePage from './containers/home';
import configureStore from './configureStore';

const store = configureStore();

class Root extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      auth: { screen: LoginPage },
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
        <MainNavigator />
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
