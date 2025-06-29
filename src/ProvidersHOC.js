import React, { useRef } from 'react';
import InitialNav from './Route';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar } from 'react-native';
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
      <StatusBar
        barStyle="light-content"
        backgroundColor={GLOBAL.COLORAPP.PRIMARY}
        translucent={false}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: GLOBAL.COLORAPP.BACKGROUND }}
      >
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
  textStyle: { color: 'white' },
  titleStyle: { color: 'white', fontWeight: 'bold' },
});

export default ProvidersHOC;
