import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';
import { mockStudents, mockProperties, mockRooms } from '../../../services/mockData';

const BookingsScreen = ({ navigation }) => {
  const [filterType, setFilterType] = useState('all'); // all, paid, pending, overdue
  const [searchQuery, setSearchQuery] = useState('');

  // Create bookings from students data
  const allBookings = mockStudents
    .filter(student => student.roomId !== null)
    .map(student => {
      const property = mockProperties.find(p => p.id === student.propertyId);
      const room = mockRooms.find(r => r.id === student.roomId);
      return {
        id: student.id,
        student,
        property,
        room,
        status: student.paymentStatus,
      };
    });

  // Filter bookings
  const filteredBookings = allBookings.filter(booking => {
    const matchesSearch = 
      booking.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.property?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'paid' ? booking.status === 'paid' :
      filterType === 'pending' ? booking.status === 'pending' :
      filterType === 'overdue' ? booking.status === 'overdue' : true;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'overdue': return 'alert-circle';
      default: return 'ellipse';
    }
  };

  const renderBookingCard = ({ item: booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetail', { booking })}
      activeOpacity={0.7}
    >
      {/* Property Image */}
      <Image 
        source={{ uri: booking.property?.image }} 
        style={styles.propertyImage} 
      />
      
      <View style={styles.bookingContent}>
        {/* Header with Property and Status */}
        <View style={styles.bookingHeader}>
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyName} numberOfLines={1}>
              {booking.property?.name}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color={colors.textSecondary} />
              <Text style={styles.locationText} numberOfLines={1}>
                {booking.property?.location}
              </Text>
            </View>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(booking.status)}15` }
          ]}>
            <Ionicons 
              name={getStatusIcon(booking.status)} 
              size={12} 
              color={getStatusColor(booking.status)} 
            />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(booking.status) }
            ]}>
              {booking.status}
            </Text>
          </View>
        </View>

        {/* Student Info */}
        <View style={styles.studentRow}>
          <Image 
            source={{ uri: booking.student.photo }} 
            style={styles.studentPhoto} 
          />
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{booking.student.name}</Text>
            <View style={styles.roomRow}>
              <Ionicons name="bed" size={12} color={colors.secondary} />
              <Text style={styles.roomText}>
                Room {booking.room?.roomNumber} • {booking.room?.type}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentRow}>
          <View style={styles.rentInfo}>
            <Text style={styles.rentLabel}>Monthly Rent</Text>
            <Text style={styles.rentValue}>₹{booking.student.rent?.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Next Payment</Text>
            <Text style={styles.dateValue}>
              {booking.student.nextPayment ? 
                new Date(booking.student.nextPayment).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short' 
                }) : 'N/A'
              }
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const paidCount = allBookings.filter(b => b.status === 'paid').length;
  const pendingCount = allBookings.filter(b => b.status === 'pending').length;
  const overdueCount = allBookings.filter(b => b.status === 'overdue').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Stats */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Bookings</Text>
          <Text style={styles.headerSubtitle}>
            {filteredBookings.length} of {allBookings.length} bookings
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or property..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'all' && styles.filterTabActive]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterTabText, filterType === 'all' && styles.filterTabTextActive]}>
            All ({allBookings.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'paid' && styles.filterTabActive]}
          onPress={() => setFilterType('paid')}
        >
          <Text style={[styles.filterTabText, filterType === 'paid' && styles.filterTabTextActive]}>
            Paid ({paidCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'pending' && styles.filterTabActive]}
          onPress={() => setFilterType('pending')}
        >
          <Text style={[styles.filterTabText, filterType === 'pending' && styles.filterTabTextActive]}>
            Pending ({pendingCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'overdue' && styles.filterTabActive]}
          onPress={() => setFilterType('overdue')}
        >
          <Text style={[styles.filterTabText, filterType === 'overdue' && styles.filterTabTextActive]}>
            Overdue ({overdueCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery 
                ? 'Try a different search term' 
                : 'Add members to see bookings here'}
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  headerTitle: {
    ...typography.h2,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  searchContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.lightBackground,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.lightBackground,
  },
  bookingContent: {
    padding: spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  propertyInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  propertyName: {
    ...typography.h5,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
    gap: spacing.sm,
  },
  studentPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBackground,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomText: {
    ...typography.caption,
    color: colors.secondary,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
  },
  rentInfo: {
    flex: 1,
  },
  rentLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  rentValue: {
    ...typography.label,
    color: colors.primary,
    fontSize: 16,
  },
  dateInfo: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  dateValue: {
    ...typography.label,
    color: colors.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  emptyText: {
    ...typography.h4,
    color: colors.secondary,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default BookingsScreen;