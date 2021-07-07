import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Alert,
    TouchableOpacity,
  
} from "react-native";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

// import TextInput from 'react-native-textinput-with-icons';
// Creating Login Activity.
class Login extends Component {
  // Setting up Login Activity title.
  static navigationOptions = {
    title: " Login"
  };
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', loading:false, disabled:false, errorMessage: null }
  
  }
  
   storeData = async () => {
    let obj = {    
      email: this.state.email, 
      pass: this.state.password
      // role:responseJson   
    } 
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
// alert(e);

    } catch (e) {
      // saving error
alert(e);
    }
  }
  
  UserLoginFunction = () => {
    
    //Handler for the Submit onPress
    if (this.state.email != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        this.setState({loading:true});
          fetch(
            'http://localhost/react_projects/e_SoilBank/server/login.php',
            // 'http://ubuntusx.com/server_files/User_Login.php',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,

                password: this.state.password,
              }),
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              // If server response message same as Data Matched
              if (responseJson == 'Data Matched') {
                 
                this.storeData();
                this.props.navigation.navigate('Home');
                
              //   setpassword();
              //  setphone(); 
              //  setisLoading(false); 
        this.setState({loading:false,password:'',email:''});

              } 
              else{
                alert(responseJson);
              //  setisLoading(false); 
               this.setState({loading:false});

              }
              
            })
            .catch((error) => {
              console.error(error);
              alert('Network /server issue')
              // setisLoading(false); 
        this.setState({loading:false});


            });
        // });

        //  }
      } else {
        alert('Please Enter password greater than 5 characters');
      }
    } else {
      alert('Please Enter Email');
    }
  // }
};
  

    render() {
        return (
          <View style={styles.container}>
            <Text>
            {this.state.loading ? <ActivityIndicator color="#0000ff"/>:null}{"\n"}</Text>
              
            <View style={styles.headerContainer}>
              {/* <View >
              <Image
                style={{width: 133, height: 133}}
                source={require('../images/Loginlogo.png')}
              />
              </View> */}
             
               
           
            </View>
          
            <View style={{justifyContent: 'center',
        alignItems: 'center', marginBottom:5}}>
              <Text style={{color: 'red'}}>
                {this.state.errorMessage ? this.state.errorMessage : null}
              </Text>
              </View>
            <View style={{marginTop: 0, alignItems: 'center'}}>
            
              <View style={styles.inputContainer}>
             
                {/* <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://png.icons8.com',
                  }}
                /> */}
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  // clearButtonMode="always"
                  // ref={this.myTextInput}
                  // onSubmitEditing={() => {
                  //   this.myTextInput.current.clear();
                  // }}
                  underlineColorAndroid="transparent"
                  onChangeText={(email) => this.setState({email})}
                />
              </View>
    
              <View style={styles.inputContainer}>
                {/* <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
                  }}
                /> */}
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  clearButtonMode="always"
                  onChangeText={(password) => this.setState({password})}
                />
              </View>
    
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={this.handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>
    
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{color: '#0c2642'}}>Forgot your password?</Text>
              </TouchableOpacity>
    
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{color: '#0c2642'}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
      },
      inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
      },
      buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
      },
      loginButton: {
        // backgroundColor: '#0c2642',
        backgroundColor: '#000080',
      },
      loginText: {
        color: 'white',
        // color: '#58f406',
      },
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        // backgroundColor: "white",
        // marginBottom: 3,
        flexDirection: 'row',
        // marginTop: 20,
      },
      headerContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        // backgroundColor: "white",
        // marginBottom: 3,
        flexDirection: 'row',
        // marginTop: 5,
      },
      // label: {
      //   flexDirection:'row',
      //   alignContent:'center'
      // },
      buttonsContainer: {
        flexDirection: 'row',
        // width: "100%",
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        alignItems: 'center',
        // marginLeft:25,
      },
    });
    
export default Login;
