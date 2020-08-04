import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity ,AsyncStorage,Alert } from 'react-native';
import Styles from "../../Styles/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from "../../components/Spinner";
import Modal from "react-native-modal";
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
export default class Profile extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title:' بياناتي',
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' , fontFamily:'MFontRegular'},
    headerTitleAlign: 'center',
    headerTintColor: 'white',
  });
  constructor(props) {
    super(props);
    this.state = {
      ModalVisibleStatus: false,
      name:'',
      phone:'',
      Key:''
     
    };
  }

   async componentDidMount() {
    //alert('no way ');
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        var res = JSON.parse(value);
        //alert(res.Key)
        this.setState({
          phone:res.PPhone,
          name:res.Pname,
          Key:res.Key
        });
      // this.state.phone= ;
       // this.props.navigation.navigate("Home");
      } else {
        //alert("fail");
      }
    } catch (error) {
      alert(error);
      // Error retrieving data
    }
  }
 
 renderButton() {
    if (this.state.Loading) {
      return <Spinner SizeSpinner="large" />;
    }

    return (
      <TouchableOpacity
        style={Styles.profileButton}
        onPress={this.Updateprofile.bind(this)}
      >
        <Text style={Styles.ButtonText}>  تعديل بياناتي </Text>
      </TouchableOpacity>
    );
  }
  Updateprofile =()=>{

    this.setState({ ModalVisibleStatus: true, massages: '  جاري  تحديث البيانات' });
   // alert(this.state.selectedValue);
   // return;
 var name =this.state.name;
  var phone =this.state.phone;
  var Key =this.state.Key
     firebase.database().ref("UserList/"+Key)
      .update({
        name,
        phone,
      })
      .then((data) => {
      Alert.alert(' ',"تم تحيث بياناتك بنجاح")
      var obj = {
          Pname: name,
          PPhone: phone,
          Key: Key,
        };
        this.storedata(obj);
        //this.props.navigation.navigate("Home");

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
          alert("خطأ في تخزين البيانات");
        } else {
          //alert("success");
        }
      }
    ).catch((err) => {
      console.log("error is: " + err);
    });

    this.setState({ ModalVisibleStatus: false});
  }
  render() {
    return (
       <KeyboardAwareScrollView
      //style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[Styles.Keycontainer,Styles.statusBar]}
      scrollEnabled={false}
    >
       <Modal isVisible={this.state.ModalVisibleStatus}>
          <View style={{ backgroundColor: 'white', height: '30%', borderRadius: 20, }}>

            <Spinner SizeSpinner='large' massages={this.state.massages} />
          </View>
        </Modal>
   
<Text style={{width:'95%',  fontFamily:'MFontRegular',}}>:الاسم</Text>
     <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder=" الاسم"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.state.name}
          //value={this.state.Name}
          onChangeText={name => this.setState({ name })}
        />
        
       <Text style={{width:'95%',  fontFamily:'MFontRegular',}}>:رقم الهاتف</Text>
         <TextInput
          style={Styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder=" رقم الهاتف"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
           value={this.state.phone}
          multiline={true}
          textAlign="right"
          numberOfLines={4}
          onChangeText={phone => this.setState({ phone })}
                  />
  {this.renderButton()}
    </KeyboardAwareScrollView>
    );
  }
}
