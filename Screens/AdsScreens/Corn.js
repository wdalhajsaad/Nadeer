import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, Alert } from 'react-native';
import Styles from "../../Styles/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from "../../components/Spinner";
import { PermissionsAndroid } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//import DatePicker from 'react-native-datepicker';
import { DatePicker, Picker } from 'native-base';
import * as firebase from "firebase";
import functions from '../../Hleper/Helper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import { NavigationEvents } from "react-navigation";
import ImagePicker from 'react-native-image-picker';
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
class Corn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0', textAlign: 'center', },
    title: `${navigation.state.params.title}`,
    headerTitleStyle: { flex: 1, textAlign: 'center', color: 'white', paddingVertical: 15, fontWeight: 'normal', fontFamily: 'ElMessiri-Regular' },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
  });

  constructor() {
    super();
    this.state = {

      ModalVisibleStatus: false,
      imageuri: '',
      massages: '',
      pickerdata: [],
      firestPick: '',

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


    if (type === 'L') {

      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri !== null) {

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


          if (response.uri !== null) {

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

        }).catch(error => {

          alert(error)
        });
      }
    }


  }


  uploadImage = async (uri, nn) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("Images/" + nn);
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



  getRegion = () => {
    var yy = this.props.navigation.state.params.type;
    return functions.renderRegion(yy);
  }
  GetPickerType = () => {
    var yy = this.props.navigation.state.params.type;
    var res = functions.renderType(yy);
    return res;
  }
  _doApiCall = () => {

    try {
      //this.prepair();
    }
    catch (error) {
      alert(error)
    }

  };

  prepair = async () => {
    //alert('here is the one !!!!')
    //alert(JSON.stringify(this.props.date))
    //this.setState({pickerdata:s,firestPick:fir});

    var yy = this.props.navigation.state.params.type;
    this.props.setPageType(yy);
    //alert(yy)
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        var res = JSON.parse(value);
        //alert(res)
        this.props.setUserKey(
          res.Key
        );
      } else {
      }
    } catch (error) {
      alert(error);
    }


  }
  async componentDidMount() {
    this.prepair();
  }
  clearForm() {
    this.props.setSelectedType('');
    // this.props.setPageType('');
    //this.props.setSelectedWaight('');
    this.props.SetQu('');
    this.props.setSelectedregion('');
    this.props.setSelectedDate('');
    this.props.setStatePrice('');
    this.props.setStateNote('');
    // setUserKey:(value) =>dispatch({type:"SET_USER_KEY",text:value}),
    this.props.setImageUri('');
    this.props.setCreateDate('');
    this.props.setArabicName('');

  }

  validateform() {

    //alert(JSON.stringify(this.props.date))
    // return;

    if (this.props.selectedType.label == " النوع ") {
      Alert.alert("", 'يجب اختيار النوع');
      return false;

    }
    if (this.props.Qu === '') {
      Alert.alert('خطأ في البيانات', '  كتابة الكمية مطلوبة ولو بشكل تقريبي ');
      return false;

    }
    if (this.props.date === '') {
      Alert.alert('خطأ في البيانات', ' رجاءا قم باختيار تاريخ الانتاج ');
      return false;

    }
    if (this.props.price === '') {
      Alert.alert('خطأ في البيانات', ' الرجاء كتابة سعر الوحدة  ');
      return false;

    }
    if (this.props.region === '') {
      Alert.alert('خطأ في البيانات', ' الرجاء كتابة سعر الوحدة  ');
      return false;

    }


    return true;

  }

  AddAdds = () => {

    if (!this.validateform()) {
      return;
    }
    this.setState({ ModalVisibleStatus: true, massages: '  جاري رفع الاعلان' });
    var type = this.props.type;
    var selectedType = this.props.selectedType;
    var Qu = this.props.Qu;
    var region = this.props.region;
    var date = this.props.date;
    var Note = this.props.Note;
    var userkey = this.props.userkey;
    var image = this.props.image;
    //alert(type);
    var price = this.props.price;
    var waightType = this.props.waightType.label;
    var Kind = functions.getKind(type);
    //alert(Kind);
    var ArKind = functions.getKindAr(type);
    var createDate = functions.CreateDate();
    var active = 1;


    firebase.database().ref("Adds/")
      .push({
        //type:'peanuts',
        selectedType,
        Qu,
        region,
        date,
        Note,
        type,
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
        this.setState({ ModalVisibleStatus: false });
        this.clearForm()
        Alert.alert('رفع البيانات', "تم رفع الاعلان بنجاح ", [
          {
            text: "تم  ",
            onPress: () => this.props.navigation.navigate("Home")
          }

        ]
        )


        // console.log('data ' , data)
      })
      .catch((error) => {
        this.setState({ ModalVisibleStatus: false });
        //error callback
        alert("حدث خطأ تأكد من الاتصال بالانترنت");
        console.log("error ", error);
      });


  }
  render() {
    var ms = this.state.massages;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
        //style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={[Styles.Keycontainer, Styles.statusBar]}
        scrollEnabled={true}
      >
        <NavigationEvents
          onDidFocus={this._doApiCall}
        //onWillFocus={() => this.setState({ModalVisibleStatus: true})}
        />
        <Modal isVisible={this.state.ModalVisibleStatus}>
          <View style={{ backgroundColor: 'white', height: '30%', borderRadius: 20, }}>

            <Spinner SizeSpinner='large' massages={this.state.massages} />
          </View>
        </Modal>
        <DropDownPicker zIndex={999999}
          items={this.GetPickerType()}
          // defaultValue={this.state.firestPick}
          showArrow={false}
          dropDownMaxHeight={200}
          //defaultValue={this.state.country}
          containerStyle={{ height: 65 }}
          style={Styles.input}
          itemStyle={{
            justifyContent: 'center',

          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'right',
            color: '#808080',
            fontFamily: 'ElMessiri-Bold',
          }}
          // dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.props.setSelectedType(item)}
        />
        {/*<View  style={Styles.input}>
        
           <Picker
          selectedValue={this.props.selectedType}
         
          //mode="dropdown"
          //itemStyle={{ textAlign: 'center', }}
          //itemTextStyle={Styles.pickerIosListItemText}
          onValueChange={(itemValue, itemIndex) => this.props.setSelectedType(itemValue)}
        >
         //{functions.renderType(this.props.type)}
        </Picker>
  </View>*/}

        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <DropDownPicker zIndex={999999}
            items={
              [
                { label: 'بالطن', value: 'طن', selected: true },
                { label: 'بالقنطار', value: 'قنطار' },
              ]
            }
            // defaultValue={this.state.firestPick}
            showArrow={false}
            dropDownMaxHeight={200}
            selectedValue={this.props.waightType}
            //defaultValue={this.state.country}
            containerStyle={{ height: 65, width: '30%' }}
            style={Styles.inputvimto}
            itemStyle={{
              justifyContent: 'center',

            }}
            labelStyle={{
              fontSize: 14,
              textAlign: 'right',
              color: '#808080',
              fontFamily: 'ElMessiri-Bold',
            }}
            onChangeItem={item => this.props.setSelectedWaight(item)}
          />
          <TextInput
            style={Styles.inputshort}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            keyboardType="numeric"
            placeholder="الكمية "
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="#808080"
            textAlign="right"
            value={this.props.Qu}
            onChangeText={Qu => this.props.SetQu(Qu)}
          />
        </View>
        <DropDownPicker zIndex={999999}
          items={this.getRegion()}
          // defaultValue={this.state.firestPick}
          showArrow={false}
          dropDownMaxHeight={200}
          //defaultValue={this.state.country}
          containerStyle={{ height: 65, width: '95%' }}
          style={Styles.inputvimto}
          itemStyle={{
            justifyContent: 'center',

          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'right',
            color: '#808080',
            fontFamily: 'ElMessiri-Bold',
          }}
          // dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.props.setSelectedregion(item)}
        />

        {/*<View style={Styles.input}>
<Picker
          selectedValue={this.props.region}
          onValueChange={(itemValue, itemIndex) => this.props.setSelectedregion(itemValue)}
        >
          {functions.renderRegion(this.props.type)}
        </Picker></View>
       */}

        <View style={Styles.input}>
          <DatePicker

            date={this.props.date}
            mode="date"
            //defaultDate="jhvdo hgh"

            placeHolderText='تـاريخ الإنتاج '
            format="YYYY-MM-DD"
            confirmBtnText="موافق"
            textStyle={{ color: '#808080', textAlign: 'right', }}
            placeHolderTextStyle={{ color: "#808080", fontFamily: 'ElMessiri-Regular', textAlign: 'right', }}
            cancelBtnText="الغاء"
            customStyles={{
              color: 'red',
              dateTouchBody: {
                color: 'red',
              },

              dateInput: {
                borderColor: '#234456',
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => this.props.setSelectedDate(date)}
          />
        </View>
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

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', }}>
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
            onChangeText={Note => this.props.setStateNote(Note)}
          />
          <Icon name="camera" size={32} onPress={() => { this.ChooseImage('C') }} color="gray" style={{ position: "absolute", bottom: 2, left: 15 }} />
          <Icon name="paperclip" size={32} onPress={() => { this.ChooseImage('L') }} color="gray" style={{ position: "absolute", bottom: 2, left: 50 }} />
        </View>


        <Image source={{ uri: this.props.image }}
          style={{ width: 300, height: 150, }}
          resizeMode='cover'
        />
        {this.renderButton()}

      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  //alert(state);
  return {
    selectedType: state.selectedType,
    itemValue: state.itemValue,
    Qu: state.Qu,
    type: state.type, //this.props.navigation.state.params.type,
    region: state.region,
    date: state.date,
    Note: state.Note,
    userkey: state.userkey,
    price: state.price,
    Loading: false,
    waightType: state.waightType,
    image: state.image,
    ArabicName: state.ArabicName,
    CreateDate: state.CreateDate,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

    setSelectedType: (valu) => dispatch({ type: "SET_SELECTED_TYPE", text: valu }),
    setPageType: (value) => dispatch({ type: "SET_PAGE_TYPE", text: value }),
    setSelectedWaight: (value) => dispatch({ type: "SET_SELECTED_WAIGHT", text: value }),
    SetQu: (value) => dispatch({ type: "SET_QU", text: value }),
    setSelectedregion: (value) => dispatch({ type: "SET_SELECTED_REGION", text: value }),
    setSelectedDate: (value) => dispatch({ type: "SET_SELECTED_DATE", text: value }),
    setStatePrice: (value) => dispatch({ type: "SET_PRICE", text: value }),
    setStateNote: (value) => dispatch({ type: "SET_NOTE", text: value }),
    setUserKey: (value) => dispatch({ type: "SET_USER_KEY", text: value }),
    setImageUri: (value) => dispatch({ type: "SET_IMAGE_URL", text: value }),
    setCreateDate: (value) => dispatch({ type: "SET_CREATE_DATE", text: value }),
    setArabicName: (value) => dispatch({ type: "SET_ARABIC_NAME", text: value }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Corn)
