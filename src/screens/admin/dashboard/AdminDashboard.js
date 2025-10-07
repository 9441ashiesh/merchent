import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAuth } from '../../../context/AuthContext';
import colors from '../../../constants/colors';

const { width } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
  const { user } = useAuth();
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalMerchants: 0,
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    loadAdminStats();
  }, []);

  const loadAdminStats = () => {
    // Simulate API call
    setTimeout(() => {
      setAdminStats({
        totalUsers: 1245,
        totalMerchants: 85,
        totalProperties: 325,
        totalBookings: 2456,
        totalRevenue: 125000,
        pendingApprovals: 12,
      });
    }, 1000);
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [15000, 25000, 18000, 32000, 28000, 35000],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [150, 200, 180, 250, 220, 300],
      },
    ],
  };

  const StatCard = ({ title, value, icon, color, change, onPress }) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={20} color={colors.white} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      {change && (
        <View style={styles.changeContainer}>
          <Ionicons 
            name={change > 0 ? "trending-up" : "trending-down"} 
            size={12} 
            color={change > 0 ? colors.success : colors.error} 
          />
          <Text style={[
            styles.changeText, 
            { color: change > 0 ? colors.success : colors.error }
          ]}>
            {Math.abs(change)}%
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const QuickAction = ({ title, icon, color, onPress, count }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color={colors.white} />
        {count > 0 && (
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Admin Dashboard</Text>
            <Text style={styles.userName}>Welcome, {user?.name || 'Admin'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{adminStats.pendingApprovals}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Users"
            value={adminStats.totalUsers.toLocaleString()}
            icon="people-outline"
            color={colors.secondary}
            change={12}
            onPress={() => navigation.navigate('Users')}
          />
          <StatCard
            title="Total Merchants"
            value={adminStats.totalMerchants}
            icon="business-outline"
            color={colors.success}
            change={8}
            onPress={() => navigation.navigate('Merchants')}
          />
          <StatCard
            title="Properties"
            value={adminStats.totalProperties}
            icon="home-outline"
            color={colors.warning}
            change={15}
            onPress={() => navigation.navigate('Properties')}
          />
          <StatCard
            title="Total Bookings"
            value={adminStats.totalBookings.toLocaleString()}
            icon="calendar-outline"
            color={colors.chartPurple}
            change={-3}
            onPress={() => navigation.navigate('Bookings')}
          />
        </View>

        {/* Revenue Overview */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Platform Revenue Overview</Text>
          <View style={styles.revenueHeader}>
            <Text style={styles.revenueAmount}>
              ₹{adminStats.totalRevenue.toLocaleString()}
            </Text>
            <View style={styles.revenueChange}>
              <Ionicons name="trending-up" size={16} color={colors.success} />
              <Text style={[styles.changeText, { color: colors.success }]}>+18%</Text>
            </View>
          </View>
          <LineChart
            data={revenueData}
            width={width - 40}
            height={200}
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: colors.secondary,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* User Growth Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly User Growth</Text>
          <BarChart
            data={userGrowthData}
            width={width - 40}
            height={200}
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="User Management"
              icon="people-outline"
              color={colors.secondary}
              onPress={() => navigation.navigate('Users')}
            />
            <QuickAction
              title="Property Approvals"
              icon="checkmark-circle-outline"
              color={colors.warning}
              count={adminStats.pendingApprovals}
              onPress={() => navigation.navigate('Properties')}
            />
            <QuickAction
              title="System Settings"
              icon="settings-outline"
              color={colors.primary}
              onPress={() => navigation.navigate('Settings')}
            />
            <QuickAction
              title="Reports"
              icon="document-text-outline"
              color={colors.success}
              onPress={() => navigation.navigate('Reports')}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Properties</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Properties')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertiesScroll}
          >
            <TouchableOpacity style={styles.propertyCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400' }} 
                style={styles.propertyCardImage} 
              />
              <View style={styles.propertyCardOverlay}>
                <Text style={styles.propertyCardName}>Sunshine Hostel</Text>
                <View style={styles.propertyCardInfo}>
                  <Ionicons name="location" size={12} color={colors.white} />
                  <Text style={styles.propertyCardLocation}>Mumbai</Text>
                </View>
                <View style={styles.propertyStatusBadge}>
                  <Text style={styles.propertyStatusText}>Pending</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.propertyCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400' }} 
                style={styles.propertyCardImage} 
              />
              <View style={styles.propertyCardOverlay}>
                <Text style={styles.propertyCardName}>Green Valley PG</Text>
                <View style={styles.propertyCardInfo}>
                  <Ionicons name="location" size={12} color={colors.white} />
                  <Text style={styles.propertyCardLocation}>Pune</Text>
                </View>
                <View style={[styles.propertyStatusBadge, { backgroundColor: colors.success }]}>
                  <Text style={styles.propertyStatusText}>Approved</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.propertyCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }} 
                style={styles.propertyCardImage} 
              />
              <View style={styles.propertyCardOverlay}>
                <Text style={styles.propertyCardName}>City Center</Text>
                <View style={styles.propertyCardInfo}>
                  <Ionicons name="location" size={12} color={colors.white} />
                  <Text style={styles.propertyCardLocation}>Bangalore</Text>
                </View>
                <View style={styles.propertyStatusBadge}>
                  <Text style={styles.propertyStatusText}>Pending</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Merchants */}
        <View style={styles.recentActivity}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Merchants</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Users')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            <TouchableOpacity style={styles.activityItem}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
                style={styles.merchantAvatar} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Rajesh Kumar</Text>
                <View style={styles.merchantInfo}>
                  <Ionicons name="business-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.activityTime}>Sunshine Hostel • Mumbai</Text>
                </View>
              </View>
              <View style={styles.kycBadgeGreen}>
                <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                <Text style={styles.kycBadgeText}>KYC</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=5' }} 
                style={styles.merchantAvatar} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Priya Sharma</Text>
                <View style={styles.merchantInfo}>
                  <Ionicons name="business-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.activityTime}>Green Valley PG • Pune</Text>
                </View>
              </View>
              <View style={styles.kycBadgeYellow}>
                <Ionicons name="time" size={14} color={colors.warning} />
                <Text style={styles.kycBadgeText}>Pending</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=13' }} 
                style={styles.merchantAvatar} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Amit Patel</Text>
                <View style={styles.merchantInfo}>
                  <Ionicons name="business-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.activityTime}>City Center • Bangalore</Text>
                </View>
              </View>
              <View style={styles.kycBadgeRed}>
                <Ionicons name="close-circle" size={14} color={colors.error} />
                <Text style={styles.kycBadgeText}>Rejected</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    margin: '1%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  revenueChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  actionBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  recentActivity: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  propertiesScroll: {
    paddingRight: 20,
  },
  propertyCard: {
    width: 220,
    height: 150,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyCardImage: {
    width: '100%',
    height: '100%',
  },
  propertyCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  propertyCardName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  propertyCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  propertyCardLocation: {
    fontSize: 12,
    color: colors.white,
  },
  propertyStatusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  propertyStatusText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
  },
  activityList: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  merchantAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: colors.gray200,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  merchantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  kycBadgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.success + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  kycBadgeYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  kycBadgeRed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.error + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  kycBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default AdminDashboard;