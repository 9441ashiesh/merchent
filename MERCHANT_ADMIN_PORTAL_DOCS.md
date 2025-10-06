# Merchant & Admin Portal Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [UI Design System](#ui-design-system)
4. [Technical Stack](#technical-stack)
5. [Authentication System](#authentication-system)
6. [Merchant Portal](#merchant-portal)
7. [Admin Portal](#admin-portal)
8. [Navigation Structure](#navigation-structure)
9. [Data Flow](#data-flow)
10. [Development Guidelines](#development-guidelines)

---

## Overview

The Merchant & Admin Portal is a dual-interface React Native application designed for hostel booking system management. It provides separate interfaces for property merchants and system administrators, with role-based access control and streamlined authentication.

### Key Features
- **Dual Portal System**: Separate interfaces for merchants and admins
- **Passwordless Authentication**: Simple phone number-based login
- **Role-Based Navigation**: Automatic interface switching based on user role
- **Real-time Analytics**: Comprehensive dashboards with charts and metrics
- **Property Management**: Complete CRUD operations for hostel properties
- **Booking Management**: End-to-end booking lifecycle management
- **User Management**: Admin tools for managing platform users

---

## Architecture

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    React Native App                          │
├─────────────────────────────────────────────────────────────┤
│                 Navigation Layer                            │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │ Auth Navigator  │    │    Role-Based Navigator        │ │
│  │                 │    │ ┌─────────────┐ ┌─────────────┐ │ │
│  │ - Login Screen  │    │ │ Admin Tabs  │ │Merchant Tabs│ │ │
│  │ - Signup Screen │    │ │             │ │             │ │ │
│  │ - Forgot Pass   │    │ └─────────────┘ └─────────────┘ │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Context Layer                            │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  Auth Context   │    │     Other Contexts              │ │
│  │ - User State    │    │ - Theme Context                 │ │
│  │ - Login/Logout  │    │ - Notification Context          │ │
│  │ - Role Detection│    │ - Data Context                  │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    UI Components                            │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  Shared UI      │    │    Screen Components            │ │
│  │ - Custom Button │    │ - Dashboard Screens             │ │
│  │ - Input Fields  │    │ - Management Screens            │ │
│  │ - Charts        │    │ - Profile Screens               │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure
```
merchent/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── charts/         # Chart components
│   │   ├── forms/          # Form components
│   │   └── ui/             # Basic UI elements
│   ├── constants/          # App constants
│   │   └── colors.js       # Color definitions
│   ├── context/            # React Context providers
│   │   └── AuthContext.js  # Authentication state
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js # Main navigation setup
│   ├── screens/            # Screen components
│   │   ├── admin/          # Admin portal screens
│   │   ├── auth/           # Authentication screens
│   │   ├── dashboard/      # Merchant dashboard
│   │   ├── properties/     # Property management
│   │   ├── bookings/       # Booking management
│   │   └── profile/        # Profile screens
│   └── utils/              # Utility functions
└── docs/                   # Documentation files
```

---

## UI Design System

### Color Palette
```javascript
const colors = {
  // Primary Colors
  primary: '#2563eb',      // Blue - Primary actions
  secondary: '#7c3aed',    // Purple - Secondary actions
  
  // Status Colors
  success: '#10b981',      // Green - Success states
  warning: '#f59e0b',      // Yellow - Warning states
  error: '#ef4444',        // Red - Error states
  info: '#06b6d4',         // Cyan - Info states
  
  // Neutral Colors
  background: '#f8fafc',   // Light gray - App background
  white: '#ffffff',        // White - Cards, inputs
  gray100: '#f1f5f9',      // Very light gray
  gray200: '#e2e8f0',      // Light gray - Borders
  gray300: '#cbd5e1',      // Medium gray
  gray400: '#94a3b8',      // Icons, placeholders
  gray500: '#64748b',      // Secondary text
  gray600: '#475569',      // Primary text
  gray700: '#334155',      // Headings
  gray800: '#1e293b',      // Dark text
  gray900: '#0f172a',      // Darkest text
  
  // Text Colors
  textPrimary: '#1f2937',  // Main text
  textSecondary: '#6b7280', // Secondary text
  textMuted: '#9ca3af',    // Muted text
};
```

### Typography Scale
```javascript
const typography = {
  // Headings
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: '600' },
  h4: { fontSize: 20, fontWeight: '600' },
  h5: { fontSize: 18, fontWeight: '600' },
  h6: { fontSize: 16, fontWeight: '600' },
  
  // Body Text
  body: { fontSize: 16, fontWeight: 'normal' },
  bodySmall: { fontSize: 14, fontWeight: 'normal' },
  caption: { fontSize: 12, fontWeight: 'normal' },
  
  // Interactive Elements
  button: { fontSize: 16, fontWeight: '600' },
  link: { fontSize: 16, fontWeight: '500' },
};
```

### Component Design Patterns

#### Card Component
```javascript
const cardStyles = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};
```

#### Button Component
```javascript
const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
};
```

---

## Technical Stack

### Core Technologies
- **React Native**: `^0.72.0` - Cross-platform mobile development
- **Expo**: `~49.0.0` - Development platform and tools
- **React Navigation**: `^6.0.0` - Navigation library
- **React Context API**: State management

### UI Libraries
- **@expo/vector-icons**: Icon library
- **react-native-chart-kit**: Chart and graph components
- **react-native-svg**: SVG support for charts

### Navigation Stack
```javascript
const navigationLibraries = {
  '@react-navigation/native': '^6.1.7',
  '@react-navigation/stack': '^6.3.17',
  '@react-navigation/bottom-tabs': '^6.5.8',
  '@react-navigation/drawer': '^6.6.3',
};
```

### Development Tools
- **Expo CLI**: Development server and tools
- **Metro Bundler**: JavaScript bundler
- **React DevTools**: Debugging tools

### Chart Components
```javascript
const chartTypes = {
  LineChart: 'Revenue trends, user growth',
  BarChart: 'Monthly comparisons, category data',
  PieChart: 'Distribution data, percentages',
  ProgressChart: 'Goal completion, progress tracking',
  ContributionGraph: 'Activity patterns, frequency data',
  StackedBarChart: 'Multi-category comparisons',
};
```

---

## Authentication System

### Phone-Based Authentication
The app uses a simplified phone number authentication system without passwords.

#### Authentication Flow
```
User Input (Phone) → Validation → Role Detection → Auto Login → Role-Based Navigation
```

#### Implementation
```javascript
// Auth Context Logic
const login = async (credentials) => {
  const isAdmin = credentials.phone === '9';
  const isMerchant = credentials.phone === '8';
  
  const userData = isAdmin ? {
    id: 1,
    name: 'Admin User',
    phone: credentials.phone,
    role: 'admin'
  } : isMerchant ? {
    id: 2,
    name: 'John Doe',
    phone: credentials.phone,
    businessName: 'Cozy Hostel',
    role: 'merchant'
  } : null;
  
  if (userData) {
    setUser(userData);
    setIsAuthenticated(true);
    return { success: true };
  }
  
  return { success: false, error: 'Invalid phone number' };
};
```

#### Login Credentials
- **Admin Access**: Phone number `9`
- **Merchant Access**: Phone number `8`

#### Security Features
- Role-based access control
- Automatic session management
- Secure navigation routing
- Context-based state persistence

---

## Merchant Portal

### Dashboard Overview
The merchant dashboard provides comprehensive business insights and management tools.

#### Key Metrics
```javascript
const dashboardMetrics = {
  totalRevenue: '$25,678',
  totalBookings: 145,
  occupancyRate: '78%',
  averageRating: 4.5,
  activeProperties: 3,
  pendingBookings: 8,
};
```

#### Chart Components
1. **Revenue Chart**: Line chart showing monthly revenue trends
2. **Occupancy Chart**: Bar chart displaying occupancy rates by property
3. **Booking Sources**: Pie chart showing booking channel distribution
4. **Rating Trends**: Line chart tracking customer satisfaction

### Property Management
Complete CRUD operations for hostel properties.

#### Property Data Structure
```javascript
const propertySchema = {
  id: Number,
  name: String,
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: { lat: Number, lng: Number }
  },
  amenities: Array,
  images: Array,
  pricing: {
    basePrice: Number,
    currency: String,
    seasonalRates: Array
  },
  capacity: {
    totalBeds: Number,
    totalRooms: Number,
    dormitoryBeds: Number,
    privateBeds: Number
  },
  status: String, // 'active', 'inactive', 'maintenance'
  rating: Number,
  reviews: Array
};
```

#### Management Features
- **Add Property**: Multi-step form with image upload
- **Edit Property**: Inline editing with real-time preview
- **Property Status**: Active/Inactive toggle
- **Analytics**: Property-specific performance metrics
- **Booking Calendar**: Visual booking management

### Booking Management
End-to-end booking lifecycle management.

#### Booking States
```javascript
const bookingStates = {
  pending: 'Awaiting confirmation',
  confirmed: 'Booking confirmed',
  checkedIn: 'Guest checked in',
  checkedOut: 'Guest checked out',
  cancelled: 'Booking cancelled',
  noShow: 'Guest did not arrive'
};
```

#### Management Actions
- **Confirm Bookings**: Approve pending reservations
- **Modify Bookings**: Change dates, room types
- **Cancel Bookings**: Handle cancellations and refunds
- **Check-in/Check-out**: Manage guest arrival/departure
- **Communication**: Messaging with guests

### Financial Management
Revenue tracking and financial analytics.

#### Revenue Streams
- Room bookings
- Additional services
- Seasonal pricing
- Cancellation fees

#### Financial Reports
- Daily/Monthly/Yearly revenue
- Occupancy-based earnings
- Property comparison
- Tax reporting data

---

## Admin Portal

### System Overview
The admin portal provides system-wide management and oversight capabilities.

#### Key Responsibilities
- User management (merchants and guests)
- Platform analytics and reporting
- System configuration
- Content moderation
- Financial oversight

### Dashboard Analytics
Comprehensive system-wide metrics and insights.

#### System Metrics
```javascript
const adminMetrics = {
  totalUsers: 2847,
  totalMerchants: 156,
  totalProperties: 423,
  totalBookings: 8936,
  systemRevenue: '$456,789',
  platformCommission: '$45,678',
  activeDisputes: 3,
  systemUptime: '99.9%'
};
```

#### Chart Analytics
1. **User Growth**: Line chart showing user acquisition trends
2. **Revenue Distribution**: Pie chart showing revenue by merchant
3. **Geographic Distribution**: Map showing property locations
4. **Booking Patterns**: Heatmap showing booking frequency

### User Management
Complete user lifecycle management for all platform users.

#### User Categories
```javascript
const userTypes = {
  merchants: {
    total: 156,
    active: 142,
    pending: 8,
    suspended: 6
  },
  guests: {
    total: 2691,
    active: 2456,
    inactive: 235
  },
  admins: {
    total: 12,
    superAdmin: 2,
    moderators: 10
  }
};
```

#### Management Features
- **User Verification**: KYC/document verification
- **Account Status**: Active/Suspended/Banned states
- **Role Management**: Permission assignment
- **Activity Monitoring**: User behavior tracking
- **Support Integration**: Help desk management

### Property Oversight
Platform-wide property management and quality control.

#### Quality Assurance
- Property verification process
- Image and content moderation
- Compliance monitoring
- Performance benchmarking

#### Analytics
- Property performance rankings
- Merchant comparison metrics
- Market analysis
- Trend identification

### Financial Administration
Platform revenue and commission management.

#### Revenue Management
```javascript
const revenueBreakdown = {
  merchantRevenue: '$411,111', // 90%
  platformCommission: '$45,678', // 10%
  processingFees: '$3,456',
  refunds: '$8,234',
  netRevenue: '$449,345'
};
```

#### Financial Controls
- Commission rate management
- Payment processing oversight
- Refund management
- Tax reporting
- Financial analytics

---

## Navigation Structure

### Authentication Navigation
```javascript
const AuthStack = {
  Login: 'Login Screen',
  Signup: 'Signup Screen',
  ForgotPassword: 'Password Recovery'
};
```

### Merchant Navigation
```javascript
const MerchantTabs = {
  Dashboard: {
    screen: 'DashboardScreen',
    icon: 'grid-outline',
    title: 'Dashboard'
  },
  Properties: {
    screen: 'PropertiesScreen',
    icon: 'business-outline',
    title: 'Properties'
  },
  Bookings: {
    screen: 'BookingsScreen',
    icon: 'calendar-outline',
    title: 'Bookings'
  },
  Analytics: {
    screen: 'AnalyticsScreen',
    icon: 'bar-chart-outline',
    title: 'Analytics'
  },
  Profile: {
    screen: 'ProfileScreen',
    icon: 'person-outline',
    title: 'Profile'
  }
};
```

### Admin Navigation
```javascript
const AdminTabs = {
  Dashboard: {
    screen: 'AdminDashboard',
    icon: 'speedometer-outline',
    title: 'Dashboard'
  },
  Users: {
    screen: 'UserManagement',
    icon: 'people-outline',
    title: 'Users'
  },
  Properties: {
    screen: 'PropertyManagement',
    icon: 'business-outline',
    title: 'Properties'
  },
  Analytics: {
    screen: 'SystemAnalytics',
    icon: 'analytics-outline',
    title: 'Analytics'
  },
  Settings: {
    screen: 'SystemSettings',
    icon: 'settings-outline',
    title: 'Settings'
  }
};
```

### Navigation Flow
```
App Launch → Auth Check → Role Detection → Portal Selection → Tab Navigation
```

---

## Data Flow

### State Management Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Context Providers                       │
├─────────────────────────────────────────────────────────────┤
│  AuthContext → User State, Login/Logout, Role Management   │
│  ThemeContext → UI Theme, Color Schemes                    │
│  DataContext → Business Data, CRUD Operations              │
│  NotificationContext → Push Notifications, Alerts         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Screen Components                        │
├─────────────────────────────────────────────────────────────┤
│  Dashboard → Metrics, Charts, Quick Actions                │
│  Management → CRUD Operations, Data Tables                 │
│  Profile → User Settings, Preferences                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    UI Components                            │
├─────────────────────────────────────────────────────────────┤
│  Charts → Data Visualization                               │
│  Forms → Data Input, Validation                            │
│  Lists → Data Display, Actions                             │
└─────────────────────────────────────────────────────────────┘
```

### Data Models

#### User Model
```javascript
const UserModel = {
  id: Number,
  name: String,
  phone: String,
  email: String,
  role: String, // 'admin', 'merchant', 'guest'
  status: String, // 'active', 'inactive', 'suspended'
  createdAt: Date,
  lastLogin: Date,
  profile: {
    avatar: String,
    bio: String,
    preferences: Object
  }
};
```

#### Property Model
```javascript
const PropertyModel = {
  id: Number,
  merchantId: Number,
  name: String,
  description: String,
  location: LocationModel,
  amenities: Array,
  images: Array,
  pricing: PricingModel,
  capacity: CapacityModel,
  status: String,
  createdAt: Date,
  updatedAt: Date
};
```

#### Booking Model
```javascript
const BookingModel = {
  id: Number,
  propertyId: Number,
  guestId: Number,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  status: String,
  totalAmount: Number,
  paymentStatus: String,
  createdAt: Date
};
```

---

## Development Guidelines

### Code Structure
```javascript
// Screen Component Structure
const ScreenComponent = ({ navigation, route }) => {
  // 1. State hooks
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 2. Context hooks
  const { user } = useAuth();
  
  // 3. Effect hooks
  useEffect(() => {
    loadData();
  }, []);
  
  // 4. Helper functions
  const loadData = async () => {
    // Implementation
  };
  
  // 5. Event handlers
  const handleAction = () => {
    // Implementation
  };
  
  // 6. Render methods
  const renderItem = ({ item }) => (
    // JSX
  );
  
  // 7. Main render
  return (
    // JSX
  );
};
```

### Style Guidelines
```javascript
// StyleSheet organization
const styles = StyleSheet.create({
  // 1. Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // 2. Layout styles
  header: {
    // Header styles
  },
  content: {
    // Content styles
  },
  footer: {
    // Footer styles
  },
  
  // 3. Component styles
  card: {
    // Card styles
  },
  button: {
    // Button styles
  },
  
  // 4. Text styles
  title: {
    // Title styles
  },
  subtitle: {
    // Subtitle styles
  }
});
```

### Performance Best Practices
1. **Lazy Loading**: Load screens and components on demand
2. **Memoization**: Use React.memo for expensive components
3. **Virtualization**: Use FlatList for large data sets
4. **Image Optimization**: Compress and cache images
5. **State Optimization**: Minimize context re-renders

### Testing Strategy
1. **Unit Tests**: Component functionality testing
2. **Integration Tests**: Screen flow testing
3. **E2E Tests**: Complete user journey testing
4. **Performance Tests**: Memory and CPU usage monitoring

### Deployment Checklist
- [ ] Code review completed
- [ ] Unit tests passing
- [ ] Performance optimization verified
- [ ] Documentation updated
- [ ] Build configuration verified
- [ ] App store compliance checked

---

## Conclusion

The Merchant & Admin Portal provides a comprehensive solution for hostel booking system management with intuitive interfaces, robust functionality, and scalable architecture. The dual-portal approach ensures role-specific experiences while maintaining code efficiency and development velocity.

### Future Enhancements
1. **Real-time Features**: WebSocket integration for live updates
2. **Advanced Analytics**: Machine learning insights
3. **Mobile Optimization**: Enhanced mobile-specific features
4. **Integration APIs**: Third-party service integrations
5. **Offline Support**: Offline functionality for critical features

---

*This documentation is maintained by the development team and updated with each major release.*