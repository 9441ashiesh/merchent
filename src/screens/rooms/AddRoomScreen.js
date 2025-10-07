import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';
import { mockProperties, mockRooms } from '../../services/mockData';

const AddRoomScreen = ({ navigation, route }) => {
  const preSelectedProperty = route?.params?.property;
  
  const [formData, setFormData] = useState({
    propertyId: preSelectedProperty?.id || '',
    propertyName: preSelectedProperty?.name || '',
    roomNumber: '',
    type: 'Single',
    beds: 1,
    rent: '',
    floor: '1',
  });

  const [showPropertyPicker, setShowPropertyPicker] = useState(false);

  const roomTypes = [
    { type: 'Single', beds: 1 },
    { type: 'Double', beds: 2 },
    { type: 'Shared', beds: 4 },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoomTypeChange = (type, beds) => {
    setFormData(prev => ({ ...prev, type, beds }));
  };

  const selectProperty = (property) => {
    setFormData(prev => ({
      ...prev,
      propertyId: property.id,
      propertyName: property.name,
    }));
    setShowPropertyPicker(false);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.propertyId) {
      Alert.alert('Error', 'Please select a property');
      return;
    }
    if (!formData.roomNumber.trim()) {
      Alert.alert('Error', 'Please enter room number');
      return;
    }
    if (!formData.rent.trim()) {
      Alert.alert('Error', 'Please enter rent amount');
      return;
    }

    // Create new room object
    const newRoom = {
      id: `r${mockRooms.length + 1}`,
      propertyId: formData.propertyId,
      roomNumber: formData.roomNumber,
      type: formData.type,
      beds: formData.beds,
      occupied: 0,
      rent: parseInt(formData.rent),
      floor: parseInt(formData.floor),
    };

    // TODO: Save to database/API
    console.log('New Room:', newRoom);

    Alert.alert(
      'Success',
      `Room ${formData.roomNumber} added successfully!`,
      [
        {
          text: 'Add Another Room',
          onPress: () => {
            // Reset form but keep property selected
            setFormData(prev => ({
              ...prev,
              roomNumber: '',
              type: 'Single',
              beds: 1,
              rent: '',
              floor: '1',
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
        <Text style={styles.headerTitle}>Add Room</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Select Property */}
          <View style={styles.section}>
            <Text style={styles.label}>Select Property *</Text>
            <TouchableOpacity 
              style={styles.propertySelector}
              onPress={() => setShowPropertyPicker(true)}
            >
              <View style={styles.propertySelectorContent}>
                <Ionicons name="business" size={20} color={colors.primary} />
                <Text style={[
                  styles.propertySelectorText,
                  !formData.propertyName && styles.placeholderText
                ]}>
                  {formData.propertyName || 'Select a property'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>

          {/* Room Number */}
          <View style={styles.section}>
            <Text style={styles.label}>Room Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 101, 201, A-1"
              value={formData.roomNumber}
              onChangeText={(value) => handleInputChange('roomNumber', value)}
              placeholderTextColor={colors.tertiary}
            />
          </View>

          {/* Floor */}
          <View style={styles.section}>
            <Text style={styles.label}>Floor *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 1, 2, 3"
              value={formData.floor}
              onChangeText={(value) => handleInputChange('floor', value)}
              keyboardType="numeric"
              placeholderTextColor={colors.tertiary}
            />
          </View>

          {/* Room Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Room Type *</Text>
            <View style={styles.roomTypeContainer}>
              {roomTypes.map((item) => (
                <TouchableOpacity
                  key={item.type}
                  style={[
                    styles.roomTypeCard,
                    formData.type === item.type && styles.roomTypeCardActive
                  ]}
                  onPress={() => handleRoomTypeChange(item.type, item.beds)}
                >
                  <Ionicons 
                    name="bed" 
                    size={32} 
                    color={formData.type === item.type ? colors.white : colors.primary} 
                  />
                  <Text style={[
                    styles.roomTypeTitle,
                    formData.type === item.type && styles.roomTypeTextActive
                  ]}>
                    {item.type}
                  </Text>
                  <Text style={[
                    styles.roomTypeSubtitle,
                    formData.type === item.type && styles.roomTypeTextActive
                  ]}>
                    {item.beds} {item.beds === 1 ? 'Bed' : 'Beds'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Number of Beds (Auto-filled based on type) */}
          <View style={styles.section}>
            <Text style={styles.label}>Number of Beds</Text>
            <View style={styles.bedsDisplay}>
              <Ionicons name="people" size={20} color={colors.primary} />
              <Text style={styles.bedsText}>{formData.beds} Beds</Text>
            </View>
          </View>

          {/* Rent per Bed */}
          <View style={styles.section}>
            <Text style={styles.label}>Rent per Bed (Monthly) *</Text>
            <View style={styles.rentInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.rentInput}
                placeholder="e.g., 8000"
                value={formData.rent}
                onChangeText={(value) => handleInputChange('rent', value)}
                keyboardType="numeric"
                placeholderTextColor={colors.tertiary}
              />
            </View>
          </View>

          {/* Revenue Projection */}
          {formData.rent && (
            <View style={styles.revenueCard}>
              <View style={styles.revenueRow}>
                <Text style={styles.revenueLabel}>Rent per bed:</Text>
                <Text style={styles.revenueValue}>₹{formData.rent}</Text>
              </View>
              <View style={styles.revenueRow}>
                <Text style={styles.revenueLabel}>Total beds:</Text>
                <Text style={styles.revenueValue}>{formData.beds}</Text>
              </View>
              <View style={styles.revenueDivider} />
              <View style={styles.revenueRow}>
                <Text style={styles.revenueLabelTotal}>Potential Monthly Revenue:</Text>
                <Text style={styles.revenueValueTotal}>
                  ₹{(parseInt(formData.rent) * formData.beds).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          )}

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              After adding the room, you can add members to this room from the Members section.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Room</Text>
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
                  style={styles.propertyItem}
                  onPress={() => selectProperty(item)}
                >
                  <View style={styles.propertyItemIcon}>
                    <Ionicons name="business" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.propertyItemInfo}>
                    <Text style={styles.propertyItemName}>{item.name}</Text>
                    <Text style={styles.propertyItemLocation}>{item.location}</Text>
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
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  propertySelector: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propertySelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  propertySelectorText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.tertiary,
  },
  roomTypeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  roomTypeCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  roomTypeCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roomTypeTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  roomTypeSubtitle: {
    ...typography.caption,
    color: colors.secondary,
  },
  roomTypeTextActive: {
    color: colors.white,
  },
  bedsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    gap: spacing.md,
  },
  bedsText: {
    ...typography.h5,
    color: colors.primary,
  },
  rentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
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
  revenueCard: {
    backgroundColor: `${colors.success}15`,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    marginTop: spacing.md,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  revenueLabel: {
    ...typography.bodySmall,
    color: colors.secondary,
  },
  revenueValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  revenueDivider: {
    height: 1,
    backgroundColor: colors.success,
    marginVertical: spacing.sm,
  },
  revenueLabelTotal: {
    ...typography.label,
    color: colors.textPrimary,
  },
  revenueValueTotal: {
    ...typography.h4,
    color: colors.success,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.info}15`,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    gap: spacing.md,
    marginTop: spacing.lg,
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
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
    gap: spacing.md,
  },
  propertyItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyItemInfo: {
    flex: 1,
  },
  propertyItemName: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  propertyItemLocation: {
    ...typography.caption,
    color: colors.secondary,
  },
});

export default AddRoomScreen;
