# Merchant Portal Documentation

## Project Overview
This is a React Native mobile application for hostel/property management. The merchant portal allows property owners to manage their hostels, rooms, members, payments, and analytics.

## Technology Stack
- **Framework**: React Native with Expo (~49.0.15)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Charts**: React Native Chart Kit
- **State Management**: React Context API
- **Authentication**: Phone-based login (phone='8' for merchant)

## Design System

### Color Palette (Minimalist Dark Theme)
```javascript
// Primary Colors
primary: '#1f2937'        // Dark Gray - Main brand color
secondary: '#6b7280'      // Medium Gray
tertiary: '#9ca3af'       // Light Gray

// Semantic Colors
success: '#10b981'        // Green - Success states
warning: '#f59e0b'        // Orange - Warnings
error: '#ef4444'          // Red - Errors
info: '#3b82f6'           // Blue - Information

// Background Colors
background: '#f8f9fa'     // Light gray background
lightBackground: '#f3f4f6' // Card backgrounds
white: '#ffffff'          // Pure white
```

### Typography Scale
```javascript
h1: { fontSize: 32, fontWeight: '700' }
h2: { fontSize: 24, fontWeight: '700' }
h3: { fontSize: 20, fontWeight: '600' }
h4: { fontSize: 18, fontWeight: '600' }
h5: { fontSize: 16, fontWeight: '600' }
bodyLarge: { fontSize: 16, fontWeight: '400' }
bodyMedium: { fontSize: 14, fontWeight: '400' }
bodySmall: { fontSize: 12, fontWeight: '400' }
label: { fontSize: 14, fontWeight: '500' }
caption: { fontSize: 12, fontWeight: '400' }
```

### Spacing System (4px Grid)
```javascript
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
xxl: 24px
xxxl: 32px
xxxxl: 40px
```

### Border Radius
```javascript
small: 4px
medium: 8px
large: 12px
xlarge: 16px
```

## Authentication

### Login Credentials
- **Merchant Login**: 
  - Phone Number: `8`
  - No password required
  - Role: `merchant`

### Authentication Flow
1. User enters phone number "8"
2. AuthContext validates and sets user role to "merchant"
3. Navigation redirects to Merchant Bottom Tabs
4. User data stored in context with permissions

### User Object Structure
```javascript
{
  id: 'merchant-user',
  phone: '8',
  role: 'merchant',
  name: 'Merchant User',
  permissions: ['manage_properties', 'view_bookings', 'manage_members']
}
```

## Data Structure

### Properties (Hostels/Buildings)
```javascript
{
  id: '1',
  name: 'Sunrise Hostel',
  location: 'Mumbai, Maharashtra',
  address: '123 Marine Drive, Mumbai',
  type: 'Mixed',              // Male/Female/Mixed
  totalRooms: 12,
  occupiedRooms: 9,
  totalBeds: 50,
  occupiedBeds: 38,
  monthlyRevenue: 190000,
  image: 'https://...',
  amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen', 'Security'],
  rating: 4.5
}
```

### Rooms
```javascript
{
  id: 'r1',
  propertyId: '1',
  roomNumber: '101',
  type: 'Single',             // Single/Double/Shared
  beds: 1,                    // Total beds
  occupied: 1,                // Currently occupied beds
  rent: 8000,                 // Monthly rent per bed
  floor: 1
}
```

### Students/Members
```javascript
{
  id: 's1',
  roomId: 'r1',
  propertyId: '1',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@email.com',
  age: 22,
  occupation: 'Student',      // Student/Working Professional
  
  // For Students
  college: 'Mumbai University',
  course: 'B.Tech Computer Science',
  year: '3rd Year',
  
  // For Professionals
  company: 'Tech Company',
  designation: 'Software Developer',
  
  // Guardian Info
  guardianName: 'Mr. Vijay Sharma',
  guardianPhone: '+91 98765 43211',
  
  // Payment Info
  joinDate: '2024-08-01',
  rent: 8000,
  deposit: 16000,
  paymentStatus: 'paid',      // paid/pending/overdue
  lastPayment: '2024-09-25',
  nextPayment: '2024-10-25',
  
  // Documents
  idProof: 'Aadhar Card',
  idNumber: '1234 5678 9012',
  photo: 'https://...',
  documents: ['Aadhar Card', 'College ID', 'Guardian ID']
}
```

## Navigation Structure

