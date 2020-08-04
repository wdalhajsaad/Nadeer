import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';
import SideMenuStyle from '../Styles/SideMenuStyle'
import { Header, Container, Content, ListItem } from 'native-base';
import Home from './Home'
import Login from './Login'
import Adds from './AdsScreens/Adds';
import Sesame from './AdsScreens/Sesame';
import Corn from './AdsScreens/Corn';
import test from './AdsScreens/test'
import Omaz from './AdsScreens/Omaz';
import MyAdds from './AdsScreens/MyAdds';
import Profile from './AdsScreens/Profile';
import AddDetails from './AdsScreens/AddDetails';
import Vegetables from './AdsScreens/Vegetables';
import MyAddDetails from './AdsScreens/MyAddDetails';
import UpdateAdds from './AdsScreens/UpdateAdds';
import Wanted from './AdsScreens/Wanted';
import Matloop from './AdsScreens/Matloop';
import MyMatloop from './AdsScreens/MyMatloop';
import UpdateWanted from './AdsScreens/UpdateWanted';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createBottomTabNavigator,
    createAppContainer,
    //createDrawerNavigator,

} 
from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'

import Styles from '../Styles/Styles'
export default function Main() {

    return (
       <Appcontainer />
    )


}



const CustomList = (props) => (
  
  
    <Container style={{flex:1 ,backgroundColor:"#00b494",paddingTop: 60,}}>
      
        <Content contentContainerStyle={{flex:1}}>
            <View style={SideMenuStyle.MainView} >
                <ListItem style={SideMenuStyle.ItemList} button onPress={() => props.navigation.navigate('Adds')} >
                    <Text style={SideMenuStyle.LinkText} >الرئيسية</Text>
                      <Icon name="home" size={35} style={{color:'white'}} />
                </ListItem>
                 <ListItem style={SideMenuStyle.ItemList} button onPress={() => props.navigation.navigate('Home')} >
                    <Text style={SideMenuStyle.LinkText}> إضافة اعلان  </Text>
                     <Icon name="plus-circle" size={35} style={{color:'white'}} />
                </ListItem>

                <ListItem style={SideMenuStyle.ItemList} button onPress={() => props.navigation.navigate('Profile')} >
                    <Text style={SideMenuStyle.LinkText}> بياناتي </Text>
                     <Icon name="user-circle" size={35} style={{color:'white'}} />
                </ListItem>

              
                 <ListItem style={SideMenuStyle.ItemList} button onPress={() => props.navigation.navigate('MyAdds')} >
                    <Text style={SideMenuStyle.LinkText}> اعلاناتي </Text>
                     <Icon name="list-alt" size={35} style={{color:'white'}} />
              
                </ListItem>
                 

                <View style={{justifyContent:'center',alignContent: 'center', alignItems:'center',position: 'absolute',bottom:0}}>
                    <Text style={SideMenuStyle.LinkText}> جميع الحقوق محفوظة ©  </Text>
                    <Text></Text>
                </View>
            </View>
        </Content>
    </Container>
  
  
    
);

const StackNavgitor = createStackNavigator({
   // HomeNavigator:HomeNavigator,
  
    Login:{
        screen:Login,
         navigationOptions: {
            header: null,
        },
    },
      Home:{
          screen:Home,
            navigationOptions: {
           // header: null,
        },
      },
 
      Sesame:{
          screen:Sesame,
           navigationOptions: {
           // header: null,
        },
      },
 
        Corn:{
          screen:Corn,
           navigationOptions: {
           // header: null,
        },
      },
        Omaz:{
          screen:Omaz,
           navigationOptions: {
           // header: null,
        },
      },
        Vegetables:{
          screen:Vegetables,
           navigationOptions: {
           // header: null,
        },
      },
  Adds:{
          screen:Adds,
           navigationOptions: {
           // header: null,
        },
      },
     AddDetails:{
          screen:AddDetails,
           navigationOptions: {
           // header: null,
        },
      },
       test:{
          screen:test,
           navigationOptions: {
           // header: null,
        },
      },
       Profile:{
          screen:Profile,
           navigationOptions: {
           // header: null,
        },
      },
       MyAdds:{
          screen:MyAdds,
           navigationOptions: {
           // header: null,
        },
      },
      MyAddDetails:{
        screen:MyAddDetails,
         navigationOptions: {
         // header: null,
      },
    },
    Wanted:{
      screen:Wanted,
       navigationOptions: {
       // header: null,
    },
  },
  UpdateAdds:{
    screen:UpdateAdds,
     navigationOptions: {
     // header: null,
  },
},
Matloop:{
  screen:Matloop,
   navigationOptions: {
   // header: null,
},
},
MyMatloop:{
  screen:MyMatloop,
   navigationOptions: {
   // header: null,
},
},
UpdateWanted:{
  screen:UpdateWanted,
   navigationOptions: {
   // header: null,
},
},

      
},
{
    defaultNavigationOptions:({navigation})=>{
return{

  headerRight:(
    //<View></View>
       <Icon name="bars" size={34}  onPress={()=>navigation.openDrawer()}  style={{color:'white',paddingRight: 20,}} />
    ),
    
    //headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 }

}

    }
},

//#region 
//{
  //  defaultNavigationOptions:({navigation})=>{
//return{


  //  headerRight:(
     //   <FontAwesome name='bars' onPress={()=>navigation.openDrawer()} />
    //)

//},
//#endregion
{
    navigationOptions: {
        header: null,
    }   
}
)
const DrowerNav =createDrawerNavigator({
Main:{
    screen:StackNavgitor

},
},
{
   drawerPosition: 'right',
   contentComponent: CustomList,
}

)

const Appcontainer =createAppContainer(DrowerNav);