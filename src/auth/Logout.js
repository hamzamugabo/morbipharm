import React, {useEffect} from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    ActivityIndicator,
  } from 'react-native';
const Logout = ({navigation}) => {

    

      const getData = async () => {
        try {
            await AsyncStorage.removeItem('@storage_Key');
            return true;
        }
        catch(exception) {
            return false;
        }
      };
    
      useEffect(() => {
        getData();
        navigation.navigate('Settings.js');
      }, []);
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 40}}>Loading...</Text>
          <ActivityIndicator size="large" />
        </View>
      );

    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Logout;