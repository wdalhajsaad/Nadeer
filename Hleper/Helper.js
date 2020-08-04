import React, { Component } from "react";
import { View, Text, Picker } from "react-native";

export const ptypes = [
  { label: " النوع ", value: "1" , selected: true},
  { label: "حبة كبيرة", value: "2" },
  { label: "حبة صغيرة", value: "3" },
  { label: "  مبشور ", value: "4" },
  { label: "  مفرز ", value: "5" },
];

const SdanRegion = [
  { label: " مناطق الانتاج ", value: "0", selected: true },
  { label: " الخرطوم ", value: "1" },
  { label: "الجزيرة ", value: "2" },
  { label: " شمال كردفان", value: "3" },
  { label: "  البحر الاحمر  ", value: "4" },
  { label: "  كسلا ", value: "5" },
   { label: " القضارف ", value: "6" },
  { label: "سنار  ", value: "7" },
  { label: "  النيل الابيض", value: "8" },
  { label: "  النيل الازرق  ", value: "9" },
  { label: "  الشمالية ", value: "10" },
   { label: " نهر النيل ", value: "11" },
  { label: "غرب كردفان  ", value: "12" },
  { label: " جنوب كردفان", value: "13" },
  { label: "   شرق دارفور  ", value: "14" },
  { label: "  وسط دارفور  ", value: "15" },
  { label: "غرب كردفان  ", value: "16" },
  { label: " جنوب دارفور ", value: "17" },
  { label: "   شمال دارفور  ", value: "18" },
  
];

const Otypes = [
  { label: " النوع ", value: "1", selected: true },
  { label: "أمباز فول سوداني", value: "2" },
  { label: " أمباز بذرة القطن", value: "3" },
  { label: "  أمباز السمسم ", value: "4" },
  { label: "  أمباز تباع الشمس ", value: "5" },
];
const Satypes = [
  { label: " النوع ", value: "1" , selected: true},
  { label: "صمغ هشاب", value: "2" },
  { label: "صمغ طلح", value: "3" },
  
];
// p regoin
const pregion = [
  { label: "مناطق الانتاج", value: "1",selected: true, disabled: true },
  { label: "كردفان", value: "2" },
  { label: "الجزيرة", value: "3" },
];
const Sregion = [
  { label: "مناطق الانتاج", value: "1" , selected: true},
  { label: "غرب السودان", value: "2" },
  { label: " الابيض ", value: "3" },
   { label: " سنار ", value: "4" },
    { label: " القضارف", value: "5" },
     { label: "الدمازين ", value: "6" },
       { label: "ربك  ", value: "7" },
         { label: "كوستي ", value: "8" },
];
const FType = [
  { label: "النوع", value: "1" , selected: true},
  { label: "فتريته", value: "2" },
  { label: "طابت", value: "3" },
  { label: "ود عكر", value: "4" },
  { label: "ود أحمد", value: "5" },
  { label: "قشيش", value: "6" },
  { label: "قدم الحمام", value: "7" },
  { label: "دخن", value: "8" },
];
const SType = [
  { label: "النوع", value: "1" , selected: true},
  { label: "ابيض", value: "2" },
  { label: "ابيض حلاوة", value: "3" },
  { label: " أحمر", value: "4" },
  { label: " المخلوط/المريوت", value: "5" },

  { label: " تجاري", value: "6" },
];
const VType = [
  { label: "النوع", value: "1" , selected: true},
  { label: "طماطم", value: "2" },
  { label: " بصل", value: "3" },
  { label: " بطاطس", value: "4" },
  { label: " المخلوط/المريوتجرجير", value: "5" },
  { label: " ليمون", value: "5" },
  { label: " باميه", value: "6" },
];
const helpers = {
  renderType: function (t) {
    //alert(t);
    if (t === "P") {
      //alert('no wa');
     return ptypes;
     // return ptypes.map((x, i) => {
      // return <Picker.Item label={x.label} key={i} value={x.label} />;
     //});
    }
    if (t === "O") {
      return Otypes;
    }
    if (t === "W") {
      return [ { label: " قمح", value: "2",selected: true, disabled: true }]//<Picker.Item label="قمح" key="2" value="قمح" />;
    }
    if (t === "K") {
      return  [ { label: " كبكبي", value: "2",selected: true, disabled: true }]//<Picker.Item label="كبكبي" key="2" value="كبكبي" />;
    }
    if (t === "A") {
      return [ { label: " عدسية", value: "2",selected: true, disabled: true }]//<Picker.Item label="عدسية" key="2" value="عدسية" />;
    }
    if (t === "F") {
      return FType;
    }
    if (t === "S") {
      return SType;
    }
    if (t === "V") {
      return VType;
    }
    if (t === "Sa") {
      return Satypes;
    }
  },

  renderRegion: function (t) {
    ///var t =this.state.type;
    if (t === "P") {
      return pregion;
      //return pregion.map((x, i) => {
       // return <Picker.Item label={x.label} key={i} value={x.label} />;
      //});
    }
      if (t === "S") {
      return Sregion;

    }
     else {
      return SdanRegion;
     }
  },
  getKind: function (type) {
    alert(type)
    if (type === "P") {
      return "peanuts";
    } else if (type === "O") {
      return "Ombaz";
    } else if (type === "W") {
      return "Wheat";
    } else if (type === "K") {
      return "Kabkab";
    } else if (type === "A") {
      return "Adasia";
    } else if (type === "S") {
      return "Sesame";
    }
    else if (type === "M") {
      return "Wanted";
    }
    else if (type === "V") {
      return "Vegetables";
    }
    else if (type === "Sa") {
      return "Samagh";
    }
    else if (type === "F") {
      return "Corns";
    }
    
  },
  getKindAr: function (type) {
    if (type === "P") {
      return "فول سوداني";
    } else if (type === "O") {
      return "أمباز";
    } else if (type === "W") {
      return "قمح";
    } else if (type === "K") {
      return "كبكبي";
    } else if (type === "A") {
      return "عدسية ";
    } else if (type === "S") {
      return "سمسم";
    }
    else if (type === "M") {
      return "مطلوب ";
    }
    else if (type === "V") {
      return "خضروات ";
    }
    else if (type === "F") {
      return "ذرة ";
    }
    else if (type === "Sa") {
      return "صمغ عربي";
    }
  },
   CreateDate: function () {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); 
        return (date + '/' + month + '/' + year  );
   }
};
export default helpers;
