import React from 'react';
import {View, TouchableOpacity,StyleSheet,Text,TextInput,TouchableHighlight,ActivityIndicator} from 'react-native';
import {FlutterwaveInit,FlutterwaveButton,PayWithFlutterwave} from 'flutterwave-react-native';
import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MakePayments extends React.Component {
  abortController = null;
constructor(){
  super();
  this.state={
    isPending:false,
    payment:'',
    fname:'',
    lname:'',
    phoneNumber:'',
    email:'',
    card_number:'',
    cvv:"",
    expiry_month:"",
    expiry_year:"",
    currency:"UGX",
    amount:"",
    tx_ref:"",
    res:[],
    status_:'',
    otp_url:'',
    data2:'',
    loan:''
    
  }
}
async componentDidMount(){
  try {
    const jsonValue2 = await AsyncStorage.getItem('@payment');
    this.setState({loan:JSON.parse(jsonValue2)});
    
  }
  catch (e) {
    // error reading value
    console.log(e);
  }
}
// makeid(length){
//   var result           = '';
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//     result += characters.charAt(Math.floor(Math.random() * 
// charactersLength));
//  }
//  return result;
// }


// componentDidMount({route}){
//   console.log(route.params.paramKey);

// }
  componentWillUnmout() {

    if (this.abortController) {
      this.abortController.abort();
    }
    // this.getData_();
  }
 

  onSubmitMomo=()=>{
    this.setState({payment:'momo'});
    
  }
  onSubmitCard=()=>{
    this.setState({payment:'card'});

  }
  makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
  }
  
  pay=()=>{
   
    if(this.state.fname!=''){
      if(this.state.lname!=''){
      if(this.state.email!=''){
      if(this.state.phoneNumber!=''){
        if(this.state.amount!=''){
       

// console.log(this.makeid(5));
        // fetch('https://api.flutterwave.com/v3/payments', {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: 'FLWSECK-f94c405c66699ba066c51157c132a0da-X',
        //   },
        //   body: JSON.stringify({
        //     tx_ref:this.state.loan.key,
        //     amount:this.state.amount,
        //  currency:"UGX",
        //  redirect_url:"https://ubuntusx.com/citysites_payments.php",
        //  payment_options:"card",
        //  meta:{
        //     consumer_id:this.makeid(10),
        //     consumer_mac:"92a3-912ba-1192a"
        //  },
        //  customer:{
        //   email:this.state.email,
        //     phonenumber:this.state.phoneNumber,
        //     name:this.state.name
        //  },
        //  customizations:{
        //     title:"Pied Piper Payments",
        //     description:"Middleout isn't free. Pay the price",
        //     logo:null
        //  }
      
        //   }),
        // })
        //   .then(response => response.json())
        //   .then(responseJson_ => {
           
        //     console.log(this.state.loan.payment_date);
      this.setState({otp_url:`https://ubuntusx.com/citysites/flutter_payment.php?fname=${this.state.fname}&lname=${this.state.lname}&email=${this.state.email}&phone=${this.state.phoneNumber}&amount=${this.state.amount}&txt_ref=${this.state.loan.key}`,isPending:false});
      // this.setState({otp_url:responseJson_.data.link,isPending:false});

    //   fetch('https://ubuntusx.com/server_files/loan_payment.php', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       id: this.state.loan.id,
  
    //       newpay: (this.state.loan.monthly_pay - this.state.amount),
    //     }),
    //   })
    //     .then(response => response.json())
    //     .then(responseJson_message => {
    //       if(responseJson_message === 'Loan updated!')
    //       {
    //         console.log(responseJson_message);
    //       }else{
    //         console.log(responseJson_message);
    //       }
    //  })
    // .catch(error => {
    //   console.error(error);

    //   // this.setState({loading: false, disabled: false});
    // });
  //         })
  //         .catch(error => {
  //           console.error(error);
  // this.setState({isPending:false});
      
  //         });
      }else{
  this.setState({isPending:false});
        
        alert('Enter Amount')}
      }else{
        this.setState({isPending:false});
              
              alert('Enter Phone Number')}
            }else{
              this.setState({isPending:false});
                    
                    alert('Enter Email')}
                  }else{
                    this.setState({isPending:false});
                          
                          alert('Enter Last Name')}
                  }else{
                    this.setState({isPending:false});
                          
                          alert('Enter First Name')}

  }

  render() {
    const {isPending} = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {isPending? <ActivityIndicator size="large" color="#0000ff" />:null}
{this.state.otp_url?
  <WebView source={{ uri: this.state.otp_url }}
startInLoadingState={true}
scalesPageToFit={true}
style={{
  width: 350,
  height: 300,
}}
/>:
<View style={{justifyContent:'center',alignItems:"center",marginTop:40}}>

<View>

<View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  autoCapitalize="none"
                  style={styles.inputs}
                  onChangeText={fname => this.setState({fname:fname})}
                  value={this.state.fname}
                  // onChangeText={(text) => this.setState({phoneNumber: text})}
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Last Name"
                  autoCapitalize="none"
                  style={styles.inputs}
                  onChangeText={lname => this.setState({lname:lname})}
                  value={this.state.lname}
                  // onChangeText={(text) => this.setState({phoneNumber: text})}
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType='email-address'
                  style={styles.inputs}
                  onChangeText={email => this.setState({email:email})}
                  value={this.state.email}
                  // onChangeText={(text) => this.setState({phoneNumber: text})}
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Phone Number"
                  autoCapitalize="none"
                  keyboardType='phone-pad'
                  style={styles.inputs}
                  onChangeText={phoneNumber => this.setState({phoneNumber:phoneNumber})}
                  value={this.state.phoneNumber}
                  // onChangeText={(text) => this.setState({phoneNumber: text})}
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Amount"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  style={styles.inputs}
                  onChangeText={amount => this.setState({amount:amount})}
                  value={this.state.amount}
                  // onChangeText={(text) => this.setState({phoneNumber: text})}
                />
                <Text>UGX</Text>

              </View>
            
</View>



<TouchableOpacity
          style={styles.button}
          onPress={this.pay}
          // disabled={!this.state.isFormValid}
        >
          <Text style={styles.btnText}>Pay with Flutterwave
			</Text>
</TouchableOpacity>


       

        </View>
}
        {/* <View style={{alignContent:'center',justifyContent:'center'}}>
<TouchableOpacity>
  <Text>Refresh</Text>
</TouchableOpacity>
        </View> */}
      

      </View>
    )
  }
}
const styles = StyleSheet.create({

  button: {
    width: 250,
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 50,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    flex: 1,
  },
});
 export default MakePayments;
