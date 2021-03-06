// components/signup.js

import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import SvgComponenet from "./welcomeSVG";
import firebase from "../database/firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isLoading: false,
      userType: 1,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //check whether string contains special characters
    var arabicCheck = /([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])/;//check whether string contains arabic characters
    var numCheck = /\d/; //check whether string contains numbers
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.firstName === "" ||
      this.state.lastName === ""
    ) {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال جميع بياناتك",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if (
      specialCheck.test(this.state.firstName) ||
      specialCheck.test(this.state.lastName)
    ) {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if (
      numCheck.test(this.state.firstName) ||
      numCheck.test(this.state.lastName)
    ) {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if (
      this.state.password.length < 8 ||
      !specialCheck.test(this.state.password) ||
      !numCheck.test(this.state.password)
    ) {
      Alert.alert(
        "تنبيه",
        "كلمة السر المدخلة ضعيفة، يجب أن لا يقل طولها عن 8 متضمّنة حروفًا وأرقامًا ورموزًا خاصة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if(!arabicCheck.test(this.state.firstName) || !arabicCheck.test(this.state.lastName)){
      Alert.alert(
        "تنبيه",
        "يجب أن يحتوي الاسم الأول والأخير على حروف عربية فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    }else {
      this.setState({
        isLoading: true,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              user.sendEmailVerification();
              if (this.state.userType == 1) {
                firebase
                  .database()
                  .ref("Client/" + res.user.uid)
                  .set({
                    CFirstName: this.state.firstName,
                    CLastName: this.state.lastName,
                    Cemail: this.state.email,
                    notificationsKey: "",
                    imgURL: "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea",

                  });
              } else {
                firebase
                  .database()
                  .ref("GraphicDesigner/" + res.user.uid)
                  .set({
                    DFirstName: this.state.firstName,
                    DLastName: this.state.lastName,
                    DEmail: this.state.email,
                    AVG_Rate: 0,
                    raters: 0,
                    imgURL: "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea",
                    notificationsKey: "",
                  });
              }

              this.setState({
                isLoading: false,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              });
              Alert.alert(
                "تنبيه",
                "تم إنشاء حسابك بنجاح! يرجى تفعيل بريدك الإلكتروني",
                [{ text: "حسنًا" }],
                { cancelable: false }
              );
            }
            this.props.navigation.navigate("صفحة الدخول");
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (this.state.email === "" || this.state.password === "") {
            Alert.alert(
              "تنبيه",
              "فضلًا تأكد من إدخال جميع بياناتك",
              [{ text: "حسنًا" }],
              { cancelable: false }
            );
          } else if (errorCode == "auth/invalid-email") {
            Alert.alert(
              "تنبيه",
              "نرجو كتابة البريد الإلكتروني بالطريقة الصحيحة.",
              [{ text: "حسنًا" }],
              { cancelable: false }
            );
          } else if (
            errorCode == "auth/email-already-in-use" ||
            errorCode == "auth/email-already-exists"
          ) {
            Alert.alert(
              "تنبيه",
              "البريد الإلكتروني مسجل مسبقَا",
              [{ text: "حسنًا" }],
              { cancelable: false }
            );
          } else {
            console.log(error);
          }
          this.setState({
            isLoading: false,
            password: "",
          });
        });
    }
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
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 27,
            color: "#4F3C75",
            fontWeight: "700",
            alignSelf: "center",
            top: wp("-6%"),
            fontFamily: "Tajawal-Medium",
          }}
        >
          إنشاء حساب جديد
        </Text>
        <SvgComponenet style={{ top: wp("-15%") }} />

        <TextInput
          style={styles.inputStyle}
          placeholder="الاسم الأول"
          value={this.state.firstName}
          maxLength={8}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="الاسم الأخير"
          value={this.state.lastName}
          maxLength={9}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="كلمة المرور"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Text
          style={[styles.inputStyle2, { color: "#B7B7B7", top: wp("-4%") }]}
        >
          هل أنت؟
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
            initial={1}
            onPress={(value) => {
              this.setState({ userType: value });
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.registerUser()}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 25,
              fontFamily: "Tajawal-Medium",

            }}
          >
            إنشاء حساب
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#FEB518",
            fontSize: 10,
            textAlign: "center",
            top: hp("0%"),
            fontFamily: "Tajawal-Medium",

          }}
          onPress={() => this.props.navigation.navigate("سياسة الخصوصية")}
        >
          بالنقر على هذا الزر أنت توافق على
          <Text
            style={{
              color: "#4F3C75",
              textDecorationLine: "underline",
            }}
            onPress={() => this.props.navigation.navigate("سياسة الخصوصية")}
          >
            {""} تراخيص وخصوصية الاستخدام
          </Text>
        </Text>

        <Text
          style={[
            styles.createAccount,
            {
              color: "#FEB518",
            },
          ]}
        >
          لديك حساب بالفعل؟
        </Text>
        <View
          style={[styles.radioText, { left: hp("27.5%"), bottom: hp("12.5%") }]}
        >
          <Text style={styles.radioText}>عميل </Text>
        </View>
        <View style={{ left: hp("5.5%"), bottom: hp("15.5%") }}>
          <Text style={styles.radioText}> مصمم جرافيك</Text>
        </View>

        <Text
          style={[
            styles.createAccount,
            { color: "#4F3C75", textDecorationLine: "underline" },
          ]}
          onPress={() => this.props.navigation.navigate("صفحة الدخول")} ///change it later
        >
          قم بتسجيل الدخول
        </Text>
      </View>
    );
  }
}
var radio_props = [{ value: 0 }, { value: 1 }];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: wp("10%"),
    backgroundColor: "#fff",
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
    fontFamily: "Tajawal-Medium",

  },
  inputStyle2: {
    fontSize: 18,
    marginTop: hp("4%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    textAlign: "right",
    top: hp("0%"),
    fontFamily: "Tajawal-Medium",

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
  createAccount: {
    top: wp("15%"),
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    margin: hp("-3%"),
    fontFamily: "Tajawal-Medium",

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
    fontFamily: "Tajawal-Medium",

  },
});
