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
  constructor (props) {
      super(props)

      this.state = {
        locale: 'en',
        localeData: localeData,
        messages: localeData['en'],
      }
      // Import locale data in default environment
      addLocaleData([...en, ...es]);
    
      // TODO: Add custom localization messages you can export them from separate files.
      // example https://github.com/yahoo/react-intl/wiki/API#definemessages
      // and use the id in https://github.com/yahoo/react-intl/wiki/Components#formattedmessage

      this.initLocale();
  }

  async initLocale() {
      // Read device locale and update the intl provider via state.
      var locale = await Localization.getCurrentLocaleAsync();
      this.setState({
          locale,
          messages: this.state.localeData[locale],
      });
  }

  render() {
    return (
      <IntlProvider
        locale={this.state.locale}
        key={this.state.locale}
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
