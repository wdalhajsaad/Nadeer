import React, { Component } from 'react';
import { View, Text,TouchableOpacity,FlatList,Image ,RefreshControl,BackHandler } from 'react-native';
import Styles from "../../Styles/Styles";
import Spinner from "../../components/Spinner";
import * as firebase from "firebase";
import Modal from "react-native-modal";
import { SearchBar,Button } from 'react-native-elements'; 
import HanleBack from '../../components/HanleBack'
import { NavigationEvents } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


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


export default class Adds extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title:' الاعلانات',
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' , fontFamily:'ElMessiri-Bold'},
    headerTitleAlign: 'center',
    headerLeft: null,
   // headerRight:(<View>
     
 //<Ionicons name="ios-add-circle-outline" size={40} onPress={()=>{ navigation.navigate("Home")}}  color="white" style={{marginRight:15}} />
// </View>
 //)
    
  });
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      ModalVisibleStatus: false,
      refreshing:false,
      textsearch:'',
    };
  }

  
  _listEmpty = () => {
    return (
      <View style={{ justifyContent:'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: 'bold', borderColor: 'black', color: '#4a90e2', textAlign: 'center' }}>لا توجد اعلانات</Text>
      </View>)
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

  _listEmpty = () => {

    return (
      <View style={{ justifyContent:'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: 'bold', borderColor: 'black', color: '#4a90e2', textAlign: 'center' }}>لا يوجد بيانات</Text>
      </View>)
  }
  FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#C7C7C7",
      }}
    />
  );
}
getdata(){
  this.setState({ ModalVisibleStatus: true})
  firebase.database().ref("Adds/").orderByChild('active').equalTo(1).once('value').then (querySnapShot => {
     var items = [];
        querySnapShot.forEach((child) => {
          //alert(child.key);
          items.push({
             Key:child.key,
             Kind:child.val().Kind,
             image:child.val().image,
             CreateDate:child.val().createDate,
             Qu:child.val().Qu,
             waightType:child.val().waightType,
             region:child.val().region,
             price:child.val().price,
              KindAr:child.val().ArKind,
              selectedType:child.val().selectedType,
          });
       });
       this.setState({data:items})
        this.setState({ ModalVisibleStatus: false})
     
   }).then((error)=>{
 
     //alert(error);
      this.setState({ ModalVisibleStatus: false})
   });

}
_handleRefresh=()=>{
  this.getdata();
}
   componentDidMount() {
    this.getdata();
   }
   RenderAddsImages(uri){
 
    if(uri == null || uri===""){
       
     return (<Image source={require("../.././Images/11.jpg")} style={{width:100,height:100, borderRadius: 5,marginTop: 5,marginBottom:5,paddingBottom: 5,}} />)
    }
    else{
     
          return (<Image source={{uri :uri}} style={{width:100,height:100, borderRadius: 5,marginTop: 5,marginBottom:5,paddingBottom: 5,}} />)
    }



   }
   
  
   renderItemBase=(item)=>{
     if(item.Kind=='Wanted'){
      return(
        <View>
         
         <TouchableOpacity style={{marginRight: 10,marginLeft: 10,borderRadius:20,}}
              onPress={() =>  this.props.navigation.navigate("Matloop",{Key:item.Key})}
            >
     <View style={{flexDirection: 'row',}} >
      
       <View style={{flex:1,alignContent: 'center',justifyContent: 'center',marginLeft:15,marginRight:20}}>
      <Text style={[Styles.TitleList,{color:'#00c3a0', fontFamily:'ElMessiri-Regular'}]}>{item.KindAr} {item.selectedType.label}</Text>
        <Text style={[Styles.TitleList,{fontFamily:'ElMessiri-Regular'}]}> المدينة :{item.region.label}  </Text>
          
       <View style={{flexDirection:'row',justifyContent: 'flex-end',}}>
        
           </View>
       <Text style={[Styles.TitleList,{fontSize: 12,color:'gray',fontFamily:'ElMessiri-Regular'}]}> {item.CreateDate}</Text>
      </View>
     
           
      {this.RenderAddsImages(item.image)}
      
      </View>  
      </TouchableOpacity>
      </View>
    )
     }
     else{
    return(
        <View>
         <TouchableOpacity style={{marginRight: 10,marginLeft: 10,borderRadius:20,}}
              onPress={() =>  this.props.navigation.navigate("AddDetails",{Key:item.Key})}
            >
      <View style={{flexDirection: 'row',}} >
      
      <View style={{flex:1,alignContent: 'center',justifyContent: 'center',marginLeft:15,marginRight:20}}>
       <Text style={[Styles.TitleList,{color:'#00c3a0', fontFamily:'ElMessiri-Regular'}]}>{item.KindAr}</Text>
        <Text style={[Styles.TitleList,{fontFamily:'ElMessiri-Regular'}]}>منطقة الانتاج :{item.region.label}  </Text>
           <Text style={[Styles.TitleList,{color:'#00c3a0', fontFamily:'ElMessiri-Regular'}]}>السعر : {item.price} للـ{item.waightType}</Text>
       <View style={{flexDirection:'row',justifyContent: 'flex-end',}}>
        
           </View>
       <Text style={[Styles.TitleList,{fontSize: 12,color:'gray',fontFamily:'ElMessiri-Regular'}]}> {item.CreateDate}</Text>
      </View>
     
           
      {this.RenderAddsImages(item.image)}
      
      </View>  
      </TouchableOpacity>
      </View>
    )}
   }
    RenderSpinner() {

    if (this.state.Loading) {
      return (
        <Spinner SizeSpinner='large' />
      );
    }
  }
  SearchFilterFunction=(text)=>{
   // this.setState({ ModalVisibleStatus: true})
    firebase.database().ref("Adds/").orderByChild('active').equalTo(1).once('value').then (querySnapShot => {
       var items = [];
          querySnapShot.forEach((child) => {
           
       alert(text)
            if(child.val().selectedType.includes(text))
            {
              alert(child.key);
            items.push({
               Key:child.key,
               Kind:child.val().Kind,
               image:child.val().image,
               CreateDate:child.val().createDate,
               Qu:child.val().Qu,
               waightType:child.val().waightType,
               region:child.val().region,
               price:child.val().price,
                KindAr:child.val().ArKind,
                selectedType:child.val().selectedType,
            });
          }
         });
         this.setState({data:items})
          this.setState({ ModalVisibleStatus: false})
       
     }).then((error)=>{
   
       //alert(error);
        this.setState({ ModalVisibleStatus: false})
     });
  }
  onBack(){
   // alert('hi we are here');
    return true;
  }
  getSearchData=()=>{
    //alert(this.state.textsearch)
    this.SearchFilterFunction(this.state.textsearch);
  }
  render() {
    return (
      <HanleBack onBack={this.onBack}>
       <View style={{  backgroundColor: 'red', marginLeft:15,marginRight: 15,marginBottom:20},Styles.statusBar}>
      
        <Modal isVisible={this.state.ModalVisibleStatus}>
          <View style={{  backgroundColor: 'white',height:'30%' }}>
            
            <Spinner SizeSpinner='large' massages='جاري جلب البيانات'/>
            </View>
        </Modal>
      {this.RenderSpinner()}
      <View style={{flexDirection:'row',backgroundColor:'#fff'}} >
      <TouchableOpacity style={{backgroundColor:'#00c3b0',width:'20%' ,borderRadius:20,justifyContent:'center',alignItems:'center',marginTop:2}}
      onPress={this.getSearchData}
      >  
       <View>
        
         <Text style={{color:'#fff', fontFamily:'ElMessiri-Regular'}} >بحث</Text>
       </View>
        
       </TouchableOpacity>
       <View style={{flex: 1,flexDirection:'row',justifyContent:'center',width:'60%'}}>
      <Icon style={Styles.searchIcon} name="search" size={20} color="#000"/>
       <TextInput style={Styles.inputSearch}
       placeholder='بحث...'
       onChangeText={textsearch =>this.setState({textsearch})}
       >
        
       </TextInput>
     </View>
      
         
        </View>
      
       

         <FlatList
              data={this.state.data}
              style={{marginBottom:'20%'}}
               ItemSeparatorComponent = { this.FlatListItemSeparator }
               ListEmptyComponent={this._listEmpty}
              
                 refreshControl={
          <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._handleRefresh}
          />
        }
              renderItem={({ item,rowMap }) => this.renderItemBase(item)}
              
              
               />
</View>
</HanleBack>
    );
  }
}