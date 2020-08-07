import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
 

} from "react-native";
import * as firebase from "firebase";
import Styles from "../../Styles/Styles";
import Spinner from "../../components/Spinner";
import Modal from "react-native-modal";
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

export default class MyAddDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: "#00c3a0", textAlign: "center" },
    title: "تفاصيل",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center",
      color: "white",
      paddingVertical: 15,
      fontWeight: "normal",
      fontFamily:'ElMessiri-Regular'
    },
    headerTitleAlign: "center",
    headerTintColor: 'white',
  });
  constructor(props) {
    super(props);
     this.state = {
      data:[],
      userFData:[],
      ModalVisibleStatus: false,
      massages: '',
      region:'',
      selectedType:'',

    };
  }
   RenderAddsImages(uri){
 console.log(uri)
    if(uri == null || uri===""){
       
     return (<Image source={require("../.././Images/11.jpg")} style={styles.productImg}   resizeMode='contain' />)
    }
    else{
     
          return (<Image source={{uri :uri}} style={styles.productImg}   resizeMode='contain' />)
    }
   }
 
   updateadd(){
     //alert()
     var id =this.props.navigation.state.params.Key;
     var ty= this.state.data.type;
     //alert(ty)
    this.props.navigation.navigate("UpdateAdds",{Key:id,type:ty})
   }
   Deactivate(){
     
    this.setState({ ModalVisibleStatus: true, massages: 'جاري حذف الاعلان' })
    var id =this.props.navigation.state.params.Key;
    //alert(id);
    firebase.database().ref('Adds/' + id).update({active: 0}).then((res)=>{
 //alert(res);
    this.setState({ ModalVisibleStatus: false});
    this.props.navigation.navigate("MyAdds")
    }).catch((nice)=>{
        alert(nice);
    });
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
   this.setState({data:userObj,region:userObj.region.label,selectedType:userObj.selectedType.label});
  //alert(userObj.key)
  }
 
});
   
   
  }
   ProGetData=()=>{
       //alert('hi');
        return (
      <View style={{paddingTop: 15,}}>
            <View style={Styles.ViewInfo}>
            <Text style={Styles.prodinfo}>{this.state.region}  </Text>
            <Text style={{width:'50%', fontFamily:'ElMessiri-Regular'}}>منطقة الانتاج </Text>
            </View>
            <View style={Styles.ViewInfo}>
            <Text style={[Styles.prodinfo,{textAlign: 'right', }]}>{this.state.data.Qu}  </Text>
            <Text style={Styles.prodinfo}> الكمية </Text>
            </View>
            <View style={Styles.ViewInfo}>
            <Text style={[Styles.prodinfo,{textAlign: 'right'}]}>{this.state.data.price}  </Text>
            <Text style={Styles.prodinfo}> السعر </Text>
            </View>
            <View style={Styles.ViewInfo}>
            <Text style={Styles.prodinfo}>{this.state.selectedType}  </Text>
            <Text style={Styles.prodinfo}> النوع </Text>
            </View>
            <View style={{flexDirection: 'row',width:'100%',justifyContent: 'flex-end',}}>
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
        <Modal isVisible={this.state.ModalVisibleStatus}>
          <View style={{ backgroundColor: 'white', height: '30%', borderRadius: 20, }}>
            <Spinner SizeSpinner='large' massages={this.state.massages} />
          </View>
        </Modal>
        <ScrollView>
         
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
           {this.RenderAddsImages(image)}
            <Text style={styles.name}>{this.state.data.ArKind}</Text>
           {this.ProGetData()}
          </View>
         
         
         
        </ScrollView>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
              style={Styles.innertineStyleOne}
              onPress={() => this.updateadd(this.state.data.Kind)}
            >
              <Text style={Styles.ButtonText}>تعديل  </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.innertineStyleTow}
              onPress={() => this.Deactivate()}
            >
              <Text style={Styles.ButtonText}>حذف الاعلان  </Text>
            </TouchableOpacity>
            </View>
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
    fontFamily: "ElMessiri-Regular",
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
