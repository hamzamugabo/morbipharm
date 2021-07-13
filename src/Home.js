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
} from 'react-native';
// import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import call from 'react-native-phone-call';
import Card from './Card';
import AsyncStorage from '@react-native-community/async-storage';
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
import {SlideFromRightIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
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
      value: '',
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
    const result = this.state.products.filter(function(x) {
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
          products:result,
        
        });
    result.length==0?this.setState({visible:false}):null;
   
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
                <Text style={{color: '#fff'}}>Buy</Text>
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
        }
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
          products:array2
        });
        array2.length==0?this.setState({visible:false}):null;

        
    }
  };
  checkout = () => {
    this.setState({
      visible: false,
      checkout: true,
    });
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
              style={[styles.buttonContainer, styles.loginButton, {height: 30}]}
              // onPress={this.searchFilterFunction}

              // onPress={this.all}
            >
              <Text style={styles.loginText}>All</Text>
            </TouchableHighlight>
          </View>
          <View style={{borderBottomColor: 'orange', padding: 10}}>
            <TouchableHighlight
              onPress={() => this.setState({setland: true, setbuilding: false})}
              style={[
                styles.buttonContainer,
                styles.loginButton,
                {width: 90, height: 30},
              ]}
              // onPress={this.searchFilterFunction}

              // onPress={this.all}
            >
              <Text style={styles.loginText}>Category</Text>
            </TouchableHighlight>
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
                   cart = [];
                   cart_price = [];
                   items = [];
                  this.setState({
                    prices: [],
                    added_products: [],
                    products: [],
                    total:'',
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
                {this.state.products.filter((v, i, a) => a.indexOf(v) === i).map(product_id =>
                  this.state.data
                    .filter(item => item.id == product_id)
                    .map((product, index) => (
                      <View
                        key={index}
                        style={{marginBottom: 30, maxWidth: '100%'}}>
                        <View style={styles.buttonsContainer}>
                          <View style={{marginRight: 10}}>
                            <Image
                              style={{width: 60, height: 70, borderRadius: 50}}
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
                            <Text style={{fontSize: 20, color: '#fff'}}>+</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={this.reduce.bind(this, product)}
                            style={styles.smaillbuttons}>
                            <Text style={{fontSize: 20, color: '#fff'}}>-</Text>
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
              <Text>Total Amount: {this.state.total}</Text>
              <Text>{'\n'}</Text>
              <TouchableOpacity
                onPress={this.state.checkout}
                style={[styles.smaillbuttons, {width: 70, height: 30}]}>
                <Text style={{color: '#fff'}}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          visible={this.state.checkout}
          height={600}
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
                height: 500,
                maxWidth: '100%',
              }}>
              <ScrollView></ScrollView>
              <Text>{this.state.total}</Text>
              <TouchableOpacity
                onPress={this.state.checkout}
                style={[styles.smaillbuttons, {width: 70, height: 30}]}>
                <Text style={{color: '#fff'}}>Checkout</Text>
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
    padding: 7,
  },
  loginText: {
    color: '#58f406',
  },
});
