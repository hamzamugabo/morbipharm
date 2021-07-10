import * as React from 'react';
import { Text, View } from 'react-native';
export default class Cart extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            products:[]
        }
//         const { navigation }  = this.props;
//         const userData = navigation.state.params.products;
// console.log(userData)

    }
componentDidMount(){
//     this.setState({products: this.props.navigation.state.params.products});
// console.log(this.state.products)
}
  render(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('products', 'NO-ID');
    // const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feeds!</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        {/* <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
      </View>
    );
  }
}