import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';
import { mockProperties } from '../../services/mockData';

const AddPropertyScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    type: 'Mixed',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    amenities: [],
  });

  const propertyTypes = ['Male', 'Female', 'Mixed'];
  const availableAmenities = ['WiFi', 'AC', 'Laundry', 'Kitchen', 'Security', 'Parking', 'Gym', 'Pool'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter property name');
      return;
    }
    if (!formData.location.trim()) {
      Alert.alert('Error', 'Please enter location');
      return;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter address');
      return;
    }

    // Create new property object
    const newProperty = {
      id: `${mockProperties.length + 1}`,
      name: formData.name,
      location: formData.location,
      address: formData.address,
      type: formData.type,
      totalRooms: 0,
      occupiedRooms: 0,
      totalBeds: 0,
      occupiedBeds: 0,
      monthlyRevenue: 0,
      image: formData.image,
      amenities: formData.amenities,
      rating: 0,
    };

    // TODO: Save to database/API
    console.log('New Property:', newProperty);

    Alert.alert(
      'Success',
      'Property added successfully!',
      [
        {
          text: 'Add Rooms',
          onPress: () => navigation.navigate('AddRoom', { property: newProperty })
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
        <Text style={styles.headerTitle}>Add Property</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Property Image */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Image</Text>
            <TouchableOpacity style={styles.imagePicker}>
              <Image source={{ uri: formData.image }} style={styles.propertyImage} />
              <View style={styles.imageOverlay}>
                <Ionicons name="camera" size={32} color={colors.white} />
                <Text style={styles.imageOverlayText}>Change Photo</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Property Name */}
          <View style={styles.section}>
            <Text style={styles.label}>Property Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Sunrise Hostel"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholderTextColor={colors.tertiary}
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.label}>Location (City, State) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Mumbai, Maharashtra"
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholderTextColor={colors.tertiary}
            />
          </View>

          {/* Address */}
          <View style={styles.section}>
            <Text style={styles.label}>Full Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., 123 Marine Drive, Mumbai"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              multiline
              numberOfLines={3}
              placeholderTextColor={colors.tertiary}
            />
          </View>

          {/* Property Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Property Type *</Text>
            <View style={styles.typeContainer}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    formData.type === type && styles.typeButtonActive
                  ]}
                  onPress={() => handleInputChange('type', type)}
                >
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

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.label}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {availableAmenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityTag,
                    formData.amenities.includes(amenity) && styles.amenityTagActive
                  ]}
                  onPress={() => toggleAmenity(amenity)}
                >
                  <Ionicons 
                    name={formData.amenities.includes(amenity) ? "checkmark-circle" : "add-circle-outline"} 
                    size={18} 
                    color={formData.amenities.includes(amenity) ? colors.white : colors.primary} 
                  />
                  <Text style={[
                    styles.amenityText,
                    formData.amenities.includes(amenity) && styles.amenityTextActive
                  ]}>
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              After adding the property, you can add rooms and manage members.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Property</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlayText: {
    ...typography.label,
    color: colors.white,
    marginTop: spacing.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    backgroundColor: colors.white,
    alignItems: 'center',
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
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    backgroundColor: colors.white,
    gap: spacing.xs,
  },
  amenityTagActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  amenityText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  amenityTextActive: {
    color: colors.white,
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
});

export default AddPropertyScreen;