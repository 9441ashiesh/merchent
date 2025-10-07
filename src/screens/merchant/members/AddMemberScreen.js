import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Modal,
  FlatList,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../../constants/colors';
import { mockProperties, mockRooms, mockStudents } from '../../../services/mockData';

const AddMemberScreen = ({ navigation, route }) => {
  const preSelectedProperty = route?.params?.property;
  const preSelectedRoom = route?.params?.room;

  const [assignToRoom, setAssignToRoom] = useState(false);
  
  const [formData, setFormData] = useState({
    // Property & Room
    propertyId: preSelectedProperty?.id || '',
    propertyName: preSelectedProperty?.name || '',
    roomId: preSelectedRoom?.id || '',
    roomNumber: preSelectedRoom?.roomNumber || '',
    
    // Personal Details
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    bloodGroup: '',
    address: '',
    image: null,
    
    // Academic/Professional
    type: 'Student',
    collegeName: '',
    course: '',
    year: '',
    companyName: '',
    designation: '',
    
    // Guardian Details
    guardianName: '',
    guardianPhone: '',
    guardianRelation: '',
    
    // Payment Details
    monthlyRent: '',
    deposit: '',
    joiningDate: new Date().toISOString().split('T')[0],
    
    // Documents
    aadharNumber: '',
    documents: [],
  });

  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [showRoomPicker, setShowRoomPicker] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    if (formData.propertyId) {
      // Filter rooms by selected property
      const rooms = mockRooms.filter(room => room.propertyId === formData.propertyId);
      setAvailableRooms(rooms);
      
      // Reset room selection if property changes and current room is not in new property
      if (formData.roomId && !rooms.find(r => r.id === formData.roomId)) {
        setFormData(prev => ({ ...prev, roomId: '', roomNumber: '' }));
      }
    } else {
      setAvailableRooms([]);
    }
  }, [formData.propertyId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectProperty = (property) => {
    setFormData(prev => ({
      ...prev,
      propertyId: property.id,
      propertyName: property.name,
      roomId: '',
      roomNumber: '',
    }));
    setShowPropertyPicker(false);
  };

  const selectRoom = (room) => {
    setFormData(prev => ({
      ...prev,
      roomId: room.id,
      roomNumber: room.roomNumber,
      monthlyRent: room.rent.toString(),
    }));
    setShowRoomPicker(false);
  };

  const handleImagePicker = () => {
    // TODO: Implement image picker
    Alert.alert('Image Picker', 'Image picker functionality will be implemented');
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter member name');
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }
    if (assignToRoom) {
      if (!formData.propertyId) {
        Alert.alert('Error', 'Please select a property');
        return;
      }
      if (!formData.roomId) {
        Alert.alert('Error', 'Please select a room');
        return;
      }
      if (!formData.monthlyRent.trim()) {
        Alert.alert('Error', 'Please enter monthly rent');
        return;
      }
    }

    // Create new member object
    const newMember = {
      id: `s${mockStudents.length + 1}`,
      propertyId: assignToRoom ? formData.propertyId : null,
      roomId: assignToRoom ? formData.roomId : null,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      image: formData.image || 'https://randomuser.me/api/portraits/men/1.jpg',
      type: formData.type,
      collegeName: formData.type === 'Student' ? formData.collegeName : undefined,
      course: formData.type === 'Student' ? formData.course : undefined,
      year: formData.type === 'Student' ? formData.year : undefined,
      companyName: formData.type === 'Professional' ? formData.companyName : undefined,
      designation: formData.type === 'Professional' ? formData.designation : undefined,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      guardianRelation: formData.guardianRelation,
      monthlyRent: parseInt(formData.monthlyRent),
      deposit: parseInt(formData.deposit) || 0,
      joiningDate: formData.joiningDate,
      paymentStatus: assignToRoom ? 'Pending' : 'N/A',
      lastPaidDate: null,
      dueAmount: assignToRoom ? parseInt(formData.monthlyRent) : 0,
      aadharNumber: formData.aadharNumber,
      documents: formData.documents,
      isAssignedToRoom: assignToRoom,
    };

    // TODO: Save to database/API
    console.log('New Member:', newMember);

    Alert.alert(
      'Success',
      `${formData.name} added successfully!${!assignToRoom ? ' Member can be assigned to a room later.' : ''}`,
      [
        {
          text: 'Add Another Member',
          onPress: () => {
            // Reset form but keep property and room selected
            setFormData(prev => ({
              ...prev,
              name: '',
              email: '',
              phone: '',
              dateOfBirth: '',
              gender: 'Male',
              bloodGroup: '',
              address: '',
              image: null,
              collegeName: '',
              course: '',
              year: '',
              companyName: '',
              designation: '',
              guardianName: '',
              guardianPhone: '',
              guardianRelation: '',
              deposit: '',
              aadharNumber: '',
              documents: [],
            }));
          }
        },
        {
          text: 'Done',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Member</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Assign to Room Toggle */}
          <View style={styles.toggleCard}>
            <View style={styles.toggleHeader}>
              <View style={styles.toggleIconContainer}>
                <Ionicons 
                  name={assignToRoom ? "bed" : "person-add"} 
                  size={24} 
                  color={assignToRoom ? colors.success : colors.primary} 
                />
              </View>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>
                  {assignToRoom ? 'Assign to Room' : 'Add Member Only'}
                </Text>
                <Text style={styles.toggleSubtitle}>
                  {assignToRoom 
                    ? 'Member will be assigned to a room' 
                    : 'Member can be assigned to a room later'}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, assignToRoom && styles.switchActive]}
                onPress={() => setAssignToRoom(!assignToRoom)}
              >
                <View style={[styles.switchThumb, assignToRoom && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Property & Room Selection - Only show if assignToRoom is true */}
          {assignToRoom && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Property & Room</Text>
            
            {/* Select Property */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Select Property *</Text>
              <TouchableOpacity 
                style={styles.selector}
                onPress={() => setShowPropertyPicker(true)}
              >
                <View style={styles.selectorContent}>
                  <Ionicons name="business" size={20} color={colors.primary} />
                  <Text style={[
                    styles.selectorText,
                    !formData.propertyName && styles.placeholderText
                  ]}>
                    {formData.propertyName || 'Select a property'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>

            {/* Select Room */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Select Room *</Text>
              <TouchableOpacity 
                style={[styles.selector, !formData.propertyId && styles.selectorDisabled]}
                onPress={() => formData.propertyId && setShowRoomPicker(true)}
                disabled={!formData.propertyId}
              >
                <View style={styles.selectorContent}>
                  <Ionicons 
                    name="bed" 
                    size={20} 
                    color={formData.propertyId ? colors.primary : colors.tertiary} 
                  />
                  <Text style={[
                    styles.selectorText,
                    !formData.roomNumber && styles.placeholderText,
                    !formData.propertyId && styles.disabledText
                  ]}>
                    {formData.roomNumber 
                      ? `Room ${formData.roomNumber}` 
                      : formData.propertyId 
                        ? 'Select a room' 
                        : 'Select property first'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          )}

          {/* Photo Upload */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Photo</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={handleImagePicker}>
              {formData.image ? (
                <Image source={{ uri: formData.image }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera" size={40} color={colors.primary} />
                  <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Personal Details */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Gender *</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      formData.gender === gender && styles.genderButtonActive
                    ]}
                    onPress={() => handleInputChange('gender', gender)}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      formData.gender === gender && styles.genderButtonTextActive
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Blood Group</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., O+, A-, B+"
                value={formData.bloodGroup}
                onChangeText={(value) => handleInputChange('bloodGroup', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter full address"
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                multiline
                numberOfLines={3}
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Aadhar Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Aadhar number"
                value={formData.aadharNumber}
                onChangeText={(value) => handleInputChange('aadharNumber', value)}
                keyboardType="numeric"
                maxLength={12}
                placeholderTextColor={colors.tertiary}
              />
            </View>
          </View>

          {/* Academic/Professional Details */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Academic/Professional</Text>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Type *</Text>
              <View style={styles.typeContainer}>
                {['Student', 'Professional'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      formData.type === type && styles.typeButtonActive
                    ]}
                    onPress={() => handleInputChange('type', type)}
                  >
                    <Ionicons 
                      name={type === 'Student' ? 'school' : 'briefcase'} 
                      size={20} 
                      color={formData.type === type ? colors.white : colors.primary} 
                    />
                    <Text style={[
                      styles.typeButtonText,
                      formData.type === type && styles.typeButtonTextActive
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {formData.type === 'Student' ? (
              <>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>College/University Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter college name"
                    value={formData.collegeName}
                    onChangeText={(value) => handleInputChange('collegeName', value)}
                    placeholderTextColor={colors.tertiary}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Course</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., B.Tech, MBA, BCA"
                    value={formData.course}
                    onChangeText={(value) => handleInputChange('course', value)}
                    placeholderTextColor={colors.tertiary}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Year</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 1st, 2nd, 3rd, 4th"
                    value={formData.year}
                    onChangeText={(value) => handleInputChange('year', value)}
                    placeholderTextColor={colors.tertiary}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Company Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChangeText={(value) => handleInputChange('companyName', value)}
                    placeholderTextColor={colors.tertiary}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Designation</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Software Engineer, Manager"
                    value={formData.designation}
                    onChangeText={(value) => handleInputChange('designation', value)}
                    placeholderTextColor={colors.tertiary}
                  />
                </View>
              </>
            )}
          </View>

          {/* Guardian Details */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Guardian Details</Text>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Guardian Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter guardian name"
                value={formData.guardianName}
                onChangeText={(value) => handleInputChange('guardianName', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Guardian Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter guardian phone"
                value={formData.guardianPhone}
                onChangeText={(value) => handleInputChange('guardianPhone', value)}
                keyboardType="phone-pad"
                placeholderTextColor={colors.tertiary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Relation</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Father, Mother, Guardian"
                value={formData.guardianRelation}
                onChangeText={(value) => handleInputChange('guardianRelation', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>
          </View>

          {/* Payment Details - Only show if assignToRoom is true */}
          {assignToRoom && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Monthly Rent *</Text>
              <View style={styles.rentInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.rentInput}
                  placeholder="Enter monthly rent"
                  value={formData.monthlyRent}
                  onChangeText={(value) => handleInputChange('monthlyRent', value)}
                  keyboardType="numeric"
                  placeholderTextColor={colors.tertiary}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Security Deposit</Text>
              <View style={styles.rentInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.rentInput}
                  placeholder="Enter deposit amount"
                  value={formData.deposit}
                  onChangeText={(value) => handleInputChange('deposit', value)}
                  keyboardType="numeric"
                  placeholderTextColor={colors.tertiary}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Joining Date *</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={formData.joiningDate}
                onChangeText={(value) => handleInputChange('joiningDate', value)}
                placeholderTextColor={colors.tertiary}
              />
            </View>
          </View>
          )}

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              {assignToRoom 
                ? 'Documents can be uploaded after creating the member profile from the member details screen.'
                : 'Member can be assigned to a room later from the member details screen.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Member</Text>
        </TouchableOpacity>
      </View>

      {/* Property Picker Modal */}
      <Modal
        visible={showPropertyPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPropertyPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Property</Text>
              <TouchableOpacity onPress={() => setShowPropertyPicker(false)}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={mockProperties}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => selectProperty(item)}
                >
                  <View style={styles.pickerItemIcon}>
                    <Ionicons name="business" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.pickerItemInfo}>
                    <Text style={styles.pickerItemName}>{item.name}</Text>
                    <Text style={styles.pickerItemLocation}>{item.location}</Text>
                  </View>
                  {formData.propertyId === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Room Picker Modal */}
      <Modal
        visible={showRoomPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRoomPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Room</Text>
              <TouchableOpacity onPress={() => setShowRoomPicker(false)}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={availableRooms}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isAvailable = item.occupied < item.beds;
                return (
                  <TouchableOpacity
                    style={[styles.pickerItem, !isAvailable && styles.pickerItemDisabled]}
                    onPress={() => isAvailable && selectRoom(item)}
                    disabled={!isAvailable}
                  >
                    <View style={styles.pickerItemIcon}>
                      <Ionicons 
                        name="bed" 
                        size={24} 
                        color={isAvailable ? colors.primary : colors.tertiary} 
                      />
                    </View>
                    <View style={styles.pickerItemInfo}>
                      <Text style={[
                        styles.pickerItemName,
                        !isAvailable && styles.disabledText
                      ]}>
                        Room {item.roomNumber}
                      </Text>
                      <Text style={styles.pickerItemLocation}>
                        {item.type} • {item.occupied}/{item.beds} occupied • ₹{item.rent}/bed
                      </Text>
                    </View>
                    {formData.roomId === item.id ? (
                      <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                    ) : !isAvailable ? (
                      <View style={styles.fullBadge}>
                        <Text style={styles.fullBadgeText}>Full</Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons name="bed-outline" size={48} color={colors.tertiary} />
                  <Text style={styles.emptyStateText}>No rooms available</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  toggleCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lightBackground,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  toggleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    ...typography.h5,
    marginBottom: spacing.xs,
  },
  toggleSubtitle: {
    ...typography.caption,
    color: colors.secondary,
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lightBackground,
    padding: 2,
    justifyContent: 'center',
  },
  switchActive: {
    backgroundColor: colors.success,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbActive: {
    transform: [{ translateX: 22 }],
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.lg,
  },
  fieldGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  selector: {
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorDisabled: {
    opacity: 0.5,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  selectorText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.tertiary,
  },
  disabledText: {
    color: colors.tertiary,
  },
  imageUpload: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  imagePlaceholderText: {
    ...typography.caption,
    color: colors.primary,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderButton: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightBackground,
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderButtonText: {
    ...typography.label,
    color: colors.textPrimary,
  },
  genderButtonTextActive: {
    color: colors.white,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    ...typography.label,
    color: colors.textPrimary,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  rentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    paddingLeft: spacing.lg,
  },
  currencySymbol: {
    ...typography.h5,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  rentInput: {
    flex: 1,
    padding: spacing.lg,
    paddingLeft: 0,
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.info}15`,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    gap: spacing.md,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.secondary,
    flex: 1,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightBackground,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.large,
    alignItems: 'center',
  },
  submitButtonText: {
    ...typography.h5,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xlarge,
    borderTopRightRadius: borderRadius.xlarge,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  modalTitle: {
    ...typography.h3,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
    gap: spacing.md,
  },
  pickerItemDisabled: {
    opacity: 0.5,
  },
  pickerItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemInfo: {
    flex: 1,
  },
  pickerItemName: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  pickerItemLocation: {
    ...typography.caption,
    color: colors.secondary,
  },
  fullBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  fullBadgeText: {
    ...typography.caption,
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xxxl,
    gap: spacing.md,
  },
  emptyStateText: {
    ...typography.bodyMedium,
    color: colors.secondary,
  },
});

export default AddMemberScreen;
