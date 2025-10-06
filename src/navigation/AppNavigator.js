import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import colors from '../constants/colors';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Admin Screens
import AdminDashboard from '../screens/admin/dashboard/AdminDashboard';
import AdminUsersScreen from '../screens/admin/users/AdminUsersScreen';
import AdminPropertiesScreen from '../screens/admin/properties/AdminPropertiesScreen';
import AdminBookingsScreen from '../screens/admin/bookings/AdminBookingsScreen';
import AdminSettingsScreen from '../screens/admin/settings/AdminSettingsScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PropertiesScreen from '../screens/properties/PropertiesScreen';
import PropertyDetailScreen from '../screens/properties/PropertyDetailScreen';
import AddPropertyScreen from '../screens/properties/AddPropertyScreen';
import BookingsScreen from '../screens/bookings/BookingsScreen';
import BookingDetailScreen from '../screens/bookings/BookingDetailScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DashboardMain" component={DashboardScreen} />
  </Stack.Navigator>
);

const PropertiesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="PropertiesList" component={PropertiesScreen} />
    <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
    <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
  </Stack.Navigator>
);

const BookingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="BookingsList" component={BookingsScreen} />
    <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="AnalyticsMain" component={AnalyticsScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'AdminDashboard') {
          iconName = focused ? 'analytics' : 'analytics-outline';
        } else if (route.name === 'Users') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'AdminProperties') {
          iconName = focused ? 'business' : 'business-outline';
        } else if (route.name === 'AdminBookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'AdminSettings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray400,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopColor: colors.gray200,
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    })}
  >
    <Tab.Screen 
      name="AdminDashboard" 
      component={AdminDashboard}
      options={{ tabBarLabel: 'Dashboard' }}
    />
    <Tab.Screen 
      name="Users" 
      component={AdminUsersScreen}
      options={{ tabBarLabel: 'Users' }}
    />
    <Tab.Screen 
      name="AdminProperties" 
      component={AdminPropertiesScreen}
      options={{ tabBarLabel: 'Properties' }}
    />
    <Tab.Screen 
      name="AdminBookings" 
      component={AdminBookingsScreen}
      options={{ tabBarLabel: 'Bookings' }}
    />
    <Tab.Screen 
      name="AdminSettings" 
      component={AdminSettingsScreen}
      options={{ tabBarLabel: 'Settings' }}
    />
  </Tab.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Properties') {
          iconName = focused ? 'business' : 'business-outline';
        } else if (route.name === 'Bookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Analytics') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray400,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopColor: colors.gray200,
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    })}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={DashboardStack}
      options={{ tabBarLabel: 'Dashboard' }}
    />
    <Tab.Screen 
      name="Properties" 
      component={PropertiesStack}
      options={{ tabBarLabel: 'Properties' }}
    />
    <Tab.Screen 
      name="Bookings" 
      component={BookingsStack}
      options={{ tabBarLabel: 'Bookings' }}
    />
    <Tab.Screen 
      name="Analytics" 
      component={AnalyticsStack}
      options={{ tabBarLabel: 'Analytics' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStack}
      options={{ tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    // Return loading screen component
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        user?.role === 'admin' ? <AdminTabs /> : <MainTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;