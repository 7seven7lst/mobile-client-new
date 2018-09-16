import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NotFoundPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Not Found</Text>
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
});

export default NotFoundPage;
