import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';

export default function StudentProfileScreen({ route, navigation }) {
  const { student, room, property } = route.params;
  
  const getPaymentStatusColor = (status) => {
    if (status === 'paid') return colors.success;
    if (status === 'overdue') return colors.error;
    return colors.warning;
  };
  
  const getPaymentStatusText = (status) => {
    if (status === 'paid') return 'Paid';
    if (status === 'overdue') return 'Overdue';
    return 'Pending';
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Member Profile</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: student.photo }} style={styles.profilePhoto} />
          <Text style={styles.studentName}>{student.name}</Text>
          <View style={styles.occupationRow}>
            <Ionicons name="briefcase-outline" size={16} color={colors.secondary} />
            <Text style={styles.occupationText}>{student.occupation}</Text>
          </View>
          
          <View style={[
            styles.paymentStatusBadge,
            { backgroundColor: `${getPaymentStatusColor(student.paymentStatus)}15` }
          ]}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: getPaymentStatusColor(student.paymentStatus) }
            ]} />
            <Text style={[
              styles.paymentStatusText,
              { color: getPaymentStatusColor(student.paymentStatus) }
            ]}>
              {getPaymentStatusText(student.paymentStatus)}
            </Text>
          </View>
        </View>

        {/* Room Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Information</Text>
          <View style={styles.card}>
            <View style={styles.roomInfoRow}>
              <View style={styles.roomInfoItem}>
                <Text style={styles.roomLabel}>Property</Text>
                <Text style={styles.roomValue}>{property.name}</Text>
              </View>
              <View style={styles.roomInfoItem}>
                <Text style={styles.roomLabel}>Room</Text>
                <Text style={styles.roomValue}>{room.roomNumber}</Text>
              </View>
              <View style={styles.roomInfoItem}>
                <Text style={styles.roomLabel}>Floor</Text>
                <Text style={styles.roomValue}>{room.floor}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.card}>
            <InfoRow icon="call" label="Phone Number" value={student.phone} />
            <InfoRow icon="mail" label="Email" value={student.email} />
            <InfoRow icon="person" label="Age" value={`${student.age} years`} />
          </View>
        </View>

        {/* Academic/Professional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {student.occupation === 'Student' ? 'Academic Information' : 'Professional Information'}
          </Text>
          <View style={styles.card}>
            {student.occupation === 'Student' ? (
              <>
                <InfoRow icon="school" label="College" value={student.college} />
                <InfoRow icon="book" label="Course" value={student.course} />
                <InfoRow icon="calendar" label="Year" value={student.year} />
              </>
            ) : (
              <>
                <InfoRow icon="business" label="Company" value={student.company} />
                <InfoRow icon="briefcase" label="Designation" value={student.designation} />
              </>
            )}
          </View>
        </View>

        {/* Guardian Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guardian/Emergency Contact</Text>
          <View style={styles.card}>
            <InfoRow icon="people" label="Guardian Name" value={student.guardianName} />
            <InfoRow icon="call" label="Guardian Phone" value={student.guardianPhone} />
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.card}>
            <View style={styles.paymentRow}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Monthly Rent</Text>
                <Text style={styles.paymentValue}>₹{student.rent.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Deposit</Text>
                <Text style={styles.paymentValue}>₹{student.deposit.toLocaleString('en-IN')}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <InfoRow 
              icon="calendar" 
              label="Join Date" 
              value={new Date(student.joinDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} 
            />
            <InfoRow 
              icon="checkmark-circle" 
              label="Last Payment" 
              value={new Date(student.lastPayment).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} 
            />
            <InfoRow 
              icon="time" 
              label="Next Payment Due" 
              value={new Date(student.nextPayment).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} 
            />
          </View>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.card}>
            <InfoRow icon="card" label="ID Proof Type" value={student.idProof} />
            <InfoRow icon="finger-print" label="ID Number" value={student.idNumber} />
            
            <View style={styles.documentsList}>
              <Text style={styles.documentsLabel}>Submitted Documents:</Text>
              {student.documents.map((doc, index) => (
                <View key={index} style={styles.documentTag}>
                  <Ionicons name="document-text" size={14} color={colors.primary} />
                  <Text style={styles.documentText}>{doc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="cash" size={20} color={colors.white} />
            <Text style={styles.primaryButtonText}>Record Payment</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryButtonsRow}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="call" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="chatbubble" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightBackground,
    marginBottom: spacing.md,
  },
  studentName: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  occupationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  occupationText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
  paymentStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  paymentStatusText: {
    ...typography.label,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  roomInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  roomLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  roomValue: {
    ...typography.h4,
    color: colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.bodyMedium,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  paymentItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    marginHorizontal: spacing.xs,
  },
  paymentLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  paymentValue: {
    ...typography.h3,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightBackground,
    marginVertical: spacing.md,
  },
  documentsList: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
  },
  documentsLabel: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  documentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.small,
    marginBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  documentText: {
    ...typography.caption,
    marginLeft: spacing.xs,
  },
  actionsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    ...typography.h5,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.lightBackground,
  },
  secondaryButtonText: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});
