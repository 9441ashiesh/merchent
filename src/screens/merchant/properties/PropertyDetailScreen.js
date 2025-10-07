import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';
import { mockProperties, mockRooms } from '../../../services/mockData';

const { width } = Dimensions.get('window');

const PropertyDetailScreen = ({ route, navigation }) => {
  const { propertyId } = route.params;
  const property = mockProperties.find(p => p.id === propertyId);
  const propertyRooms = mockRooms.filter(r => r.propertyId === propertyId);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Property not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderRoomCard = (room) => (
    <TouchableOpacity
      key={room.id}
      style={styles.roomCard}
      onPress={() => navigation.navigate('RoomDetail', { roomId: room.id })}
    >
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{room.name}</Text>
        <View style={[styles.roomStatusBadge, { backgroundColor: room.availableBeds > 0 ? colors.success : colors.error }]}>
          <Text style={styles.roomStatusText}>
            {room.availableBeds > 0 ? 'Available' : 'Full'}
          </Text>
        </View>
      </View>

      <View style={styles.roomStats}>
        <View style={styles.roomStat}>
          <Ionicons name="bed-outline" size={18} color={colors.primary} />
          <Text style={styles.roomStatText}>{room.totalBeds} Beds</Text>
        </View>
        <View style={styles.roomStat}>
          <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
          <Text style={styles.roomStatText}>{room.availableBeds} Available</Text>
        </View>
      </View>

      <View style={styles.roomPriceRow}>
        <Text style={styles.roomPrice}>₹{room.price}/month</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.image }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Property Info */}
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.propertyTitle}>{property.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(property.status) }]}>
                <Text style={styles.statusText}>{property.status}</Text>
              </View>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Ionicons name="home-outline" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{property.totalRooms}</Text>
              <Text style={styles.statLabel}>Total Rooms</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="bed-outline" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{property.totalBeds}</Text>
              <Text style={styles.statLabel}>Total Beds</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="people-outline" size={24} color={colors.success} />
              <Text style={styles.statNumber}>{property.occupiedBeds}</Text>
              <Text style={styles.statLabel}>Occupied</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="cash-outline" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>₹{property.startingPrice}</Text>
              <Text style={styles.statLabel}>Starting Price</Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities?.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              )) || (
                <Text style={styles.noDataText}>No amenities listed</Text>
              )}
            </View>
          </View>

          {/* Rooms List */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Rooms ({propertyRooms.length})</Text>
              <TouchableOpacity
                style={styles.addRoomButton}
                onPress={() => navigation.navigate('AddRoom', { property })}
              >
                <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
                <Text style={styles.addRoomText}>Add Room</Text>
              </TouchableOpacity>
            </View>

            {propertyRooms.length > 0 ? (
              propertyRooms.map(renderRoomCard)
            ) : (
              <View style={styles.emptyRooms}>
                <Ionicons name="bed-outline" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyRoomsText}>No rooms added yet</Text>
                <TouchableOpacity
                  style={styles.addFirstRoomButton}
                  onPress={() => navigation.navigate('AddRoom', { property })}
                >
                  <Text style={styles.addFirstRoomButtonText}>Add Your First Room</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="analytics-outline" size={24} color={colors.primary} />
              <Text style={styles.actionButtonText}>View Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar-outline" size={24} color={colors.primary} />
              <Text style={styles.actionButtonText}>Bookings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return colors.success;
    case 'pending':
      return colors.warning;
    case 'inactive':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: width,
    height: 250,
    backgroundColor: colors.border,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  titleRow: {
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.medium,
    marginLeft: spacing.sm,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  locationText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.xs,
  },
  statBox: {
    width: '50%',
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: spacing.sm,
  },
  amenityText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  noDataText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  addRoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addRoomText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  roomCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  roomName: {
    fontSize: 16,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
  },
  roomStatusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
  },
  roomStatusText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '500',
  },
  roomStats: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  roomStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  roomStatText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  roomPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
  },
  emptyRooms: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyRoomsText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  addFirstRoomButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  addFirstRoomButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginHorizontal: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
  },
});

export default PropertyDetailScreen;
