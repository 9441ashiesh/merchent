import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';
import { mockRooms } from '../../services/mockData';

export default function PropertyDetailScreen({ route, navigation }) {
  const { property } = route.params;
  const propertyRooms = mockRooms.filter(room => room.propertyId === property.id);
  
  const getRoomStatusColor = (room) => {
    if (room.occupied === 0) return colors.success;
    if (room.occupied === room.beds) return colors.error;
    return colors.warning;
  };
  
  const getRoomStatusText = (room) => {
    if (room.occupied === 0) return 'Vacant';
    if (room.occupied === room.beds) return 'Full';
    return 'Partial';
  };

  const renderRoomCard = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.roomCard}
        onPress={() => navigation.navigate('RoomDetail', { room: item, property })}
        activeOpacity={0.7}
      >
        <View style={styles.roomHeader}>
          <View style={styles.roomNumberContainer}>
            <Ionicons name="bed" size={24} color={colors.primary} />
            <Text style={styles.roomNumber}>Room {item.roomNumber}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: `${getRoomStatusColor(item)}15` }]}>
            <View style={[styles.statusDot, { backgroundColor: getRoomStatusColor(item) }]} />
            <Text style={[styles.statusText, { color: getRoomStatusColor(item) }]}>
              {getRoomStatusText(item)}
            </Text>
          </View>
        </View>
        
        <View style={styles.roomDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="layers-outline" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>Floor {item.floor}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="resize-outline" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>{item.type}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>{item.occupied}/{item.beds} Beds</Text>
          </View>
        </View>
        
        <View style={styles.roomFooter}>
          <View style={styles.rentContainer}>
            <Text style={styles.rentLabel}>Rent</Text>
            <Text style={styles.rentAmount}>₹{item.rent.toLocaleString('en-IN')}/month</Text>
          </View>
          
          <View style={styles.revenueContainer}>
            <Text style={styles.revenueLabel}>Revenue</Text>
            <Text style={styles.revenueAmount}>
              ₹{(item.rent * item.occupied).toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Group rooms by floor
  const roomsByFloor = propertyRooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header with property image */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: property.image }} style={styles.headerImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Info */}
        <View style={styles.propertyInfoCard}>
          <Text style={styles.propertyName}>{property.name}</Text>
          
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color={colors.secondary} />
            <Text style={styles.locationText}>{property.address}</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="bed-outline" size={24} color={colors.primary} />
              <Text style={styles.statValue}>{property.totalRooms}</Text>
              <Text style={styles.statLabel}>Total Rooms</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle-outline" size={24} color={colors.success} />
              <Text style={styles.statValue}>{property.occupiedRooms}</Text>
              <Text style={styles.statLabel}>Occupied</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="people-outline" size={24} color={colors.info} />
              <Text style={styles.statValue}>{property.occupiedBeds}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="cash-outline" size={24} color={colors.warning} />
              <Text style={styles.statValue}>₹{(property.monthlyRevenue / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
          </View>
        </View>
        
        {/* Rooms by Floor */}
        <View style={styles.roomsSection}>
          <Text style={styles.sectionTitle}>Rooms ({propertyRooms.length})</Text>
          
          {Object.keys(roomsByFloor).sort().map(floor => (
            <View key={floor} style={styles.floorSection}>
              <Text style={styles.floorTitle}>Floor {floor}</Text>
              {roomsByFloor[floor].map(room => (
                <View key={room.id}>
                  {renderRoomCard({ item: room })}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 220,
    backgroundColor: colors.lightBackground,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyInfoCard: {
    backgroundColor: colors.white,
    marginTop: -30,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  propertyName: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  locationText: {
    ...typography.bodySmall,
    marginLeft: spacing.sm,
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.h3,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    textAlign: 'center',
  },
  roomsSection: {
    padding: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.lg,
  },
  floorSection: {
    marginBottom: spacing.xl,
  },
  floorTitle: {
    ...typography.h4,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  roomCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roomNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomNumber: {
    ...typography.h4,
    marginLeft: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  roomDetails: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  detailText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
    marginBottom: spacing.sm,
  },
  rentContainer: {
    flex: 1,
  },
  rentLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  rentAmount: {
    ...typography.label,
    color: colors.primary,
  },
  revenueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  revenueLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  revenueAmount: {
    ...typography.label,
    color: colors.success,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
  },
  viewButtonText: {
    ...typography.label,
    color: colors.primary,
    marginRight: spacing.xs,
  },
});