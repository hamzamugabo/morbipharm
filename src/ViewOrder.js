import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import call from 'react-native-phone-call';
import Card from './Card';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import {
  ListItem,
  SearchBar,
  Avatar,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import email from 'react-native-email'

export default class ViewOrder extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      prices: [],
      data: [],
      data2: [],
      photos: [],
      photos2: [],
      setData3: [],
      added_products: [],
      total: '',
      setData2: '',
      loading: false,
      disabled: false,
    };
  }
  getListViewItem = (item) => {  
    const to = [item] // string or array of email addresses
    email(to, {
        subject: 'Add subject',
        body: 'Some body right here'
    }).catch(console.error)
} 
  getData_ = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({setData2: JSON.parse(jsonValue)});
      // console.log(data2);

      fetch('https://ubuntusx.com/mobipharm/userProfile.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.setData2.email,

          password: this.state.setData2.pass,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.state({setData3: responseJson});

          async function fetchUser() {
            try {
              const jsonValue = JSON.stringify(responseJson);
              await AsyncStorage.setItem('@userprofile', jsonValue);
              // console.log(e);
            } catch (e) {
              // saving error
              console.log(e);
            }
          }
          fetchUser();
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  all = () => {
    this.setState({loading: true, value: ''});
    fetch(
      // 192.168.42.153
      'https://ubuntusx.com/mobipharm/products.php',
      // 'https://reactnative.dev/movies.json'
    )
      .then(response => response.json())
      .then(json => {
        this.setState({data2: json});
        // setData(json);
        // setisLoading(false);
        // console.log(this.state.data2);

        this.setState({loading: false});
      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading: false});
        }
      })
      .finally(() => this.setState({loading: false}));
  };
  componentDidMount() {
    this.setState({loading: true});
    fetch(
      // 192.168.42.153
      'https://ubuntusx.com/mobipharm/display_orders.php',
      // 'https://reactnative.dev/movies.json'
    )
      .then(response => response.json())
      .then(json => {
        if (json != 'No Oders Available') {
          this.setState({data: json});
          this.setState({loading: false});
        } else {
          this.setState({data: []});
          // console.log(this.state.data);
        }
      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading: false});
        }
      })
      .finally(() => this.setState({loading: false}));

    // this.getData_();
    this.all();
  }
  call = item => {
    const args = {
      number: item,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.state.data.filter(item => {
      const itemData = `${item.client_name.toUpperCase()}${item.location.toUpperCase()} ${item.client_phone.toUpperCase()}${item.client_email.toUpperCase()}`;
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
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  _renderItem = ({item}) => {
    // console.log(item)
    return (
      <Card style={{width: '100%'}}>
        {this.state.loading ? (
          <ActivityIndicator size="large" animating={true} color="#bc2b78" />
        ) : item ? (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Product Details</Text>
              {/* <Text>{'\n'}</Text> */}
            </View>
            <View style={[styles.buttonsContainers, {marginBottom: 8}]}>
            
            <Text  style={styles.value}>
                      product(s): {item.product}
                    </Text>
                  
            </View>
            <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
              {/* <View style={{marginLeft: 40}}> */}
              <View style={{marginRight: 10}}>
                <Text style={styles.value}>Quantity: {item.quantity}</Text>
                
                    <Text  style={styles.value}>
                      Amount: {item.total}
                    </Text>
                  
              </View>

              <View style={{marginRight: 10}}>
                {/* <Text style={styles.details}></Text> */}
                <Text style={styles.value}>Deliver date: {item.delivery}</Text>
                {/* <Text style={styles.details}></Text> */}
                <Text style={styles.value}>Order date: {item.order_date}</Text>

                {/* <Text style={styles.details}>Location:</Text> */}
                <Text style={styles.value}>Location: {item.location}</Text>
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Client Details</Text>
              {/* <Text>{'\n'}</Text> */}
            </View>
            <View style={[styles.buttonsContainers, {marginBottom: 8}]}>
              <View>
                <Text style={styles.details}>Client:</Text>
                <Text style={styles.details}>Client phoneNumber:</Text>
                <Text style={styles.details}>Client Email:</Text>
              </View>
              <View>
                <Text style={styles.value}>{item.client_name}</Text>
                <Text style={styles.value}>{item.client_phone}</Text>
                <Text style={styles.value}>{item.client_email}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity
            style={{marginRight:30}}
            onPress={this.call.bind(this,item.client_phone)}
            >
            <Image
              source={require('./images/phone.png')}
              style={{width: 30, height: 30}}
            />
            </TouchableOpacity>
            <TouchableOpacity
            // style={{alignItems:'flex-end'}}
            onPress={this.getListViewItem.bind(this,item.client_email)}
            >
            <Image
              source={require('./images/email.png')}
              style={{width: 30, height: 30}}
            />
            </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* </View> */}
      </Card>
    );
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('./images/back.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{fontSize: 20, height: 30}}>Back</Text>
          </TouchableOpacity>
        </View>
        {
          <View style={{marginBottom: 20}}>
            {this.state.loading ? (
              <ActivityIndicator
                size="large"
                animating={true}
                color="#bc2b78"
              />
            ) : this.state.data && this.state.data.length ? (
              <View>
                <FlatList
                  data={this.state.data}
                  renderItem={this._renderItem}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20}}> No Orders Available</Text>
              </View>
            )}
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  smaillbuttons: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // width: 250,
    backgroundColor: '#ff751a',
    width: 30,
    height: 20,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    alignItems: 'center',
    // marginLeft:25,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonsContainers: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
    alignItems: 'center',
    marginLeft: 10,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 150,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 7,
  },
  loginText: {
    color: '#58f406',
  },
});
