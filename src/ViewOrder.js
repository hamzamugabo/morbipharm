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
var cart = [];
var cart_price = [];
var items = [];
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
    };
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
          // responseJson.forEach(data => {
          //   setuser_id(data.id);
          //   setuser_role(data.role);
          // });
          // console.log(data3);

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
          // this.setState({loading: false, disabled: false});
        })
        .catch(error => {
          console.error(error);

          // this.setState({loading: false, disabled: false});
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
        this.setState({data: json});
        // setData(json);
        // setisLoading(false);
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
        this.setState({data: json});
        // setData(json);
        // setisLoading(false);
        this.setState({loading: false});
      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading: false});
        }
      })
      .finally(() => this.setState({loading: false}));

    this.getData_();
    this.all();
  }
  call = item => {
    const args = {
      number: item.number,
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
    return (
      <Card style={{width: '100%'}}>
        {this.state.loading ? (
          <ActivityIndicator size="large" animating={true} color="#bc2b78" />
        ) : (
          <View style={styles.buttonsContainers}>
            {/* <View style={{marginBottom: 20}}>
              <Image
                style={{width: 70, height: 80, borderRadius: 50}}
                source={{
                  uri: `http://ubuntusx.com/mobipharm/uploads/${item.image}`,
                }}
              />
            </View> */}
            <View style={{marginLeft: 40}}>
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>product:</Text>
                <Text style={styles.value}>{item.product}</Text>
              </View>
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Quantity:</Text>
                <Text style={styles.value}>{item.quantity}</Text>
              </View>

              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>price:</Text>
                <Text style={styles.value}>{item.price}</Text>
              </View>
              
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Client:</Text>
                <Text style={styles.value}>{item.client_name}</Text>
              </View>
              
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Client phoneNumber:</Text>
                <Text style={styles.value}>{item.client_phone}</Text>
              </View>
              
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Client Email:</Text>
                <Text style={styles.value}>{item.client_email}</Text>
              </View>
              
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Deliver date:</Text>
                <Text style={styles.value}>{item.delivery}</Text>
              </View>
              
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Order date:</Text>
                <Text style={styles.value}>{item.order_date}</Text>
              </View>
              <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Location:</Text>
                <Text style={styles.value}>{item.location}</Text>
              </View>
            </View>
            
          </View>
        )}

        {/* </View> */}
      </Card>
    );
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <View style={{marginBottom: 200}}>
          {this.state.loading ? (
            <ActivityIndicator size="large" animating={true} color="#bc2b78" />
          ) : (
            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
          )}
        </View>
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
    justifyContent: 'flex-start',
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
