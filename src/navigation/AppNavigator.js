import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import colors from '../constants/colors';
import CustomBottomTabBar from '../components/navigation/CustomBottomTabBar';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Admin Screens
import AdminDashboard from '../screens/admin/dashboard/AdminDashboard';
import AdminUsersScreen from '../screens/admin/users/AdminUsersScreen';
import AdminPropertiesScreen from '../screens/admin/properties/AdminPropertiesScreen';
import AdminSettingsScreen from '../screens/admin/settings/AdminSettingsScreen';
import PropertyApprovalScreen from '../screens/admin/properties/PropertyApprovalScreen';
import PropertyDetailAdminScreen from '../screens/admin/properties/PropertyDetailAdminScreen';
import KYCVerificationScreen from '../screens/admin/users/KYCVerificationScreen';

// Merchant Screens
import DashboardScreen from '../screens/merchant/dashboard/DashboardScreen';
import PropertiesScreen from '../screens/merchant/properties/PropertiesScreen';
import PropertyDetailScreen from '../screens/merchant/properties/PropertyDetailScreen';
import AddPropertyScreen from '../screens/merchant/properties/AddPropertyScreen';
import RoomDetailScreen from '../screens/merchant/rooms/RoomDetailScreen';
import AddRoomScreen from '../screens/merchant/rooms/AddRoomScreen';
import StudentProfileScreen from '../screens/merchant/members/StudentProfileScreen';
import AddMemberScreen from '../screens/merchant/members/AddMemberScreen';
import MembersScreen from '../screens/merchant/members/MembersScreen';
import BookingsScreen from '../screens/merchant/bookings/BookingsScreen';
import BookingDetailScreen from '../screens/merchant/bookings/BookingDetailScreen';
import AnalyticsScreen from '../screens/merchant/analytics/AnalyticsScreen';
import ProfileScreen from '../screens/merchant/profile/ProfileScreen';
import EditProfileScreen from '../screens/merchant/profile/EditProfileScreen';
import SettingsScreen from '../screens/merchant/profile/SettingsScreen';

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
    <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
    <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
    <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
    <Stack.Screen name="AddRoom" component={AddRoomScreen} />
    <Stack.Screen name="AddMember" component={AddMemberScreen} />
  </Stack.Navigator>
);

const MembersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="MembersList" component={MembersScreen} />
    <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
    <Stack.Screen name="AddMember" component={AddMemberScreen} />
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

const AdminPropertiesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="AdminPropertiesList" component={AdminPropertiesScreen} />
    <Stack.Screen name="PropertyDetailAdmin" component={PropertyDetailAdminScreen} />
    <Stack.Screen name="PropertyApproval" component={PropertyApprovalScreen} />
  </Stack.Navigator>
);

const AdminUsersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="AdminUsersList" component={AdminUsersScreen} />
    <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
  </Stack.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    tabBar={props => <CustomBottomTabBar {...props} userRole="admin" />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen 
      name="AdminDashboard" 
      component={AdminDashboard}
      options={{ tabBarLabel: 'Dashboard' }}
    />
    <Tab.Screen 
      name="Users" 
      component={AdminUsersStack}
      options={{ tabBarLabel: 'Users' }}
    />
    <Tab.Screen 
      name="AdminProperties" 
      component={AdminPropertiesStack}
      options={{ tabBarLabel: 'Properties' }}
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
    tabBar={props => <CustomBottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
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
      name="Members" 
      component={MembersStack}
      options={{ tabBarLabel: 'Members' }}
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