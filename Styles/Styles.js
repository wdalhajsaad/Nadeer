import { StyleSheet } from "react-native";
export default StyleSheet.create({
  Maincontainer: {
    flex: 1,
    padding: 150,
    justifyContent: "center",
    alignItems: "center",

    //  backgroundColor:'red'
  },
  Keycontainer: {
    flexGrow: 1,
    // padding: 150,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    paddingTop: 50,
    // height:'100%',
    //justifyContent:'center',
    //alignSelf: 'center',
    //justifyContent: 'center',
    alignItems: "center",
    // backgroundColor: 'red'
  },
  BaseText: {
    // fontFamily:'Cochin',
    fontSize: 20,
  },
  TextTite: {
    fontWeight: "bold",
  },
  Logincontainer: {
    flex: 1,
    backgroundColor: "#fff", //'#455a64',
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
    borderRadius: 20,
    backgroundColor: "#d6d6d6",
    width: "100%",
    height: "100%",
    //marginTop: 10,
    //flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 20,
    alignItems: "center",
    //padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontFamily:'ElMessiri-Bold'
    //fontFamily:'Montserrat'
    //fontWeight: '600',
  },
  /// here is picker style
  pickerIosListItemContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontFamily:'ElMessiri-Bold'
  },
  pickerIosListItemText: {
    fontSize: 16,
  },
  rowContainer: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    fontFamily:'ElMessiri-Bold'
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === 'ios' ? undefined : 120,
  },






  input: {
    height: 50,
    width: "95%",
    backgroundColor: "rgba(225,225,225,0.7)",
    marginBottom: 10,
    marginTop: 5,
    padding: 6,
    color: "#000",
    paddingRight:20,
    borderRadius: 5,
     fontFamily:'ElMessiri-Bold',
    // fontFamily:'Montserrat'
  },
  inputshort: {
    height: 50,
    width: "65%",
    backgroundColor: "rgba(225,225,225,0.7)",
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 0,
    paddingRight:20,
    color: "#000",
    borderRadius: 5,
     fontFamily:'ElMessiri-Bold',
    // fontFamily:'Montserrat'
  },
  inputvimto: {
    height: 50,
    //width: "30%",
    backgroundColor: "rgba(225,225,225,0.7)",
    marginBottom: 10,
    marginTop: 5,
    padding: 3,
     fontFamily:'ElMessiri-Bold',

    color: "#000",
    borderRadius: 5,
    // fontFamily:'Montserrat'
  },
  ExtraH: {
    height: 150,
  },
  /*

    TextColor:{
      color
    },*/
  TextBoxStyle: {
    height: 50,
    width: 300,
    alignSelf: "stretch",
    backgroundColor: "rgba(225,225,225,0.7)",
    marginBottom: 20,
    padding: 6,
    color: "#000",
    borderRadius: 20,
     fontFamily:'ElMessiri-Bold'
  },
  ButtonStyle: {
    backgroundColor: "#00c3a0",
    paddingVertical: 15,
    borderRadius: 20,
    width: 300,
     fontFamily:'ElMessiri-Bold'
    //width: "95%",
  },
  innerButtonStyle: {
    backgroundColor: "#00c3a0",
    paddingVertical: 15,
    borderRadius: 5,
    position: "absolute",
    bottom: 30,
    //width: 300,
    width: "95%",
  },
  
   profileButton: {
    backgroundColor: "#00c3a0",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop:15,
    //position: "absolute",
    //bottom: 30,
    //width: 300,
    width: "95%",
  },
  TitleList: {
    //fontFamily:'Montserrat',
    //fontWeight: 'bold',
    color: "black",
    textAlign: "right",
    fontSize: 17,
    lineHeight: 23,
    // flexShrink: 1,
    //textAlign: 'left',
    paddingRight: 1,
  },
  innertineStyleOne: {
    backgroundColor: "#00c3a0",
    paddingVertical: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom:5,
    //position:'absolute',
    // bottom:40,
    //width: 300,
    width: "40%",
  },
  innertineStyleTow: {
    backgroundColor: "#ff3232",
    paddingVertical: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom:5,
    width: "40%",
  },
  inputMu: {
    width: "95%",
    //flex:1,
    marginBottom: 5,
    padding: 6,
    height: 150,
    backgroundColor: "rgba(225,225,225,0.7)",
    //padding: 10,
    paddingRight:20,
    color: "#000",
    borderRadius: 5,
    justifyContent: "flex-start",
    textAlignVertical: "top",
     fontFamily:'ElMessiri-Bold',
    //fontFamily:'Montserrat'
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    //fontWeight: '700',
    fontSize: 17,
    fontFamily: "ElMessiri-Bold",
  },
  prodinfo: {
    width: "50%",
    fontFamily: "ElMessiri-Regular",
    fontSize: 18,
  },
  ViewInfo:{flexDirection: 'row',width:'100%',height:50,justifyContent: 'flex-end',borderBottomWidth: 1,borderColor:'#E5E8E8' ,},
  GridStyle: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  bottomCurve: {
    position: "absolute",
    backgroundColor: "#00c3a0",
    width: "45%",
    height: "20%",
    bottom: 0,
    left: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 300,
    zIndex: -9999,
  },
});
