import * as React from 'react';
// import { Text, View,TouchableOpacity,Image,StyleSheet,ScrollView,TextInput } from 'react-native';
import { Text, View, TouchableOpacity,Image,StyleSheet,ScrollView,TextInput,PixelRatio,ActivityIndicator } from 'react-native';

import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';

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
        plot:'',
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
      // data: response.data
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
    const source = { uri: this.state.uri_ };
    this.setState({
      stimage: source,
      // data: response.data
    });
  }
});
this.setState({visible:false});

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
this.uploadImage();
const {currentUser} = auth();


if (this.state.size != '') {
  if (this.state.owner != '') {
    if (this.state.number != '') {
      if (this.state.block != '') {
        if (this.state.plot != '') {
            this.setState({loading: true, disabled: true}, () => {
              database()
                .ref('Land/')
                .push({
                  size: this.state.size,
                  owner: this.state.owner,
                  number: this.state.number,
                  block: this.state.block,
                  plot: this.state.plot,
                  photo: this.state.filename,
                  description: this.state.discription,
                })

                .then(() => {
                  this.setState({loading: false, disabled: false});
                  alert('Land/Plot Added Successfully');
                  return this.props.navigation.navigate(
                    'AddLand',
                  );
                })
                .catch((error) => {
                  // this.state.errorMessage ? this.handleSignUp()  : this.handle()
                  this.setState({loading: false, disabled: false});
                });

              this.setState({loading: false, disabled: false});
            });
         
          
        } else {
          alert('Enter Title Plot');
        }
      } else {
        alert('Enter Title Block');
      }
    } else {
      alert('Enter Contact Number');
    }
  } else {
    alert('Enter Owner Name');
  }
} else {
  alert(' Enter Plot/Land Size');
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
            {/* <View style={styles.inputContainerRow}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Title Plot"
                style={styles.inputs}
                onChangeText={(plot) => this.setState({plot})}
                value={this.state.plot}
              />
            </View> */}
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
  