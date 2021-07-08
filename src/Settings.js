import * as React from 'react';
import { Text, View,StyleSheet, TouchableOpacity,Image } from 'react-native';
import Card from "./Card";
import AsyncStorage from '@react-native-community/async-storage';

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// // import SignOut from './auth/SignOut';
export default class Settings extends React.Component{
constructor(){
  super();
  this.state={
    user:false,
    user_id:'',
    data2:'',
    setData2:'',
    email:'',
    currentUser:null
  }
}
getData_ = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    this.setState({setData2:JSON.parse(jsonValue)});
    // JSON.parse(jsonValue)?null:this.props.navigation.navigate('Login');
    // console.log(data2);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
componentDidMount() { 
  this.getData_();
};
// UNSAFE_componentWillMount () {
//   this.getData_();
// }
//  Logout = () => {this.props.navigation.navigate('SignOut')}


    

   

  render(){
    return (
      <View style={{ flex: 1}}>
         <View style={{flexDirection:'row'}}>
         <TouchableOpacity
         onPress={()=>this.props.navigation.goBack()}
         >
            <Image source={require('./images/back.png')} 
             style = {{ width: 30, height: 30 }}
            />
            
          </TouchableOpacity>
          <TouchableOpacity
         onPress={()=>this.props.navigation.goBack()}
          
          >
            <Text style={{fontSize:20,height:30}}>Back</Text>
          </TouchableOpacity>
         </View>
        <View style={{marginTop:30,padding:10 }}>
<Text style={{fontSize:25}}>Settings</Text>
        </View>
       <View  style={[styles.buttonsContainer, {margin:15}]}>
        <TouchableOpacity
        onPress={()=> this.state.setData2?this.props.navigation.navigate('AddProduct',{ page: 'AddProduct' }):alert('Login First')}
        >

        <Card>
        <Text>Add Item</Text>
           </Card>
        </TouchableOpacity>
        
       </View>

       <View  style={[styles.buttonsContainer, {margin:15}]}>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('Login')}
        >

        <Card>
        <Text>Login</Text>
           </Card>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('Register')}
        
        >

<Card>
<Text>Register</Text>
   </Card>
</TouchableOpacity>
       </View>
       <View style={{alignItems:'center',alignContent:'center'}}>

       <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('SignOut')}
            >
            
            <Card style={{width:80}}>{/* <Text style={{color: '#CF5300'}}>Home</Text> */}
            <Text>Logout</Text>
            </Card>

          </TouchableOpacity>
       </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: "90%",
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    alignItems: 'center',
    // marginLeft:25,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // width: 150,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#000080',
    padding:7
  },
  loginText: {
    color: '#58f406',
  },
});