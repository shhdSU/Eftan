// ------------------------------------------------------
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerActions,
} from "react-navigation-drawer";
import firebase from "./database/firebase";
import {
  ImageBackground,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
// import ClientGalleryScreen from "./components/ClientGallery";
import DesignerGalleryScreen from "./components/designerGallery";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import React, { Component,useRef, useEffect, useState } from "react";
import RequestScreen from "./components/requestForms";
import UploadNewDesign from "./components/uploadNewDesign";
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";
import designerprofile from "./components/designerprofile";
import designeredit from "./components/designeredit";
import Explore from "./components/Explore";
import choice from "./components/choice";
import DesignDetails from "./components/GDDetails";
import designerPortfolio from "./components/designerPortfolio";
import WRequiestDet from "./components/WRequiestDet";
import PRequiestDet from "./components/PRequiestDet";
import DRequiestDet from "./components/DRequiestDet";
import ERequestDet from "./components/ERequestDet";
import SubmitDesign from "./components/SubmitDesign";
import DisplayRequest from "./components/DisplayRequest";
import OrderHistory from "./components/OrderHistory";
import ViewClientRequests from "./components/ViewClientRequests";
import Payment from "./components/AddSubscription";
import Invoice from "./components/Invoice";
import allChat from "./components/allChat";
import chat from "./components/chat";
import designerPersonalPortfolio from "./components/designerPersonalPortfolio";
import RerequestForm from "./components/RerequestForm";
import designersName from "./components/designersName";
import RedesignerPortfolio from "./components/RedesignerPortfolio";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Right } from "native-base";


