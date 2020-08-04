import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import Styles from "../Styles/Styles";
import { FlatGrid } from 'react-native-super-grid';
export default class Home extends Component {
     static navigationOptions  = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#00c3a0',textAlign: 'center',},
    title:' إضافة إعلان',
    headerTitleStyle : { flex:1 ,textAlign: 'center' ,color:'white',paddingVertical: 15,fontWeight:'normal' ,fontFamily:'MFontRegular'},
    headerTitleAlign: 'center',
    headerTintColor: 'white',
  });
  constructor(props) {
    super(props);
    this.state = {

         ListChanales:[
             { name: 'فول سوداني ', pic:require('.././Images/SudanB.jpg'), Events:null,type:'P'},
             { name: 'سمسم', pic:require('.././Images/Sesame.jpg'), Events:null,type:'S' },
             { name: ' قمح',  pic:require('.././Images/flower.jpg'), Events:null,type:'W'}, 
             { name: 'كبكبي',  pic:require('.././Images/kapkap.jpg'), Events:null,type:'K'},
             { name: 'عدسية ', pic:require('.././Images/Adasia.jpg'), Events:null, type:'A'},
             { name: ' ذرة', pic:require('.././Images/fate.jpg') , Events:null,type:'F'},
             { name: ' خضروات ',  pic:require('.././Images/Vg.jpg'), Events:null,type:'V'},
             { name: ' أمباز',  pic:require('.././Images/ombaz.jpg'), Events:null,type:'O'},
             { name: 'صمغ عربي ', pic:require('.././Images/samg.jpg'), Events:null,type:'Sa' },
             { name: 'إعلان مطلوب', pic:require('.././Images/mat.jpg'), Events:'Wanted',type:'M' },
           
        
      ],
    };
  }
   HandelClick=(url,name,type)=>{
      // alert(url +" "+ name+" "+ type)
      if(url==null){
        //alert(type)
       this.props.navigation.push("Corn",{title:name,type:type});
      }
      else{
           this.props.navigation.push(url,{title:name,type:type});
      }
      
 
  }

  render() {
        const items = this.state.ListChanales;
    return (
      <View>
      
       <FlatGrid
        itemDimension={130}
        data={items}
        style={Styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item}) => (
          <View style={Styles.itemContainer}>
          <TouchableOpacity
          onPress={() => this.HandelClick(item.Events, item.name,item.type)}
          >
          <Image
          source={item.pic}
         style={{width:165,height:120,}}
         resizeMode='contain'
          />
          <View style={{flex:1,backgroundColor:'#00c3a0',alignItems:'center'}}>
            <Text style={Styles.itemName}>{item.name}  </Text>
           </View>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
    );
  }
}
