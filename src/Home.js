import * as React from 'react';
import { Text, View,FlatList,ActivityIndicator ,StyleSheet,TouchableHighlight,ScrollView,Image,TouchableOpacity} from 'react-native';
// import database from '@react-native-firebase/database';
// import storage from '@react-native-firebase/storage';
import call from 'react-native-phone-call';
import Card from "./Card"
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, SearchBar } from "react-native-elements";

export default class Home extends React.Component{
  constructor() {
    super();

    this.state = {
     
      data:[],
      data2:[],
      is_admin:false,
      currentUser: null,
      confirm_agreement: false,
      loading: false,
      disabled: false,
      photos:[],
      photos2:[],
      value:'',
      setland:false,
      setbuilding:false
    };
  }
  all=()=>{
    this.setState({loading:true,value:''});
    fetch(
      // 192.168.42.153
      'https://ubuntusx.com/mobipharm/products.php',
      // 'https://reactnative.dev/movies.json'
    )
      .then(response => response.json())
      .then(json => {
        this.setState({data:json});
        // setData(json);
        // setisLoading(false);
    this.setState({loading:false});

      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading:false})
        }
      })
      .finally(() => this.setState({loading:false}));
  }
  componentDidMount(){
    this.setState({loading:true});
    fetch(
      // 192.168.42.153
      'https://ubuntusx.com/mobipharm/products.php',
      // 'https://reactnative.dev/movies.json'
    )
      .then(response => response.json())
      .then(json => {
        this.setState({data:json});
        // setData(json);
        // setisLoading(false);
    this.setState({loading:false});

      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading:false})
        }
      })
      .finally(() => this.setState({loading:false}));
  }
  call = (item) => {
    const args = {
      number: item.number,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  makeLoanpayments =async (data)=>{
    // console.log(data);
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('@payment', jsonValue)
// alert(e);
this.props.navigation.navigate('MakePayments');
// setScaleAnimationDialogRepayLoan(false);
    } catch (e) {
      // saving error
alert(e);
    }
    // navigation.navigate('MakePayments');
    // setScaleAnimationDialogRepayLoan(false);

// console.log(data);
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.state.data.filter((item) => {
      const itemData = `${item.item.toUpperCase()} ${item.category.toUpperCase()}${item.price.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search..."
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  _renderItem = ({ item }) => {
   
    return (
      
      <Card
      style={{width:'100%'}}
      >
        {
          this.state.loading?
          <ActivityIndicator size="large" animating={true} color='#bc2b78' />
        :
        <View>
<View style={[styles.buttonsContainers, {marginBottom: 20}]}>


<Image
style={{width: '100%', height: 80}}
source={{uri: `http://ubuntusx.com/mobipharm/uploads/${item.image}`}}
/>

</View>
<View style={[styles.buttonsContainers, {marginBottom: 20}]}>
  <Text style={styles.details}>category:</Text>
  <Text style={styles.value}>{item.category}</Text>
</View>
<View style={[styles.buttonsContainers, {marginBottom: 20}]}>
  <Text style={styles.details}>product:</Text>
  <Text style={styles.value}>{item.item}</Text>
</View>

<View style={[styles.buttonsContainers, {marginBottom: 20}]}>
  <Text style={styles.details}>price:</Text>
  <Text style={styles.value}>{item.price}</Text>
</View>

<View style={[styles.buttonsContainers, {marginBottom: 20}]}>
  <Text style={styles.details}>quantity:</Text>
  <Text style={styles.value}>{item.quantity}</Text>
</View>

<View style={[styles.buttonsContainers, {marginBottom: 20}]}>
  <Text style={styles.details}>Description:</Text>
  <Text style={styles.value}>{item.discription}</Text>
</View>

        </View>


        }
      
      {/* </View> */}
      </Card>
    );
  };
  render(){
    return (
      <View style={{ flex: 1,marginTop:10}}>
         <View style={[styles.buttonsContainer, {margin:15}]}>
<TouchableHighlight>
  <Text style={{fontSize:25}}>Mobipharm</Text>
</TouchableHighlight>
<TouchableOpacity
onPress={() => this.props.navigation.navigate('Settings')}
>
  <Image source={require('./images/settings.png')}
   style = {{ width: 30, height: 30 }}
  />
  {/* <Text>Settings</Text> */}

</TouchableOpacity>
         </View>
         <View style={[styles.buttonsContainer, {margin:15}]}>
         <View  style={{borderBottomColor:'orange',padding:10}}>
        <TouchableHighlight style={[styles.buttonContainer,{height:30}]}><Text>SORT BY</Text></TouchableHighlight>
                 
                </View>
                <View  style={{borderBottomColor:'orange',padding:10}}>
                 <TouchableHighlight
                 onPress={this.all}
                style={[styles.buttonContainer, styles.loginButton,{height:30}]}
                // onPress={this.searchFilterFunction}
                
                // onPress={this.all}


                >
                <Text style={styles.loginText}>All</Text>
              </TouchableHighlight>
                </View>
        <View  style={{borderBottomColor:'orange',padding:10}}>
                 <TouchableHighlight
                 onPress={()=>this.setState({setland:true,setbuilding:false})}
                style={[styles.buttonContainer, styles.loginButton,{width:90,height:30}]}
                // onPress={this.searchFilterFunction}
                
                // onPress={this.all}


                >
                <Text style={styles.loginText}>Category</Text>
              </TouchableHighlight>
                </View>
                
                </View>
                <View style={{marginBottom:200}}>
                  {this.state.loading?
          <ActivityIndicator size="large" animating={true} color='#bc2b78' />
                  :
                  <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
                }
                
                </View>
                {/* <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={this.renderSeparator}
              // ListHeaderComponent={this.header}
            /> */}
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
  buttonsContainers: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    alignItems: 'center',
    marginLeft: 10,
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