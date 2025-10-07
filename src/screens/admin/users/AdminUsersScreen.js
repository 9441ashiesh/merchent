import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

const AdminUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, users, merchants

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Simulate API call
    const mockUsers = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 98765 43210',
        role: 'merchant',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-10-06',
        avatar: 'https://i.pravatar.cc/150?img=12',
        businessName: 'Sunshine Hostel',
        propertyCount: 3,
        totalRevenue: '₹2.5L',
        kycStatus: 'Approved',
        city: 'Mumbai',
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43211',
        role: 'merchant',
        status: 'active',
        joinDate: '2024-02-20',
        lastActive: '2024-10-05',
        avatar: 'https://i.pravatar.cc/150?img=5',
        businessName: 'Green Valley PG',
        propertyCount: 2,
        totalRevenue: '₹1.8L',
        kycStatus: 'Pending',
        city: 'Pune',
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+91 98765 43212',
        role: 'merchant',
        status: 'active',
        joinDate: '2024-03-10',
        lastActive: '2024-09-28',
        avatar: 'https://i.pravatar.cc/150?img=13',
        businessName: 'City Center Hostel',
        propertyCount: 1,
        totalRevenue: '₹95K',
        kycStatus: 'Rejected',
        city: 'Bangalore',
      },
      {
        id: 4,
        name: 'Sneha Reddy',
        email: 'sneha@example.com',
        phone: '+91 98765 43213',
        role: 'user',
        status: 'active',
        joinDate: '2024-04-05',
        lastActive: '2024-10-07',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      {
        id: 5,
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '+91 98765 43214',
        role: 'user',
        status: 'active',
        joinDate: '2024-05-12',
        lastActive: '2024-10-06',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
      {
        id: 6,
        name: 'Kavya Nair',
        email: 'kavya@example.com',
        phone: '+91 98765 43215',
        role: 'user',
        status: 'suspended',
        joinDate: '2024-06-20',
        lastActive: '2024-09-30',
        avatar: 'https://i.pravatar.cc/150?img=10',
      },
    ];
    setUsers(mockUsers);
  };

  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const matchesSearch = (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUserAction = (user, action) => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', `User ${action}ed successfully`);
          },
        },
      ]
    );
  };

  const UserCard = ({ user }) => {
    if (!user) return null;
    
    return (
      <View style={styles.userCard}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: user.avatar || 'https://i.pravatar.cc/150?img=1' }} 
              style={styles.avatar} 
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name || 'Unknown User'}</Text>
              <Text style={styles.userEmail}>{user.email || ''}</Text>
              <View style={styles.userMeta}>
                <View style={[
                  styles.roleBadge,
                  { backgroundColor: user.role === 'merchant' ? colors.secondary : colors.primary }
                ]}>
                  <Text style={styles.roleText}>{user.role?.toUpperCase() || 'USER'}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: user.status === 'active' ? colors.success : colors.error }
                ]}>
                  <Text style={styles.statusText}>{user.status?.toUpperCase() || 'UNKNOWN'}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.userStats}>
          {user.role === 'merchant' ? (
            <>
              <View style={styles.statItemMerchant}>
                <Ionicons name="business-outline" size={14} color={colors.primary} />
                <View>
                  <Text style={styles.statLabel}>Business</Text>
                  <Text style={styles.statValue}>{user.businessName || 'N/A'}</Text>
                </View>
              </View>
              <View style={styles.statItemMerchant}>
                <Ionicons name="home-outline" size={14} color={colors.success} />
                <View>
                  <Text style={styles.statLabel}>Properties</Text>
                  <Text style={styles.statValue}>{user.propertyCount || 0}</Text>
                </View>
              </View>
              <View style={styles.statItemMerchant}>
                <Ionicons name="cash-outline" size={14} color={colors.warning} />
                <View>
                  <Text style={styles.statLabel}>Revenue</Text>
                  <Text style={styles.statValue}>{user.totalRevenue || '$0'}</Text>
                </View>
              </View>
            </>
          ) : (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Joined</Text>
              <Text style={styles.statValue}>{user.joinDate || 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Last Active</Text>
              <Text style={styles.statValue}>{user.lastActive || 'N/A'}</Text>
            </View>
          </>
        )}
      </View>
      
      {user.role === 'merchant' && (
        <View style={styles.kycStatusContainer}>
          <View style={styles.kycRow}>
            <Ionicons 
              name={user.kycStatus === 'Approved' ? 'checkmark-circle' : user.kycStatus === 'Pending' ? 'time' : 'close-circle'} 
              size={16} 
              color={user.kycStatus === 'Approved' ? colors.success : user.kycStatus === 'Pending' ? colors.warning : colors.error} 
            />
            <Text style={[styles.kycStatusText, {
              color: user.kycStatus === 'Approved' ? colors.success : user.kycStatus === 'Pending' ? colors.warning : colors.error
            }]}>
              KYC: {user.kycStatus || 'Unknown'}
            </Text>
          </View>
          <View style={styles.cityBadge}>
            <Ionicons name="location" size={12} color={colors.textSecondary} />
            <Text style={styles.cityText}>{user.city || 'Unknown'}</Text>
          </View>
        </View>
      )}

      <View style={styles.userActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => {}}
        >
          <Ionicons name="eye-outline" size={16} color={colors.secondary} />
          <Text style={[styles.actionText, { color: colors.secondary }]}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => {}}
        >
          <Ionicons name="create-outline" size={16} color={colors.warning} />
          <Text style={[styles.actionText, { color: colors.warning }]}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.suspendButton]}
          onPress={() => handleUserAction(user, user.status === 'active' ? 'suspend' : 'activate')}
        >
          <Ionicons 
            name={user.status === 'active' ? 'ban-outline' : 'checkmark-outline'} 
            size={16} 
            color={user.status === 'active' ? colors.error : colors.success} 
          />
          <Text style={[
            styles.actionText, 
            { color: user.status === 'active' ? colors.error : colors.success }
          ]}>
            {user.status === 'active' ? 'Suspend' : 'Activate'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color={colors.gray400} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'user' && styles.activeTab]}
          onPress={() => setActiveTab('user')}
        >
          <Text style={[styles.tabText, activeTab === 'user' && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'merchant' && styles.activeTab]}
          onPress={() => setActiveTab('merchant')}
        >
          <Text style={[styles.tabText, activeTab === 'merchant' && styles.activeTabText]}>Merchants</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{users.length}</Text>
          <Text style={styles.summaryLabel}>Total Users</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{users.filter(u => u.status === 'active').length}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{users.filter(u => u.role === 'merchant').length}</Text>
          <Text style={styles.summaryLabel}>Merchants</Text>
        </View>
      </View>

      {/* Users List */}
      <ScrollView 
        style={styles.usersList}
        showsVerticalScrollIndicator={false}
      >
        {filteredUsers.map((user, index) => (
          <UserCard key={user?.id || index} user={user} />
        ))}
        
        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={colors.gray300} />
            <Text style={styles.emptyTitle}>No Users Found</Text>
            <Text style={styles.emptySubtitle}>No users match your search criteria</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
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
  usersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: colors.gray200,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  roleText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statItemMerchant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  kycStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray50,
    borderRadius: 8,
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kycStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  viewButton: {
    backgroundColor: colors.secondary + '20',
  },
  editButton: {
    backgroundColor: colors.warning + '20',
  },
  suspendButton: {
    backgroundColor: colors.error + '20',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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
  },
});

export default AdminUsersScreen;