import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,Picker ,AsyncStorage ,ScrollView,Image,Alert} from 'react-native';
import Styles from "../../Styles/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from "../../components/Spinner";
import DatePicker from 'react-native-datepicker';
import * as firebase from "firebase";

import {PermissionsAndroid} from 'react-native';
import functions from '../../Hleper/Helper';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import  ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Right} from 'native-base'
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
 class UpdateAdds extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title: `تعديل `,
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' , fontFamily:'MFontRegular' },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
  });
 
  constructor() {
    super();
    this.state = {
     
      ModalVisibleStatus: false,
      imageuri:'',
      massages:'',
     
    };
  }
  ChooseImage = async (type) => {
    var options = {
      noData: true,
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        privateDirectory: true 
      },
      
    };
    var pickerResult;
   
    
    if (type === 'L') {
      
     ImagePicker.launchImageLibrary(options, (response) => {
      if(response.uri !==null){

        this.setState({ ModalVisibleStatus: true, massages: 'جاري رفع الصورة' })
      let nn = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.uploadImage(response.uri, nn).then((res) => {
        res.ref.getDownloadURL().then((url) => {
          this.props.setImageUri(url);
          this.setState({ ModalVisibleStatus: false })
          console.log(url)
  
        });
      }).catch((error) => {
        alert(error);
        this.setState({ ModalVisibleStatus: false })
      })
      
  
    }
});

      //pickerResult = await ImagePicker.launchImageLibraryAsync();
    }
    if (type === 'C') {
     
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
           {
              title: 'الاذن مطلوب'
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     ImagePicker.launchCamera(options, (response) => {
       
      
      if(response.uri !==null){

        this.setState({ ModalVisibleStatus: true, massages: 'جاري رفع الصورة' })
      let nn = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.uploadImage(response.uri, nn).then((res) => {
        res.ref.getDownloadURL().then((url) => {
          this.props.setImageUri(url);
          this.setState({ ModalVisibleStatus: false })
          console.log(url)
  
        });
      }).catch((error) => {
        alert(error);
        this.setState({ ModalVisibleStatus: false })
      })
      
  
    }
      //alert(pickerResult.uri)
      
}).catch(error=>{

  alert(error)
});
        }
    }

  
}




  uploadImage=async (uri,nn)=>{
     const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child("Images/"+nn);
  return ref.put(blob);


  }
 renderButton() {
    if (this.props.Loading) {
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

  getdata(id){
  //alert("no way"+id)
    firebase.database().ref('Adds/' + id).on('value', (snapshot) => {
        const userObj = snapshot.val();
        if(userObj != null){
          //alert(userObj.image)
         //this.getusert(userObj.userkey);
         this.props.setSelectedType(userObj.selectedType);
         this.props.setSelectedregion(userObj.region);
         this.props.SetQu(userObj.Qu);
         this.props.setStatePrice(userObj.price)
         this.props.setStateNote(userObj.Note)
         this.props.setImageUri(userObj.image)
         this.props.setSelectedDate(userObj.date)
        this.setState({data:userObj});
        //alert(userObj.image)
        }
       
      });
     
  }

setSelectedregion(valu){
  this.setState({region:valu});
}
    async componentDidMount() {
     // var text=this.props.navigation.state.params.Key;
      var text = this.props.navigation.state.params.type;
     // alert(text)
      this.props.setPageType(text);
      //alert(text)
     //this.props.setPageType(text);
     //var  kind = functions.getKind('P') ;
     //alert(kind);

     var id=this.props.navigation.state.params.Key;
     //alert(id);
     this.getdata(id);

    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        var res = JSON.parse(value);
       // alert(this.state.type)
        this.props.setUserKey(
        res.Key
        );
      } else {
      }
    } catch (error) {
      alert(error);
    }

  }
  clearForm(){
     this.props.setSelectedType('');
       // this.props.setPageType('');
        this.props.setSelectedWaight('');
        this.props.SetQu('');
        this.props.setSelectedregion('');
        this.props.setSelectedDate('');
        this.props.setStatePrice('');
        this.props.setStateNote('') ;
       // setUserKey:(value) =>dispatch({type:"SET_USER_KEY",text:value}),
        this.props.setImageUri('');
        this.props.setCreateDate('');
          this.props.setArabicName('') ;

  }

  validateform(){
    
    //alert(this.props.selectedType)
   // return;
    if(this.props.selectedType=='النوع'){
      Alert.alert("",'يجب اختيار النوع');
      return false;
      
    }
     if(this.props.Qu===''){
      Alert.alert('خطأ في البيانات' ,'  كتابة الكمية مطلوبة ولو بشكل تقريبي ');
      return false;
      
    }
     if(this.props.date===''){
      Alert.alert('خطأ في البيانات' ,' رجاءا قم باختيار تاريخ الانتاج ');
      return false;
      
    }
     if(this.props.price===''){
      Alert.alert('خطأ في البيانات' ,' الرجاء كتابة سعر الوحدة  ');
      return false;
      
    }
    if(this.props.region===''){
      Alert.alert('خطأ في البيانات' ,' الرجاء كتابة سعر الوحدة  ');
      return false;
      
    }


    return true;

  }

  AddAdds=()=>{

    if(!this.validateform()){
       return;
    }
    this.setState({ModalVisibleStatus:true,massages:'  جاري تعديل  الاعلان'});
    var id=this.props.navigation.state.params.Key;
  var type =this.props.type;
  var selectedType= this.props.selectedType;
  var Qu =this.props.Qu;
  var region =this.props.region;
  var date=this.props.date;
  var Note=this.props.Note;
  var userkey =this.props.userkey;
  var image =this.props.image;
  //alert(image);
  var price =this.props.price;
  var waightType =this.props.waightType;
  var Kind = functions.getKind(type) ;
   var ArKind = functions.getKindAr(type) ;
   var createDate=functions.CreateDate();
   var active =1;


     firebase.database().ref("Adds/"+id)
      .update({
       //type:'peanuts',
       selectedType,
       Qu,
       region,
       date,
       Note,
       userkey,
       Kind,
       price,
       waightType,
       image,
       ArKind,
       createDate,
       active,

      })
      .then((data) => {
        this.setState({ModalVisibleStatus:false});
        this.clearForm()
        Alert.alert('رفع البيانات',"تم تعديل  الاعلان بنجاح ",  [
        {
          text: "تم  ",
          onPress: () =>  this.props.navigation.navigate("MyAdds")
        }
        
        ]
        )
       

        // console.log('data ' , data)
      })
      .catch((error) => {
         this.setState({ModalVisibleStatus:false});
        //error callback
        alert("حدث خطأ تأكد من الاتصال بالانترنت");
        console.log("error ", error);
      });


  }
  RenderAddsImages(uri){
 
    if(uri == null || uri===""){
       
     return (<Image source={require("../.././Images/11.jpg")}  style={{width:300,height:150,}}
     resizeMode='cover'/>)
    }
    else{
     
          return (<Image source={{uri :uri}}  style={{width:300,height:150,}}
            resizeMode='cover'/>)
    }



   }
  render() {
  var ms =this.state.massages;
    return (
       <KeyboardAwareScrollView
       enableOnAndroid={true}
       keyboardShouldPersistTaps='handled'
      //style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[Styles.Keycontainer,Styles.statusBar]}
      scrollEnabled={true}
    >
        <Modal isVisible={this.state.ModalVisibleStatus}>
          <View style={{  backgroundColor: 'white',height:'30%',borderRadius: 20, }}>
            
            <Spinner SizeSpinner='large' massages={this.state.massages} />
            </View>
        </Modal>
       
     <Picker
        selectedValue={this.props.selectedType}
        style={Styles.input}
        mode="dropdown"
        itemStyle={{ textAlign: 'center',}}
        itemTextStyle={Styles.pickerIosListItemText}
        onValueChange={(itemValue, itemIndex) => this.props.setSelectedType(itemValue)}
      >
      {functions.renderType(this.props.type)}
      </Picker>
        <View style={{flexDirection:'row',justifyContent:'center', width:'100%'}}>
         <Picker
        selectedValue={this.props.waightType}
        style={Styles.inputvimto}
        itemStyle={{ fontFamily: 'MFontRegular' }}
        textStyle={{fontFamily: 'MFontRegular' }}
        onValueChange={(itemValue, itemIndex) => this.props.setSelectedWaight(itemValue)}>
        <Picker.Item   label="بالطن" value="طن"  />
         <Picker.Item label="بالقنطار " value="قنطار"  />
         </Picker>
         <TextInput
          style={Styles.inputshort}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
           keyboardType="numeric"
          placeholder="الكمية "
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.props.Qu}
          //value={this.state.Name}
          onChangeText={Qu => this.props.SetQu( Qu )}
        />
        </View>
         <Picker
        selectedValue={this.props.region}
        style={Styles.input}
        onValueChange={(itemValue, itemIndex) => this.props.setSelectedregion(itemValue)}
      >
       {functions.renderRegion(this.props.type)}
      </Picker>
      <DatePicker
        style={Styles.input}
        date={this.props.date}
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
        onDateChange={(date) => this.props.setSelectedDate(date)}
      />
        <TextInput
          style={Styles.input}
          //placeholderStyle={{}}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          keyboardType="numeric"
          placeholder="السعر  "
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
          textAlign="right"
         value={this.props.price}
          //value={this.state.Name}
          onChangeText={price => this.props.setStatePrice(price)}
        />
        
        <View style={{flexDirection:'row' ,width:'100%',justifyContent: 'center',}}>
         <TextInput
          style={Styles.inputMu}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder=" ملاحطات"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#808080"
           value={this.props.Note}
          multiline={true}
          textAlign="right"
          numberOfLines={3}
          onChangeText={Note => this.props.setStateNote(Note )}
                  />
          <Icon name="camera" size={32} onPress={() => { this.ChooseImage('C') }} color="gray" style={{ position: "absolute", bottom: 2, left: 15 }} />
          <Icon name="paperclip" size={32} onPress={() => { this.ChooseImage('L') }} color="gray" style={{ position: "absolute", bottom: 2, left: 50 }} />
          </View>

                  {this.RenderAddsImages(this.props.image)}
                 
  {this.renderButton()}
  
    </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) =>{
  //alert(state);
  return{
       selectedType:state.selectedType,
        itemValue:state.itemValue,
        Qu:state.Qu,
        type:state.type, //this.props.navigation.state.params.type,
        region:state.region,
        date:state.date,
        Note:state.Note,
        userkey:state.userkey,
        price:state.price,
        Loading:false,
        waightType:state.waightType,
        image:state.image,
        ArabicName:state.ArabicName,
        CreateDate:state.CreateDate,
        };
}
 
 const mapDispatchToProps=(dispatch)=>{
  return{
   
        setSelectedType:(valu)=>dispatch({type:"SET_SELECTED_TYPE",text:valu}),
        setPageType:(value)=>dispatch({type:"SET_PAGE_TYPE",text:value}),
        setSelectedWaight:(value)=>dispatch({type:"SET_SELECTED_WAIGHT",text:value}),
        SetQu:(value)=>dispatch({type:"SET_QU",text:value}),
        setSelectedregion:(value) =>dispatch({type:"SET_SELECTED_REGION",text:value}),
        setSelectedDate:(value) =>dispatch({type:"SET_SELECTED_DATE",text:value}),
        setStatePrice:(value) =>dispatch({type:"SET_PRICE",text:value}),
        setStateNote: (value) =>dispatch({type:"SET_NOTE",text:value}),
        setUserKey:(value) =>dispatch({type:"SET_USER_KEY",text:value}),
        setImageUri:(value) =>dispatch({type:"SET_IMAGE_URL",text:value}),
        setCreateDate:(value) =>dispatch({type:"SET_CREATE_DATE",text:value}),
          setArabicName:(value) =>dispatch({type:"SET_ARABIC_NAME",text:value}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateAdds)
