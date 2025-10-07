import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';
import { mockStudents, mockProperties, mockRooms } from '../../../services/mockData';

const MembersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, assigned, unassigned

  // Filter members
  const filteredMembers = mockStudents.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery);
    
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'assigned' ? member.roomId !== null :
      filterType === 'unassigned' ? member.roomId === null : true;
    
    return matchesSearch && matchesFilter;
  });

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return colors.success;
      case 'Pending': return colors.warning;
      case 'Overdue': return colors.error;
      default: return colors.secondary;
    }
  };

  const getPropertyName = (propertyId) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property ? property.name : 'N/A';
  };

  const getRoomNumber = (roomId) => {
    const room = mockRooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'N/A';
  };

  const renderMemberCard = ({ item: member }) => {
    const property = mockProperties.find(p => p.id === member.propertyId);
    const room = mockRooms.find(r => r.id === member.roomId);

    return (
      <TouchableOpacity
        style={styles.memberCard}
        onPress={() => navigation.navigate('StudentProfile', { 
          student: member, 
          room: room || null, 
          property: property || null 
        })}
        activeOpacity={0.7}
      >
        <Image source={{ uri: member.photo }} style={styles.memberPhoto} />
        
        <View style={styles.memberInfo}>
          <View style={styles.memberHeader}>
            <Text style={styles.memberName}>{member.name}</Text>
            {member.roomId ? (
              <View style={styles.assignedBadge}>
                <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                <Text style={styles.assignedText}>Assigned</Text>
              </View>
            ) : (
              <View style={styles.unassignedBadge}>
                <Ionicons name="alert-circle" size={14} color={colors.warning} />
                <Text style={styles.unassignedText}>Not Assigned</Text>
              </View>
            )}
          </View>

          <View style={styles.memberDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="call" size={14} color={colors.secondary} />
              <Text style={styles.detailText}>{member.phone}</Text>
            </View>
            
            {member.roomId && (
              <>
                <View style={styles.detailRow}>
                  <Ionicons name="business" size={14} color={colors.secondary} />
                  <Text style={styles.detailText}>{getPropertyName(member.propertyId)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="bed" size={14} color={colors.secondary} />
                  <Text style={styles.detailText}>Room {getRoomNumber(member.roomId)}</Text>
                </View>
              </>
            )}
          </View>

          {member.roomId && (
            <View style={styles.paymentRow}>
              <View style={styles.rentInfo}>
                <Text style={styles.rentLabel}>Monthly Rent</Text>
                <Text style={styles.rentValue}>₹{member.monthlyRent?.toLocaleString('en-IN') || 0}</Text>
              </View>
              <View style={[
                styles.paymentBadge,
                { backgroundColor: `${getPaymentStatusColor(member.paymentStatus)}15` }
              ]}>
                <Text style={[
                  styles.paymentStatus,
                  { color: getPaymentStatusColor(member.paymentStatus) }
                ]}>
                  {member.paymentStatus || 'N/A'}
                </Text>
              </View>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.tertiary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Members</Text>
        <View style={styles.headerStats}>
          <Text style={styles.statsText}>
            {filteredMembers.length} of {mockStudents.length}
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone..."
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

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'all' && styles.filterTabActive]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterTabText, filterType === 'all' && styles.filterTabTextActive]}>
            All ({mockStudents.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'assigned' && styles.filterTabActive]}
          onPress={() => setFilterType('assigned')}
        >
          <Text style={[styles.filterTabText, filterType === 'assigned' && styles.filterTabTextActive]}>
            Assigned ({mockStudents.filter(m => m.roomId !== null).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === 'unassigned' && styles.filterTabActive]}
          onPress={() => setFilterType('unassigned')}
        >
          <Text style={[styles.filterTabText, filterType === 'unassigned' && styles.filterTabTextActive]}>
            Unassigned ({mockStudents.filter(m => m.roomId === null).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Members List */}
      <FlatList
        data={filteredMembers}
        renderItem={renderMemberCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={colors.tertiary} />
            <Text style={styles.emptyText}>No members found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery 
                ? 'Try a different search term' 
                : 'Add your first member to get started'}
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddMember')}
        activeOpacity={0.8}
      >
        <Ionicons name="person-add" size={24} color={colors.white} />
      </TouchableOpacity>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  headerTitle: {
    ...typography.h2,
  },
  headerStats: {
    backgroundColor: colors.lightBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  statsText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  searchContainer: {
    padding: spacing.lg,
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
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.lightBackground,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 100, // Space for FAB
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  memberPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightBackground,
  },
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  memberName: {
    ...typography.h5,
    flex: 1,
  },
  assignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    gap: spacing.xs,
  },
  assignedText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
  },
  unassignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.warning}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    gap: spacing.xs,
  },
  unassignedText: {
    ...typography.caption,
    color: colors.warning,
    fontWeight: '600',
  },
  memberDetails: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    color: colors.secondary,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
  },
  rentInfo: {
    flex: 1,
  },
  rentLabel: {
    ...typography.caption,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  rentValue: {
    ...typography.label,
    color: colors.primary,
  },
  paymentBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  paymentStatus: {
    ...typography.caption,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  emptyText: {
    ...typography.h4,
    color: colors.secondary,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.tertiary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default MembersScreen;