### Merchant Bottom Tabs
1. **Dashboard** - Overview metrics and charts
2. **Properties** - Property management
3. **Bookings** - Booking management
4. **Analytics** - Performance analytics
5. **Profile** - User profile and settings

### Screen Flow (Hierarchical Navigation)
```
Properties Tab:
├── PropertiesList (Shows all properties)
│   └── PropertyDetail (Shows property info + all rooms)
│       └── RoomDetail (Shows room info + all students in room)
│           └── StudentProfile (Complete student information)
```

## Merchant Portal Screens

### 1. Dashboard Screen
**Path**: `src/screens/dashboard/MerchantDashboard.js`

**Purpose**: Main overview of all properties and business metrics

**Components**:
- **Header**: Greeting, business name, notifications
- **Summary Cards** (6 cards):
  - Total Rooms
  - Occupied Rooms
  - Vacant Rooms
  - Total Members
  - Monthly Revenue
  - Pending Payments
- **Revenue Trend Chart**: Line chart showing last 6 months
- **Occupancy Chart**: Bar chart by room type
- **Payment Status**: Pie chart (Paid/Pending/Overdue)
- **Quick Actions** (4 buttons):
  - Add Property
  - Add Room
  - Record Payment
  - View Reports
- **Recent Activity**: Feed of latest actions

**Data Displayed**:
```javascript
// Summary Metrics
totalRooms: 35
occupiedRooms: 28
vacantRooms: 7
totalMembers: 52
monthlyRevenue: ₹483,500
pendingPayments: ₹45,000

// Charts
revenueData: [380000, 420000, 395000, 450000, 475000, 483500]
occupancyByType: {
  Single: 12,
  Double: 8,
  Shared: 8
}
paymentStatus: {
  Paid: 42,
  Pending: 8,
  Overdue: 2
}
```

### 2. Properties List Screen
**Path**: `src/screens/properties/PropertiesScreen.js`

**Purpose**: Display all properties owned by merchant

**Components**:
- **Header**: Title + Add Property button
- **Summary Cards**:
  - Total Properties
  - Active Rooms
  - Total Members
- **Property Cards** (for each property):
  - Property image
  - Name and rating
  - Location
  - Room occupancy (occupied/total)
  - Bed occupancy
  - Monthly revenue
  - Amenities tags
  - Occupancy progress bar

**Actions**:
- Tap property → Navigate to PropertyDetail
- Tap Add button → Navigate to AddProperty

### 3. Property Detail Screen
**Path**: `src/screens/properties/PropertyDetailScreen.js`

**Purpose**: Show detailed information about a property and all its rooms

**Components**:
- **Header**: Property image with back button
- **Property Info Card**:
  - Property name
  - Full address
  - Stats grid: Total Rooms, Occupied, Members, Revenue
- **Rooms Section** (Grouped by Floor):
  - Floor 1
    - Room 101, Room 102, etc.
  - Floor 2
    - Room 201, Room 202, etc.

**Room Card Details**:
- Room number with status badge (Vacant/Partial/Full)
- Floor, Type, Bed occupancy
- Monthly rent per bed
- Current revenue from room
- View Details button

**Status Colors**:
- Vacant (0 occupied): Green
- Partial (some occupied): Orange
- Full (all occupied): Red

**Actions**:
- Tap room card → Navigate to RoomDetail

### 4. Room Detail Screen
**Path**: `src/screens/rooms/RoomDetailScreen.js`

**Purpose**: Show room information and all students/members in that room

**Components**:
- **Header**: Room number with back button
- **Room Info Card**:
  - Property name and location
  - Room type badge
  - Stats: Floor, Occupancy, Rent
  - Revenue card (Total Revenue vs Potential Revenue)
- **Members Section**:
  - Section title with count (e.g., "Members (3/4)")
  - Add Member button (if room not full)
  - Student cards for each member

**Student Card Details**:
- Profile photo
- Name with payment status badge
- Phone number
- College/Company name
- Monthly rent
- Next payment date
- View profile button

**Empty State**:
- Shows when no members in room
- "Add members to get started" message

**Actions**:
- Tap student card → Navigate to StudentProfile
- Tap Add Member → Add member form

### 5. Student Profile Screen
**Path**: `src/screens/members/StudentProfileScreen.js`

**Purpose**: Complete profile view of a student/member

**Sections**:

