import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Picker,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import Svg, { Defs, G, Path } from "react-native-svg";
import { fromHsv, TriangleColorPicker, toHsv } from "react-native-color-picker";
import SvgComponent from "./rquestPageImage";
import * as Animatable from "react-native-animatable";

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color1: "",
      color2: "",
      color3: "",
      category: "",
      reference: "",
      deadLine: "",
      Cemail: "",
      Demail: "",
      ImagePath: "",
      ImageURL: "",
      Imagekey: "",
      popup: false,
      colorNum: 0,
      mainStep: true,
      DID: "",
    };
    const DID = props.navigation.state.params.DID;
    this.updateInputVal(DID, "DID");
  }
  //////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  ///Show nex Step @#$%^&*(*&^%$#@#$%^&*(*&^%$#@!#$%^&*()*&^%$#))
  shownexStep = () => {
    if (
      this.state.category === "" ||
      this.state.title === "" ||
      this.state.description === ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }
    //Checking on title
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var numCheck = /\d/;
    if (
      specialCheck.test(this.state.title) ||
      numCheck.test(this.state.title)
    ) {
      Alert.alert(
        "تنبيه",
        "يجب ان يحتوي العنوان على أحرف فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "title");
      return;
    }
    this.updateInputVal(false, "mainStep");
  };

  ///Pop Up Window @#$%^&*(*&^%$#@!@#$%^&*(*&^%$#@#$%^&*(&^%$E%^&*()*&^%$%^&*())))
  popUpWindow = (colorNum) => {
    this.closePopUp();
    this.updateInputVal(false, "popup");
    this.updateInputVal(true, "popup");
    this.updateInputVal(colorNum, "colorNum");
  };
  closePopUp = () => {
    let checkOnColor = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/;
    let colors = this.state.color1 + this.state.color2 + this.state.color3;

    if (!checkOnColor.test(this.state.color1) && this.state.color1 !== "") {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color1");
      return;
    } else if (
      !checkOnColor.test(this.state.color2) &&
      this.state.color2 !== ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color2");
      return;
    } else if (
      !checkOnColor.test(this.state.color3) &&
      this.state.color3 !== ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color3");
      return;
    }

    this.updateInputVal(false, "popup");
  };

  /////trans color hvs to hex code @#$%^&*&^%$#$%^&*(*&^%$#@)
  trans(val) {
    return toHsv(val);
  }
  ColorPickerhandl = (val, num) => {
    let hexVal = fromHsv(val);
    let type = "NONE";

    switch (num) {
      case 1: {
        type = "color1";
        break;
      }
      case 2: {
        type = "color2";
        break;
      }
      case 3: {
        type = "color3";
        break;
      }
    }
    if (type !== "NONE") this.updateInputVal(hexVal, type);
    else console.log("Method fail");
  };

  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("Draft/" + draftName);
    return ref.put(blob);
  };
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.updateInputVal(result.uri, "ImagePath");
    }
  };
  storeResquset = () => {
    const CID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Forms/")
      .push({
        title: this.state.title,
        description: this.state.description,
        color1: this.state.color1,
        color2: this.state.color2,
        color3: this.state.color3,
        category: this.state.category,
        reference: this.state.reference,
        deadLine: this.state.deadLine,
        CID: CID,
        DID: this.state.DID,
      })
      .then((key) => {
        this.updateInputVal(key.key, "Imagekey");
        this.uploadImage(this.state.ImagePath, this.state.Imagekey);
        firebase
          .database()
          .ref("Forms/")
          .child(this.state.Imagekey)
          .update({ Imagekey: this.state.Imagekey });
      });
    Alert.alert("تنبيه", "تم رفع الطلب بنجاح ", [{ text: "حسنًا" }], {
      cancelable: false,
    });
    this.props.navigation.navigate("معرض التصاميم من منظور العميل");
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              color: "#4F3C75",
              fontWeight: "700",
              top: "5%",
              alignSelf: "center",
              position: "absolute",
              zIndex: 10,
            }}
          >
            طلب تصميم
          </Text>
          <Svg
            width={416}
            height={144}
            style={{ alignSelf: "center", top: "-5%", position: "relative" }}
          >
            <G data-name="Group 7">
              <G filter="url(#prefix__a)">
                <Path
                  data-name="Path 117"
                  d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                  fill="#ffeed6"
                />
              </G>
              <Path
                data-name="Icon ionic-ios-arrow-back"
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
              <Path
                data-name="Icon material-menu"
                d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                fill="#4f3c75"
              />
            </G>
          </Svg>
          <SvgComponent
            style={{ alignSelf: "center", top: "-5%", position: "relative" }}
          ></SvgComponent>
          {this.state.mainStep && (
            <View style={styles.mainScreen}>
              <TextInput
                style={styles.inputStyle}
                placeholder="عنوان الطلب*"
                value={this.state.title}
                onChangeText={(val) => this.updateInputVal(val, "title")}
              />

              <TextInput
                style={styles.inputStyleDescription}
                maxLength={250}
                multiline={true}
                placeholder="وصف الطلب*"
                value={this.state.description}
                onChangeText={(val) => this.updateInputVal(val, "description")}
                scrollEnabled={true}
              />
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "flex-end",
                  top: "-25%",
                  color: "#4F3C75",
                  fontWeight: "700",
                  marginRight: "10%",
                }}
              >
                التصنيف*
              </Text>
              <Picker
                selectedValue={this.state.category}
                style={{
                  height: "22%",
                  width: "80%",
                  top: "-25%",
                  alignSelf: "center",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.updateInputVal(itemValue, "category")
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
                onPress={() => this.shownexStep()}
              >
                <Text style={styles.buttonText}>التالي</Text>
              </TouchableOpacity>
            </View>
          )}

          {!this.state.mainStep && (
            <Animatable.View
              style={styles.fistStepScreen}
              animation="fadeInUpBig"
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  color: "#ccc",
                  fontWeight: "400",
                  top: "1%",
                  alignSelf: "center",
                  marginTop: "5%",
                  position: "absolute",
                }}
              >
                جميع البيانات في هذا الخطوة اختيارية{" "}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  color: "#4F3C75",
                  fontWeight: "700",
                  top: "0%",
                  alignSelf: "center",
                  marginTop: "15%",
                  position: "absolute",
                }}
              >
                الألوان المراد استخدامها:
              </Text>

              <View style={styles.colorsbuttoncontainar}>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color3 },
                  ]}
                  onPress={() => this.popUpWindow(3)}
                >
                  <Text style={styles.buttoncolorsText}>٣</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color2 },
                  ]}
                  onPress={() => this.popUpWindow(2)}
                >
                  <Text style={styles.buttoncolorsText}>٢</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color1 },
                  ]}
                  onPress={() => this.popUpWindow(1)}
                >
                  <Text style={styles.buttoncolorsText}>١</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                editable={false}
                style={[
                  styles.inputStyle,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "65%",
                    position: "absolute",
                    width: "80%",
                  },
                ]}
                value={this.state.ImagePath}
                placeholder="رفع رسم توضيحي"
                onTouchStart={() => this.onChooseImagePress()}
              />

              <View>
                <Svg
                  width={30}
                  height={30}
                  onPress={() => this.onChooseImagePress()}
                  style={{ marginTop: "-25%", marginLeft: "-5%" }}
                >
                  <G
                    data-name="Icon feather-upload"
                    fill="none"
                    stroke="#c5c3c1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                  >
                    <Path
                      data-name="Path 220"
                      d="M28.5 19.5v6a3 3 0 01-3 3h-21a3 3 0 01-3-3v-6"
                    />
                    <Path data-name="Path 221" d="M22.5 9L15 1.5 7.5 9" />
                    <Path data-name="Path 222" d="M15 1.5v18" />
                  </G>
                </Svg>

                <DatePicker
                  style={{ width: 200 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="آخر موعد للتسليم"
                  format="YYYY-MM-DD"
                  minDate={new Date()}
                  confirmBtnText="تم"
                  locale={"ar"}
                  cancelBtnText="إلغاء"
                  iconComponent={
                    <TouchableOpacity style={styles.dateIcon}>
                      <Svg width={31.5} height={36} >
                        <Path
                          data-name="Icon awesome-calendar-alt"
                          d="M0 32.625A3.376 3.376 0 003.375 36h24.75a3.376 3.376 0 003.375-3.375V13.5H0zm22.5-13.781a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9A.846.846 0 015.344 18h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zm0 9A.846.846 0 015.344 27h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zM28.125 4.5H24.75V1.125A1.128 1.128 0 0023.625 0h-2.25a1.128 1.128 0 00-1.125 1.125V4.5h-9V1.125A1.128 1.128 0 0010.125 0h-2.25A1.128 1.128 0 006.75 1.125V4.5H3.375A3.376 3.376 0 000 7.875v3.375h31.5V7.875A3.376 3.376 0 0028.125 4.5z"
                          fill="#c5c3c1"
                        />
                      </Svg>
                    </TouchableOpacity>
                  }
                  customStyles={{
                    placeholder: {
                      fontSize: 30,
                    },
                    dateInput: {
                      left: 40,
                      top: 50,
                      borderWidth: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: "#ccc",
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#4F3C75",
                    borderRadius: 25,
                    width: "70%",
                    height: "30%",
                    justifyContent: "center",
                    position: "relative",
                    alignSelf: "center",
                    left: "20%",
                    top: "30%",
                  }}
                  onPress={() => this.storeResquset()}
                >
                  <Text style={styles.buttonText}> رفع الطلب </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#4F3C75",
                    borderRadius: 25,
                    width: "140%",
                    height: "30%",
                    justifyContent: "center",
                    position: "relative",
                    alignSelf: "center",
                    left: "-20%",
                  }}
                  onPress={() => this.updateInputVal(true, "mainStep")}
                >
                  <Text style={styles.buttonText}> السابق </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          )}
          {this.state.popup && (
            <Animatable.View style={styles.popUp} animation="bounceIn">
              <TouchableOpacity
                style={{ alignSelf: "flex-end", top: "-15%", right: "5%" }}
                onPress={() => this.closePopUp()}
              >
                <Text style={styles.buttoncolorsText}>X</Text>
              </TouchableOpacity>
              {this.state.colorNum == 1 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 1)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color1)}
                />
              )}
              {this.state.colorNum == 1 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color1 === "" ? "#fff" : this.state.color1,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color1}
                  onChangeText={(val) => this.updateInputVal(val, "color1")}
                />
              )}
              {this.state.colorNum == 2 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 2)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color2)}
                />
              )}
              {this.state.colorNum == 2 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color2 === "" ? "#fff" : this.state.color2,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color2}
                  onChangeText={(val) => this.updateInputVal(val, "color2")}
                />
              )}
              {this.state.colorNum == 3 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 3)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color3)}
                />
              )}
              {this.state.colorNum == 3 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color3 === "" ? "#fff" : this.state.color3,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color3}
                  onChangeText={(val) => this.updateInputVal(val, "color3")}
                />
              )}
            </Animatable.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    ); // end of render return
  } //End of render
} //End of class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScreen: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  fistStepScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    borderRadius: 25,
    width: "70%",
    height: "10%",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFEED6",
    fontSize: 25,
    top: "-9%",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  inputStyle: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    textAlign: "right",
    top: "-25%",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    padding: "3%",
    margin: "4%",
  },
  inputStyleDescription: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "25%",
    textAlign: "right",
    top: "-25%",
    borderColor: "#ccc",
    borderWidth: 2,
    padding: "3%",
    margin: "4%",
  },
  colorsbutton: {
    borderWidth: 2,
    borderColor: "#4F3C75",
    height: "20%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  buttoncolorsText: {
    color: "#4F3C75",
    fontSize: 30,
    justifyContent: "center",
  },
  colorsbuttoncontainar: {
    height: "100%",
    flexDirection: "row",
  },
  popUp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "50%",
    height: "25%",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderRadius: 30,
  },
  ColorPickerStyle: {
    top: "-20%",
    alignSelf: "center",
    height: "50%",
    width: "50%",
  },
  coloresbutton: {
    bottom: "20%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    position: "absolute",
    width: "50%",
    height: "10%",
    textAlign: "center",
  },
  dateIcon: {
    position: "absolute",
    top: 50,
    left: -20,
    zIndex: 10,
  },
});
