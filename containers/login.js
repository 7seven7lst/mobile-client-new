import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';

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

  componentWillMount() {
    const { isAuthenticated, navigation } = this.props;
    if (isAuthenticated) {
      navigation.navigate('main');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <TextInput style={styles.input} 
          autoCapitalize="none" 
          onSubmitEditing={() => this.passwordInput.focus()} 
          autoCorrect={false} 
          keyboardType='email-address' 
          returnKeyType="next" 
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
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
          <Text  style={styles.buttonText}>LOGIN</Text>
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
    color: '#fff'
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

export default connect(mapStateToProps)(LoginPage);
