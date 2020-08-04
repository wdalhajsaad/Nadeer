import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    container: {
    flex:1 ,
    backgroundColor:"#00b494",
    paddingTop: 50,
    },
    MainView:{
     flex: 1, 
     flexDirection: 'column', 
     justifyContent: 'flex-start', 
     alignItems: 'flex-end', 
     backgroundColor:"#00b494" 
    },
    ItemList:{  
    width:'100%',
    backgroundColor:"#00b494",
    borderBottomWidth:1,
    borderColor:'rgba(188,188,188,0.4)',
    //flexDirection: 'row', 
    },
    LinkText:{
        paddingRight:10,
        //fontWeight:'bold',
         textAlign: 'right',
          fontSize: 20,
        textDecorationColor:"#000",
        flex:1,
       color:'white',
       fontFamily: "ElMessiri-Regular",
        }

})