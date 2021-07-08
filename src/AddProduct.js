import * as React from 'react';
// import { Text, View,TouchableOpacity,Image,StyleSheet,ScrollView,TextInput } from 'react-native';
import { Text, View, TouchableOpacity,Image,StyleSheet,ScrollView,TextInput,PixelRatio,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
export default class AddProduct extends React.Component{
constructor(props){
    super(props);
    this.state={
        number:'',
        category:'',
        product:'',
        quantity:'',
        price:'',
        image:'',
        owner:'',
        size:'',
        block:'',
        plot:'',data:null,
        photo:[],
        loading:false,
    value: '',
    electricity:false,
    water:false,
    stimage: null,
    visible:false,
    filename:'',
    uri_:null,
    currentUser: null,
    discription:'',
    sttransferred: 0,
    }
}

 getData_ = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    // setData2(JSON.parse(jsonValue));
    JSON.parse(jsonValue)?null:this.props.navigation.navigate('Login');
    // console.log(data2);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

componentDidMount(){
this.getData_();
}
takephoto=()=> {
// this.setState({option:launchCamera});

// selectImage = () => {
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
  // console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    response.assets.forEach(data => {
      this.setState({filename:data.fileName});
      this.setState({uri_:data.uri});
     });

    // console.log(this.state.filename);
    // console.log(this.state.uri_);
    const source = { uri: this.state.uri_ };
    this.setState({
      stimage: source,
      data: response.assets
    });
  }
});
this.setState({visible:false});

}

selectphoto=()=> {
// this.setState({option:launchImageLibrary});
// selectImage = () => {
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
  // console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
  
    response.assets.forEach(data => {
      this.setState({filename:data.fileName});
      this.setState({uri_:data.uri});
     });

     console.log(response);
    //  this.setState({
 
    //   ImageSource: source,
    //   data: response.data

    // });
    const source = { uri: this.state.uri_ };
    this.setState({
      stimage: source,
      data: response.assets
    });
  }
});
this.setState({visible:false});

}
uploadImageToServer = () => {
 
  fetch( 'http://ubuntusx.com/mobipharm/test2.php', {
    method:'POST',
    'Content-Type': 'multipart/form-data',
  }, [
      { name: 'image', filename: 'image.png', type: 'image/png', data:this.state.stimage },
      { name: 'price', data: 100 }
    ]).then((resp) => {

    console.log(resp);
    }).catch((err) => {
    console.log(err);
    // ...
    })

}

// uploadImage = async () => {
// // this.saveData();
// const {uri} = this.state.stimage;

// // console.log('uri= '+uri)

// console.log('stimage= ' + this.state.stimage);
// const filename = uri;

// // alert(filename)
// // console.log(filename);
// const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
// this.setState({sttransferred: 0});
// this.setState({stuploading: true});
// // sttransferred(0);
// const task = storage()
//   .ref('Land').child(this.state.filename)
//   .putFile(uri);
// // set progress state
// task.on('state_changed', (snapshot) => {
//   this.setState({
//     sttransferred:
//       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
//   });
// });
// try {
//   await task;
// } catch (e) {
//   console.error(e);
//   alert(e);
// }

// this.setState({stuploading: false});
// // alert('Photo uploaded!', 'Your photo has been uploaded');
// const ref = storage().ref(filename);

// ref
//   .getDownloadURL()
//   .then((url) => {
//     this.setState({photos: url});
//   })
//   .catch((e) => console.log('getting downloadURL of image error => ', e));
// // // alert(this.state.url)

