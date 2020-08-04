import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,

} from "react-native";
import * as firebase from "firebase";
import Styles from "../../Styles/Styles";
import Communications from 'react-native-communications';
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

export default class AddDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: "#00c3a0", textAlign: "center" },
    title: "تفاصيل",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center",
      color: "white",
      paddingVertical: 15,
      fontWeight: "normal",
      fontFamily:'MFontRegular'
    },
    headerTitleAlign: "center",
  });
  constructor(props) {
    super(props);
     this.state = {
      data:[],
      userFData:[],
    };
  }
   RenderAddsImages(uri){
 
    if(uri == null || uri===""){
       
     return (<Image source={require("../.././Images/11.jpg")} style={styles.productImg}   resizeMode='contain' />)
    }
    else{
     
          return (<Image source={{uri :uri}} style={styles.productImg}   resizeMode='contain' />)
    }
   }

getusert=(userid)=>{
  firebase.database().ref('UserList/' + userid).on('value', (snapshot) => {
  const userObj = snapshot.val();
  if(userObj != null){
   //this.getusert(userObj.userkey);
   //alert(userObj.name)
  this.setState({userFData:userObj});
  }
  });

}
  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart");
  }
  componentDidMount() {
      var id =this.props.navigation.state.params.Key;
//alert(id);                  
  firebase.database().ref('Adds/' + id).on('value', (snapshot) => {
  const userObj = snapshot.val();
  if(userObj != null){
   this.getusert(userObj.userkey);
  this.setState({data:userObj});
  //alert(userObj.image)
  }
 
});
   
   
  }
   ProGetData=()=>{
       //alert('hi');
        return (
      <View style={{paddingTop: 15,}}>
            

            <View style={Styles.ViewInfo}>
            <Text style={[Styles.prodinfo,{width:'100%'}]}>{this.state.data.selectedType}  </Text>
            </View> 
            <View style={Styles.ViewInfo}>
            <Text style={Styles.prodinfo}>{this.state.data.region}  </Text>
            <Text style={{width:'50%', fontFamily:'MFontRegular'}}> المدينة / الولاية  </Text>
            </View>

            <View style={Styles.ViewInfo}>
            <Text style={[Styles.prodinfo,{width:'100%'}]}>{this.state.data.Want}  </Text>
            </View>
            
            <View style={Styles.ViewInfo}>
            <Text style={[Styles.prodinfo,{width:'100%'}]}>{this.state.data.Note}  </Text>
            </View>
    </View>
        );
    }
  render() {
     // const image ='';
     // if(this.state.data.image !==null || this.state.data.image!=""){
         const image=this.state.data.image ;
     // }
    return (
        
      <View style={styles.container}>
     
        <ScrollView>
         
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
           {this.RenderAddsImages(image)}
            <Text style={styles.name}>{this.state.data.ArKind}</Text>
           {this.ProGetData()}
          </View>
         
         
         
        </ScrollView>
        <TouchableOpacity
              style={Styles.innerButtonStyle}
              onPress={() => Communications.phonecall(this.state.userFData.phone, true)}
            >
              <Text style={Styles.ButtonText}> الاتصال بـ { this.state.userFData.name} </Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignContent:  'center',
    alignItems: 'center',
  },
  productImg: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 25,
    color: "#00c3a0",
    //fontWeight: "bold",
    fontFamily: "MFontBold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    textAlign: "right",
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
