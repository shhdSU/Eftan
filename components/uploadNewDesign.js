/*Useful note for you, when you want to search for user attributes using his/her uid..

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
import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Svg, { Path } from "react-native-svg";
import firebase from "../database/firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class UploadNewDesign extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      isLoading: false,
      localpath: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("DesignWork/" + draftName);
    //this.updateInputVal(response.url, "designFile");

    return ref.put(blob);
  };
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    this.updateInputVal(result.uri, "localpath");
    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.designTitle)
        .then(() => {
          firebase
            .storage()
            .ref("DesignWork/" + this.state.designTitle)
            .getDownloadURL()
            .then((url) => {
              this.updateInputVal(url, "designFile");
            });
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  uploadDesign() {
    //here you put all validation checks

    const user = firebase.auth().currentUser.uid;
    firebase
      .child("Designs")
      .push({
        Duid: user,
        designTitle: this.state.designTitle,
        designDescription: this.state.designDescription,
        category: this.state.category,
        designFile: this.state.designFile,
      })
      .then((key) => {
        this.updateInputVal(key.key, "designFileKey");
      });
    /* firebase
      .database()
      .ref("Designs/" + this.state.designTitle)
      .set({
             });*/
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
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}>
            عنوان العمل{" "}
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="عنوان العمل"
            value={this.state.designTitle}
            onChangeText={(val) => this.updateInputVal(val, "designTitle")}
          />
          <TouchableOpacity onPress={() => this.onChooseImagePress()}>
            <Image
              style={styles.tinyLogo}
              source={require("../assets/upload.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.preview}
            source={{
              uri: this.state.localpath,
            }}
          />
          <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}>
            وصف العمل{" "}
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="وصف العمل"
            value={this.state.designDescription}
            onChangeText={(val) =>
              this.updateInputVal(val, "designDescription")
            }
          />
          <Text
            style={[styles.inputStyle2, { color: "#4F3C75", top: wp("-4%") }]}
          >
            فئة التصميم{" "}
          </Text>
          <Picker
            selectedValue={this.state.category}
            style={{ height: "22%", width: "80%", bottom: "4%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="أخرى" value="أخرى" />
            <Picker.Item label="علامة تجارية" value="علامة تجارية" />
            <Picker.Item label="شعار" value="شعار" />
            <Picker.Item label="فلتر" value="فلتر" />
            <Picker.Item label="انفوجرافيك" value="انفوجرافيك" />
            <Picker.Item label="إعلان" value="إعلان" />
            <Picker.Item label="شهادة" value="شهادة" />
            <Picker.Item label="فن رقمي" value="فن رقمي" />
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.uploadDesign()}
          >
            <Text
              style={{
                color: "#FFEED6",
                fontSize: 25,
              }}
            >
              رفع العمل
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  } //End of Second return
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: wp("10%"),
    backgroundColor: "#fff",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    paddingBottom: "3%",
    marginBottom: "3%",
  },
  preview: {
    width: 60,
    height: 60,
    right: 10,
  },
  inputStyle: {
    fontSize: 18,
    marginTop: hp("2%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: wp("-5%"),
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: hp("4%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    textAlign: "right",
    top: hp("0%"),
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: hp("1%"),
    borderRadius: 25,
    width: wp("80%"),
    height: hp("6%"),
    alignSelf: "center",
  },

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radio: {
    top: hp("-4%"),
    left: wp("23%"),
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    zIndex: 6,
  },
  radioText: {
    fontSize: 18,
    color: "#B7B7B7",
  },
});
