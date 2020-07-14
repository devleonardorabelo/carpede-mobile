import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Signin from '../pages/Store/Signin';
import Signup from '../pages/Store/Signup';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },
    }}
  >
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Signin" component={Signin} />
    <AppStack.Screen name="Signup" component={Signup} />
  </AppStack.Navigator>
);
export default AppRoutes;
