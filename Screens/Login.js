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
} from "react-native";
import Styles from "../Styles/Styles";
import Spinner from "../components/Spinner";
import * as firebase from "firebase";
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
        this.props.navigation.navigate("Adds");
      } else {
        //alert("fail");
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
    if(this.state.Name===''|| this.state.Phone==='')
    {
      alert('الرجاء ادخال البيانات المطلوبة');
      return;
    }
    var name = this.state.Name;
    var phone = this.state.Phone;
    firebase.database().ref("UserList/")
      .push({
        name,
        phone,
      })
      .then((data) => {
        var obj = {
          Pname: name,
          PPhone: phone,
          Key: data.getKey(),
        };
        this.storedata(obj);
        this.props.navigation.navigate("Adds");

        // console.log('data ' , data)
      })
      .catch((error) => {
        //error callback
        alert("حدث خطأ تأكد من الاتصال بالانترنت");
        console.log("error ", error);
      });
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
      
      <View style={Styles.Logincontainer}>
        <Image
          style={{ alignSelf: "center", height: 150, width: 200 }}
          source={require(".././Images/BGLn.png")}
        />
        <View style={{ paddingTop: 100 }}>
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
      </View>
      
    );
     }
     else{
       return(
         <View></View>
       )
     }
  }
}
