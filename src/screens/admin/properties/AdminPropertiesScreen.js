import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: 'Sunshine Hostel',
    location: 'Mumbai',
    address: '123 Marine Drive, Mumbai, Maharashtra',
    type: 'Boys Hostel',
    totalRooms: 25,
    totalBeds: 100,
    occupancy: 85,
    rating: 4.5,
    status: 'Pending',
    minPrice: 8000,
    maxPrice: 15000,
    merchantName: 'Rajesh Kumar',
    merchantPhone: '+91 98765 43210',
    merchantEmail: 'rajesh@example.com',
    kycVerified: true,
    submittedDate: '2025-01-15',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'AC', 'Laundry', 'Mess', 'Security', 'Parking'],
    description: 'Premium hostel facility with all modern amenities',
  },
  {
    id: 2,
    name: 'Green Valley PG',
    location: 'Pune',
    address: '45 MG Road, Pune, Maharashtra',
    type: 'Girls Hostel',
    totalRooms: 20,
    totalBeds: 60,
    occupancy: 92,
    rating: 4.8,
    status: 'Approved',
    minPrice: 10000,
    maxPrice: 18000,
    merchantName: 'Priya Sharma',
    merchantPhone: '+91 98765 43211',
    merchantEmail: 'priya@example.com',
    kycVerified: true,
    submittedDate: '2025-01-10',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'AC', 'Mess', '24/7 Security', 'CCTV'],
    description: 'Safe and secure accommodation for female students',
  },
  {
    id: 3,
    name: 'City Center Hostel',
    location: 'Bangalore',
    address: '789 Indiranagar, Bangalore, Karnataka',
    type: 'Co-ed Hostel',
    totalRooms: 30,
    totalBeds: 120,
    occupancy: 75,
    rating: 4.2,
    status: 'Pending',
    minPrice: 9000,
    maxPrice: 16000,
    merchantName: 'Amit Patel',
    merchantPhone: '+91 98765 43212',
    merchantEmail: 'amit@example.com',
    kycVerified: false,
    submittedDate: '2025-01-18',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop&sat=-50',
    ],
    amenities: ['WiFi', 'Gym', 'Laundry', 'Cafeteria'],
    description: 'Modern hostel in the heart of the city',
  },
];

const AdminPropertiesScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

  const filteredProperties = mockProperties.filter(property => {
    const matchesTab = selectedTab === 'All' || property.status === selectedTab;
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = mockProperties.filter(p => p.status === 'Pending').length;

  const renderProperty = ({ item }) => {
    if (!item) return null;
    
    return (
      <TouchableOpacity
        style={styles.propertyCard}
        onPress={() => navigation.navigate('PropertyDetailAdmin', { property: item })}
      >
        <Image 
          source={{ uri: item.images?.[0] || 'https://via.placeholder.com/800x600/CCCCCC/FFFFFF?text=No+Image' }} 
          style={styles.propertyImage}
          resizeMode="cover"
        />
        
        {/* Status Badge */}
        <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>

        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName}>{item.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.gray600} />
            <Text style={styles.location}>{item.location}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="bed-outline" size={16} color={colors.gray600} />
              <Text style={styles.statText}>{item.totalRooms} Rooms</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color={colors.gray600} />
              <Text style={styles.statText}>{item.totalBeds} Beds</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.statText}>{item.rating?.toFixed(1) || '0.0'}</Text>
            </View>
          </View>

          <View style={styles.merchantRow}>
            <View style={styles.kycBadge}>
              <Ionicons
                name={item.kycVerified ? 'checkmark-circle' : 'time-outline'}
                size={14}
                color={item.kycVerified ? colors.success : colors.warning}
              />
              <Text style={styles.kycText}>
                {item.kycVerified ? 'KYC Verified' : 'KYC Pending'}
              </Text>
            </View>
            <Text style={styles.merchantName}>{item.merchantName}</Text>
          </View>

          {item.status === 'Pending' && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => navigation.navigate('PropertyApproval', { property: item })}
            >
              <Text style={styles.reviewButtonText}>Review & Approve</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Property Management</Text>
        {pendingCount > 0 && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>{pendingCount} Pending</Text>
          </View>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.gray400} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Properties List */}
      <FlatList
        data={filteredProperties}
        renderItem={renderProperty}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="business-outline" size={64} color={colors.gray300} />
            <Text style={styles.emptyTitle}>No Properties Found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try adjusting your search' : 'No properties in this category'}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  pendingBadge: {
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pendingText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.warning,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    color: colors.black,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray100,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray600,
  },
  tabTextActive: {
    color: colors.white,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.gray200,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusPending: {
    backgroundColor: colors.warning,
  },
  statusApproved: {
    backgroundColor: colors.success,
  },
  statusRejected: {
    backgroundColor: colors.error,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  propertyInfo: {
    padding: 16,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: colors.gray600,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: colors.gray700,
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kycText: {
    fontSize: 12,
    color: colors.gray600,
  },
  merchantName: {
    fontSize: 13,
    color: colors.gray700,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray600,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray500,
    marginTop: 8,
  },
});

export default AdminPropertiesScreen;