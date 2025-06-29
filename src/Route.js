import React from 'react';
import { Platform } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import GLOBAL from './global/global';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Home from './screens/Home';
import ExercisesWomen from './screens/ExercisesWomen';
import Diet from './screens/Diet';
import Meditation from './screens/Meditation';
import Progress from './screens/Progress';
import Profile from './screens/Profile';
import ProfileUpdate from './screens/ProfileUpdate';
import DrawerComponent from './Components/DrawerComponent/DrawerComponent';
import ExercisesMen from './screens/ExercisesMen.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationObject = () => {
  const {
    HOME,
    EXERCISES_MEN,
    EXERCISES_WOMEN,
    DIET,
    MEDITATION,
    PROGRESS,
    PROFILE,
    PROFILE_UPDATE,
  } = GLOBAL.PAGE;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: 'white' },
        animationEnabled: Platform.select({
          ios: true,
          android: false,
        }),
      }}
    >
      <Stack.Screen
        component={Home}
        name={HOME}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen component={ExercisesMen} name={EXERCISES_MEN} />
      <Stack.Screen component={ExercisesWomen} name={EXERCISES_WOMEN} />
      <Stack.Screen component={Diet} name={DIET} />
      <Stack.Screen component={Meditation} name={MEDITATION} />
      <Stack.Screen component={Progress} name={PROGRESS} />
      <Stack.Screen component={Profile} name={PROFILE} />
      <Stack.Screen component={ProfileUpdate} name={PROFILE_UPDATE} />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        swipeEnabled: false,
        drawerStyle: {
          width: GLOBAL.SCREEN_WIDTH - 100,
        },
        drawerPosition: 'left',
      }}
      drawerContent={props => {
        return <DrawerComponent {...props} />;
      }}
    >
      <Drawer.Screen
        component={NavigationObject}
        name={GLOBAL.PAGE.HOME_NAVIGATION}
      />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: 'white' },
        animationEnabled: Platform.select({
          ios: true,
          android: false,
        }),
      }}
    >
      <Stack.Screen component={Welcome} name={GLOBAL.PAGE.WELCOME} />
      <Stack.Screen component={Login} name={GLOBAL.PAGE.LOGIN} />
    </Stack.Navigator>
  );
};

const InitialNav = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const { DRAWER_NAVIGATION } = GLOBAL.PAGE;

  if (!isLoggedIn) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: 'white' },
        animationEnabled: Platform.select({
          ios: true,
          android: false,
        }),
      }}
    >
      <Stack.Screen name={DRAWER_NAVIGATION}>
        {props => <DrawerNavigation {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InitialNav;
