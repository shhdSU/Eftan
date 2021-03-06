import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgComponent from "./GD_detailsImage";
import firebase from "../database/firebase";

export default class GDDetails extends React.Component {
  constructor(props) {
    super();
    var design = props.navigation.state.params.obj;
    this.state = {
      Duid: "",
      designTitle: "",
      designerProfileImage:
        "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea",
      date: "",
      designDescription: "",
      localpath: "",
      designTags: [],
      hasTags: false,
      name: "",
    };
    this.updateInputVal(design.duid, "Duid");
    this.updateInputVal(design.designTitle, "designTitle");
    this.updateInputVal(design.designUploadingdate, "date");
    this.updateInputVal(design.designDescription, "designDescription");
    this.updateInputVal(design.designUrl, "localpath");
    this.updateInputVal(design.designTags, "designTags");
    if (design.designTags) {
      if (design.designTags.length != 0) {
        this.updateInputVal(true, "hasTags");
      }
    }
    //--------------------retreive the JSON obj of the design work from realtime DB
    // firebase
    //   .database()
    //   .ref("Designs/" + this.state.designId)
    //   .on("value", (snap) => {
    //     this.updateInputVal(snap.val().designTitle, "designTitle"),
    //       this.updateInputVal(
    //         snap.val().designDescription,
    //         "designDescription"
    //       ),
    //       this.updateInputVal(snap.val().designUploadingdate, "date"),
    //       this.updateInputVal(snap.val().Duid, "Duid"),
    //-----------------------------retreive designer's profile image
    firebase
      .storage()
      .ref("ProfilePictures/" + this.state.Duid)
      .getDownloadURL()
      .then((url) => {
        this.updateInputVal(url, "designerProfileImage");
      })
      .catch((error) => {
        console.log("can not retreive profile img url");
      });
    /*
});
//----------------------get the URI of the design from storage
var p = "";
firebase
.storage()
.ref("DesignWork/" + this.state.designId)
.getDownloadURL()
.then((url) => {
p = url;
//return url;
this.updateInputVal(p, "localpath");
})
.catch((error) => {
console.log("can not retreive design url");
});*/

    //-----------------------------retreive designer's name
    var nname = "";
    firebase
      .database()
      .ref(`GraphicDesigner/` + this.state.Duid)
      .on("value", (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + this.state.Duid)
            .on("value", (dataSnapshot) => {
              nname =
                dataSnapshot.child("DFirstName").val() +
                " " +
                dataSnapshot.child("DLastName").val();
              this.updateInputVal(nname, "name");
            });
        } else console.log("Duid is not found");
      });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    console.log(this.state.designTitle);
    console.log(this.state.date);
    console.log(this.state.localpath);
    console.log(this.state.designerProfileImage);
    console.log(this.state.name);
    console.log(this.state.designDescription);
    console.log(this.state.designTags);

    return (
      <View style={styles.container}>
        <Text
          style={{
            color: "#4F3C75",
            top: "9%",
            position: "absolute",
            fontSize: 25,
            textAlign: "center",
            alignSelf: "center",
            zIndex: 1,
            fontFamily: "Tajawal-Regular",
          }}
        >
          {this.state.designTitle}
        </Text>
        <Svg
          width={416}
          height={144}
          style={{
            alignSelf: "center",
            top: "-2%",
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
            <Path
              data-name="Icon ionic-ios-arrow-back"
              onPress={() => this.props.navigation.goBack()}
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#FEB518"
            />
            {/* <Path
              data-name="Icon material-menu"
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            /> */}
          </G>
        </Svg>
        <Image
          style={styles.preview}
          source={{
            uri: this.state.localpath,
          }}
        />

        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#aaa",
              top: "35%",
              right: "30%",
              textAlign: "center",
              fontSize: 13,
              fontFamily: "Tajawal-Regular",
            },
          ]}
        >
          {this.state.date}
        </Text>

        <View
          style={styles.infoCont}
          onTouchStart={() =>
            this.props.navigation.navigate(" عرض حساب المصمم للطلب", {
              duid: this.state.Duid,
            })
          }
        >
          <Image
            onPress={() =>
              this.props.navigation.navigate(" عرض حساب المصمم للطلب", {
                duid: this.state.Duid,
              })
            }
            style={styles.profileImage}
            source={{
              uri: this.state.designerProfileImage,
            }}
          />
          <Text
            style={[
              {
                alignSelf: "center",
                color: "#fff",
                top: "-35%",
                fontWeight: "200",
                fontSize: 20,
                textDecorationLine: "underline",
                fontFamily: "Tajawal-Regular",
              },
            ]}
            onPress={() =>
              this.props.navigation.navigate(" عرض حساب المصمم للطلب", {
                duid: this.state.Duid,
              })
            }
          >
            {this.state.name}
          </Text>
          {/* <TouchableOpacity
         
         onPress={() => this.props.navigation.navigate(" عرض حساب المصمم للطلب", { duid: this.state.Duid })}
         
      >
        <Text
            style={{
              color: "#ffeed6",
              fontSize: 14,
              textDecorationLine:"underline",
              top:"-190%",
              left:"42%",
              fontWeight:"200",
            }}
          >
           المزيد عن المصمم
          </Text>
        </TouchableOpacity> */}
        </View>

        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#FEB518",
              top: "5.5%",
              right: "-23.5%",
              fontWeight: "700",
              backgroundColor: "#fff",
              height: "2.5%",
              width: "24%",
              zIndex: 2,
              fontFamily: "Tajawal-Bold",
            },
          ]}
        >
          وصف العمل
        </Text>

        <Text
          style={[
            {
              color: "#4F3C75",
              top: "3%",
              left: "0%",
              textAlign: "right",
              fontWeight: "700",
              width: "87%",
              height: "15%",
              fontSize: 15,
              borderWidth: 0.5,
              borderColor: "#4f3c75",
              borderRadius: 25,
              padding: "7%",
              fontFamily: "Tajawal-Regular",
            },
          ]}
        >
          {this.state.designDescription}
        </Text>

        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#FEB518",
              top: "2%",
              right: "-20%",
              fontWeight: "700",
              backgroundColor: "#fff",
              borderRadius: 20,
              height: "2.5%",
              width: "33%",
              zIndex: 2,
              fontFamily: "Tajawal-Bold",
            },
          ]}
        >
          الكلمات المفتاحية
        </Text>
        <View
          horizontal={true}
          style={{
            top: "-1%",
            flexDirection: "row",
            flexWrap: "wrap",
            borderWidth: 0.5,
            borderRadius: 25,
            borderColor: "#4f3c75",
            width: "87%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Tajawal-Regular",
          }}
        >
          {this.state.hasTags &&
            this.state.designTags.map((element) => {
              return (
                <View
                  style={{
                    marginTop: "10%",
                    borderRadius: 25,
                    marginHorizontal: 5,
                    backgroundColor: "#D4D7FF",
                  }}
                >
                  <Text
                    style={{
                      color: "#4F3C75",
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: 15,
                      marginHorizontal: 10,
                      padding: "1%",
                      fontFamily: "Tajawal-Regular",
                    }}
                  >
                    {element}
                  </Text>
                </View>
              );
            })}

          {!this.state.hasTags && (
            <View
              style={{
                marginTop: "10%",
                borderRadius: 25,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color: "#4F3C75",
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 18,
                  marginHorizontal: 10,
                  padding: "1%",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                لا يوجد
              </Text>
            </View>
          )}
        </View>

        {/*        
        <SvgComponent
          style={{
            right: 120,
          }}
        ></SvgComponent>


 */}
      </View>
    );
  }
}

//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  preview: {
    width: 330,
    height: 280,
    top: "8%",
    borderRadius: 35,
    alignSelf: "center",
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "60%",
    height: "3.5%",
    alignSelf: "center",
    bottom: "15%",
  },
  inputStyle2: {
    fontSize: 16,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
    fontFamily: "Tajawal-Regular",
  },
  profileImage: {
    width: 60,
    height: 60,
    top: "14%",
    left: "76%",
    borderRadius: 35,
    borderColor: "#ffeed6",
    borderWidth: 2,
    backgroundColor: "#fff",
  },

  infoCont: {
    backgroundColor: "#4F3C75",
    width: "87%",
    borderRadius: 25,
    top: "6%",
    height: "10%",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
