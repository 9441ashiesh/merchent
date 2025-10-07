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
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useAuth } from '../../../context/AuthContext';
import { mockProperties, mockStudents } from '../../../services/mockData';
import colors from '../../../constants/colors';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    occupancyRate: 0,
    avgRating: 0,
    properties: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        totalRevenue: 12500,
        totalBookings: 45,
        occupancyRate: 78,
        avgRating: 4.5,
        properties: 3,
        pendingBookings: 8,
      });
    }, 1000);
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2000, 4500, 3200, 5100, 4800, 6200],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const occupancyData = [
    {
      name: 'Occupied',
      population: 78,
      color: colors.success,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: 'Available',
      population: 22,
      color: colors.gray300,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
  ];

  const StatCard = ({ title, value, icon, color, onPress }) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color={colors.white} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const QuickAction = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color={colors.white} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.name || 'Merchant'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value={`$${dashboardData.totalRevenue.toLocaleString()}`}
            icon="cash-outline"
            color={colors.success}
            onPress={() => navigation.navigate('Analytics')}
          />
          <StatCard
            title="Total Bookings"
            value={dashboardData.totalBookings}
            icon="calendar-outline"
            color={colors.secondary}
            onPress={() => navigation.navigate('Bookings')}
          />
          <StatCard
            title="Occupancy Rate"
            value={`${dashboardData.occupancyRate}%`}
            icon="home-outline"
            color={colors.warning}
            onPress={() => navigation.navigate('Analytics')}
          />
          <StatCard
            title="Average Rating"
            value={dashboardData.avgRating}
            icon="star-outline"
            color={colors.chartPurple}
            onPress={() => navigation.navigate('Properties')}
          />
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Trend (Last 6 Months)</Text>
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

        {/* Occupancy Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Room Occupancy</Text>
          <PieChart
            data={occupancyData}
            width={width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Add Property"
              icon="add-circle-outline"
              color={colors.success}
              onPress={() => navigation.navigate('Properties', { screen: 'AddProperty' })}
            />
            <QuickAction
              title="View Bookings"
              icon="calendar-outline"
              color={colors.secondary}
              onPress={() => navigation.navigate('Bookings')}
            />
            <QuickAction
              title="Analytics"
              icon="stats-chart-outline"
              color={colors.warning}
              onPress={() => navigation.navigate('Analytics')}
            />
            <QuickAction
              title="Settings"
              icon="settings-outline"
              color={colors.primary}
              onPress={() => navigation.navigate('Profile', { screen: 'Settings' })}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Properties</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Properties')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertiesScrollContainer}
          >
            {mockProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={styles.propertyCard}
                onPress={() => navigation.navigate('Properties', { 
                  screen: 'PropertyDetail', 
                  params: { propertyId: property.id } 
                })}
              >
                <Image source={{ uri: property.image }} style={styles.propertyCardImage} />
                <View style={styles.propertyCardOverlay}>
                  <View style={styles.propertyCardHeader}>
                    <Text style={styles.propertyCardName} numberOfLines={1}>
                      {property.name}
                    </Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color={colors.warning} />
                      <Text style={styles.ratingText}>{property.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.propertyCardStats}>
                    <View style={styles.propertyStatItem}>
                      <Ionicons name="bed-outline" size={14} color={colors.white} />
                      <Text style={styles.propertyStatText}>
                        {property.occupiedBeds}/{property.totalBeds}
                      </Text>
                    </View>
                    <View style={styles.propertyStatItem}>
                      <Ionicons name="cash-outline" size={14} color={colors.white} />
                      <Text style={styles.propertyStatText}>
                        ₹{(property.monthlyRevenue / 1000).toFixed(0)}k
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Members */}
        <View style={styles.recentActivity}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Members</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Members')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {mockStudents.slice(0, 5).map((student) => (
              <TouchableOpacity
                key={student.id}
                style={styles.activityItem}
                onPress={() => navigation.navigate('Members', {
                  screen: 'StudentProfile',
                  params: { student }
                })}
              >
                <Image source={{ uri: student.photo }} style={styles.memberAvatar} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{student.name}</Text>
                  <View style={styles.memberDetailsRow}>
                    <Ionicons name="call-outline" size={12} color={colors.textSecondary} />
                    <Text style={styles.activityTime}>{student.phone}</Text>
                  </View>
                </View>
                <View style={[
                  styles.paymentStatusBadge,
                  { backgroundColor: student.paymentStatus === 'paid' ? colors.success + '15' : 
                    student.paymentStatus === 'pending' ? colors.warning + '15' : colors.error + '15' }
                ]}>
                  <Text style={[
                    styles.paymentStatusText,
                    { color: student.paymentStatus === 'paid' ? colors.success : 
                      student.paymentStatus === 'pending' ? colors.warning : colors.error }
                  ]}>
                    {student.paymentStatus || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
  scrollContent: {
    paddingBottom: 100, // Space for floating tab bar
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
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
  propertiesScrollContainer: {
    paddingRight: 20,
  },
  propertyCard: {
    width: 240,
    height: 160,
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
  propertyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyCardName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  propertyCardStats: {
    flexDirection: 'row',
    gap: 12,
  },
  propertyStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  propertyStatText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
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
  memberAvatar: {
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
  memberDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  paymentStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paymentStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default DashboardScreen;