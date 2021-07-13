import React, {Component} from 'react';
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
  TouchableHighlight,
  Picker,
  Image,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';

// import Colors from '../pages/colors';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor() {
    super();

    this.state = {
      uid: 1,
      firstname: '',
      lastname: '',
      dob: '',
      work_address: '',
      residential_address: '',
      email: '',
      fname: '',
      lname: '',
      user_uid: '',
      phoneNumber: '',
      password: '',
      confirm_password: '',
      confirm_agreement: false,
      loading: false,
      disabled: false,
    };
  }

  handleSignUp2 = () => {
    this.setState({loading: true, disabled: false});

    if (this.state.fname != '') {
      if (this.state.lname != '') {
        if (this.state.email != '') {
          if (this.state.phoneNumber != '') {
            if (this.state.password != '') {
              // if(this.state.confirm_password  == this.state.password){
              // if (this.state.confirm_agreement == true) {
              fetch(
                'http://ubuntusx.com/mobipharm/user_registration1.php',

                // "http://e-soil-databank.paatsoilclinic.com/sever/register.php",/
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    fname: this.state.fname,
                    lname: this.state.lname,
                    email: this.state.email,

                    password: this.state.password,
                    phoneNumber: this.state.phoneNumber,
                  }),
                },
              )
                .then(response => response.json())
                .then(responseJson => {
                  // If server response message same as Data Matched
                  if (responseJson === 'Registered suceessfully!') {
                    //Then open Profile activity and send user email to profile activity.
                    Alert.alert('Registered successfully');

                    this.props.navigation.navigate('Login');
                    this.setState({loading: false, disabled: false});

                    // return navigation.navigate('Login');
                    // Alert.alert('data matched');
                  } else {
                    console.log(responseJson);
                    Alert.alert(responseJson);
                  }

                  this.setState({loading: false, disabled: false});
                })
                .catch(error => {
                  console.error(error);
                  this.setState({loading: false, disabled: false});
                });

              // }else{alert('agree to terms first')}
              // }else{alert('passwords not matching')}
            } else {
              alert('Enter password');
            }
          } else {
            alert('Enter phone number');
          }
        } else {
          alert('Enter email');
        }
      } else {
        alert('Enter Last Name');
      }
    } else {
      alert('Enter First Name');
    }
  };

  handle = () => {
    // this.handleSignUp();
    this.handleSignUp2();
  };

  handleCombined = () => {
    if (this.state.errorMessage) {
      return this.handleSignUp();
    } else {
      return this.handle();
    }
    // this.state.errorMessage ? this.handleSignUp()  : this.handle()
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {this.state.loading ? <ActivityIndicator color="#0000ff" /> : null}
          <View style={styles.reg}>
            <Text style={{fontSize: 20, color: 'blue'}}>Register</Text>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={{width: 260}}>
            <ScrollView>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  style={styles.inputs}
                  autoCapitalize="none"
                  onChangeText={fname => this.setState({fname})}
                  value={this.state.fname}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Last Name"
                  style={styles.inputs}
                  autoCapitalize="none"
                  onChangeText={lname => this.setState({lname})}
                  value={this.state.lname}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.inputs}
                  onChangeText={text => this.setState({email: text})}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Phone Number"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  style={styles.inputs}
                  onChangeText={text => this.setState({phoneNumber: text})}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="password"
                  style={styles.inputs}
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true}
                />
              </View>
              {/* <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Confirm password"
                          style={styles.inputs}
                          onChangeText={(confirm_password) =>
                            this.setState({confirm_password})
                          }
                          value={this.state.confirm_password}
                          secureTextEntry={true}
                        />
                      </View> */}

              {/* <View style={[styles.buttonsContainer, {marginBottom: 5}]}>
                        <CheckBox
                          value={this.state.confirm_agreement}
                          onValueChange={(confirm_agreement) =>
                            this.setState({confirm_agreement})
                          }
                          style={styles.checkbox}
                        />
        
                        <Text style={styles.label}>
                          Agree to terms & Conditions
                        </Text>
                      </View>
         */}
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                // onPress={() => {
                //   this.handleSignUp();
                //   this.handleSignUp2();
                // }}

                onPress={this.handle}>
                <Text style={styles.loginText}>Register</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>

          <Text> {this.state.loading ? 'Loading...' : null}</Text>

          {/* <View style={styles.signupTextCont}> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            {/* <Text style={styles.signupButton}> */}
            <Text style={styles.signupText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
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

  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    alignSelf: 'stretch',
    padding: 8,
    fontSize: 16,
  },
  TextInputStyleClass: {
    // textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,
  },

  Btn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
  },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'blue',
    fontSize: 16,
  },
  signupButton: {
    color: '#12799f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // reg: {
  //   alignItems: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 18,
  //   marginBottom: 30,
  //   marginTop:60
  // },
  label: {
    flexDirection: 'row',
    alignContent: 'center',
    color: 'blue',
  },
  buttonsContainer: {
    flexDirection: 'row',
    // width: "100%",
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    alignItems: 'center',
    // marginLeft:25,
  },
  reg: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
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
  loginButton: {
    // backgroundColor: '#0c2642',
    backgroundColor: '#000080',
  },
  loginText: {
    color: 'white',
    // color: '#58f406',
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
});
