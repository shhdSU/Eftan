import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
const { width, height } = Dimensions.get("window");
export default class designerPortfolio extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      localpath: "",
      designUrl: "",
      propsUser: "",
      designShownState: [],
    };

    const arr = props.navigation.state.params.arr;
    this.updateInputVal(arr, "designShownState");
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  readData = () => {
    return this.state.designShownState.map((element) => {
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
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
              marginBottom: 30,
              width: 150,
              height: 150,
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
            style={{
              alignSelf: "center",
              top: "-9%",
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
          <Text style={styles.forText}>أعمال المصمم</Text>

          <View
            style={{
              marginTop: 100,
              paddingLeft: 30,
              paddingRight: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.readData()}
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    top: "9%",
    padding: "1%",
  },
  forText: {
    position: "absolute",
    top: "3%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    fontFamily: "Tajawal-Medium",
  },
});