// // alert(this.state.url)
// };
saveData = () => {
this.setState({loading: true, disabled: true});
// this.uploadImage();
// const {currentUser} = auth();


if (this.state.product != '') {
  if (this.state.price != '') {
    if (this.state.quantity != '') {
      if (this.state.category != '') {
            this.setState({loading: true, disabled: true}, () => {
              fetch(
                'http://ubuntusx.com/mobipharm/add_item.php',

                // "http://e-soil-databank.paatsoilclinic.com/sever/register.php",/
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    product: this.state.product,
                    price: this.state.price,
                    quantity: this.state.quantity,
                    category: this.state.category,

                    discription: this.state.discription,
                    image: this.state.stimage,
                   
                  }),
                },
              )
                .then(response => response.json())
                .then(responseJson => {
                  // If server response message same as Data Matched
                  if (responseJson === 'Added suceessfully!') {
                    //Then open Profile activity and send user email to profile activity.
                    alert('Added successfully');

                    // this.props.navigation.navigate('Login');
                    this.setState({ loading: false, disabled: false });

                    // return navigation.navigate('Login');
                    // Alert.alert('data matched');
                  } else {
                    console.log(responseJson);
                    alert(responseJson);
                  }

                  this.setState({ loading: false, disabled: false });
                })
                .catch(error => {
                  console.error(error);
                  this.setState({ loading: false, disabled: false });
                });
              this.setState({loading: false, disabled: false});
            });
         
          
          } else {
            alert('Enter Category');
          }
    } else {
      alert('Enter quantity');
    }
  } else {
    alert('Enter Item Price');
  }
} else {
  alert(' Enter Item Name');
}
};
hideModal=()=>{
this.setState({visible:false});
}
showModal=()=>{
this.setState({visible:true});
}
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
         <Dialog
    visible={this.state.visible}
    
  >
    <DialogContent>
    <View style={{margin:70,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity 
          onPress={this.selectphoto}
          style={{marginBottom:20}}
          >
            <Text style={{fontSize:20}}>Choose from phone</Text>
            </TouchableOpacity>
          <TouchableOpacity
          onPress={this.takephoto}
          style={{marginTop:10}}
          >
            <Text style={{fontSize:20}}>Take a photo</Text>
            </TouchableOpacity>
         </View>
    </DialogContent>
  </Dialog>
         <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator size="large" /> : null}
        <View style={{marginTop: 10, marginBottom: 15}}>
          <Text style={{color: 'blue'}}>Add Item Details</Text>
        </View>
        <ScrollView>
          <View style={{marginBottom: 30}}>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={this.showModal}
          style={{justifyContent:'center'}}
          >
            <View style={styles.ImageContainer}>
              {this.state.stimage === null ? (
                <Text>Select a Photo</Text>
              ) : (
                <Image
                  style={styles.ImageContainer}
                  source={this.state.stimage}
                />
              )}
            </View>
          </TouchableOpacity>

           <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
 
          <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
        </TouchableOpacity>
            </View>
            {/* <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Plot/Land Size"
                style={styles.inputs}
                onChangeText={(category) => this.setState({category})}
                value={this.state.category}
              />
            </View> */}
            <View style={[styles.inputContainer]}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Item Name"
                style={styles.inputsmulti}
                onChangeText={(product) =>
                  this.setState({product})
                }
                value={this.state.product}
                // multiline={true}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Price"
                style={styles.inputsmulti}
                onChangeText={(price) =>
                  this.setState({price})
                }
                value={this.state.price}
                // multiline={true}
              />
            </View>
            
            <View style={styles.buttonsContainers}>
            <View style={styles.inputContainerRow}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Quantity"
                style={styles.inputs}
                onChangeText={(quantity) => this.setState({quantity})}
                value={this.state.quantity}
              />
            </View>
            <View style={styles.inputContainerRow}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Category"
                style={styles.inputs}
                onChangeText={(category) => this.setState({category})}
                value={this.state.category}
              />
            </View>
            </View>
           
            <View style={[styles.inputContainer, {height:70}]}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Description"
                style={styles.inputsmulti}
                onChangeText={(discription) =>
                  this.setState({discription})
                }
                value={this.state.discription}
                multiline={true}
              />
            </View>
            
           
            
           
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.saveData}>
              <Text style={styles.loginText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    
    buttonContainer: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
    },
    TextInputStyleClass: {
      // textAlign: 'center',
      marginBottom: 7,
      height: 40,
      width: 200,
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
    textInputMulti: {
      height: 80,
      borderWidth: 1,
      borderColor: 'grey',
      marginVertical: 5,
      alignSelf: 'stretch',
      padding: 8,
      fontSize: 16,
      textAlignVertical: 'top',
    },
    Header: {
      // justifyContent:"space-around",
      flexDirection: 'row',
      marginLeft: 250,
    },
  
    logoutContainer: {
      flexDirection: 'row',
      // flex:1,
      // paddingLeft:180,
      marginTop: 10,
      marginLeft: 30,
      color: 'red',
    },
    HomeContainer: {
      // flex:1,
      // paddingRight:50,
      marginTop: 10,
      // marginRight:150
    },
    logoutt: {
      color: 'red',
      fontSize: 13,
      // fontWeight:"bold"
    },
    home: {
      color: 'black',
      fontSize: 13,
      // fontWeight:"bold"
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
    inputsmulti: {
      // height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
    },
    logoutt: {
      color: 'orange',
      fontSize: 13,
      // fontWeight:"bold"
    },
    home: {
      color:'orange',
      fontSize: 13,
      // fontWeight:"bold"
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
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      paddingHorizontal: 0,
      alignItems: 'center',
      marginLeft: 10,
    },
    loginButton: {
      backgroundColor: '#0c2642',
    },
    loginText: {
      color: '#58f406',
    },
    buttonsContainers: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 0,
      alignItems: 'center',
      // marginLeft: 25,
    },
    inputContainerRow: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      borderBottomWidth: 1,
      height: 45,
      width: 125,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    ImageContainer: {
      borderRadius: 90,
      width: 155,
      height: 155,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',
  
    },
  });
  