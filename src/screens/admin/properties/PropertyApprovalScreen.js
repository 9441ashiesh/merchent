import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

const PropertyApprovalScreen = ({ route, navigation }) => {
  const { property } = route.params;
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const handleApprove = () => {
    Alert.alert(
      'Approve Property',
      'Are you sure you want to approve this property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => {
            // API call to approve property
            console.log('Property approved:', property.id);
            Alert.alert('Success', 'Property has been approved!');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      Alert.alert('Error', 'Please provide a reason for rejection');
      return;
    }
    
    // API call to reject property
    console.log('Property rejected:', property.id, 'Reason:', rejectionReason);
    Alert.alert('Success', 'Property has been rejected!');
    setShowRejectModal(false);
    navigation.goBack();
  };

  const handleRequestChanges = () => {
    Alert.alert(
      'Request Changes',
      'Send feedback to merchant about required changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => {
            console.log('Changes requested for property:', property.id);
            Alert.alert('Success', 'Merchant has been notified!');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Property Approval</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, styles[`status${property.status}`]]}>
            <Text style={styles.statusText}>{property.status}</Text>
          </View>
          <Text style={styles.submittedDate}>
            Submitted: {new Date(property.submittedDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Property Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.images[selectedImage] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
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
        </View>

        {/* Property Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Property Name:</Text>
            <Text style={styles.value}>{property.name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{property.type}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{property.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{property.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Rooms:</Text>
            <Text style={styles.value}>{property.totalRooms}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Beds:</Text>
            <Text style={styles.value}>{property.totalBeds}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Price Range:</Text>
            <Text style={styles.value}>₹{property.minPrice} - ₹{property.maxPrice}/month</Text>
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
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Merchant Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Merchant Details</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Merchant Name:</Text>
            <Text style={styles.value}>{property.merchantName}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{property.merchantPhone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{property.merchantEmail}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>KYC Status:</Text>
            <View style={[styles.kycBadge, property.kycVerified ? styles.kycVerified : styles.kycPending]}>
              <Text style={styles.kycText}>
                {property.kycVerified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>

        {/* Verification Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Checklist</Text>
          
          <View style={styles.checklistItem}>
            <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
            <Text style={styles.checklistText}>Property images are clear and authentic</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
            <Text style={styles.checklistText}>Property details are accurate</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
            <Text style={styles.checklistText}>Amenities listed are valid</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
            <Text style={styles.checklistText}>Location and address verified</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
            <Text style={styles.checklistText}>Merchant KYC is verified</Text>
          </View>
        </View>

        {/* Admin Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Notes (Internal)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add internal notes about this property..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Action Buttons */}
      {property.status === 'Pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => setShowRejectModal(true)}
          >
            <Ionicons name="close-circle" size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.changesButton]}
            onPress={handleRequestChanges}
          >
            <Ionicons name="create-outline" size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Request Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={handleApprove}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Rejection Modal */}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRejectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reject Property</Text>
            <Text style={styles.modalDescription}>
              Please provide a reason for rejecting this property:
            </Text>
            
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter rejection reason..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={rejectionReason}
              onChangeText={setRejectionReason}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalRejectButton]}
                onPress={handleReject}
              >
                <Text style={styles.modalButtonText}>Reject Property</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusPending: {
    backgroundColor: colors.warning + '20',
  },
  statusApproved: {
    backgroundColor: colors.success + '20',
  },
  statusRejected: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  submittedDate: {
    fontSize: 14,
    color: colors.gray600,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.gray200,
  },
  thumbnailContainer: {
    marginTop: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
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
  section: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.gray600,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 22,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
  },
  kycBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kycVerified: {
    backgroundColor: colors.success + '20',
  },
  kycPending: {
    backgroundColor: colors.warning + '20',
  },
  kycText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.black,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 14,
    color: colors.gray700,
    marginLeft: 12,
    flex: 1,
  },
  notesInput: {
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.black,
    minHeight: 100,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 6,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  rejectButton: {
    backgroundColor: colors.error,
  },
  changesButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 20,
  },
  reasonInput: {
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.black,
    minHeight: 100,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: colors.gray200,
  },
  modalRejectButton: {
    backgroundColor: colors.error,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});

export default PropertyApprovalScreen;
