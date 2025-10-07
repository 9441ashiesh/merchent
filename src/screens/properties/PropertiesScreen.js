import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';
import { mockProperties } from '../../services/mockData';

const PropertiesScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, male, female, mixed
  const [sortBy, setSortBy] = useState('name'); // name, occupancy, revenue

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    setProperties(mockProperties);
  };

  // Filter and sort properties
  const getFilteredAndSortedProperties = () => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        filterType === 'all' ? true :
        filterType === 'male' ? property.type === 'Male' :
        filterType === 'female' ? property.type === 'Female' :
        filterType === 'mixed' ? property.type === 'Mixed' : true;
      
      return matchesSearch && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'occupancy') {
        const aOccupancy = (a.occupiedRooms / a.totalRooms) * 100;
        const bOccupancy = (b.occupiedRooms / b.totalRooms) * 100;
        return bOccupancy - aOccupancy; // Descending
      } else if (sortBy === 'revenue') {
        return b.monthlyRevenue - a.monthlyRevenue; // Descending
      }
      return 0;
    });

    return filtered;
  };

  const filteredProperties = getFilteredAndSortedProperties();

  const PropertyCard = ({ property }) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      onPress={() => navigation.navigate('PropertyDetail', { property })}
    >
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyName}>{property.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{property.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.location}>{property.location}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{property.occupiedRooms}/{property.totalRooms}</Text>
            <Text style={styles.statLabel}>Rooms</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{property.occupiedBeds}/{property.totalBeds}</Text>
            <Text style={styles.statLabel}>Beds</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{(property.monthlyRevenue / 1000).toFixed(0)}K</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <View style={styles.occupancyBar}>
          <View 
            style={[
              styles.occupancyFill,
              { width: `${(property.occupiedRooms / property.totalRooms) * 100}%` }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Properties</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProperty')}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{properties.length}</Text>
          <Text style={styles.summaryLabel}>Total Properties</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {properties.reduce((sum, p) => sum + p.occupiedRooms, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Active Rooms</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties by name or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.tertiary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter and Sort */}
      <View style={styles.filterSortContainer}>
        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'all' && styles.filterChipActive]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterChipText, filterType === 'all' && styles.filterChipTextActive]}>
              All ({properties.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'male' && styles.filterChipActive]}
            onPress={() => setFilterType('male')}
          >
            <Text style={[styles.filterChipText, filterType === 'male' && styles.filterChipTextActive]}>
              Male ({properties.filter(p => p.type === 'Male').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'female' && styles.filterChipActive]}
            onPress={() => setFilterType('female')}
          >
            <Text style={[styles.filterChipText, filterType === 'female' && styles.filterChipTextActive]}>
              Female ({properties.filter(p => p.type === 'Female').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'mixed' && styles.filterChipActive]}
            onPress={() => setFilterType('mixed')}
          >
            <Text style={[styles.filterChipText, filterType === 'mixed' && styles.filterChipTextActive]}>
              Mixed ({properties.filter(p => p.type === 'Mixed').length})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Sort Dropdown */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort:</Text>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => {
              const options = ['name', 'occupancy', 'revenue'];
              const currentIndex = options.indexOf(sortBy);
              const nextIndex = (currentIndex + 1) % options.length;
              setSortBy(options[nextIndex]);
            }}
          >
            <Text style={styles.sortButtonText}>
              {sortBy === 'name' ? 'Name' : sortBy === 'occupancy' ? 'Occupancy' : 'Revenue'}
            </Text>
            <Ionicons name="swap-vertical" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties List */}
      <ScrollView 
        style={styles.propertiesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
        
        {filteredProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="business-outline" size={64} color={colors.gray300} />
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No Properties Found' : 'No Properties Yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery 
                ? 'Try a different search term' 
                : 'Add your first property to start managing bookings'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => navigation.navigate('AddProperty')}
              >
                <Text style={styles.emptyButtonText}>Add Property</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
  filterSortContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  filterTabs: {
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.large,
    backgroundColor: colors.lightBackground,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  sortLabel: {
    ...typography.caption,
    color: colors.secondary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.medium,
    gap: spacing.xs,
  },
  sortButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  propertiesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.gray200,
  },
  propertyInfo: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  occupancyBar: {
    height: 4,
    backgroundColor: colors.gray200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  occupancyFill: {
    height: '100%',
    backgroundColor: colors.success,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertiesScreen;