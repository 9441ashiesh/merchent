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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

const { width } = Dimensions.get('window');

const KYCVerificationScreen = ({ route, navigation }) => {
  const { merchant } = route.params;
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  const documents = [
    {
      id: 1,
      type: 'Business Registration',
      status: 'Uploaded',
      fileName: 'business_license.pdf',
      uploadDate: '2025-01-15',
      image: 'https://via.placeholder.com/400x500/4CAF50/FFFFFF?text=Business+License',
    },
    {
      id: 2,
      type: 'Tax ID / PAN Card',
      status: 'Uploaded',
      fileName: 'pan_card.jpg',
      uploadDate: '2025-01-15',
      image: 'https://via.placeholder.com/400x500/2196F3/FFFFFF?text=PAN+Card',
    },
    {
      id: 3,
      type: 'Address Proof',
      status: 'Uploaded',
      fileName: 'address_proof.pdf',
      uploadDate: '2025-01-15',
      image: 'https://via.placeholder.com/400x500/FF9800/FFFFFF?text=Address+Proof',
    },
    {
      id: 4,
      type: 'Bank Account Details',
      status: 'Uploaded',
      fileName: 'bank_statement.pdf',
      uploadDate: '2025-01-15',
      image: 'https://via.placeholder.com/400x500/9C27B0/FFFFFF?text=Bank+Details',
    },
    {
      id: 5,
      type: 'Owner ID Proof',
      status: 'Uploaded',
      fileName: 'aadhar_card.jpg',
      uploadDate: '2025-01-15',
      image: 'https://via.placeholder.com/400x500/F44336/FFFFFF?text=Aadhar+Card',
    },
  ];

  const handleApprove = () => {
    Alert.alert(
      'Approve KYC',
      'Are you sure you want to approve this merchant\'s KYC verification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => {
            // API call to approve KYC
            console.log('KYC approved for merchant:', merchant.id);
            console.log('Admin notes:', adminNotes);
            Alert.alert('Success', 'Merchant KYC has been approved!');
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
    
    // API call to reject KYC
    console.log('KYC rejected for merchant:', merchant.id, 'Reason:', rejectionReason);
    Alert.alert('Success', 'KYC has been rejected. Merchant has been notified.');
    setShowRejectModal(false);
    navigation.goBack();
  };

  const handleRequestMoreDocs = () => {
    Alert.alert(
      'Request Documents',
      'Send a request to merchant for additional documents?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Request',
          onPress: () => {
            console.log('Requested more documents from merchant:', merchant.id);
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
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Merchant Info Card */}
        <View style={styles.merchantCard}>
          <View style={styles.merchantHeader}>
            <View style={styles.merchantAvatar}>
              <Text style={styles.merchantInitial}>{merchant.name[0]}</Text>
            </View>
            <View style={styles.merchantInfo}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              <Text style={styles.merchantEmail}>{merchant.email}</Text>
              <Text style={styles.merchantPhone}>{merchant.phone}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>KYC Status</Text>
              <View style={[styles.statusBadge, styles[`status${merchant.kycStatus}`]]}>
                <Text style={styles.statusText}>{merchant.kycStatus}</Text>
              </View>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Submitted On</Text>
              <Text style={styles.statusValue}>
                {new Date(merchant.kycSubmittedDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="business-outline" size={20} color={colors.gray600} />
              <Text style={styles.infoText}>{merchant.businessName || 'Not Provided'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color={colors.gray600} />
              <Text style={styles.infoText}>{merchant.city}, {merchant.state}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color={colors.gray600} />
              <Text style={styles.infoText}>
                Joined {new Date(merchant.joinedDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Documents Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submitted Documents</Text>
          <Text style={styles.sectionSubtitle}>
            Review all documents carefully before approval
          </Text>

          {documents.map((doc, index) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.documentCard}
              onPress={() => setSelectedDocument(doc)}
            >
              <View style={styles.documentIcon}>
                <Ionicons
                  name={doc.fileName.endsWith('.pdf') ? 'document-text' : 'image'}
                  size={24}
                  color={colors.primary}
                />
              </View>
              
              <View style={styles.documentInfo}>
                <Text style={styles.documentType}>{doc.type}</Text>
                <Text style={styles.documentFileName}>{doc.fileName}</Text>
                <Text style={styles.documentDate}>
                  Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.documentStatus}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Verification Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Checklist</Text>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>All required documents are submitted</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Documents are clear and readable</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Business registration is valid</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Tax ID / PAN details verified</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Address proof matches business location</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Bank account details verified</Text>
          </View>
          
          <View style={styles.checklistItem}>
            <TouchableOpacity style={styles.checkbox}>
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.checklistText}>Owner ID proof verified</Text>
          </View>
        </View>

        {/* Merchant Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Merchant Activity</Text>
          
          <View style={styles.activityRow}>
            <Text style={styles.activityLabel}>Total Properties:</Text>
            <Text style={styles.activityValue}>{merchant.totalProperties || 0}</Text>
          </View>
          
          <View style={styles.activityRow}>
            <Text style={styles.activityLabel}>Properties Pending Approval:</Text>
            <Text style={styles.activityValue}>{merchant.pendingProperties || 0}</Text>
          </View>
          
          <View style={styles.activityRow}>
            <Text style={styles.activityLabel}>Total Bookings:</Text>
            <Text style={styles.activityValue}>{merchant.totalBookings || 0}</Text>
          </View>
          
          <View style={styles.activityRow}>
            <Text style={styles.activityLabel}>Average Rating:</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.activityValue}>{merchant.rating || '0.0'}</Text>
            </View>
          </View>
        </View>

        {/* Admin Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Notes (Internal)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add verification notes, observations, or special instructions..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={adminNotes}
            onChangeText={setAdminNotes}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Action Buttons */}
      {merchant.kycStatus === 'Pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => setShowRejectModal(true)}
          >
            <Ionicons name="close-circle" size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.docsButton]}
            onPress={handleRequestMoreDocs}
          >
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>
              Request Docs
            </Text>
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

      {/* Document Viewer Modal */}
      <Modal
        visible={selectedDocument !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedDocument(null)}
      >
        <View style={styles.documentModalOverlay}>
          <View style={styles.documentModalContent}>
            <View style={styles.documentModalHeader}>
              <Text style={styles.documentModalTitle}>
                {selectedDocument?.type}
              </Text>
              <TouchableOpacity onPress={() => setSelectedDocument(null)}>
                <Ionicons name="close" size={28} color={colors.white} />
              </TouchableOpacity>
            </View>
            
            <Image
              source={{ uri: selectedDocument?.image }}
              style={styles.documentImage}
              resizeMode="contain"
            />
            
            <View style={styles.documentModalFooter}>
              <TouchableOpacity style={styles.documentModalButton}>
                <Ionicons name="download-outline" size={20} color={colors.white} />
                <Text style={styles.documentModalButtonText}>Download</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.documentModalButton}>
                <Ionicons name="share-outline" size={20} color={colors.white} />
                <Text style={styles.documentModalButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rejection Modal */}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRejectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reject KYC Verification</Text>
            <Text style={styles.modalDescription}>
              Please provide a detailed reason for rejecting this KYC application:
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
                <Text style={styles.modalButtonText}>Reject KYC</Text>
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
  merchantCard: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 12,
  },
  merchantHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  merchantAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  merchantInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  merchantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  merchantEmail: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 2,
  },
  merchantPhone: {
    fontSize: 14,
    color: colors.gray600,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    color: colors.gray600,
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
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
    fontSize: 13,
    fontWeight: '600',
    color: colors.black,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray700,
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.gray600,
    marginBottom: 16,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  documentFileName: {
    fontSize: 13,
    color: colors.gray600,
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 12,
    color: colors.gray500,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: colors.primary + '20',
  },
  checklistText: {
    fontSize: 14,
    color: colors.gray700,
    flex: 1,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  activityLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  activityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    bottom: 0,
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
  docsButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  documentModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  documentModalContent: {
    flex: 1,
  },
  documentModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  documentModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  documentImage: {
    flex: 1,
    width: width,
  },
  documentModalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  documentModalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
    gap: 8,
  },
  documentModalButtonText: {
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

export default KYCVerificationScreen;
