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
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';

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
export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      prices: [],
      data: [],
      data2: [],
      data3: [],
      is_admin: false,
      currentUser: null,
      confirm_agreement: false,
      loading: false,
      disabled: false,
      visible: false,
      photos: [],
      photos2: [],
      setData3: [],
      added_products: [],
      total: '',
      setData2: '',
      email: '',
      fname: '',
      lname: '',
      user_uid: '',
      phoneNumber: '',
      value: '',
      location: '',
      deliver: '',
      setland: false,
      setbuilding: false,
      checkout: false,
    };
  }

  getData_ = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({setData2: JSON.parse(jsonValue)});
      console.log(this.state.setData2.pass);

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
          // console.log(responseJson);

          async function fetchUser() {
            try {
              const jsonValue = JSON.stringify(responseJson);
              await AsyncStorage.setItem('@userprofile', jsonValue);
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
      'https://ubuntusx.com/mobipharm/products.php',
      // 'https://reactnative.dev/movies.json'
    )
      .then(response => response.json())
      .then(json => {
        this.setState({data: json,data3:json});
        // setData(json);
        // setisLoading(false);
        this.setState({loading: false});

        let prod;
        prod = json.map(product => product.category);

        var merged = [].concat.apply([], prod);

        let uniqueChars = [...new Set(merged)];

        // console.log(uniqueChars);

        this.setState({data2: uniqueChars});
      })
      .catch(error => {
        if (error) {
          console.error(error);
          this.setState({loading: false});
        }
      })
      .finally(() => this.setState({loading: false}));

    this.getData_();
  }
  call = item => {
    const args = {
      number: item.number,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  makeLoanpayments = async data => {
    // console.log(data);
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@payment', jsonValue);
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
  };
  buy = item => {
    if (cart.length == 0 && cart_price.length == 0) {
      cart.push(item.id);
      var unique = cart.filter((v, i, a) => a.indexOf(v) === i);
      // console.log(unique);
      this.setState({products: unique});
      // if (items.length == 0) {
      //   items = this.state.products;

      //   this.setState({added_products: items});
      // }
      cart_price.push(parseInt(item.price));
      var unique_ = cart_price.filter((v, i, a) => a.indexOf(v) === i);
      // console.log(unique_);
      // this.setState({prices: unique_});
      let prod;
      prod = this.state.products.map(ids =>
        this.state.data
          .filter(item => item.id == ids)
          .map(product => parseInt(product.price)),
      );

      var merged = [].concat.apply([], prod);

      this.setState({prices: merged});
      // console.log(
      //   merged.reduce((a, b) => a + b)
      this.setState({total: this.state.prices.reduce((a, b) => a + b, 0)});

      // )
    } else {
      cart = this.state.products;
      console.log(cart);
      cart.push(item.id);
      var unique = cart.filter((v, i, a) => a.indexOf(v) === i);
      // console.log(unique);
      this.setState({products: unique});
      // if (items.length == 0) {
      //   items = this.state.products;

      //   this.setState({added_products: items});
      // }
      cart_price.push(parseInt(item.price));
      var unique_ = cart_price.filter((v, i, a) => a.indexOf(v) === i);
      // console.log(unique_);
      // this.setState({prices: unique_});

      let prod;
      prod = this.state.products.map(ids =>
        this.state.data
          .filter(item => item.id == ids)
          .map(product => parseInt(product.price)),
      );
      var merged = [].concat.apply([], prod);
      this.setState({prices: merged});
      this.setState({total: merged.reduce((a, b) => a + b, 0)});

      // console.log(
      //   merged.reduce((a, b) => a + b)
      // )
    }
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
      const itemData = `${item.item.toUpperCase()} ${item.category.toUpperCase()}${item.price.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  remove = e => {
    const result = this.state.products.filter(function (x) {
      return x !== e.id;
    });
    let prod;
    prod = result.map(ids =>
      this.state.data
        .filter(item => item.id == ids)
        .map(product => parseInt(product.price)),
    );

    var merged = [].concat.apply([], prod);
    // if (checker(merged, this.state.prices)) {
    this.setState({
      prices: merged,
      total: merged.reduce((a, b) => a + b, 0),
      products: result,
    });
    result.length == 0 ? this.setState({visible: false}) : null;
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
            <View style={{marginBottom: 20}}>
              <Image
                style={{width: 70, height: 80, borderRadius: 50}}
                source={{
                  uri: `http://ubuntusx.com/mobipharm/uploads/${item.image}`,
                }}
              />
            </View>
            <View style={{marginLeft: 40}}>
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
            </View>
            <View style={{marginLeft: 40}}>
              <TouchableOpacity
                onPress={this.buy.bind(this, item)}
                style={{
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  // width: 250,
                  backgroundColor: '#ff751a',
                  width: 60,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff'}}>+ Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* </View> */}
      </Card>
    );
  };
  add = product => {
    this.state.products.push(product.id);
    let prod;
    prod = this.state.products.map(ids =>
      this.state.data
        .filter(item => item.id == ids)
        .map(product => parseInt(product.price)),
    );

    var merged = [].concat.apply([], prod);
    // if (checker(merged, this.state.prices)) {
    this.setState({
      prices: merged,
      total: merged.reduce((a, b) => a + b, 0),
    });
  };
  reduce = product => {
    var array2 = [...this.state.products]; // make a separate copy of the array2
    var index2 = array2.indexOf(product.id);
    if (index2 !== -1) {
      array2.splice(index2, 1);
      let prod;
      prod = array2.map(ids =>
        this.state.data
          .filter(item => item.id == ids)
          .map(product => parseInt(product.price)),
      );

      var merged = [].concat.apply([], prod);
      // if (checker(merged, this.state.prices)) {
      this.setState({
        prices: merged,
        total: merged.reduce((a, b) => a + b, 0),
        products: array2,
      });
      array2.length == 0 ? this.setState({visible: false}) : null;
    }
  };
  checkout = () => {
    this.setState({
      visible: false,
      checkout: true,
    });
  };
  confirmm = () => {
    this.setState({
      visible: false,
      checkout: false,
    });
    alert('order confirmed');
  };
  confirm = () => {
    this.setState({
      visible: false,
      checkout: false,
    });
    this.setState({loading: true, disabled: false});

    if (this.state.fname != '') {
      if (this.state.lname != '') {
        if (this.state.email != '') {
          if (this.state.phoneNumber != '') {
            if (this.state.location != '') {
              if (this.state.deliver != '') {
                // if(this.state.confirm_password  == this.state.password){
                // if (this.state.confirm_agreement == true) {
                fetch(
                  'http://ubuntusx.com/mobipharm/order.php',

                  // "http://e-soil-databank.paatsoilclinic.com/sever/register.php",/
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      fname: this.state.fname,
                      lname: this.state.lname,
                      email: this.state.email,

                      location: this.state.location,
                      deliver: this.state.deliver,
                      phoneNumber: this.state.phoneNumber,
                      product: this.state.products,
                      price: this.state.total,
                    }),
                  },
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    // If server response message same as Data Matched
                    if (responseJson === 'order successful') {
                      //Then open Profile activity and send user email to profile activity.
                      alert('order successful');

                      // this.props.navigation.navigate('Login');
                      this.setState({
                        loading: false,
                        disabled: false,
                        total: '',
                        products: [],
                      });

                      // return navigation.navigate('Login');
                      // Alert.alert('data matched');
                    } else {
                      console.log(responseJson);
                      // Alert.alert(responseJson);
                    }

                    this.setState({loading: false, disabled: false});
                  })
                  .catch(error => {
                    console.error(error);
                    this.setState({loading: false, disabled: false});
                  });

                // }else{alert('agree to terms first')}
                // }else{alert('passwords not matching')}
              } else {
                alert(' Date to deliver');
              }
            } else {
              alert('Enter Location');
            }
          } else {
            alert('Enter phone number');
          }
        } else {
          alert('Enter email');
        }
      } else {
        alert('Enter Last Name');
      }
    } else {
      alert('Enter First Name');
    }
  };
  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <View style={[styles.buttonsContainer, {margin: 15}]}>
          <TouchableHighlight>
            <Text style={{fontSize: 25}}>Mobipharm</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Image
              source={require('./images/settings.png')}
              style={{width: 30, height: 30}}
            />
            {/* <Text>Settings</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.products.length > 0) {
                if (this.state.added_products.length == 0) {
                  let prod;
                  prod = this.state.products.map(ids =>
                    this.state.data
                      .filter(item => item.id == ids)
                      .map(product => parseInt(product.price)),
                  );

                  var merged = [].concat.apply([], prod);
                  this.setState({prices: merged});

                  this.setState({
                    visible: true,
                    // added_products: merged,
                    total: merged.reduce((a, b) => a + b, 0),
                  });
                } else {
                  this.setState({
                    visible: true,
                    // total: this.state.prices.reduce((a, b) => a + b, 0),
                  });
                }
              }
            }}>
            <View>
              <Badge
                value={this.state.products.length}
                status="warning"
                containerStyle={{right: -10, top: 2}}
              />

              <Image
                style={{width: 40, height: 40, borderRadius: 50}}
                source={require('./images/cart1.jpg')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonsContainer, {margin: 15}]}>
          <View style={{borderBottomColor: 'orange', padding: 10}}>
            <TouchableHighlight style={[styles.buttonContainer, {height: 30}]}>
              <Text>SORT BY</Text>
            </TouchableHighlight>
          </View>
          <View style={{borderBottomColor: 'orange', padding: 10}}>
            <TouchableHighlight
              onPress={this.all}
              // style={[styles.buttonContainer, styles.loginButton, {height: 30}]}
              // onPress={this.searchFilterFunction}

              // onPress={this.all}
            >
              <Text style={styles.loginText}>All</Text>
            </TouchableHighlight>
          </View>
          <View style={{borderBottomColor: 'orange', padding: 10}}>
            <Picker
              selectedValue={this.state.category}
              style={{height: 50, width: 250}}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({category:itemValue})
this.searchFilterFunction(itemValue);
              }
              }
            >
              <Picker.Item label="Select category.." value="" />

              {this.state.data2.map((cat, ind) => (
                <Picker.Item key={ind} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>
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
        {/* <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={this.renderSeparator}
              // ListHeaderComponent={this.header}
            /> */}

        <Dialog
          visible={this.state.visible}
          height={600}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => {
                  this.setState({
                    prices: [],
                    added_products: [],
                    products: [],
                    total: '',
                    visible: false,
                  });
                }}
              />
              <DialogButton
                text="OK"
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                  this.checkout();
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <View
              style={{
                marginLeft: 60,
                marginTop: 10,
                marginRight: 60,
                justifyContent: 'center',
                alignItems: 'center',
                height: 500,
                maxWidth: '100%',
              }}>
              <ScrollView>
                {this.state.products
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map(product_id =>
                    this.state.data
                      .filter(item => item.id == product_id)
                      .map((product, index) => (
                        <View
                          key={index}
                          style={{marginBottom: 30, maxWidth: '100%'}}>
                          <View style={styles.buttonsContainer}>
                            <View style={{marginRight: 10}}>
                              <Image
                                style={{
                                  width: 60,
                                  height: 70,
                                  borderRadius: 50,
                                }}
                                source={{
                                  uri: `http://ubuntusx.com/mobipharm/uploads/${product.image}`,
                                }}
                              />
                            </View>
                            <View>
                              <Text>{product.item}</Text>
                              <Text>{product.category}</Text>
                              <Text>{product.price}</Text>
                            </View>
                            <View style={{marginLeft: 10}}>
                              {this.state.products.length != 0 ? (
                                <Text style={{fontWeight: 'bold'}}>
                                  {
                                    this.state.products.filter(
                                      x => x == product.id,
                                    ).length
                                  }{' '}
                                  items
                                </Text>
                              ) : null}
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              marginTop: 20,
                            }}>
                            <TouchableOpacity
                              style={styles.smaillbuttons}
                              onPress={this.add.bind(this, product)}>
                              <Text style={{fontSize: 20, color: '#fff'}}>
                                +
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={this.reduce.bind(this, product)}
                              style={styles.smaillbuttons}>
                              <Text style={{fontSize: 20, color: '#fff'}}>
                                -
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={this.remove.bind(this, product)}
                              style={[
                                styles.smaillbuttons,
                                {width: 60, backgroundColor: 'transparent'},
                              ]}>
                              <Text style={{color: '#ff751a'}}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )),
                  )}
              </ScrollView>
              <Text>Total Amount: {this.state.total} UGX</Text>
              <Text>{'\n'}</Text>
              <TouchableOpacity
                onPress={this.checkout}
                style={[styles.smaillbuttons, {width: 70, height: 30}]}>
                <Text style={{color: '#fff'}}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          visible={this.state.checkout}
          // height={600}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => this.setState({checkout: false})}
              />
              <DialogButton
                text="OK"
                onPress={() => this.setState({checkout: false})}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <View
              style={{
                marginLeft: 70,
                marginTop: 10,
                marginRight: 70,
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
                maxWidth: '100%',
              }}>
              <ScrollView>
                <View
                  style={{marginBottom: 30, marginTop: 50, maxWidth: '100%'}}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="First Name"
                      style={styles.inputs}
                      autoCapitalize="none"
                      onChangeText={fname => this.setState({fname})}
                      value={this.state.fname}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Last Name"
                      style={styles.inputs}
                      autoCapitalize="none"
                      onChangeText={lname => this.setState({lname})}
                      value={this.state.lname}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={styles.inputs}
                      onChangeText={text => this.setState({email: text})}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Phone Number"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      style={styles.inputs}
                      onChangeText={text => this.setState({phoneNumber: text})}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Location"
                      autoCapitalize="none"
                      style={styles.inputs}
                      onChangeText={text => this.setState({location: text})}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <DatePicker
                      // style={{width: 200, marginBottom: 7}}
                      style={styles.inputs}
                      date={this.state.deliver}
                      mode="date"
                      placeholder="deliverly date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          height: 40,
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignSelf: 'stretch',
                          fontSize: 16,
                          marginBottom: 9,
                        },
                      }}
                      onDateChange={deliver => this.setState({deliver})}
                    />
                    {/* <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="When to deliver"
                  autoCapitalize="none"
                  style={styles.inputs}
                  onChangeText={text => this.setState({deliver: text})}
                /> */}
                  </View>
                  {/* <TouchableOpacity
                onPress={this.confirm}
                style={[styles.smaillbuttons, {width: 70, height: 30}]}>
                <Text style={{color: '#fff'}}>Confirm Order</Text>
              </TouchableOpacity> */}
                </View>
              </ScrollView>
              <Text>{this.state.total}</Text>
              <TouchableOpacity
                onPress={this.confirm}
                style={[styles.smaillbuttons, {width: 100, height: 30}]}>
                <Text style={{color: '#fff'}}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
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
    // color: '#58f406',
    fontSize:16
  },
});
