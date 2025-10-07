import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';
import { mockStudents } from '../../../services/mockData';

export default function RoomDetailScreen({ route, navigation }) {
  const { room, property } = route.params;
  const roomStudents = mockStudents.filter(student => student.roomId === room.id);
  
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
        <Text style={styles.headerTitle}>Room {room.roomNumber}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Room Info Card */}
        <View style={styles.roomInfoCard}>
          <View style={styles.roomInfoHeader}>
            <View>
              <Text style={styles.propertyName}>{property.name}</Text>
              <Text style={styles.propertyLocation}>{property.location}</Text>
            </View>
            <View style={styles.roomTypeTag}>
              <Text style={styles.roomTypeText}>{room.type}</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="layers-outline" size={20} color={colors.primary} />
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Floor</Text>
                <Text style={styles.statValue}>{room.floor}</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={20} color={colors.primary} />
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Occupancy</Text>
                <Text style={styles.statValue}>{room.occupied}/{room.beds}</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={20} color={colors.primary} />
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Rent</Text>
                <Text style={styles.statValue}>₹{room.rent}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.revenueCard}>
            <View style={styles.revenueRow}>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueAmount}>
                ₹{(room.rent * room.occupied).toLocaleString('en-IN')}/month
              </Text>
            </View>
            <View style={styles.revenueRow}>
              <Text style={styles.revenueLabel}>Potential Revenue</Text>
              <Text style={styles.potentialAmount}>
                ₹{(room.rent * room.beds).toLocaleString('en-IN')}/month
              </Text>
            </View>
          </View>
        </View>
        
        {/* Students Section */}
        <View style={styles.studentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Members ({roomStudents.length}/{room.beds})
            </Text>
            {room.occupied < room.beds && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMember', { room, property })}
              >
                <Ionicons name="person-add" size={18} color={colors.white} />
                <Text style={styles.addButtonText}>Add Member</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {roomStudents.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={64} color={colors.tertiary} />
              <Text style={styles.emptyText}>No members in this room</Text>
              <Text style={styles.emptySubtext}>Add members to get started</Text>
            </View>
          ) : (
            roomStudents.map((student) => (
              <TouchableOpacity 
                key={student.id}
                style={styles.studentCard}
                onPress={() => navigation.navigate('StudentProfile', { student, room, property })}
                activeOpacity={0.7}
              >
                <Image 
                  source={{ uri: student.photo }} 
                  style={styles.studentPhoto}
                />
                
                <View style={styles.studentInfo}>
                  <View style={styles.studentHeader}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <View style={[
                      styles.paymentBadge, 
                      { backgroundColor: `${getPaymentStatusColor(student.paymentStatus)}15` }
                    ]}>
                      <Text style={[
                        styles.paymentStatus,
                        { color: getPaymentStatusColor(student.paymentStatus) }
                      ]}>
                        {getPaymentStatusText(student.paymentStatus)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.studentDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="call-outline" size={14} color={colors.secondary} />
                      <Text style={styles.detailText}>{student.phone}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Ionicons name="school-outline" size={14} color={colors.secondary} />
                      <Text style={styles.detailText}>
                        {student.college || student.company}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.studentFooter}>
                    <View style={styles.rentInfo}>
                      <Text style={styles.rentLabel}>Monthly Rent</Text>
                      <Text style={styles.rentAmount}>₹{student.rent.toLocaleString('en-IN')}</Text>
                    </View>
                    
                    <View style={styles.paymentInfo}>
                      <Text style={styles.paymentLabel}>Next Payment</Text>
                      <Text style={styles.paymentDate}>
                        {new Date(student.nextPayment).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.viewProfileButton}>
                      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
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
  roomInfoCard: {
    backgroundColor: colors.white,
    margin: spacing.lg,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  propertyName: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    ...typography.caption,
  },
  roomTypeTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  roomTypeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statInfo: {
    marginLeft: spacing.sm,
  },
  statLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  statValue: {
    ...typography.label,
    color: colors.primary,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.lightBackground,
    marginHorizontal: spacing.md,
  },
  revenueCard: {
    backgroundColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  revenueLabel: {
    ...typography.bodySmall,
  },
  revenueAmount: {
    ...typography.h4,
    color: colors.success,
  },
  potentialAmount: {
    ...typography.label,
    color: colors.secondary,
  },
  studentsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  addButtonText: {
    ...typography.caption,
    color: colors.white,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxxl,
  },
  emptyText: {
    ...typography.h4,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.secondary,
  },
  studentCard: {
    flexDirection: 'row',
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
  studentPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.lightBackground,
    marginRight: spacing.md,
  },
  studentInfo: {
    flex: 1,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  studentName: {
    ...typography.h5,
    flex: 1,
  },
  paymentBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.small,
  },
  paymentStatus: {
    ...typography.caption,
    fontWeight: '600',
  },
  studentDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    marginLeft: spacing.xs,
  },
  studentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
  },
  rentInfo: {
    flex: 1,
  },
  rentLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  rentAmount: {
    ...typography.label,
    color: colors.primary,
  },
  paymentInfo: {
    flex: 1,
    alignItems: 'center',
  },
  paymentLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  paymentDate: {
    ...typography.caption,
    fontWeight: '600',
  },
  viewProfileButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
