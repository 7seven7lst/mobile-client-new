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

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      zipcode: '',
      password_confirmation: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, firstname, lastname, zipcode, phone, password_confirmation } = this.state;
    console.log("this.state is >>>", this.state);
    return axios({
      url: 'http://localhost:3001/api/v1/auth',
      method: 'POST',
      data: { email, password, password_confirmation }
    }).then(response => {
      console.log("response is>>>", response);
    }).catch(err => {
      console.log("err is >>>", err);
    });
  }

  gotoSignin(e) {
    e.preventDefault();
    const { navigation } = this.props;
    navigation.navigate('login');
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
              onSubmitEditing={() => this.firstnameInput.focus()} 
              autoCorrect={false} 
              keyboardType='email-address' 
              returnKeyType="next" 
              placeholder='Email'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <FormLabel>First Name</FormLabel>
            <FormInput
              style={styles.input}
              autoCapitalize="none" ref={(input)=> this.firstnameInput = input}
              onSubmitEditing={() => this.lastnameInput.focus()} 
              autoCorrect={false} 
              keyboardType='default' 
              returnKeyType="next" 
              placeholder='First Name'
              onChangeText={fisrtname => this.setState({ fisrtname })}
              value={this.state.fisrtname}
            />
            <FormLabel>Last Name</FormLabel>
            <FormInput
              style={styles.input}
              autoCapitalize="none" ref={(input)=> this.lastnameInput = input}
              onSubmitEditing={() => this.phoneInput.focus()} 
              autoCorrect={false} 
              keyboardType='default' 
              returnKeyType="next" 
              placeholder='Last Name'
              onChangeText={lastname => this.setState({ lastname })}
              value={this.state.lastname}
            />
            <FormLabel>Phone</FormLabel>
            <FormInput
              style={styles.input}
              autoCapitalize="none" ref={(input)=> this.phoneInput = input}
              onSubmitEditing={() => this.zipcodeInput.focus()} 
              autoCorrect={false} 
              keyboardType='numeric' 
              returnKeyType="next" 
              placeholder='Phone'
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
            />
            <FormLabel>Zip Code</FormLabel>
            <FormInput
              style={styles.input}
              autoCapitalize="none" ref={(input)=> this.zipcodeInput = input}
              onSubmitEditing={() => this.passwordInput.focus()} 
              autoCorrect={false} 
              keyboardType='numeric' 
              returnKeyType="next" 
              placeholder='Zip Code'
              onChangeText={zipcode => this.setState({ zipcode })}
              value={this.state.zipcode}
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
              <Text style={styles.buttontext} >Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttoncontainer} onPress={e=>{this.gotoSignin(e)}}>
              <Text style={styles.buttontext} >Goto Login</Text>
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
    flex: 1,
  },
  loginForm: {
    flex: 4,
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

export default connect(mapStateToProps)(SignupPage);
