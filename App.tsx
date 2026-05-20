import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Rss } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { SpotFeed } from './src/screens/Feed';
import { MapScreen } from './src/screens/Map';
import { COLORS, FONT } from './src/theme';

// ─── Tab Navigator ────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: COLORS.bgCard,
                borderTopColor: COLORS.border,
                borderTopWidth: 1,
                paddingBottom: 4,
                height: 60,
              },
              tabBarActiveTintColor: COLORS.brand,
              tabBarInactiveTintColor: COLORS.textMuted,
              tabBarLabelStyle: {
                fontSize: FONT.sizes.xs,
                fontWeight: FONT.weights.semibold,
                marginBottom: 4,
              },
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Feed') {
                  return <Rss size={size} color={color} strokeWidth={2} />;
                }
                return <Map size={size} color={color} strokeWidth={2} />;
              },
            })}
          >
            <Tab.Screen
              name="Feed"
              component={SpotFeed}
              options={{ tabBarLabel: 'Picos' }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{ tabBarLabel: 'Mapa' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
