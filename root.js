import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { DangerZone } from 'expo';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import AuthLoadingPage from './containers/authLoading';
import LoginPage from './containers/login';
import SignupPage from './containers/signup';
import HomePage from './containers/home';
import NotFoundPage from './containers/notFound';
import configureStore from './configureStore';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import localeData from './build/data.json';
addLocaleData([...en, ...es]);

const { Localization } = DangerZone;

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
  constructor(p) {
    super(p);
    this.state = { 
      currentLocale: 'es',
      messages: localeData['es'],
    };
  }
  componentDidMount() {
    Localization.getCurrentLocaleAsync()
      .then(currentLocale => {
        console.log("currentLocale is >>>", currentLocale);
        this.setState({
          currentLocale,
          messages: localeData[currentLocale],
        });
      });
  }
  render() {
    console.log("this.state.message???", this.state.messages);
    return (
      <IntlProvider
        locale={this.state.currentLocale}
        messages={this.state.messages}
        textComponent={Text}
      >
        <Provider store={store}>
          <PersistGate
            loading={<NotFoundPage />}
            onBeforeLift={() => {}}
            persistor={persistor}
          >
            <MainNavigator />
          </PersistGate>
        </Provider>
      </IntlProvider>
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
