import React, { useRef } from 'react';
import InitialNav from './Route';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { GLOBAL } from './global';
import { normalTheme } from './config/Theme/Theme';
import { navigationRef } from './NavigationUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProvidersHOC = () => {
  const routeNameRef = useRef();

  return (
    <PaperProvider theme={normalTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: GLOBAL.COLORAPP.BLUE }}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute()
              ? navigationRef.getCurrentRoute().name
              : '';
          }}
          onStateChange={() => {
            const currentRouteName = navigationRef.getCurrentRoute()
              ? navigationRef.getCurrentRoute().name
              : '';
            routeNameRef.current = currentRouteName;
          }}
        >
          <InitialNav />
        </NavigationContainer>

        <FlashMessage
          position="top"
          floating={true}
          duration={3500}
          textStyle={styles.textStyle}
          titleStyle={styles.titleStyle}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    marginRight: 8,
    alignSelf: 'center',
  },
  textStyle: { color: 'white' },
  titleStyle: { color: 'white', fontWeight: 'bold' },
});

export default ProvidersHOC;
