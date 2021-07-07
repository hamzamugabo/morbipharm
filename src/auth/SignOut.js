import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';


export default class SignOut extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
         headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
         <Text>signingout..</Text>
        </View>
      ),
         }}
  componentDidMount() {
    
    // auth().onAuthStateChanged((user) => {
    //   if (!user) {
       
    //     this.props.navigation.navigate('Home');
    //   } else{
        auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          return this.props.navigation.navigate('Home');
        });
      // }
    // });
  
  }
  render(){
    return null;
  }
}
