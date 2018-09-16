import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import { authenticate } from '../modules/auth/actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigation } = this.props;
    this.props.dispatch(authenticate(email, password))
    .then(() => {
      navigation.navigate('main');
    })
  }

  gotoSignup(e) {
    e.preventDefault();
    const { navigation } = this.props;
    navigation.navigate('signup');
  }

  componentDidMount() {
    const { isAuthenticated, navigation } = this.props;
    console.log("login isAutenticated???>>", isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate('main');
    }
  }

  render() {
    const { isAuthenticated, navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginLogo}>
        </View>
        <View style={styles.loginForm}>
          <View style={styles.loginFormContainer}>
            <FormLabel>Email</FormLabel>
            <FormInput
              style={styles.input}
              autoCapitalize="none" 
              onSubmitEditing={() => this.passwordInput.focus()} 
              autoCorrect={false} 
              keyboardType='email-address' 
              returnKeyType="next" 
              placeholder='Email'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              style={styles.input}
              returnKeyType="go" ref={(input)=> this.passwordInput = input} 
              placeholder='Password'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />
            <TouchableOpacity style={styles.buttoncontainer} onPress={e=>{this.handleSubmit(e)}}>
              <Text style={styles.buttontext} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttoncontainer} onPress={e=>{this.gotoSignup(e)}}>
          <Text  style={styles.buttontext}>Goto Signup</Text>
        </TouchableOpacity>  
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,

  },
  loginLogo: {
    flex:1,
  },
  loginForm: {
    flex: 2,
  },
  loginFormContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    paddingLeft: 10,
    marginBottom: 15,
  },
  buttoncontainer: {
    backgroundColor: '#23618C',
    marginTop: 10,
    paddingVertical: 15,
  },
  buttontext: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  const { auth } = state;
  const { loading, isAuthenticated } = auth;
  return {
    loading,
    isAuthenticated
  };
}

export default connect(mapStateToProps)(LoginPage);
