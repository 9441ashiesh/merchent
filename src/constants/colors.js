// 🎨 Design System - Minimalist Dark Theme
// Based on Hostel Booking App Design System v1.0.0

// Primary Colors
export const colors = {
  // Primary Colors - Minimalist Dark Theme
  primary: '#1f2937',           // Dark Gray - Main actions, selected states
  primaryText: '#1f2937',       // Main heading text
  background: '#f8f9fa',        // Light gray background
  cardBackground: '#ffffff',    // White cards/containers
  lightBackground: '#f3f4f6',   // Stats, subtle backgrounds
  
  // Secondary Colors
  secondary: '#6b7280',         // Medium gray - Secondary text, icons
  tertiary: '#9ca3af',          // Light gray - Placeholders, disabled
  divider: '#d1d5db',           // Dividers, separators
  
  // Border Colors
  border: '#e5e7eb',            // Default borders
  borderLight: '#f3f4f6',       // Light borders
  
  // Status & Accent Colors
  success: '#10b981',           // Green - Success states
  error: '#ef4444',             // Red - Errors, destructive actions
  warning: '#f59e0b',           // Orange - Warnings
  info: '#3b82f6',              // Blue - Informational (rarely used)
  heart: '#ef4444',             // Red - Favorite/like icon
  star: '#fbbf24',              // Gold/Yellow - Star ratings
  
  // Text Colors
  textPrimary: '#1f2937',       // Primary text (headings, important)
  textSecondary: '#6b7280',     // Secondary text (descriptions)
  textTertiary: '#9ca3af',      // Tertiary text (placeholders)
  textWhite: '#ffffff',         // White text (on dark backgrounds)
  
  // Additional Utility Colors
  white: '#ffffff',
  black: '#000000',
  shadow: '#000000',            // Black with opacity for shadows
};

// Typography Scale
export const typography = {
  // Headers
  h1: { fontSize: 40, fontWeight: 'bold', color: colors.primary },
  h2: { fontSize: 24, fontWeight: '700', color: colors.primary },
  h3: { fontSize: 20, fontWeight: '700', color: colors.primary },
  h4: { fontSize: 18, fontWeight: '600', color: colors.primary },
  h5: { fontSize: 16, fontWeight: '600', color: colors.primary },
  
  // Body Text
  bodyLarge: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  bodyMedium: { fontSize: 14, fontWeight: '400', color: colors.textSecondary },
  bodySmall: { fontSize: 12, fontWeight: '400', color: colors.textSecondary },
  
  // Labels & Captions
  label: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textSecondary },
  placeholder: { fontSize: 16, fontWeight: '400', color: colors.tertiary },
};

// Spacing Scale (4px grid system)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

// Border Radius
export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  pill: 24,                 // For pill-shaped buttons
  circle: 999,              // For circular elements
};

// Icon Sizes
export const iconSizes = {
  small: 14,
  medium: 20,
  large: 24,
  extraLarge: 32,
};

// Common Component Styles
export const commonStyles = {
  // Primary Button
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Secondary Button
  buttonSecondary: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xlarge,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Button Selected State
  buttonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  // Text Input
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: borderRadius.medium,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.textPrimary,
  },
  
  // Search Bar
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Standard Card
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Hotel/Hostel Card
  hostelCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xlarge,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  
  // Badge
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  
  // Success Indicator
  successIndicator: {
    backgroundColor: colors.success,
    color: colors.white,
  },
  
  // Error Indicator
  errorIndicator: {
    backgroundColor: colors.error,
    color: colors.white,
  },
  
  // Warning Indicator
  warningIndicator: {
    backgroundColor: colors.warning,
    color: colors.white,
  },
  
  // Divider
  dividerHorizontal: {
    height: 1,
    backgroundColor: colors.lightBackground,
  },
  
  dividerVertical: {
    width: 1,
    backgroundColor: colors.lightBackground,
  },
  
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Screen Padding
  screenPadding: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
};

// Interaction States
export const touchStates = {
  default: { opacity: 1 },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
};

// Animation Durations
export const animations = {
  fast: 150,               // ms - Quick transitions
  normal: 300,             // ms - Standard animations
  slow: 500,               // ms - Emphasized animations
};

// Bottom Tab Bar
export const tabBar = {
  height: 60,
  backgroundColor: '#374151',    // Dark gray
  activeIconColor: colors.white,
  inactiveIconColor: '#9ca3af',
};

// Navigation Bar
export const navigationBar = {
  backgroundColor: colors.background,
  backButtonColor: colors.primary,
  titleColor: colors.primary,
  titleSize: 18,
  titleWeight: '600',
};

export default colors;