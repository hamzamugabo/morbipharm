import * as React from 'react';
// import { Text, View,TouchableOpacity,Image,StyleSheet,ScrollView,TextInput } from 'react-native';
import { Text, View, TouchableOpacity,Image,StyleSheet,ScrollView,TextInput,PixelRatio,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import DocumentPicker from 'react-native-document-picker';
import CheckBox from '@react-native-community/checkbox';
export default class AddProduct extends React.Component{
constructor(props){
    super(props);
    this.state={
        number:'',
        category:'select category',
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
        image_name:"",
    value: '',
    electricity:false,
    water:false,
    stimage: null,
    visible:false,
    filename:'',
    uri_:null,
    setSingleFile:null,
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

 uploadImage = async () => {
  // Check if any file is selected or not
  if (this.state.setSingleFile != null) {
    this.setState({loading:true});
    // If file selected then create FormData
    const fileToUpload = this.state.setSingleFile;
    const data = new FormData();
    data.append('name', 'Image Upload');
    data.append('file_attachment', fileToUpload);
    // data.append('price', 1000);

    console.log(data);

    // data.append('item', 'covidex');
    // data.append('file_attachment', fileToUpload);
    // Please change file upload URL
    let res = await fetch(
      'http://ubuntusx.com/mobipharm/test.php',
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    );
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      
      // alert('Upload Successful');

this.saveData();
this.setState({loading:false});
this.setState({
  product: '',
  price: '',
  quantity: '',
  category: '',

  discription: '',
  image_name: '',
})

    }else{
    this.setState({loading:false});
      
      console.log(responseJson)}
  } else {
    // If no file selected the show alert
    alert('Please Select File first');
  }
};

 selectFile = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.allFiles],
      // There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    // Printing the log realted to the file
    console.log('res : ' + JSON.stringify(res));
    // Setting the state to show single file attributes
    // setSingleFile(res);
    this.setState({setSingleFile:res})

    const source = { uri: res.uri };
    this.setState({
      stimage: source,
      image_name: res.name
    });
  } catch (err) {
    // setSingleFile(null);
    this.setState({setSingleFile:null})

    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};
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
                    image: this.state.image_name,
                   
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
            <TouchableOpacity onPress={this.selectFile}
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

           {/* <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
 
          <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
        </TouchableOpacity> */}
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
                keyboardType="numeric"
                placeholder="Price"
                style={styles.inputsmulti}
                onChangeText={(price) =>
                  this.setState({price})
                }
                value={this.state.price}
                // multiline={true}
              /><Text>UGX</Text>
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
            
            </View>
            <View style={styles.inputContainer}>
            <Picker
  selectedValue={this.state.category}
  style={{height: 50, width: 250}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({category: itemValue})
  }
  // style={{width:}}
  >
  <Picker.Item label="Select category.." value="" />
  <Picker.Item label="Condoms" value="Condoms" />
  <Picker.Item label="Plasters" value="Plasters" />
  <Picker.Item label="Cosmetics" value="Cosmetics" />
  <Picker.Item label="Alcohol pads" value="Alcohol pads" />
  <Picker.Item label="Hypertensive medicines" value="Hypertensive medicines" />
  <Picker.Item label="Creams" value="Creams" />
  <Picker.Item label="Erectile Enhancer" value="Erectile Enhancer" />
  <Picker.Item label="Inhaler" value="Inhaler" />
  <Picker.Item label="Anti-Diabetics" value="Anti-Diabetics" />
  <Picker.Item label="Hormone Treatment" value="Hormone Treatment" />
  <Picker.Item label="Anti-Malarials" value="Anti-Malarials" />
  <Picker.Item label="PainKiller" value="PainKiller" />
  <Picker.Item label="Gloves" value="Gloves" />
  <Picker.Item label="Multi-vitamins " value="Multi-vitamins " />
  <Picker.Item label="Anti-Diabetics" value="Anti-Diabetics" />
  <Picker.Item label="Hand Sanitiser" value="Hand Sanitiser" />
  <Picker.Item label="Pregnancy Test" value="Pregnancy Test" />
  <Picker.Item label="Mouth Wash" value="Mouth Wash" />
</Picker>
              {/* <TextInput
                underlineColorAndroid="transparent"
                placeholder="Category"
                style={styles.inputs}
                onChangeText={(category) => this.setState({category})}
                value={this.state.category}
              /> */}
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
              onPress={this.uploadImage}>
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
  