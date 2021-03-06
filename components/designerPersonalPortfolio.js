//هذه صفحة تصاميمي لعرض التصاميم الشخصية للمصمم الحالي حتى يتمكن من حذفها
// Notes about DELETE from DB:
// 1. Delete from realtime DB
// firebase.database().ref('Designs/' + element.designFileKey).remove().then()
// 2. Delete from Storage by known URL
//   firebase.storage().refFromURL(element.designUrl).delete()
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import EmptyList from "./emptylist";
import { Component } from "react";
import * as Animatable from "react-native-animatable";
var designGallery = new Array();
export default class designerPersonalPortfolio extends Component {
  constructor(props) {
    super();
    this.state = {
      nodesign: false,
      localpath: "",
      designUrl: "",
      designShownState: [],
    };
    this.getData(); // All the database retreival code was here, I put it inside getData()
  }
  //----------------------------------------------------------------------------------------
  getData() {
    designGallery = new Array(); // clean the array before any usage
    var duid = firebase.auth().currentUser.uid;
    var ref = firebase
      .database()
      .ref("Designs/")
      .orderByChild("Duid")
      .equalTo(duid);
    ref.on("value", (snapshot) => {
      if (!snapshot.exists()) {
        this.updateInputVal(true, "nodesign");
        return;
      }
      this.updateInputVal(false, "nodesign");
      var design = snapshot.val();
      var designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;
        var designUrl = design[designInfo].designUrl;
        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designFileKey: designInfo,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: designUrl,
        };
      }
      this.updateInputVal(designGallery, "designShownState");
    });
  }
  getData2() {
    designGallery = new Array(); // clean the array before any usage
    var duid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Designs/" + duid);
    // .orderByChild("Duid")
    // .equalTo(duid);
    ref.on("child_removed", (snapshot) => {
      if (!snapshot.exists()) {
        this.updateInputVal(true, "nodesign");
        return;
      }
      this.updateInputVal(false, "nodesign");
      var design = snapshot.val();
      var designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;
        var designUrl = design[designInfo].designUrl;
        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designFileKey: designInfo,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: designUrl,
        };
      }
    });
    if (this.state.designShownState.length != designGallery.length)
      this.updateInputVal(designGallery, "designShownState");
  }
  //----------------------------------------------------------------------------------------
  // componentDidUpdate() {
  //   this.getData()
  //   this.getData2()
  //       }
  //----------------------------------------------------------------------------------------
  componentWillMount() {
    this.getData();
    //  this.getData2()
  }
  // componentDidMount() {
  //   // const { navigation } = this.props;
  //   // this.focusListener = navigation.addListener('focus', () => {
  //     this.getData()
  //   // });
  // }
  // componentWillUnmount() {
  //   this.focusListener.remove();
  // }
  //-------------------------------------------------------------------------------------
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  //----------------------------------------------------------------------------------------
  removeDesign(e) {
    // I used this method to update the state by removing the deleted item
    var array = [...this.state.designShownState]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      // this.setState({designShownState: array});
      this.updateInputVal(designGallery, "designShownState");
    }
  }
  //----------------------------------------------------------------------------------------
  readData = () => {
    return this.state.designShownState.map((element) => {
      return (
        <Animatable.View
          animation="fadeInUp"
          key={element.designUrl}
          style={{ width: width / 2 - 40, marginRight: 6 }}
          // height: width / 2 - 20, }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
              // backgroundColor: "white",
              marginBottom: 43,
              width: 150,
              height: 150,
              // borderRadius: 15,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("عرض تفاصيل التصميم", {
                  obj: element,
                })
              }
            >
              <Image
                style={{
                  width: 160,
                  height: 160,
                  top: "3%",
                  borderRadius: 15,
                  alignSelf: "center",
                }}
                source={{ uri: element.designUrl }}
              />
            </TouchableOpacity>
            <EvilIcons
              name="trash"
              size={27}
              color="#FEB518"
              style={styles.trash}
              onPress={() =>
                Alert.alert(
                  "تمهّل",
                  "سيتم حذف التصميم بشكل نهائي",
                  [
                    {
                      text: "إلغاء",
                    },
                    {
                      text: "حذف",
                      onPress: () => {
                        this.getData2();
                        firebase
                          .database()
                          .ref("Designs/" + element.designFileKey)
                          .remove()
                          .then(
                            // this.removeDesign(element),
                            firebase
                              .storage()
                              .refFromURL(element.designUrl)
                              .delete()
                          );
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            />
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#4f3c75",
                  top: -9,
                }}
                onPress={() =>
                  this.props.navigation.navigate("عرض تفاصيل التصميم", {
                    obj: element,
                  })
                } //@HadeelHamad
              >
                {element.designTitle}
              </Text>
            </View>
          </View>
        </Animatable.View>
      );
    });
  };
  //----------------------------------------------------------------------------------------
  render() {
    return (
      <Animatable.View animation="fadeInUp" style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "-2%",
            zIndex: 1,
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
              onPressIn={() => this.props.navigation.goBack()}
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#FEB518"
            /> */}
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#FEB518"
            />
          </G>
        </Svg>
        <Text style={styles.forText}>تصاميمي</Text>
        <View
          style={{
            height: 10,
            marginTop: 20,
            marginBottom: 40,
            borderBottomWidth: 1,
            borderBottomColor: "#dddddd",
          }}
        ></View>
        <ScrollView scrollEventThrottle={16}>
          <View>
            <View
              style={{
                marginTop: 3,
              }}
            >
              <View
                style={{
                  marginTop: 70,
                  paddingLeft: 30,
                  paddingRight: 20,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {!this.state.nodesign && this.readData()}
                {this.state.nodesign && (
                  <View style={{ marginTop: "50%" }}>
                    <EmptyList style={styles.emptyImage}></EmptyList>
                    <Text style={styles.emptyText}>نحن بانتظار تصاميمك</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "1%",
  },
  forText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#4f3c75",
    alignSelf: "center",
    top: "9%",
    position: "absolute",
    zIndex: 2,
    fontFamily: "Tajawal-Medium",
  },
  trash: {
    top: "9%",
    right: "-40%",
  },
  emptyText: {
    color: "#4f3c75",
    fontSize: 27,
    textAlign: "center",
    fontWeight: "200",
    marginTop: 20,
  },
  emptyImage: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
