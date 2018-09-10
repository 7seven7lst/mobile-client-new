import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';

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
    if (isAuthenticated) {
      navigation.navigate('main');
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <TextInput style={styles.input} 
          autoCapitalize="none" 
          onSubmitEditing={() => this.firstnameInput.focus()} 
          autoCorrect={false} 
          keyboardType='email-address' 
          returnKeyType="next" 
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholderTextColor='rgba(225,225,225,0.7)'
        />
        <TextInput style={styles.input} 
          autoCapitalize="none" ref={(input)=> this.firstnameInput = input}
          onSubmitEditing={() => this.lastnameInput.focus()} 
          autoCorrect={false} 
          keyboardType='default' 
          returnKeyType="next" 
          placeholder='First Name'
          onChangeText={fisrtname => this.setState({ fisrtname })}
          value={this.state.fisrtname}
          placeholderTextColor='rgba(225,225,225,0.7)'
        />
        <TextInput style={styles.input} 
          autoCapitalize="none" ref={(input)=> this.lastnameInput = input}
          onSubmitEditing={() => this.phoneInput.focus()} 
          autoCorrect={false} 
          keyboardType='default' 
          returnKeyType="next" 
          placeholder='Last Name'
          onChangeText={lastname => this.setState({ lastname })}
          value={this.state.lastname}
          placeholderTextColor='rgba(225,225,225,0.7)'
        />
        <TextInput style={styles.input} 
          autoCapitalize="none" ref={(input)=> this.phoneInput = input}
          onSubmitEditing={() => this.zipcodeInput.focus()} 
          autoCorrect={false} 
          keyboardType='numeric' 
          returnKeyType="next" 
          placeholder='Phone'
          onChangeText={phone => this.setState({ phone })}
          value={this.state.phone}
          placeholderTextColor='rgba(225,225,225,0.7)'
        />
        <TextInput style={styles.input} 
          autoCapitalize="none" ref={(input)=> this.zipcodeInput = input}
          onSubmitEditing={() => this.passwordInput.focus()} 
          autoCorrect={false} 
          keyboardType='numeric' 
          returnKeyType="next" 
          placeholder='Zip Code'
          onChangeText={zipcode => this.setState({ zipcode })}
          value={this.state.zipcode}
          placeholderTextColor='rgba(225,225,225,0.7)'
        />
        <TextInput style = {styles.input}   
          returnKeyType="go" ref={(input)=> this.passwordInput = input} 
          placeholder='Password'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={e=>{this.handleSubmit(e)}}>
          <Text  style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={e=>{this.gotoSignin(e)}}>
          <Text  style={styles.buttonText}>Goto Login</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    height: 40,
    width: 200,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'black'
  },
  buttonContainer:{
    width: 200,
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }, 
  loginButton:{
    backgroundColor:  '#2980b6',
    color: '#fff'
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
