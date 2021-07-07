import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableHighlight,
} from 'react-native';
import firebase, * as firbase from "firebase";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
import Colors from '../pages/colors';

export default class ForgotPassword extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
         <Text>Password Reset</Text>
        </View>
      ),
    };
  };
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loading: false,
      disabled: false,
    };
  }

  //   componentDidMount() {
  //     database().ref('users/' + userId).on('value', (snapshot) => {
  //       const highscore = snapshot.val().highscore;
  //       console.log("New high score: " + highscore);
  //     });

  //   var user = this.state.email;

  //   var newUser =user;
  //   var email_edit1 = newUser.replace('@', '-');

  //   var email_edit2 = email_edit1.replace('.', '-');
  //  database().ref('users/'+ email_edit2).on('value', (snapshot) => {
  //     const highscore = snapshot.val().highscore;
  //     console.log("New high score: " + highscore);
  //   });
  //   }

  // forgotPassword = (this.state.email) => {
  //   auth().sendPasswordResetEmail(this.state.email)
  //     .then(function (user) {
  //       alert('Please check your email...')
  //     }).catch(function (e) {
  //       console.log(e)
  //     })
  // }
  saveData = () => {
    if (this.state.email != '') {
      var user = this.state.email;

      var newUser = user;
      var email_edit1 = newUser.replace('@', '-');

      var email_edit2 = newUser.replace(/[^0-9a-z]/gi, '-');

      this.setState({loading: true, disabled: true}, () => {
        firebase.database()
          .ref('users/' + email_edit2)
          .on('value', (snapshot) => {
            const email = snapshot.val().email;
            firebase.auth()
              .sendPasswordResetEmail(email)
              .then((user) => {
                alert('Please check your email...');
                this.setState({loading: false, disabled: false});
              })
              .catch((e) => {
                alert(e);
                this.setState({loading: false, disabled: false});
              });
          });
      });
    } else {
      alert('Enter Correct Email');
    }
  };

  render() {
    function MyComponent(props) {
      return (
        <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
          <Text>My Component</Text>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.reg}>
            <Text style={{fontSize: 20, color: Colors.blue}}>
              Change Password
            </Text>
          </View>

          <View>
            {/* <TextInput
              underlineColorAndroid="transparent"
              placeholder="email"
              style={styles.TextInputStyleClass}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({email: text})}
            /> */}
             <View style={styles.inputContainer}>
              <TextInput
              style={styles.inputs}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              clearButtonMode="always"
              ref={this.myTextInput}
              onSubmitEditing={() => {
                this.myTextInput.current.clear();
              }}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({email})}
            />
            </View>
            {/* <TextInput
          underlineColorAndroid="transparent"
          placeholder="New password"
          style={styles.TextInputStyleClass}
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        /> */}

            {/* <TouchableOpacity
              disabled={this.state.disabled}
              activeOpacity={0.8}
              style={styles.Btn}
              onPress={this.saveData}>
              <Text style={styles.btnText}>Change password</Text>
            </TouchableOpacity> */}
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.saveData}>
              <Text style={styles.loginText}>Change password</Text>
            </TouchableHighlight>
          </View>

         <Text> {this.state.loading ? "Loading..." : null}</Text>

          <View style={styles.signupTextCont}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.signupButton}>Back to Login</Text>
            </TouchableOpacity>
          </View>
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
    textAlign: 'center',
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
    marginBottom: 25,
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
    color: Colors.blue,
    fontSize: 16,
  },
  signupButton: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: '500',
  },
  reg: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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
});
