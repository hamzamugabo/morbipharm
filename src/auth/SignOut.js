import React from "react";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
  } from 'react-native';

export default class SignOut extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
         headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
         <Text>signingout..</Text>
        </View>
      ),
         }}
         getData = async () => {
          try {
              await AsyncStorage.removeItem('@storage_Key');
              this.props.navigation.goBack();
              return true;
          }
          catch(exception) {
              return false;
          }
        };
  componentDidMount() {
    this.getData();
  
  }
  render(){
    return null;
  }
}
