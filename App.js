
import React from 'react';
import { StyleSheet, Text, View,I18nManager,BackHandler,Alert,StatusBar  } from 'react-native';
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
const ReactNative = require('react-native');
try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}
import Main from './Screens/Main'
import {createStore} from 'redux'
import {Provider}  from 'react-redux'
console.disableYellowBox = true;

const initialState={
        selectedType:'',
        ArabicName:'',
        itemValue:'',
        type:'',// this.props.navigation.state.params.type,
        region:'',
        date:'',
        Qu:'',
        Note:'',
        //Key:''
        userkey:'',
        price:'',
        Loading:false,
        waightType:'طن',
        image:'',
        CreateDate:'',
        Want:''
}
export const reducer=(state=initialState,action)=>{
  
  
 
 switch (action.type) {
   case 'SET_PAGE_TYPE':
   // alert("here is seting page "+ action.text);
    return  Object.assign({}, state,{type:action.text})
   
     case 'SET_SELECTED_TYPE':
      //alert(action.text);
    return  Object.assign({},state,{selectedType:action.text})

     case 'SET_SELECTED_WAIGHT':
      //alert(action.text);
    return  Object.assign({},state,{waightType:action.text})
     case 'SET_QU':
     // alert(action.text);
    return  Object.assign({},state,{Qu:action.text})

     case 'SET_SELECTED_REGION':
     // alert(action.text);
    return  Object.assign({},state,{region:action.text})

     case 'SET_SELECTED_DATE':
      //alert(action.text);
    return  Object.assign({},state,{date:action.text})
     case 'SET_PRICE':
     // alert(action.text);
    return  Object.assign({},state,{price:action.text})
    case 'SET_NOTE':
     // alert(action.text);
    return  Object.assign({},state,{Note:action.text})
    case 'SET_USER_KEY':
      //alert(action.text);
    return  Object.assign({},state,{userkey:action.text})
    case 'SET_IMAGE_URL':
      //alert(action.text);
    return  Object.assign({},state,{image:action.text})

    case 'SET_CREATE_DATE':
      //alert(action.text);
    return  Object.assign({},state,{CreateDate:action.text})
     case 'SET_ARABIC_NAME':
      //alert(action.text);
    return  Object.assign({},state,{ArabicName:action.text})
    case 'SET_WANT':
      // alert("here is seting page "+ action.text);
       return  Object.assign({}, state,{Want:action.text})

     default:
     return state;
  
 
 }
  return state;
}
export const store =createStore(reducer);

export default class  App  extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        loaded: false
    };
  }
 
 
  render(){
    
     return (
       <Provider store={store}>
        
           <Main />
         
       </Provider> );
       
      


  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