1. **Profile Header**:
   - Large profile photo
   - Full name
   - Occupation (Student/Working Professional)
   - Payment status badge

2. **Room Information**:
   - Property name
   - Room number
   - Floor

3. **Contact Information**:
   - Phone number
   - Email address
   - Age

4. **Academic Information** (for Students):
   - College name
   - Course (e.g., B.Tech Computer Science)
   - Year (e.g., 3rd Year)

   **OR Professional Information** (for Working):
   - Company name
   - Designation

5. **Guardian/Emergency Contact**:
   - Guardian name
   - Guardian phone number

6. **Payment Information**:
   - Monthly rent
   - Security deposit
   - Join date
   - Last payment date
   - Next payment due date

7. **Documents**:
   - ID proof type (Aadhar/Passport/DL)
   - ID number
   - List of submitted documents

8. **Action Buttons**:
   - Record Payment (Primary button)
   - Call, Message, Email (Secondary buttons)

**Payment Status Colors**:
- Paid: Green (#10b981)
- Pending: Orange (#f59e0b)
- Overdue: Red (#ef4444)

## File Structure
```
src/
├── components/
│   ├── layout/
│   │   └── UserLayout.js
│   ├── navigation/
│   │   └── CustomBottomTabBar.js
│   └── ui/
│       └── CustomButton.js
├── constants/
│   └── colors.js                 # Design system constants
├── context/
│   ├── AuthContext.js            # Authentication state
│   └── FavoritesContext.js
├── navigation/
│   └── AppNavigator.js           # Main navigation config
├── screens/
│   ├── auth/
│   │   └── LoginScreen.js
│   ├── dashboard/
│   │   └── MerchantDashboard.js  # Main dashboard
│   ├── properties/
│   │   ├── PropertiesScreen.js   # Properties list
│   │   ├── PropertyDetailScreen.js  # Property + rooms
│   │   └── AddPropertyScreen.js
│   ├── rooms/
│   │   └── RoomDetailScreen.js   # Room + students
│   ├── members/
│   │   └── StudentProfileScreen.js  # Student profile
│   ├── bookings/
│   ├── analytics/
│   └── profile/
└── services/
    └── mockData.js               # Mock data for testing
```

## Key Features

### 1. Hierarchical Data Navigation
- **Properties → Rooms → Students**
- Each level shows detailed information
- Easy drill-down navigation
- Back navigation preserved

### 2. Payment Status Tracking
- Three states: Paid, Pending, Overdue
- Color-coded badges throughout app
- Payment due dates displayed
- Revenue calculations at all levels

### 3. Occupancy Management
- Real-time occupancy tracking
- Visual progress bars
- Color-coded status (Vacant/Partial/Full)
- Occupancy percentages

### 4. Revenue Analytics
- Property-level revenue
- Room-level revenue (actual vs potential)
- Monthly revenue trends
- Revenue charts on dashboard

### 5. Search & Filter (To be implemented)
- Search properties by name/location
- Filter rooms by type/status
- Filter students by payment status
- Sort by occupancy/revenue

## Common UI Patterns

### Card Component Pattern
```javascript
<View style={styles.card}>
  {/* Card content */}
</View>

// Styles
card: {
  backgroundColor: colors.white,
  borderRadius: borderRadius.large,
  padding: spacing.lg,
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
}
```

### Status Badge Pattern
```javascript
<View style={[
  styles.statusBadge,
  { backgroundColor: `${getStatusColor(status)}15` }
]}>
  <Text style={[
    styles.statusText,
    { color: getStatusColor(status) }
  ]}>
    {status}
  </Text>
</View>
```

### Info Row Pattern
```javascript
<View style={styles.infoRow}>
  <Ionicons name="icon-name" size={18} color={colors.primary} />
  <View style={styles.infoContent}>
    <Text style={styles.infoLabel}>Label</Text>
    <Text style={styles.infoValue}>Value</Text>
  </View>
</View>
```

## API Integration (Future)

### Expected API Endpoints
```
// Authentication
POST /api/auth/login
POST /api/auth/logout

// Properties
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id

// Rooms
GET    /api/properties/:propertyId/rooms
GET    /api/rooms/:id
POST   /api/rooms
PUT    /api/rooms/:id
DELETE /api/rooms/:id

// Members/Students
GET    /api/rooms/:roomId/members
GET    /api/members/:id
POST   /api/members
PUT    /api/members/:id
DELETE /api/members/:id

// Payments
GET    /api/payments
POST   /api/payments
GET    /api/members/:id/payments

// Analytics
GET    /api/analytics/revenue
GET    /api/analytics/occupancy
GET    /api/analytics/payments
```

## State Management

### AuthContext
```javascript
{
  isAuthenticated: boolean,
  user: {
    id: string,
    phone: string,
    role: 'merchant' | 'admin',
    name: string,
    permissions: string[]
  },
  login: (phone, password) => Promise,
  logout: () => void,
  loading: boolean
}
```

### Future Context Needs
- **PropertiesContext**: Manage properties state
- **RoomsContext**: Manage rooms state
- **MembersContext**: Manage members state
- **PaymentsContext**: Manage payments state

## Testing

### Mock Data Location
`src/services/mockData.js`

Contains:
- `mockProperties` (3 properties)
- `mockRooms` (12 rooms)
- `mockStudents` (11 students)

### Test Scenarios
1. Login with phone "8"
2. View dashboard metrics
3. Navigate to Properties
4. Select a property → View rooms
5. Select a room → View students
6. Select a student → View profile
7. Check payment status colors
8. Verify revenue calculations
9. Test occupancy displays
10. Navigate back through hierarchy

## Development Guidelines

### Adding New Screens
1. Create file in appropriate `screens/` folder
2. Import design system from `constants/colors.js`
3. Use typography, spacing, borderRadius constants
4. Follow card-based layout pattern
5. Add to navigation in `AppNavigator.js`

### Styling Rules
- Always use design system constants
- No hardcoded colors (use colors.js)
- Use spacing scale (no random numbers)
- Follow 4px grid system
- Use typography scale for text

### Component Structure
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors, { typography, spacing, borderRadius } from '../../constants/colors';

export default function ComponentName({ navigation, route }) {
  // Component logic
  
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // More styles using design system
});
```

## Performance Considerations

### Image Loading
- Use placeholder backgrounds
- Lazy load images in lists
- Cache avatar images
- Compress uploaded images

### List Rendering
- Use FlatList for long lists
- Implement pagination for large datasets
- Use keyExtractor properly
- Optimize renderItem

### State Updates
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Debounce search inputs
- Optimize context providers

## Accessibility

### Touchable Areas
- Minimum 44x44 touch targets
- Adequate spacing between buttons
- Clear visual feedback on press

### Text Readability
- Minimum 12px font size
- Adequate contrast ratios
- Clear hierarchy with typography scale

### Navigation
- Clear back buttons
- Breadcrumb navigation where needed
- Consistent navigation patterns

## Future Enhancements

### Phase 2 Features
1. **Search & Filter**
   - Global search
   - Advanced filters
   - Sort options

2. **Notifications**
   - Payment reminders
   - Occupancy alerts
   - New booking notifications

3. **Reports**
   - PDF export
   - Revenue reports
   - Occupancy reports
   - Payment reports

4. **Member Management**
   - Add new members
   - Edit member details
   - Transfer members between rooms
   - Member check-in/check-out

5. **Payment Processing**
   - Record payments
   - Payment history
   - Generate receipts
   - Payment reminders

6. **Booking System**
   - Online bookings
   - Booking calendar
   - Booking confirmations
   - Cancellation handling

### Phase 3 Features
1. Real-time notifications
2. Chat/Messaging system
3. Document upload/storage
4. Advanced analytics/insights
5. Multi-property management
6. Staff management
7. Maintenance tracking
8. Expense management

## Troubleshooting

### Common Issues

**Issue**: Navigation not working
- Check if screen is registered in AppNavigator.js
- Verify screen name matches navigation.navigate() call
- Check if navigation prop is passed correctly

**Issue**: Styles not applying
- Verify imports from colors.js
- Check if design system constants exist
- Ensure StyleSheet.create() is used

**Issue**: Data not displaying
- Check mockData.js for correct structure
- Verify filter conditions (propertyId, roomId)
- Check console for errors

**Issue**: Login not working
- Use phone number "8" for merchant
- Check AuthContext is properly wrapped
- Verify navigation structure

## Contact & Support
For questions or issues:
- Check this documentation first
- Review code comments
- Test with mock data
- Check console for errors

---

**Last Updated**: October 7, 2025
**Version**: 1.0.0
**Platform**: React Native (iOS & Android)
