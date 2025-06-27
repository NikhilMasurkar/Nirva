import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GLOBAL } from './global';
import Home from './screens/Home';
import DrawerComponent from './Components/DrawerComponent/DrawerComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NavigationObject = () => {
  const { HOME } = GLOBAL.PAGE;
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
          width: GLOBAL.SCREEN_WIDTH - 120,
        },
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
const LoginNavigation = () => {
  const { DRAWER_NAVIGATION } = GLOBAL.PAGE;

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

export default LoginNavigation;
