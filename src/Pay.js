import React from 'react';
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native';
import {FlutterwaveInit,PayWithFlutterwave} from 'flutterwave-react-native';


export default class Pay extends React.Component {
constructor(){
    super();
    this.state={
        isPending:false
    }
}

  abortController = null;

  componentWillUnmout() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  handlePaymentInitialization = () => {
    this.setState({
      isPending: true,
    },async () => {
      // set abort controller
      this.abortController = new AbortController;
      try {
        // initialize payment
        const paymentLink = await FlutterwaveInit(
          {
            tx_ref: 'generateTransactionRef()',
            authorization: 'FLWPUBK-9731636faff7e36e0c28003deb640e74-X',
            amount: 100,
            currency: 'USD',
            customer: {
              email: 'customer-email@example.com',
            },
            payment_options: 'card',
          },
          this.abortController
        );
        // use payment link
        return this.usePaymentLink(paymentLink);
      } catch (error) {
        // do nothing if our payment initialization was aborted
        if (error.code === 'ABORTERROR') {
          return;
        }
        // handle other errors
        console.log(error.message);
      }
    });
  }
  handleOnRedirect(){
      console.log('redirect');
  }
   generateRef = (length) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
  render() {
    const {isPending} = this.state;
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <PayWithFlutterwave

  onRedirect={this.handleOnRedirect}
  options={{
    tx_ref: this.generateRef(11),
    authorization: 'FLWPUBK-9731636faff7e36e0c28003deb640e74-X',
    customer: {
      email: 'hamzamugabo3@gmail.com'
    },
    amount: 2000,
    currency: 'USD',
    payment_options: 'card'
  }}
/>
        {/* <TouchableOpacity
          style={[
            styles.paymentbutton,
            isPending ? styles.paymentButtonBusy : {}
          ]}
          disabled={isPending}
          onPress={this.handlePaymentInitialization}
        >
         <Text> Pay $100</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({

})