console.disableYellowBox = true;
//-------------------------------------------------------
// 1- login stack >> اساسية
const LoginStack = createStackNavigator(
  {
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------
const Explorescreen = createStackNavigator(
  {
    معرض: { screen: Explore },
    الإختيار: { screen: choice },
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------
const ChatStackScreens = createStackNavigator(
  {
    allChat: allChat,
    chat: chat,
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------
const recievedOrderScreens = createStackNavigator(
  {
    DisplayRequest: DisplayRequest,
    WRequiestDet: WRequiestDet,
    chat: chat,
    PRequiestDet: PRequiestDet,
    SubmitDesign: SubmitDesign,
    DRequiestDet: DRequiestDet,
    ERequestDet:ERequestDet

  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------

const DesignerPortfolioNavigation = createStackNavigator(                               //@HadeelHamad
  {
    "تصاميمي": { screen: designerPersonalPortfolio },
    "عرض تفاصيل التصميم": DesignDetails,
    " عرض حساب المصمم للطلب": DesignerGalleryScreen,
    "أعمال مصمم معين": designerPortfolio,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-----------------------------------------------------
const OrderHistoryScreens = createStackNavigator(
  {
    OrderHistory:OrderHistory,
    ViewClientRequests: ViewClientRequests,
    RerequestForm : RerequestForm,
    designersName:designersName,
    RedesignerPortfolio:RedesignerPortfolio,
    Payment:Payment,
    Invoice:Invoice,
    
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------

//  client gallery stack << لكل صفحة فيها سلسلة من الصفحات بنسوي لها ستاك بعدين نضيفها كشاشه في المنيو
const ClientGalleryNavigation = createStackNavigator(
  {
    "معرض التصاميم من منظور العميل": Explorescreen,
    "عرض تفاصيل التصميم": DesignDetails,
    " عرض حساب المصمم للطلب": DesignerGalleryScreen,
    "أعمال مصمم معين": designerPortfolio,
    "طلب تصميم": { screen: RequestScreen },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//  designer gallery stack << لكل صفحة فيها سلسلة من الصفحات بنسوي لها ستاك بعدين نضيفها كشاشه في المنيو
const DesignerGalleryNavigation = createStackNavigator(
  {
    "معرض التصاميم من منظور المصمم": Explorescreen,
    "عرض تفاصيل التصميم": DesignDetails,
    " عرض حساب المصمم للطلب": DesignerGalleryScreen,
    "أعمال مصمم معين": designerPortfolio,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//client Profile stack
const ClientProfileNavigation = createStackNavigator(
  {
    "عرض حساب العميل": { screen: clientprofile },
    "تعديل حساب العميل": { screen: clientedit },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//  Designer Profile stack
const DesignerProfileNavigation = createStackNavigator(
  {
    "عرض حساب المصمم": { screen: designerprofile },
    "تعديل حساب المصمم": { screen: designeredit },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

//-------------------------------------------------------
// export navegtion

export default class App extends Component {
  render() {
    const Nav = createAppContainer(
      createSwitchNavigator({
        DNav: DPrimaryNav,
        CNav: CPrimaryNav,
      })
    );
    return <Nav />;
  }

  async componentWillMount(){
    this.startHeaderHeight = 80;
    if(Platform.OS == 'android'){
      this.startHeaderHeight = 100 + StatusBar.currentHeight
    }
     this.getData();
    // this.childRemoved();

    await Font.loadAsync({
      'Tajawal-Black': require('./assets/fonts/Tajawal-Black.ttf'),
      'Tajawal-Bold': require('./assets/fonts/Tajawal-Bold.ttf'),
      'Tajawal-ExtraBold': require('./assets/fonts/Tajawal-ExtraBold.ttf'),
      'Tajawal-ExtraLight': require('./assets/fonts/Tajawal-ExtraLight.ttf'),
      'Tajawal-Light': require('./assets/fonts/Tajawal-Light.ttf'),
      'Tajawal-Medium': require('./assets/fonts/Tajawal-Medium.ttf'),
      'Tajawal-Regular': require('./assets/fonts/Tajawal-Regular.ttf'),
      ...Ionicons.font,
    });    
    this.updateInputVal(false,"loading")


  }

}

//-------------------------------------------------------
// retreive name
function name() {
  var name = "";
  var fName, lName;
  const user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`GraphicDesigner/` + user)
    .on("value", (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        fName = dataSnapshot.child("DFirstName").val();
        lName = dataSnapshot.child("DLastName").val();
        name = fName + " " + lName;
      }
    });
  firebase
    .database()
    .ref(`Client/` + user)
    .on("value", (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        fName = dataSnapshot.child("CFirstName").val();
        lName = dataSnapshot.child("CLastName").val();
        name = fName + " " + lName;
      }
    });
  return name;
}
//-------------------------------------------------------
// retreive email
function email() {
  var email = "";
  const user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`Client/` + user)
    .on("value", (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        email = dataSnapshot.child("Cemail").val();
      }
    });

  firebase
    .database()
    .ref(`GraphicDesigner/` + user)
    .on("value", (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        email = dataSnapshot.child("DEmail").val();
      }
    });

  return email;
}
//-------------------------------------------------------
// Custom Drawers
class CustomDrawerComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: "",
    }
  
    const user = firebase.auth().currentUser.uid;
    const profileImage = firebase.storage().ref("ProfilePictures/" + user);
    var myURL = '';
    profileImage
      .getDownloadURL()
      .then((newURL) => {
        myURL = newURL;
        console.log("myURL inside then" +  myURL);
        this.updateInputVal(newURL,"url");
        console.log(this.state.url);
      })
      .catch((error) => {
        myURL =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
          console.log("myURL inside catch" +  myURL);
          this.updateInputVal(myURL,"url");
          console.log(this.state.url);

        });
        console.log(this.state.url);
    console.log("myURL outside " +  myURL);
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
 
  render(){
 return( <View style={{ flex: 1 }}>
    <View
      style={{
        height: 290,
        alignItems: "center",
        justifyContent: "center",
        fontFamily:"Tajawal-Medium",
      }}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        style={{ width: undefined, paddingTop: 80 ,width:225 }}
      >
        
        <Image
      source={{ uri: this.state.url }}
      style={{ height: 150, width: 150, borderRadius: 100,alignSelf:"center", }}
    />
        <Text
          style={{
            color: "#4F3C75",
            fontSize: 20,
            marginVertical: 13,
            textAlign: "center",
            fontFamily:"Tajawal-Medium",
          }}
        >
          {name()}
        </Text>
        <Text
          style={{
            color: "#4F3C75",
            fontSize: 15,
            //marginVertical: 0,
            textAlign: "center",
            fontFamily:"Tajawal-Medium",
          }}
        >
          {email()}
        </Text>
      </ImageBackground>
    </View>
    <ScrollView>
      <DrawerItems {...this.props} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "تسجيل خروج",
            "هل انت متأكد من تسجيل خروجك ؟",
            [
              {
                text: "الغاء",
                onPress: () => {
                  this.props.navigation.closeDrawer();
                },
              },
              {
                text: "تأكيد",
                onPress: () => {
                  AsyncStorage.clear();
                  this.props.navigation.navigate("صفحة الدخول");
                },
              },
            ],
            { cancelable: false }
          )
        }
      ><View >
     <Icon name="sign-out" size={20} color="#4F3C75" style={{left:187 ,top:3}}/>
     <Text
          style={{
            margin: 16,
            fontWeight: "bold",
            color: "red",
            textAlign: "right",
            fontFamily:"Tajawal-Medium",
            bottom:30,
            right:55
          }}
        >
          تسجيل خروج
        </Text>
    </View>
       
      </TouchableOpacity>
    </ScrollView>
  </View>
); 

        }
        }
//HERE
//-------------------------------------------------------
//Client drawer navigation
const ClientDrawer = createDrawerNavigator(
  {
    "معرض التصاميم": {screen:ClientGalleryNavigation,navigationOptions: { drawerIcon: (<Icon name="image" size={20} color="#4F3C75" />), },},
    "حسابي الشخصي": {screen:ClientProfileNavigation,navigationOptions: { drawerIcon: (<Icon name="user-circle" size={20} color="#4F3C75" />), },},
     "طلباتي": {screen:OrderHistoryScreens,navigationOptions: {drawerIcon: ( <Icon name="folder-open" size={20} color="#4F3C75" />),},},
     "محادثاتي": {screen:ChatStackScreens,navigationOptions: { drawerIcon: (<Icon name="comments" size={20} color="#4F3C75" />), },},
   
  },
  {
    defaultNavigationOptions: {
      drawerLockMode: "locked-closed",
    },
    contentComponent: CustomDrawerComponent,
    gesturesEnabled: true,
    drawerPosition: "right",
    drawerType: "slide",
    drawerWidth: Dimensions.get("window").width - 150,
    contentOptions: {
      activeTintColor: "#4F3C75",
      inactiveTintColor: "#4F3C75",
      activeBackgroundColor: "#FFEED6",
      labelStyle: {
        fontFamily:"Tajawal-Medium",
      },
      itemStyle: {
        flexDirection: "row-reverse",
      },
    },
  }
);

//-------------------------------------------------------
//Designer drawer navigation
const DesignerDrawer = createDrawerNavigator(
  {
    "معرض التصاميم":  {screen:DesignerGalleryNavigation,navigationOptions: { drawerIcon: (<Icon name="image" size={20} color="#4F3C75" />), },},
    "حسابي الشخصي": {screen:DesignerProfileNavigation ,navigationOptions: { drawerIcon: (<Icon name="user-circle" size={20} color="#4F3C75" />), },},
    "سجل الطلبات":{screen: recievedOrderScreens,navigationOptions: {drawerIcon: ( <Icon name="folder-open" size={20} color="#4F3C75" />),},},
    "رفع تصميم جديد": { screen: UploadNewDesign,navigationOptions: { drawerIcon: (<Icon name="upload" size={20} color="#4F3C75" />), },},
    "تصاميمي":{screen:DesignerPortfolioNavigation,navigationOptions: { drawerIcon: (<Icon name="paint-brush" size={20} color="#4F3C75" />), },},
    "محادثاتي": {screen:ChatStackScreens,navigationOptions: { drawerIcon: (<Icon name="comments" size={20} color="#4F3C75" />), },},
    
  },
  {
    defaultNavigationOptions: {
      drawerLockMode: "locked-closed",
    },
    contentComponent: CustomDrawerComponent,
    gesturesEnabled: true,
    drawerPosition: "right",
    drawerType: "slide",
    drawerWidth: Dimensions.get("window").width - 150,
    contentOptions: {
      activeTintColor: "#4F3C75",
      inactiveTintColor: "#4F3C75",
      activeBackgroundColor: "#FFEED6",
      labelStyle: {
        fontFamily:"Tajawal-Medium",
      },
      itemStyle: {
        flexDirection: "row-reverse",
      },
    },
  
  }
);
//-------------------------------------------------------
//   كل التنقلات داخل المنيو تصير ستاك
const CDrawerNavigation = createStackNavigator(
  {
    DrawerStack: ClientDrawer,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//    كل التنقلات داخل المنيو تصير ستاك
const DDrawerNavigation = createStackNavigator(
  {
    DrawerStack: DesignerDrawer,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
const CPrimaryNav = createStackNavigator(
  {

    loginStack: LoginStack,
    "Cdrawer": CDrawerNavigation,
  },
  {
    // Default config for all screens
    headerMode: "none",
  }
);
//-------------------------------------------------------
const DPrimaryNav = createStackNavigator(
  {

    loginStack: LoginStack,
    "Ddrawer": DDrawerNavigation,
  },
  {
    // Default config for all screens
    headerMode: "none",
  }
);
//-------------------------------------------------------
