import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';
import { mockProperties } from '../../services/mockData';

export default function PropertyListScreen({ navigation }) {
  const renderPropertyCard = ({ item }) => {
    const occupancyRate = ((item.occupiedBeds / item.totalBeds) * 100).toFixed(0);
    
    return (
      <TouchableOpacity 
        style={styles.propertyCard}
        onPress={() => navigation.navigate('PropertyDetail', { property: item })}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.propertyImage} />
        
        <View style={styles.propertyInfo}>
          <View style={styles.propertyHeader}>
            <View style={styles.propertyTitleContainer}>
              <Text style={styles.propertyName}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
            
            <View style={styles.occupancyBadge}>
              <Text style={styles.occupancyText}>{occupancyRate}%</Text>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={colors.secondary} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="bed-outline" size={18} color={colors.primary} />
              <Text style={styles.statText}>{item.occupiedRooms}/{item.totalRooms} Rooms</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={18} color={colors.primary} />
              <Text style={styles.statText}>{item.occupiedBeds}/{item.totalBeds} Beds</Text>
            </View>
          </View>
          
          <View style={styles.revenueRow}>
            <Ionicons name="cash-outline" size={18} color={colors.success} />
            <Text style={styles.revenueText}>₹{item.monthlyRevenue.toLocaleString('en-IN')}/month</Text>
          </View>
          
          <View style={styles.amenitiesRow}>
            {item.amenities.slice(0, 3).map((amenity, index) => (
              <View key={index} style={styles.amenityTag}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
            {item.amenities.length > 3 && (
              <View style={styles.amenityTag}>
                <Text style={styles.amenityText}>+{item.amenities.length - 3}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Properties</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{mockProperties.length}</Text>
          <Text style={styles.summaryLabel}>Total Properties</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {mockProperties.reduce((sum, p) => sum + p.totalRooms, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Rooms</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {mockProperties.reduce((sum, p) => sum + p.occupiedBeds, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Members</Text>
        </View>
      </View>
      
      <FlatList
        data={mockProperties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.h2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...typography.caption,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.lightBackground,
    marginHorizontal: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.lightBackground,
  },
  propertyInfo: {
    padding: spacing.lg,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  propertyTitleContainer: {
    flex: 1,
  },
  propertyName: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.caption,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  occupancyBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  occupancyText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  locationText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  statText: {
    ...typography.bodySmall,
    marginLeft: spacing.sm,
  },
  revenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  revenueText: {
    ...typography.label,
    color: colors.success,
    marginLeft: spacing.sm,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  amenityTag: {
    backgroundColor: colors.lightBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  amenityText: {
    ...typography.caption,
    color: colors.secondary,
  },
});
