/*Useful note for you, 
-------------when you want to search for user attributes using his/her uid..
const user = firebase.auth().currentUser.uid;
    var email;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + user)
            .on("value", function (dataSnapshot) {
              email = dataSnapshot.child("DEmail").val();
            });
        }
      });
*/

/*-------------- retrieve link of imagr in storage
firebase
            .storage()
            .ref("DesignWork/" + this.state.designTitle)
            .getDownloadURL()
            .then((url) => {
              this.updateInputVal(url, "designFile");
              */
import React, { Component } from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import SvgComponent from "./uploadSVG";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";
import uuid from "react-native-uuid";

export default class UploadNewDesign extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      designTags:"",
      category: "",
      designFileKey: "",
      uploading: false,
      localpath: "",
      designUrl: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  onChooseImagePress = async () => {
    //takes image from the mobile gallery
    let SelectResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    if (!SelectResult.cancelled)
      this.updateInputVal(SelectResult.uri, "localpath");
    this.handleImageSelected(SelectResult);
  };

  handleImageSelected = async (SelectResult) => {
    try {
      this.setState({ uploading: true });

      if (!SelectResult.cancelled) {
        const uploadUrl = await uploadImageAsync(SelectResult.uri);
        this.setState({ designUrl: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert(
        "تنبيه",
        "فشل في رفع التصميم ، حاول مرة أخرى ",
        [{ text: "حسنًا" }],
        {
          cancelable: false,
        }
      );
    } finally {
      this.setState({ uploading: false });
    }
  };

  RenderUploading = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  // uploadImage = async (uri, draftName) => {
  //   //upload img to storage knowing its local path
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  // var ref = firebase
  //   .storage()
  //   .ref()
  //   .child("DesignWork/" + this.state.designFileKey);
  // return ref.put(blob);
  // };
  // RenderImage = () => {
  //   let { designUrl } = this.state;
  //   if (!designUrl) {
  //     return;
  //   }

  //   return (
  //     <View
  //       style={{
  //         marginTop: 30,
  //         width: 250,
  //         borderRadius: 3,
  //         elevation: 2,
  //       }}>
  //       <View
  //         style={{
  //           borderTopRightRadius: 3,
  //           borderTopLeftRadius: 3,
  //           shadowColor: 'rgba(0,0,0,1)',
  //           shadowOpacity: 0.2,
  //           shadowOffset: { width: 4, height: 4 },
  //           shadowRadius: 5,
  //           overflow: 'hidden',
  //         }}>
  //         <Image source={{ uri: designUrl }} style={{ width: 100, height: 100 }} />
  //       </View>
  //     </View>
  //   );
  // };
  uploadDesign() {
    //upload info to realtime DB, retreive their key to be the key of the img in storage
    if (
      this.state.category === "" ||
      this.state.designTitle === "" ||
      this.state.designDescription === ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }

    if (
      this.state.designTitle.trim() == "" ||
      this.state.designDescription.trim() == ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }

    if (this.state.localpath === "") {
      Alert.alert("تنبيه", "الرجاء اختيار ملف التصميم", [{ text: "حسنًا" }], {
        cancelable: false,
      });
      return;
    }
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //we should not accept numbers, too
    var tags = this.state.designTags.split(" ");
    var containsSpecial = false;
    tags.forEach(element => {
      console.log(element);
      if (specialCheck.test(element)) {
        Alert.alert(
          "تنبيه",
          "يجب ان تحتوي الكلمات المفتاحية على أحرف وأرقام فقط",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
        
        this.updateInputVal("", "designTags");
        containsSpecial=true;
      }
      }
    );
    if(containsSpecial){
      return;
    }
    if (specialCheck.test(this.state.designTitle)) {
      Alert.alert(
        "تنبيه",
        "يجب ان يحتوي العنوان على أحرف وأرقام فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "designTitle");
      return;
    }
    
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var currentDate = date + "/" + month + "/" + year;
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Designs/")
      .push({
        Duid: user,
        designTitle: this.state.designTitle,
        designDescription: this.state.designDescription,
        category: this.state.category,
        designUrl: this.state.designUrl,
        designUploadingdate: currentDate,
        designTags: tags,
      })
      .then((key) => {
        //this.updateInputVal(key.key, "designFileKey");
        this.updateInputVal("", "designTitle");
        this.updateInputVal("", "category");
        this.updateInputVal("", "designDescription");
        this.updateInputVal("", "designTags");
        // firebase
        //   .database()
        //   .ref("Designs/")
        //   .child(this.state.designFileKey)
        //   .update({ designFileKey: this.state.designFileKey })
        //   .then(
        //     this.uploadImage(this.state.localpath, this.state.designFileKey)
        //   );
        Alert.alert("تنبيه", "تم رفع العمل بنجاح", [{ text: "حسنًا" }], {
          cancelable: false,
        }),
          this.updateInputVal("", "localpath"),
          this.props.navigation.navigate("معرض التصاميم من منظور المصمم");
      })
      .catch((error) => {
        Alert.alert("فشل في حفظ التصميم ، حاول مرة أخرى", [{ text: "حسنًا" }], {
          cancelable: false,
        });
      });
  }
  setSelectedValue = (val) => {
    this.updateInputVal(val, "category");
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative" ,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9, }}
        >
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>
            {/* <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            /> */}
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Text
          style={{
            fontSize: 25,
            color: "#4F3C75",
            fontWeight: "700",
            top: "-8.5%",
            alignSelf: "center",
            zIndex: 6,
            fontWeight:"700",
          }}
        >
          رفع تصميم جديد
        </Text>

        <SvgComponent
          style={{ alignSelf: "center", top: "-5.5%", position: "relative" }}
        ></SvgComponent>

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-5%", fontWeight: "700" },
          ]}
        >
          عنوان العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyle}
          value={this.state.designTitle}
          maxLength={20}
          placeholder="الحد الأقصى 20 حرف"
          onChangeText={(val) => this.updateInputVal(val, "designTitle")}
        />

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-6.5%", fontWeight: "700" },
          ]}
        >
          وصف العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyleDescription}
          placeholder="الحد الأقصى 250 حرف"
          maxLength={250}
          multiline={true}
          value={this.state.designDescription}
          onChangeText={(val) => this.updateInputVal(val, "designDescription")}
          scrollEnabled={true}
        />
  <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-22%", fontWeight: "700" },
          ]}
        >
           كلمات مفتاحية للعمل  {" "} يجب ألا تحتوي على رموز
        </Text>
        <TextInput
          style={styles.inputStyleDescription2}
          placeholder=" أدخل كلمات مفتاحية بين كل منها مسافة ..."
          maxLength={250}
          multiline={true}
          value={this.state.designTags}
          onChangeText={(val) => this.updateInputVal(val, "designTags")}
          scrollEnabled={true}
        />

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-7%", fontWeight: "700" },
          ]}
        >
          اختيار ملف التصميم *{" "}
        </Text>

        <Image
          onPress={this.onChooseImagePress}
          onTouchStart={this.onChooseImagePress}
          style={styles.tinyLogo}
          source={require("../assets/upload.png")}
        />
        <Image
          style={styles.preview}
          onTouchStart={this.onChooseImagePress}
          source={{
            uri: this.state.localpath,
          }}
        />
        {this.RenderUploading()}

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-10%", fontWeight: "700" },
          ]}
        >
          فئة التصميم*{" "}
        </Text>
        <Picker
          selectedValue={this.state.category}
          style={{
            height: "22%",
            width: "80%",
            bottom: "12%",
            alignSelf: "center",
          }}
          onValueChange={(itemValue, itemIndex) =>
            this.setSelectedValue(itemValue)
          }
        >
          <Picker.Item label="اختيار التصنيف" value="" />
          <Picker.Item label="علامة تجارية" value="علامة تجارية" />
          <Picker.Item label="شعار" value="شعار" />
          <Picker.Item label="فلتر" value="فلتر" />
          <Picker.Item label="انفوجرافيك" value="انفوجرافيك" />
          <Picker.Item label="إعلان" value="إعلان" />
          <Picker.Item label="شهادة" value="شهادة" />
          <Picker.Item label="فن رقمي" value="فن رقمي" />
          <Picker.Item label="أخرى" value="أخرى" />
        </Picker>

      

        <TouchableOpacity
         style={styles.button}
        onPress={() =>
          // alert(
          //   "تأكيد رفع العمل",
          //   "هل أنت متأكد من رغبتك في رفع هذا العمل؟",
          //   [
             
          //     {
          //       text: "تأكيد",
          //       onPress: () => {
          //       this.uploadDesign()
          //       },
          //     }, {
          //       text: "إلغاء",
          //       onPress: () => {
          //       //this.uploadDesign()
          //       },
          //     },
          //   ],
          //   { cancelable: false }
          // )
          this.uploadDesign()
        }
      >
        <Text
            style={{
              color: "#FFEED6",
              fontSize: 20,
            }}
          >
            رفع العمل
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } //End of Second return
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("فشل الطلب"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  var ref = firebase
    .storage()
    .ref()
    .child("DesignWork/" + uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // padding: "10%",
    backgroundColor: "#fff",
  },
  inputStyleDescription: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "8%",
    textAlign: "right",
    top: "-7%",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  inputStyleDescription2: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "8%",
    textAlign: "right",
    top: "-5%",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    right: "-10%",
    top: "-10.5%",
  },
  preview: {
    width: 300,
    height: 250,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "-10%",
    borderRadius: 35,
    alignSelf: "center",
  },
  inputStyle: {
    fontSize: 18,
    marginTop: "3%",
    width: "80%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    textAlign: "right",
    top: "-7%",
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "80%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
    left: "10%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "3.5%",
    alignSelf:"center",
    bottom: "15%",
  },
  

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  

  SvgComponentStyle: {
    top: "-8%",
  },
});
