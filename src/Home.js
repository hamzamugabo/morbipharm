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
var cart = [];
var cart_price = [];
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
      total:'',
      value: '',
      setland: false,
      setbuilding: false,
    };
  }
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
    // this.state.products.some(item => item === item.id);
    // this.setState({products: unique});
if(cart.length == 0 && cart_price.length == 0){
    cart.push(item.id);
    var unique = cart.filter((v, i, a) => a.indexOf(v) === i);
    console.log(unique);
    this.setState({products: unique});

    cart_price.push(parseInt(item.price));
    var unique_ = cart_price.filter((v, i, a) => a.indexOf(v) === i);
    console.log(unique_);
    this.setState({prices: unique_});
    let sum =parseInt(item.price) ;
  
    for (let i = 0; i < this.state.prices.length; i++) {
        sum += this.state.prices[i];
    }
    console.log(sum);
    this.setState({total:sum});
    
  }else{
    cart = this.state.products;
    cart.push(item.id);
    var unique = cart.filter((v, i, a) => a.indexOf(v) === i);
    console.log(unique);
    this.setState({products: unique});

    cart_price.push(parseInt(item.price));
    var unique_ = cart_price.filter((v, i, a) => a.indexOf(v) === i);
    console.log(unique_);
    this.setState({prices: unique_});
    let sum = 0;
  
    for (let i = 0; i < this.state.prices.length; i++) {
        sum += this.state.prices[i];
    }
    console.log(sum);
    this.setState({total:sum});
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
remove=(e)=>{
  // console.log(e);
  // this.s
  
  var array2 = [...this.state.prices]; // make a separate copy of the array2
  var index2 = array2.indexOf(e.price)
  if (index2 !== -1) {
    array2.splice(index, 1);
    this.setState({prices: array2});
  }
  console.log(this.state.prices);
  var array = [...this.state.products]; // make a separate copy of the array
  var index = array.indexOf(e.id)
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({products: array});
  }
  // const array = [1, 2, 3, 4];
  let sum = 0;
  
  for (let i = 0; i < this.state.prices.length; i++) {
      sum += this.state.prices[i];
  }
  console.log(sum);
  this.setState({total:sum});

}
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

              {/* <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>quantity:</Text>
                <Text style={styles.value}>{item.quantity}</Text>
              </View> */}

              {/* <View style={[styles.buttonsContainers, {marginBottom: 20}]}>
                <Text style={styles.details}>Description:</Text>
                <Text style={styles.value}>{item.discription}</Text>
              </View> */}
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
          <TouchableOpacity onPress={() => this.setState({visible: true})}>
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
                onPress={() => this.setState({visible: false})}
              />
              <DialogButton
                text="OK"
                onPress={() => this.setState({visible: false})}
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
                height:500,
                maxWidth:'100%'
              }}>
                      <ScrollView>

              {this.state.products.map(product_id =>
                this.state.data
                  .filter(item => item.id == product_id)
                  .map((product, index) => (
                    <View key={index} style={{marginBottom: 30,maxWidth:'100%'}}>
                        <View style={styles.buttonsContainer}>
                          <View>
                            <Image
                              style={{width: 70, height: 80, borderRadius: 50}}
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
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <TouchableOpacity style={styles.smaillbuttons}>
                            <Text style={{fontSize: 20, color: '#fff'}}>+</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.smaillbuttons}>
                            <Text style={{fontSize: 20, color: '#fff'}}>-</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                          onPress={this.remove.bind(this,product)}
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
<Text>{this.state.total}</Text>
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
