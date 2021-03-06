import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FirebaseAuth from "../database/firebase";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
var designGallery = new Array();
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { AirbnbRating, Rating } from "react-native-ratings";

const rating_star = require("../assets/rating.png");
var fName, lName, email, bio, image;
export default class designerprofile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      img: "",
      designGalleryState: [],

      // num_rating: 0,
      // total_rating: 0,
    };

    const user = firebase.auth().currentUser.uid;
    //firebase.auth().currentUser.uid;
    // var num_rating = 0;
    //var total_rating = 0;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (dataSnapshot) => {
        fName = dataSnapshot.child("DFirstName").val();
        lName = dataSnapshot.child("DLastName").val();
        email = dataSnapshot.child("DEmail").val();
        bio = dataSnapshot.child("bio").val();
        //num_rating = dataSnapshot.child("number_of_rating").val();
        //total_rating = dataSnapshot.child("total_rating").val();
        this.updateVal(fName, "firstName");
        this.updateVal(lName, "lastName");
        this.updateVal(email, "email");
        this.updateVal(bio, "bio");
      });

    //=======================================
    var ref = firebase
      .database()
      .ref("Designs/")
      .orderByChild("Duid")
      .equalTo(user);
    ref.on("value", (snapshot) => {
      if (!snapshot.exists()) {
        // Alert.alert("No images found");
      } else {
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
        this.updateVal(designGallery, "designGalleryState");
      }
    });
  }
  updateVal(val, prop) {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  readData = () => {
    /*
    const user = firebase.auth().currentUser.uid;
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
  //---------------*to get the number of raters*----------------------

  raters = () => {
    const user = firebase.auth().currentUser.uid;
    var raters;
    firebase
      .database()
      .ref("GraphicDesigner/" + user)
      .on("value", (dataSnapshot) => {
        raters = dataSnapshot.child("raters").val();
      });
    //  this.updateVal(raters, "raters");
    console.log("raters in the constructer" + raters);
    return raters;
  };
  //---------------*to get the avrage of the rating and display it as a star*----------------------

  AVG_Rate = () => {
    const user = firebase.auth().currentUser.uid;

    var AVG_Rate;
    firebase
      .database()
      .ref("GraphicDesigner/" + user)
      .on("value", (dataSnapshot) => {
        AVG_Rate = dataSnapshot.child("AVG_Rate").val();
      });
    //this.updateVal(AVG_Rate, "AVG_Rate");
    console.log("AVG_Rate in the constructer" + AVG_Rate);
    return AVG_Rate;
  };

  render() {
    const user = firebase.auth().currentUser.uid;
    const profileImage = firebase.storage().ref("ProfilePictures/" + user);
    profileImage
      .getDownloadURL()
      .then((url) => {
        this.updateVal(url, "img");
      })
      .catch((error) => {
        image =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
        this.updateVal(image, "img");
      });
    return (
      <View style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{
            alignSelf: "center",
            top: "-3%",
            position: "absolute",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
          <G data-name="Group 7">
            {/* <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G> */}
            {/* <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            /> */}
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#FEB518"
            />
          </G>
        </Svg>

        <View style={styles.infoContainer}>
          <Text style={styles.forText}>حسابي الشخصي</Text>
          <Image style={styles.image} source={{ uri: this.state.img }} />
          <Text style={styles.nameStyle}>
            {this.state.firstName + " " + this.state.lastName}
          </Text>

          <View
style={{
  top: "32%",
  backgroundColor:"#fff",
  width:"45%",
  height:"7%",
  borderRadius:25,
  alignSelf: "center",
  right:"3.5%",
  justifyContent:"center",
}}
>
            <Rating
              style={{ alignSelf: "center", borderRadius:20, }}
              readonly={true}
              type="custom"
              // ratingImage={rating_star}
              startingValue={this.AVG_Rate()}
              ratingBackgroundColor="#c8c7c8"
              tintColor="white"
              imageSize={25}
            />
            </View>
          <Text style={styles.rated}>({this.raters()})</Text>
          <Text style={styles.avg}> 5/{this.AVG_Rate()} نجوم</Text>

          <Text style={styles.emailStyle}>البريد الالكتروني:</Text>
          <Text style={styles.gemailStyle}>{this.state.email}</Text>
          <Text style={styles.aboutStyle}>نبذتي الشخصية</Text>
          <Text style={styles.bioStyle}>{this.state.bio}</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("تعديل حساب المصمم")}
          >
            <AntDesign
              name="edit"
              size={35}
              color="#FEB518"
              style={{
                position: "absolute",
                left: "5%",
                marginTop: "130%",
                zIndex: 50,
              }}
            />
          </TouchableOpacity>
        </View>
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

  },
  avg: {
    top: "40%",
    left: "40%",
    fontSize: 15,
    color: "#fff",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Tajawal-Medium",
    },
  rated: {
    top: "34%",
    left: "70%",
    fontSize: 15,
    color: "#fff",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Tajawal-Medium",
    },
  image: {
    flex: 1,
    width: 250,
    height: 250,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 150,
    top: "-25%",
    borderColor: "#FEB518",
    borderWidth: 3,
  },
  forText: {
    position: "absolute",
    top: "-33%",
    color: "#4F3C75",
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "700",
    zIndex: 5,
    fontFamily: "Tajawal-Medium",

  },
  infoContainer: {
    backgroundColor: "#4F3C75",
    height: "65%",
    width: "90%",
    borderRadius: 35,
    top: "13%",
    
  },
  nameStyle: {
    top: "25%",
    alignSelf: "center",
    fontSize: 30,
    color: "#fff",
    position: "absolute",
    justifyContent: "center",
    fontWeight: "400",
    fontFamily: "Tajawal-Medium",
  },
  gemailStyle: {
    top: "76%",
    fontSize: 20,
    color: "#fff",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "200",
    fontFamily: "Tajawal-Medium",
  },
  emailStyle: {
    top: "70%",
    fontSize: 20,
    color: "#FEB518",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "200",
    alignSelf: "center",
    fontFamily: "Tajawal-Bold",
  },
  bioStyle: {
    top: "47%",
    fontSize: 20,
    color: "#fff",
    position: "absolute",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#fff",
    fontWeight: "200",
    height: "20%",
    width: "95%",
    alignItems: "center",
    textAlign: "center",
    padding: "5%",
    borderRadius: 15,
    fontFamily: "Tajawal-Medium",
  },
  aboutStyle: {
    top: "45%",
    alignSelf: "center",
    fontSize: 20,
    color: "#FEB518",
    position: "absolute",
    fontWeight: "200",
    backgroundColor: "#4F3C75",
    zIndex: 2,
    fontFamily: "Tajawal-Bold",
  },
});
