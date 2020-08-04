import React from 'react';  
import {View,ActivityIndicator,Text} from 'react-native';
import {BallIndicator} from 'react-native-indicators'

const Spinner=({SizeSpinner,massages})=>{

    return (
        <View style={Styles.spinnerStyle}>
         
           <BallIndicator color='#00c3a0' style={{paddingTop:100 ,marginBottom: 30,}}/>
              <Text> {massages}</Text>
        </View>
    );
};

const Styles={

    spinnerStyle:{
        //flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
};

export default Spinner;