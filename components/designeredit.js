import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import firebase from "../database/firebase";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
export default class designeredit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      // num_rating: 0,
      //total_rating: 0,
      img: "",
    };
    const user = firebase.auth().currentUser.uid;
    var fName, lName, email, bio, num_rating, total_rating;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + user)
            .on("value", (dataSnapshot) => {
              fName = dataSnapshot.child("DFirstName").val();
              lName = dataSnapshot.child("DLastName").val();
              email = dataSnapshot.child("Demail").val();
              bio = dataSnapshot.child("bio").val();
              //   num_rating = dataSnapshot.child("number_of_rating").val();
              //  total_rating = dataSnapshot.child("total_rating").val();
              this.updateInputVal(fName, "firstName");
              this.updateInputVal(lName, "lastName");
              this.updateInputVal(email, "email");
              this.updateInputVal(bio, "bio");
              //  this.updateInputVal(num_rating, "num_rating");
              //  this.updateInputVal(total_rating, "total_rating");
            });
        }
      });
    const profileImage = firebase.storage().ref("ProfilePictures/" + user);

    profileImage.getDownloadURL().then((url) => {
      this.updateInputVal(url, "img");
    });
  }
  resetPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        Alert.alert(
          "تنبيه",
          "الرجاء تفقد بريدك الالكتروني",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  confirmChanges = () => {
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //check whether string contains special characters
    var numCheck = /\d/; //check whether string contains numbers
    if (this.state.firstName === "" || this.state.lastName === "") {
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
    }
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("GraphicDesigner/" + user)
      .set({
        DFirstName: this.state.firstName,
        DLastName: this.state.lastName,
        Demail: this.state.email,
        //   number_of_rating: this.state.num_rating,
        //  total_rating: this.state.total_rating,
        bio: this.state.bio,
      });
    this.props.navigation.navigate("designerprofile");
  };

  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("ProfilePictures/" + draftName);
    return ref.put(blob);
  };
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  onChooseImagePress = async () => {
    const user = firebase.auth().currentUser.uid;
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, user)
        .then(() => {
          const profileImage = firebase
            .storage()
            .ref("ProfilePictures/" + user);
          profileImage.getDownloadURL().then((url) => {
            this.updateInputVal(url, "img");
          });
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Svg>
          <Defs>
            <ClipPath id="prefix__a">
              <Path d="M0 0h375v812H0z" />
            </ClipPath>
          </Defs>
          <G data-name="Gallery Screen" clipPath="url(#prefix__a)">
            <Path fill="#fff" d="M0 0h375v812H0z" />
            <G filter="url(#prefix__b)">
              <Rect
                data-name="Rectangle 6"
                width={398}
                height={126}
                rx={38}
                transform="translate(-11 -18)"
                fill="#ffeed6"
              />
            </G>
            <G data-name="Icon ionic-md-log-out" onPress={this.signOutUser}>
              <Path
                data-name="Path 104"
                d="M61.125 52.125H47.787l3.066-3.143-2.1-2.1L42 53.625l6.75 6.75 2.18-2.1-3.143-3.15h13.338z"
                fill="#4f3c75"
              />
              <G data-name="Group 3">
                <Path
                  data-name="Path 105"
                  d="M56.646 42.002a11.629 11.629 0 018.206 19.843 11.594 11.594 0 01-16.4.014l-2.13 2.13a15.541 15.541 0 001.95 1.636 14.637 14.637 0 10-1.941-22.352l2.124 2.118a11.509 11.509 0 018.191-3.389z"
                  fill="#4f3c75"
                />
              </G>
            </G>
            <Path
              data-name="Icon material-menu"
              d="M316.676 71.883H357V67.4h-40.324zm0-11.2H357V56.2h-40.324zm0-15.683v4.48H357V45z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Text style={styles.forText}>تعديل الحساب</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <Text onPress={() => this.onChooseImagePress()} style={styles.forText2}>
          رفع صورة شخصية
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="First name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />

        <TextInput
          style={styles.inputStyle2}
          placeholder="Last name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
          maxLength={15}
        />
        <TextInput
          style={styles.inputStyle3}
          placeholder="Bio"
          value={this.state.bio}
          onChangeText={(val) => this.updateInputVal(val, "bio")}
          maxLength={260}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.editText} onPress={() => this.confirmChanges()}>
            حفظ
          </Text>
        </TouchableOpacity>
        <Text onPress={() => this.resetPassword()} style={styles.forText3}>
          تعديل كلمة السر
        </Text>
      </View>
    );
  }
}
//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    top: "5%",
    padding: "1%",
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ffeed6",
    alignItems: "center",
    borderRadius: 150 / 2,
    top: "24%",
    left: "30%",
    right: "5%",
  },
  button: {
    top: "70%",
    backgroundColor: "#4F3C75",
    height: "6%",
    width: "80%",
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
  },
  editText: {
    fontSize: 25,
    color: "#fff",
    marginTop: "1%",
    textAlign: "center",
    alignItems: "center",
    top: "5%",
    zIndex: 10,
  },

  forText: {
    position: "absolute",
    top: "17%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
  },
  forText2: {
    alignItems: "center",
    position: "absolute",
    top: "45%",
    color: "#4F3C75",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  forText3: {
    alignItems: "center",
    position: "absolute",
    top: "77%",
    color: "#4F3C75",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  profileImg: {
    width: 50,
    height: 50,
  },
  textStyle: {
    top: "45%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    left: "40%",
    right: "5%",
    justifyContent: "center",
  },

  inputStyle: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "46%",
    left: "10%",
  },
  inputStyle2: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "53%",
  },
  inputStyle3: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "60%",
  },
  textStyle2: {
    top: "45%",
    textAlign: "center",
    fontSize: 19,
    justifyContent: "center",
    color: "#4F3C75",
    position: "absolute",
    right: "55%",
  },
  textStyle3: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    left: "40%",
    right: "5%",
  },
  textStyle4: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    right: "55%",

    justifyContent: "center",
  },
  textStyle5: {
    top: "55%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    textAlign: "center",
    paddingTop: "15%",
    justifyContent: "center",
  },
  textStyle6: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "15%",
  },
  textStyle7: {
    top: "64%",
    textAlign: "center",
    fontSize: 14,
    color: "#4F3C75",
    position: "absolute",
    textAlign: "center",
    paddingTop: "15%",
    justifyContent: "center",
  },
  textStyle8: {
    top: "67%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
  },
});
