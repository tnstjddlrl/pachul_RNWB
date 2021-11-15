import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';

var rnw
var cbc = false;

const App = () => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hwbp",
      function () {
        if (cbc && rnw) {
          rnw.goBack();
          return true;
        } else if (cbc == false) {
          Alert.alert('앱을 종료하시겠습니까?', '', [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed")
            },
            { text: "Yes", onPress: () => BackHandler.exitApp() }
          ])
          return true;
        }
      }
    );
    return () => backHandler.remove();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView

        ref={wb => { rnw = wb }}
        onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
        // userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, ike Gecko) Chrome/51.0.2704.103 Safari/537.36 :appchk'
        onLoadEnd={() => {
          SplashScreen.hide();
        }}
        userAgent='Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36 :appchk'
        source={{ uri: 'https://33pachul.com/' }}

        style={{ flex: 1 }}
      />
    </SafeAreaView>
  )
}

export default App;
