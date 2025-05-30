import { Tabs } from 'expo-router';
import { StatusBar, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';


export default function Layout() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={Colors.black} 
        translucent={false} 
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.gray,
          tabBarStyle: { 
            backgroundColor: Colors.background,
            height: 50,
            borderTopWidth: 0,        
            elevation: 0,             
          },
          tabBarItemStyle: { 
            alignItems: 'center',
            justifyContent: 'center',
           },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  borderRadius: 2,
                  borderBottomWidth: focused ? 2 : 0,
                  borderBottomColor: focused ? Colors.black : 'transparent',
                  paddingBottom: 2,
                }}>
                <Ionicons
                  name="partly-sunny"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="update"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  borderRadius: 2,
                  borderBottomWidth: focused ? 2 : 0,
                  borderBottomColor: focused ? Colors.black : 'transparent',
                  paddingBottom: 2,
                }}>
                <Ionicons
                  name="settings"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}