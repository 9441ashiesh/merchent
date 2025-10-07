import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

const { width } = Dimensions.get('window');

const PropertyDetailAdminScreen = ({ route, navigation }) => {
  const { property } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);

  const stats = [
    { label: 'Total Rooms', value: property.totalRooms, icon: 'bed-outline' },
    { label: 'Total Beds', value: property.totalBeds, icon: 'people-outline' },
    { label: 'Occupancy', value: property.occupancy + '%', icon: 'stats-chart-outline' },
    { label: 'Rating', value: property.rating.toFixed(1), icon: 'star' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Property Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.images[selectedImage] }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        {/* Status Badge */}
        <View style={[styles.statusBadge, styles[`status${property.status}`]]}>
          <Text style={styles.statusText}>{property.status}</Text>
        </View>

        {/* Image Counter */}
        <View style={styles.imageCounter}>
          <Ionicons name="images-outline" size={16} color={colors.white} />
          <Text style={styles.imageCounterText}>
            {selectedImage + 1}/{property.images.length}
          </Text>
        </View>
      </View>

      {/* Thumbnail Gallery */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailScroll}
        contentContainerStyle={styles.thumbnailContainer}
      >
        {property.images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(index)}
            style={[
              styles.thumbnail,
              selectedImage === index && styles.thumbnailSelected,
            ]}
          >
            <Image source={{ uri: image }} style={styles.thumbnailImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Property Info */}
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName}>{property.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={colors.gray600} />
            <Text style={styles.location}>{property.location}</Text>
          </View>
          <Text style={styles.address}>{property.address}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={24} color={colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Minimum Price:</Text>
              <Text style={styles.priceValue}>₹{property.minPrice.toLocaleString()}/month</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Maximum Price:</Text>
              <Text style={styles.priceValue}>₹{property.maxPrice.toLocaleString()}/month</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityChip}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Merchant Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Merchant Details</Text>
            <TouchableOpacity style={styles.viewMerchantButton}>
              <Text style={styles.viewMerchantText}>View Profile</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.merchantCard}>
            <View style={styles.merchantHeader}>
              <View style={styles.merchantAvatar}>
                <Text style={styles.merchantInitial}>{property.merchantName[0]}</Text>
              </View>
              <View style={styles.merchantInfo}>
                <Text style={styles.merchantName}>{property.merchantName}</Text>
                <View style={styles.kycRow}>
                  <Ionicons
                    name={property.kycVerified ? 'checkmark-circle' : 'time-outline'}
                    size={16}
                    color={property.kycVerified ? colors.success : colors.warning}
                  />
                  <Text style={styles.kycText}>
                    KYC {property.kycVerified ? 'Verified' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.contactInfo}>
              <View style={styles.contactRow}>
                <Ionicons name="call-outline" size={20} color={colors.gray600} />
                <Text style={styles.contactText}>{property.merchantPhone}</Text>
              </View>
              <View style={styles.contactRow}>
                <Ionicons name="mail-outline" size={20} color={colors.gray600} />
                <Text style={styles.contactText}>{property.merchantEmail}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Property Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Total Views</Text>
            <Text style={styles.metricValue}>1,234</Text>
          </View>
          
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Bookings (Total)</Text>
            <Text style={styles.metricValue}>45</Text>
          </View>
          
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Average Occupancy</Text>
            <Text style={styles.metricValue}>{property.occupancy}%</Text>
          </View>
          
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Member Since</Text>
            <Text style={styles.metricValue}>
              {new Date(property.submittedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </Text>
          </View>
        </View>

        {/* Admin Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Actions</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="create-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Edit Property Details</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="eye-off-outline" size={24} color={colors.warning} />
            <Text style={styles.actionText}>Hide from Listings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="flag-outline" size={24} color={colors.error} />
            <Text style={styles.actionText}>Report Issue</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      {property.status === 'Pending' && (
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={[styles.bottomButton, styles.rejectBottomButton]}
            onPress={() => navigation.navigate('PropertyApproval', { property })}
          >
            <Text style={styles.bottomButtonText}>Review & Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  moreButton: {
    padding: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: width,
    height: 300,
    backgroundColor: colors.gray200,
  },
  statusBadge: {
    position: 'absolute',
    top: 120,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
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
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  imageCounterText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  thumbnailScroll: {
    backgroundColor: colors.white,
  },
  thumbnailContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailSelected: {
    borderColor: colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  propertyInfo: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: colors.gray600,
    marginLeft: 4,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: colors.gray500,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray600,
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  viewMerchantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewMerchantText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  priceCard: {
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 22,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  amenityText: {
    fontSize: 13,
    color: colors.black,
    fontWeight: '500',
  },
  merchantCard: {
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 16,
  },
  merchantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  merchantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kycText: {
    fontSize: 13,
    color: colors.gray600,
  },
  contactInfo: {
    gap: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: colors.gray700,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
    marginLeft: 12,
  },
  bottomActions: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  bottomButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectBottomButton: {
    backgroundColor: colors.primary,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default PropertyDetailAdminScreen;
