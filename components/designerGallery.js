import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import firebase from "../database/firebase";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import GalleryImage from "./GalleryImage";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
const { width, height } = Dimensions.get("window");
var designGallery = new Array();

export default class designerGallery extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      bio: "",
      img: "",
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      isLoading: false,
      localpath: "",
      designUrl: "",
      propsUser: "",
      designGalleryState: [],
    };
    const propsUser = props.navigation.state.params.duid;
    this.updateInputVal(propsUser, "propsUser");
    var fName, lName, bio, image;
    firebase
      .database()
      .ref(`GraphicDesigner/` + propsUser)
      .on("value", (dataSnapshot) => {
        fName = dataSnapshot.child("DFirstName").val();
        lName = dataSnapshot.child("DLastName").val();
        bio = dataSnapshot.child("bio").val();
        //num_rating = dataSnapshot.child("number_of_rating").val();
        //total_rating = dataSnapshot.child("total_rating").val();
        this.updateInputVal(fName, "firstName");
        this.updateInputVal(lName, "lastName");
        this.updateInputVal(bio, "bio");
      });
    const profileImage = firebase.storage().ref("ProfilePictures/" + propsUser);
    profileImage
      .getDownloadURL()
      .then((url) => {
        this.updateInputVal(url, "img");
      })
      .catch((error) => {
        image =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
        this.updateInputVal(image, "img");
      });

    //=======================================================
    //const user = "2Uf1Wj14icbxngiiJbjklDDwiZb2"
    //firebase.auth().currentUser.uid;
    var ref = firebase
      .database()
      .ref("Designs/")
      .orderByChild("Duid")
      .equalTo(propsUser);
    ref.on("value", (snapshot) => {
      if (!snapshot.exists()) {
        Alert.alert("No images found");
      }
      var design = snapshot.val();
      var designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desFileKey = design[designInfo].designFileKey;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;
        var designUrl = design[designInfo].designUrl;
        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designFileKey: desFileKey,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: designUrl,
        };
      }
      console.log(designGallery);
      console.log(designGallery.length);
      this.updateInputVal(designGallery, "designGalleryState");
    });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  // signOutUser = () => {
  //   firebase.auth().signOut();
  //   this.props.navigation.navigate("صفحة الدخول");
  // };

  readData = () => {
    /*
      const user = "2Uf1Wj14icbxngiiJbjklDDwiZb2"
      //firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("Designs/").orderByChild("Duid").equalTo(user);
      ref.on("value", (snapshot) => {
        var design = snapshot.val();
        var designKeys = Object.keys(design);
        for (var i = 0; i < designKeys.length; i++) {
          var designInfo = designKeys[i];
          var categ = design[designInfo].category;
          var desDis = design[designInfo].designDescription;
          var desFileKey = design[designInfo].designFileKey;
          var desTitle = design[designInfo].designTitle;
          var desUploadingdate = design[designInfo].designUploadingdate;
          var designUrl = design[designInfo].designUrl;
          designGallery[i] = {
            category: categ,
            designDescription: desDis,
            designFileKey: desFileKey,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: designUrl,
          };
        }
        console.log(designGallery);
        console.log(designGallery.length);
      });
      */
    return this.state.designGalleryState.map((element) => {
      return (
        <View
          key={element.designUrl}
          style={{ width: width / 2 - 40, height: width / 2 - 20 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 5,
              backgroundColor: "white",
              margin: 10,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
                margin: 5,
              }}
              width={width}
              source={{ uri: element.designUrl }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" }}
            >
              {element.designTitle}
            </Text>
          </View>
        </View>
      );
    });
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <Svg
            width={416}
            height={144}
            style={{ alignSelf: "center", top: "-9%", position: "absolute" }}
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
          <Text style={styles.forText}>حسابي الشخصي</Text>
          <Image style={styles.image} source={{ uri: this.state.img }} />
          <Text style={styles.textStyle2}>الاسم الأول</Text>
          <Text style={styles.textStyle}>{this.state.firstName}</Text>
          <Text style={styles.textStyle4}>الاسم الأخير</Text>
          <Text style={styles.textStyle3}>{this.state.lastName}</Text>
          <Text style={styles.textStyle8}>نبذة</Text>
          <Text style={styles.textStyle7}>{this.state.bio}</Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.editText}
              onPress={() =>
                this.props.navigation.navigate("طلب تصميم", { DID: this.state.propsUser })
              }
            >
              طلب تصميم جديد
            </Text>
          </TouchableOpacity>

          {/* 
          --------here is lujain's comments-----
          <View
            style={{
              marginTop: -60,
              paddingLeft: 30,
              paddingRight: 30,
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.readData()}
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

// {designGallery.map((element) => {
//   <View style={{ marginBottom: 30 }}>
//     <ScrollView scrollEventThrottle={16}>
//       <View>
//         <GalleryImage
//           name={element.designTitle}
//           width={width}
//           imageUri={element.designUrl}
//         />
//         <Text>{"اسم" + element.designTitle}</Text>
//         <Text>text</Text>
//       </View>
//     </ScrollView>
//   </View>;
// })}

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
    top: "12%",
    left: "30%",
    right: "5%",
  },
  button: {
    top: "65%",
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
    top: "2%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
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
    top: "35%",
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
    top: "35%",
    textAlign: "center",
    fontSize: 19,
    justifyContent: "center",
    color: "#4F3C75",
    position: "absolute",
    right: "55%",
  },
  textStyle3: {
    top: "40%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    left: "40%",
    right: "5%",
  },
  textStyle4: {
    top: "40%",
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
    borderWidth: 2,
    top: "50%",
    textAlign: "center",
    fontSize: 14,
    color: "#4F3C75",
    position: "absolute",
    textAlign: "center",
    paddingTop: "15%",
    justifyContent: "center",
  },
  textStyle8: {
    top: "45%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
  },
});
