import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity  } from 'react-native';
import Styles from "../../Styles/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from "../../components/Spinner";
export default class Omaz extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title:'اومباز',
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' },
    headerTitleAlign: 'center'
  });
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 renderButton() {
    if (this.state.Loading) {
      return <Spinner SizeSpinner="large" />;
    }

    return (
      <TouchableOpacity
        style={Styles.innerButtonStyle}
        onPress={this.AddAdds.bind(this)}
      >
        <Text style={Styles.ButtonText}> إضافة اعلان </Text>
      </TouchableOpacity>
    );
  }
  AddAdds=()=>{

  }
  render() {
    return (
       <KeyboardAwareScrollView
      //style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[Styles.Keycontainer,Styles.statusBar]}
      scrollEnabled={false}
    >
     <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder="   الإســـم"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.state.Name}
          //value={this.state.Name}
          onChangeText={Name => this.setState({ Name })}
        />
         <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder="   الإســـم"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.state.Name}
          //value={this.state.Name}
          onChangeText={Name => this.setState({ Name })}
        />
         <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder="   الإســـم"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.state.Name}
          //value={this.state.Name}
          onChangeText={Name => this.setState({ Name })}
        />
  {this.renderButton()}
    </KeyboardAwareScrollView>
    );
  }
}
