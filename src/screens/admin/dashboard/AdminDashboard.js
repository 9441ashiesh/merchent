import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.success }]}>
                <Ionicons name="person-add" size={16} color={colors.white} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New merchant registered</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.warning }]}>
                <Ionicons name="home" size={16} color={colors.white} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Property pending approval</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.error }]}>
                <Ionicons name="flag" size={16} color={colors.white} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>User reported an issue</Text>
                <Text style={styles.activityTime}>6 hours ago</Text>
              </View>
            </View>
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
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default AdminDashboard;