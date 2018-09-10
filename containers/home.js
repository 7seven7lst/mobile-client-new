import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as action from '../modules/auth/actions';

class HomePage extends Component {
  componentDidMount() {
    const { isAuthenticated, navigation } = this.props;
    console.log("home isAutenticated???>>", isAuthenticated);
    if (!isAuthenticated) {
      navigation.navigate('login');
    }
  }

  logout(e){
    const { navigation } = this.props;
    this.props.logout();
    navigation.navigate('login');
  }
  render() {
    const { isAuthenticated, navigation } = this.props;
    if (!isAuthenticated) {
      navigation.navigate('login');
    }
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={e=>{this.logout()}}>
          <Text style={styles.buttonText}>LOGOUT</Text>
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
});

function mapStateToProps(state) {
  console.log("state is>>>", state);
  const { auth } = state;
  const { loading, isAuthenticated } = auth;
  return {
    loading,
    isAuthenticated
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(action.signout());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
