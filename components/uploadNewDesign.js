import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";
import {
  DocumentPicker,
  DocumentPickerUtil,
} from "react-native-document-picker";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
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
      designFile: "",
      isLoading: false,
    };
  }

  selectImage() {}

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  uploadDesign() {
    //here you put all validation checks
    this.setState({
      isLoading: true,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="عنوان العمل"
          value={this.state.designTitle}
          onChangeText={(val) => this.updateInputVal(val, "designTitle")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="وصف العمل"
          value={this.state.designDescription}
          onChangeText={(val) => this.updateInputVal(val, "designDescription")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.uploadDesign()}
        >
          <Text
            style={[styles.inputStyle2, { color: "#4F3C75", top: wp("-4%") }]}
          >
            فئة التصميم{" "}
          </Text>
          <View>
            <RadioForm
              style={styles.radio}
              labelStyle={{
                position: "relative",
                right: hp("5%"),
                justifyContent: "center",
                alignSelf: "center",
              }}
              top={300}
              selectedButtonColor={"#4F3C75"}
              buttonColor={"#4F3C75"}
              formHorizontal={true}
              radio_props={radio_props}
              initial={"other"}
              onPress={(value) => {
                this.setState({ category: value });
              }}
            />
          </View>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/upload.png")}
            onPress={() => this.selectImage()}
          />
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
    );
  } //End of Second return
}

var radio_props = [
  { value: "logo" },
  { value: "filter" },
  { value: "branding" },
  { value: "digitalArt" },
  { value: "poster" },
  { value: "infographic" },
  { value: "certification" },
  { value: "other" },
];

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
    width: 50,
    height: 50,
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
