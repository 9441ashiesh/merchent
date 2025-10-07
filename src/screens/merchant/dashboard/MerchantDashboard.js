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
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { colors, typography, spacing, borderRadius, commonStyles } from '../../../constants/colors';
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');

const MerchantDashboard = ({ navigation }) => {
  const { user } = useAuth();
  
  // Dashboard Metrics
  const [metrics, setMetrics] = useState({
    totalRooms: 25,
    occupiedRooms: 18,
    vacantRooms: 7,
    totalMembers: 22,
    monthlyRevenue: 45600,
    pendingPayments: 8400,
    occupancyRate: 72,
    collectionRate: 84,
  });

  // Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [28000, 32000, 29500, 35000, 41000, 45600]
    }]
  };

  const occupancyData = {
    labels: ['Single', 'Double', 'Shared'],
    datasets: [{
      data: [85, 75, 65]
    }]
  };

  const paymentStatusData = [
    {
      name: 'Paid',
      population: 37200,
      color: colors.success,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: 8400,
      color: colors.warning,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,  // Dark gray primary
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
      fill: colors.textSecondary,
    },
  };

  // Quick Actions
  const quickActions = [
    { id: 1, title: 'Add New Room', icon: 'add-circle', color: colors.primary, route: 'AddRoom' },
    { id: 2, title: 'Add Member', icon: 'person-add', color: colors.success, route: 'AddMember' },
    { id: 3, title: 'Record Payment', icon: 'wallet', color: colors.warning, route: 'RecordPayment' },
    { id: 4, title: 'Generate Report', icon: 'document-text', color: colors.info, route: 'Reports' },
  ];

  const renderMetricCard = (title, value, icon, trend, trendValue) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        {trend && (
          <View style={[styles.trendBadge, trend === 'up' ? styles.trendUp : styles.trendDown]}>
            <Ionicons 
              name={trend === 'up' ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={trend === 'up' ? colors.success : colors.error} 
            />
            <Text style={[styles.trendText, trend === 'up' ? styles.trendUpText : styles.trendDownText]}>
              {trendValue}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.quickActionCard}
      onPress={() => navigation.navigate(action.route)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
        <Ionicons name={action.icon} size={24} color={action.color} />
      </View>
      <Text style={styles.quickActionText}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Merchant'}</Text>
            <Text style={styles.businessName}>{user?.businessName || 'Your Business'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View style={styles.metricsGrid}>
          {renderMetricCard('Total Rooms', metrics.totalRooms, 'business', null, null)}
          {renderMetricCard('Occupied Rooms', metrics.occupiedRooms, 'bed', 'up', 5)}
          {renderMetricCard('Vacant Rooms', metrics.vacantRooms, 'home', null, null)}
          {renderMetricCard('Total Members', metrics.totalMembers, 'people', 'up', 12)}
        </View>

        <View style={styles.metricsRow}>
          {renderMetricCard('Monthly Revenue', `₹${metrics.monthlyRevenue.toLocaleString()}`, 'cash', 'up', 8)}
          {renderMetricCard('Pending Payments', `₹${metrics.pendingPayments.toLocaleString()}`, 'alert-circle', null, null)}
        </View>

        {/* Charts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Revenue Trend</Text>
          <View style={styles.chartCard}>
            <LineChart
              data={revenueData}
              width={width - 64}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Occupancy by Room Type</Text>
          <View style={styles.chartCard}>
            <BarChart
              data={occupancyData}
              width={width - 64}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              }}
              style={styles.chart}
              showValuesOnTopOfBars
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <View style={styles.chartCard}>
            <PieChart
              data={paymentStatusData}
              width={width - 64}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${colors.success}20` }]}>
                <Ionicons name="person-add" size={20} color={colors.success} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>New member added</Text>
                <Text style={styles.activitySubtitle}>Rahul Kumar - Room 101</Text>
              </View>
              <Text style={styles.activityTime}>2h ago</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${colors.warning}20` }]}>
                <Ionicons name="cash" size={20} color={colors.warning} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Payment pending</Text>
                <Text style={styles.activitySubtitle}>Priya Sharma - ₹4,500</Text>
              </View>
              <Text style={styles.activityTime}>5h ago</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Payment received</Text>
                <Text style={styles.activitySubtitle}>Amit Patel - ₹5,000</Text>
              </View>
              <Text style={styles.activityTime}>1d ago</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  greeting: {
    ...typography.bodyMedium,
  },
  userName: {
    ...typography.h2,
    marginTop: spacing.xs,
  },
  businessName: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...commonStyles.card.shadowColor && {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    margin: spacing.sm,
    minWidth: (width - 64) / 2,
    ...commonStyles.card.shadowColor && {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  metricTitle: {
    ...typography.caption,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.small,
  },
  trendUp: {
    backgroundColor: `${colors.success}15`,
  },
  trendDown: {
    backgroundColor: `${colors.error}15`,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  trendUpText: {
    color: colors.success,
  },
  trendDownText: {
    color: colors.error,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  viewAllText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  chartCard: {
    ...commonStyles.card,
    alignItems: 'center',
  },
  chart: {
    borderRadius: borderRadius.small,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  quickActionCard: {
    width: (width - 64) / 2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    margin: spacing.sm,
    alignItems: 'center',
    ...commonStyles.card.shadowColor && {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  quickActionText: {
    ...typography.label,
    textAlign: 'center',
  },
  activityCard: {
    ...commonStyles.card,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  activitySubtitle: {
    ...typography.caption,
  },
  activityTime: {
    ...typography.caption,
    color: colors.tertiary,
  },
});

export default MerchantDashboard;
