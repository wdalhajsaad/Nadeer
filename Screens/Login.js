import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView 
} from "react-native";
import Styles from "../Styles/Styles";
import Spinner from "../components/Spinner";
import * as firebase from "firebase";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const firebaseConfig = {
  apiKey: "AIzaSyDNnGtYBuXFrgTF-zM3wikQCEX47zoZKrE",
  authDomain: "alshaayib.firebaseapp.com",
  databaseURL: "https://alshaayib.firebaseio.com",
  projectId: "alshaayib",
  storageBucket: "alshaayib.appspot.com",
  messagingSenderId: "548627912353",
  appId: "1:548627912353:web:f0e2b35fa30ed3c51942e0",
  measurementId: "G-89M7RKP2FV",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: "",
      Name: "",
      Loading: false,
      Password: "",
      error: "",
      isNew:true,
    };
  }
  async componentDidMount() {
    //alert('no way ');
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        var res = JSON.parse(value);
       // alert(res.Pname);
        //this.props.navigation.navigate("Adds");
      } else {
        //alert("فشل في جلب معلومات المستخدم ");
        this.setState({isNew:true});
      }
    } catch (error) {
      alert(error);
       this.setState({isNew:true});

       
      // Error retrieving data
    }
  }
  renderButton() {
    if (this.state.Loading) {
      return <Spinner SizeSpinner="large" />;
    }

    return (
      <TouchableOpacity
        style={Styles.ButtonStyle}
        onPress={this.LoginClick.bind(this)}
      >
        <Text style={Styles.ButtonText}> تسجيـــل </Text>
      </TouchableOpacity>
    );
  }
  async LoginClick() {
    //if(this.state.Name===''|| this.state.Phone==='')
    //{
      //alert('الرجاء ادخال البيانات المطلوبة');
      //return;
    //}
    //alert('here')
    var name = this.state.Name;
    var phone = this.state.Phone;
    fetch('http://192.168.100.4:44314/api/Users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
      }
       
    }).then((response) => {
      alert('successful fetchToken response: ', response.json());
    }).catch((error) => alert('fetchToken error: ', error))
  }
  storedata(responseData) {
    AsyncStorage.setItem(
      "ACCESS_TOKEN",
      JSON.stringify(responseData),
      (err) => {
        if (err) {
          alert("خطأ في تخزين التوكن");
        } else {
          alert("success");
        }
      }
    ).catch((err) => {
      console.log("error is: " + err);
    });
  }
  render() {
    if(this.state.isNew == true){

   

    return (
      <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'
      //style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[Styles.Keycontainer,{paddingTop: 100,}]}
      scrollEnabled={true}
    >
        <Image
          style={{ alignSelf: "center", height: 200, width: 250 }}
          source={require(".././Images/bgN.png")}
          resizeMode='stretch'
        />
        <View style={{ paddingTop: 50 }}>
          <TextInput
            style={Styles.TextBoxStyle}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            placeholder="  الاسم ثلاثي"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="#808080"
            textAlign="right"
            onChangeText={(Name) => this.setState({ Name })}
          />

          <TextInput
            style={Styles.TextBoxStyle}
            autoCapitalize="none"
            //secureTextEntry={true}
            keyboardType="numeric"
            autoCorrect={false}
            returnKeyType="next"
            placeholder="  رقم الهاتف"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="#808080"
            textAlign="right"
            onChangeText={(Phone) => this.setState({ Phone })}
          />

          {this.renderButton()}
        </View>
         <View style={Styles.bottomCurve}>
       </View>
      
      </KeyboardAwareScrollView>
      
    );
     }
     else{
       return(
         <View></View>
       )
     }
  }
}
