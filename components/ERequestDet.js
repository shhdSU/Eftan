import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import firebase from "../database/firebase";

export default class ERequestDet extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;

    this.state = {
      ImageKey: "",
      CID: "",
      DID: "",
      category: "",
      color1: "",
      color2: "",
      color3: "",
      deadLine: "",
      description: "",
      status: "",
      reference: "",
      title: "",
      ClientProfileImage: "",
    };

    this.updateInputVal(Requiest.ImageKey, "ImageKey");
    this.updateInputVal(Requiest.CID, "CID");
    this.updateInputVal(Requiest.DID, "DID");
    this.updateInputVal(Requiest.color1, "color1");
    this.updateInputVal(Requiest.color2, "color2");
    this.updateInputVal(Requiest.color3, "color3");
    this.updateInputVal(Requiest.deadLine, "deadLine");
    this.updateInputVal(Requiest.description, "description");
    this.updateInputVal(Requiest.status, "status");
    this.updateInputVal(Requiest.submissionUrl, "reference");
    this.updateInputVal(Requiest.title, "title");
    this.updateInputVal(Requiest.category, "category");

    //-------------retreive client's profile image----------------
    firebase
      .storage()
      .ref("ProfilePictures/" + this.state.CID)
      .getDownloadURL()
      .then((url) => {
        this.updateInputVal(url, "ClientProfileImage");
      })
      .catch((error) => {
        console.log("can not retreive profile img url");
      });

    //-----------------------------retreive cilent's name
    var Cname = "";
    firebase
      .database()
      .ref("Client/" + this.state.CID)
      .on("value", (dataSnapshot) => {
        Cname =
          dataSnapshot.child("CFirstName").val() +
          " " +
          dataSnapshot.child("CLastName").val();
        this.updateInputVal(Cname, "name");
      });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //----------------------------- update status Changes + remove request

  UpdateStatusAfterAccepted = () => {
    const DID = firebase.auth().currentUser.uid;
    var key = this.state.Imagekey;
    this.updateInputVal("P", "status");
    firebase
      .database()
      .ref("Forms/" + DID + "/" + key)
      .update({ status: this.state.status });
    console.log(this.state.CID);
    this.props.navigation.navigate("DisplayRequest", { status: "p" });
  };
  RemoveRequest = () => {
    firebase
      .database()
      .ref("Forms/" + DID + "/" + key)
      .remove();
    this.props.navigation.navigate("DisplayRequest", { status: "w" }); // تغيير الانتقال الى سجل الطلبات مع حذف الطلب
  };
  //-----------------------------

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#4F3C75",
              top: "8.5%",
              fontWeight: "700",
              position: "absolute",
              fontSize: 25,
              textAlign: "center",
              alignSelf: "center",
              zIndex: 1,
              fontFamily: "Tajawal-Medium",
            }}
          >
            {this.state.title}
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
            </G>
          </Svg>

          <View style={styles.infoCont}>
            <Image
              style={styles.profileImage}
              source={{ uri: this.state.ClientProfileImage }}
            />

            <Text
              style={[
                {
                  color: "#fff",
                  top: "-50%",
                  left: "38%",
                  fontWeight: "300",
                  fontSize: 20,
                  fontFamily: "Tajawal-Bold",
                },
              ]}
            >
              {this.state.name}
            </Text>
            <View
              style={{
                marginTop: 10,
                marginBottom: 50,
                paddingLeft: 30,
                paddingRight: 30,

                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            ></View>
          </View>

          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}
          <Image
            style={styles.preview}
            source={{
              uri: this.state.reference,
            }}
          />
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#FEB518",
                top: "13.5%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
                fontFamily: "Tajawal-Bold",
              },
            ]}
          >
            صنف التصميم{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "11%",
                textAlign: "right",
                fontWeight: "700",
                width: "87%",
                height: "6%",
                fontSize: 15,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                fontWeight: "400",
                paddingRight: 25,
                paddingTop: 15,
                fontFamily: "Tajawal-Medium",
              },
            ]}
          >
            {this.state.category}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                flexShrink: 1,
                color: "#FEB518",
                top: "10%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "23%",
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
                fontFamily: "Tajawal-Medium",

                color: "#4F3C75",
                top: "8%",
                left: "0%",
                textAlign: "right",
                fontWeight: "700",
                width: "87%",
                height: "12%",
                fontSize: 12,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                padding: "7%",
                minHeight: 50,
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 5,
                fontWeight: "700",
              },
            ]}
          >
            {this.state.description}
          </Text>

          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#FEB518",
                top: "7%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
                fontFamily: "Tajawal-Bold",
              },
            ]}
          >
            موعد التسليم{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "5%",
                textAlign: "right",
                fontWeight: "700",
                width: "87%",
                height: "6%",
                fontSize: 15,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                fontWeight: "400",
                paddingRight: 25,
                paddingTop: 15,
                fontFamily: "Tajawal-Medium",
              },
            ]}
          >
            {this.state.deadLine == "" ? "مفتوح" : this.state.deadLine}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#FEB518",
                top: "4%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
                fontFamily: "Tajawal-Bold",
              },
            ]}
          >
            ألوان التصميم{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "4%",
                right: "14%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color1,
                overflow: "hidden",
                fontFamily: "Tajawal-Medium",
              },
            ]}
          >
            {this.state.color1 == "" ? "لايوجد" : this.state.color1}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-.8%",
                right: "-8%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color2,
                overflow: "hidden",
                fontFamily: "Tajawal-Medium",
              },
            ]}
          >
            {this.state.color2 == "" ? "لايوجد" : this.state.color2}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-5.8%",
                right: "-30%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color3,
                overflow: "hidden",
                fontFamily: "Tajawal-Medium",
              },
            ]}
          >
            {this.state.color3 == "" ? "لايوجد" : this.state.color3}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}
        </View>
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
    width: 300,
    height: 235,
    top: "15%",
    borderRadius: 35,
    alignSelf: "center",
    resizeMode: "contain",

  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
    justifyContent: "center",
    bottom: "-10%",
    zIndex: 3,
  },
  inputStyle2: {
    fontSize: 16,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
    fontFamily: "Tajawal-Medium",
  },
  profileImage: {
    width: 60,
    height: 60,
    top: "9%",
    left: "76%",
    borderRadius: 35,
    borderColor: "#FEB518",
    borderWidth: 2,
    backgroundColor: "#fff",
  },

  accject: {
    width: 34,
    height: 35,
    right: 20,
    top: -75,
    paddingRight: 35,
    backgroundColor: "#fff",
    fontFamily: "Tajawal-Medium",
  },
  infoCont: {
    backgroundColor: "#4F3C75",
    width: "96%",
    borderRadius: 25,
    borderColor: "#4F3C75",
    borderWidth: 2,
    top: "14%",
    height: "9%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.95,

    elevation: 24,
  },
});
