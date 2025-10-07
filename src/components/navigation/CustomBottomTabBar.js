import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const CustomBottomTabBar = ({ state, descriptors, navigation, userRole = 'merchant' }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Get icon name based on user role
          let iconName;
          
          if (userRole === 'admin') {
            // Admin portal icons
            if (route.name === 'AdminDashboard') {
              iconName = isFocused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Users') {
              iconName = isFocused ? 'people' : 'people-outline';
            } else if (route.name === 'AdminProperties') {
              iconName = isFocused ? 'business' : 'business-outline';
            } else if (route.name === 'AdminSettings') {
              iconName = isFocused ? 'settings' : 'settings-outline';
            }
          } else {
            // Merchant portal icons
            if (route.name === 'Dashboard') {
              iconName = isFocused ? 'home' : 'home-outline';
            } else if (route.name === 'Properties') {
              iconName = isFocused ? 'business' : 'business-outline';
            } else if (route.name === 'Members') {
              iconName = isFocused ? 'people' : 'people-outline';
            } else if (route.name === 'Analytics') {
              iconName = isFocused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Profile') {
              iconName = isFocused ? 'person' : 'person-outline';
            }
          }

          // All tabs are equal
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={iconName} 
                size={24} 
                color={isFocused ? colors.primary : colors.gray400}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 400,
    width: '100%',
    
    // Shadow for iOS
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    
    // Shadow for Android
    elevation: 8,
    
    // Border
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default CustomBottomTabBar;
