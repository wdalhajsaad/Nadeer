import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity ,Picker  } from 'react-native';
import Styles from "../../Styles/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from "../../components/Spinner";
import DatePicker from 'react-native-datepicker';
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
export default class Vegetables extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title:'خضروات',
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' },
    headerTitleAlign: 'center'
  });
  constructor(props) {
    super(props);
    this.state = {
      selectedType:'',
      itemValue:'',
      region:'',
      date:'',
      Qu:'',
      Note:'',
      phone:'',
      Loading:false,
    };
  }
    async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        var res = JSON.parse(value);
        alert(res.PPohne)
        setState({
          phone:res.PPhone
        });
      } else {
      }
    } catch (error) {
      alert(error);
    }
  }
  setSelectedValue(valu){
       this.setState({selectedType:valu})
  }
   setSelectedregion(valu){
       this.setState({region:valu})
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
     var selectedType= this.state.selectedType;
     var Qu =this.state.Qu;
     var region =this.state.region;
     var date=this.state.date;
     var Note=this.state.Note;
      var phone =this.state.phone;
     firebase.database().ref("Adds/Vegetables/")
      .push({
       selectedType,
       Qu,
       region,
       date,
       Note,
       phone,
      })
      .then((data) => {
       
        this.props.navigation.navigate("Home");

        // console.log('data ' , data)
      })
      .catch((error) => {
        //error callback
        alert("حدث خطأ تأكد من الاتصال بالانترنت");
        console.log("error ", error);
      });


  }
  render() {
    return (
       <KeyboardAwareScrollView
      //style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[Styles.Keycontainer,Styles.statusBar]}
      scrollEnabled={false}
    >

        <Picker
        selectedValue={this.state.selectedType}
        style={Styles.input}
        onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
      >
       <Picker.Item label="--النوع--" value="1" />
        <Picker.Item label="طماطم" value="طماطم" />
        <Picker.Item label="بصل" value="بصل" />
        <Picker.Item label="بطاطس" value="بطاطس" />
        <Picker.Item label="جرجير" value="جرجير" />
         <Picker.Item label="ليمون" value="ليمون" />
      </Picker>
     <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder="الكمية "
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.state.Quَ}
          //value={this.state.Name}
          onChangeText={Qu => this.setState({ Qu })}
        />
         <Picker
        selectedValue={this.state.region}
        style={Styles.input}
        onValueChange={(itemValue, itemIndex) => this.setSelectedregion(itemValue)}
      >
         <Picker.Item label="-مناطق الانتاج-" value="" />
         <Picker.Item label="القضارف" value="القضارف" />
         <Picker.Item label="سنار " value="سنار" />
          <Picker.Item label="جنوب النيل الازرق " value="جنوب النيل الازرق" />
      </Picker>
         <DatePicker
        style={Styles.input}
        date={this.state.date}
        mode="date"
        placeholder="تـاريخ الإنتاج "
        format="YYYY-MM-DD"
        //minDate="2016-05-01"
        //maxDate="2016-06-01"
        confirmBtnText="موافق"
        cancelBtnText="الغاء"
        customStyles={{
           color :'red',
         dateTouchBody:{
             color :'red',
         },
       
          dateInput: {
              borderColor: '#234456',
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
  {this.renderButton()}
    </KeyboardAwareScrollView>
    );
  }
}
