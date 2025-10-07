# Quick Reference Guide
## Hostel Management App - Merchant & Admin Portals

---

## 🔐 Login Credentials

| Role | Phone Number | Password | Access |
|------|-------------|----------|--------|
| **Merchant** | `8` | None | Own properties, rooms, members |
| **Admin** | `9` | None | All platform data, approvals, settings |

---

## 📱 App Structure

```
Authentication (AuthContext)
    ↓
Phone = '8' → Merchant Tabs
Phone = '9' → Admin Tabs
```

---

## 🎨 Design System (Both Portals)

### Colors
```javascript
Primary:    #1f2937  // Dark Gray
Success:    #10b981  // Green
Warning:    #f59e0b  // Orange
Error:      #ef4444  // Red
Info:       #3b82f6  // Blue
Background: #f8f9fa  // Light Gray
```

### Spacing (4px grid)
```
xs: 4   sm: 8   md: 12   lg: 16
xl: 20  xxl: 24 xxxl: 32 xxxxl: 40
```

### Typography
```
h1: 32px  h2: 24px  h3: 20px
h4: 18px  h5: 16px  body: 14px
```

---

## 👨‍💼 MERCHANT PORTAL

### Bottom Tabs (5)
1. 📊 **Dashboard** - Overview & charts
2. 🏢 **Properties** - Property management
3. 📅 **Bookings** - Reservations
4. 📈 **Analytics** - Performance metrics
5. 👤 **Profile** - Settings

### Navigation Flow
```
Properties → PropertyDetail → RoomDetail → StudentProfile
```

### Data Hierarchy
```
Property (Hostel)
  ├── Room 101 (Single)
  │   └── Student: Rahul Sharma
  ├── Room 102 (Double)
  │   ├── Student: Priya Patel
  │   └── Student: Amit Kumar
  └── Room 103 (Shared - 4 beds)
      ├── Student: Sneha Reddy
      ├── Student: Karthik Menon
      └── Student: Neha Singh
```

### Key Features
✅ View own properties only
✅ Manage rooms and students
✅ Track payments (Paid/Pending/Overdue)
✅ View revenue and occupancy
✅ Charts and analytics
✅ Member profiles

### Dashboard Metrics (6 Cards)
- Total Rooms
- Occupied Rooms
- Vacant Rooms
- Total Members
- Monthly Revenue
- Pending Payments

### Student Profile Sections
1. Profile Header (photo, name, status)
2. Room Information
3. Contact Information
4. Academic/Professional Info
5. Guardian Contact
6. Payment Details
7. Documents
8. Action Buttons (Call, Message, Record Payment)

---

## 👨‍💼 ADMIN PORTAL

### Bottom Tabs (5)
1. 📊 **Dashboard** - Platform overview
2. 👥 **Users** - Merchant management
3. 🏢 **Properties** - All properties + approvals
4. 📈 **Analytics** - Platform-wide analytics
5. ⚙️ **Settings** - System configuration

### Key Differences from Merchant
| Feature | Merchant | Admin |
|---------|----------|-------|
| Properties | Own only | All platform |
| Users | Own members | All merchants |
| Approvals | None | Can approve properties |
| Settings | Personal | Platform-wide |
| Analytics | Own data | All platform data |

### Platform Overview Metrics (8 Cards)
- Total Users (Merchants)
- Active Properties
- Total Rooms
- Occupancy Rate %
- Platform Revenue
- Pending Approvals ⚠️
- Active Members
- Payment Success Rate

### Property Approval Workflow
```
Merchant Submits
    ↓
Pending Approval (Admin notified)
    ↓
Admin Reviews Documents
    ↓
Approve ✓ / Reject ✗ / Request More Info ⓘ
    ↓
Merchant Notified
```

### Admin Permissions
✅ Approve/Reject properties
✅ Verify user documents
✅ View all analytics
✅ Manage subscriptions
✅ Configure settings
✅ Send notifications
✅ Export reports
✅ Access audit logs

### Settings Categories (12)
1. Platform Settings
2. Commission & Pricing
3. Subscription Plans
4. Payment Configuration
5. Notification Settings
6. User Permissions
7. Document Requirements
8. Approval Workflow
9. System Configuration
10. Security Settings
11. Localization
12. Analytics & Tracking

---

## 📊 Data Models

### Property Object
```javascript
{
  id: '1',
  name: 'Sunrise Hostel',
  location: 'Mumbai, Maharashtra',
  totalRooms: 12,
  occupiedRooms: 9,
  totalBeds: 50,
  occupiedBeds: 38,
  monthlyRevenue: 190000,
  rating: 4.5
}
```

### Room Object
```javascript
{
  id: 'r1',
  propertyId: '1',
  roomNumber: '101',
  type: 'Single',        // Single/Double/Shared
  beds: 1,
  occupied: 1,
  rent: 8000,
  floor: 1
}
```

### Student Object
```javascript
{
  id: 's1',
  roomId: 'r1',
  propertyId: '1',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul@email.com',
  age: 22,
  occupation: 'Student',
  college: 'Mumbai University',
  course: 'B.Tech CS',
  year: '3rd Year',
  guardianName: 'Mr. Vijay Sharma',
  guardianPhone: '+91 98765 43211',
  rent: 8000,
  deposit: 16000,
  paymentStatus: 'paid',  // paid/pending/overdue
  joinDate: '2024-08-01',
  lastPayment: '2024-09-25',
  nextPayment: '2024-10-25',
  documents: ['Aadhar', 'College ID']
}
```

### Merchant User (Admin View)
```javascript
{
  id: 'm1',
  name: 'John Doe',
  phone: '+91 98765 43210',
  email: 'john@example.com',
  role: 'merchant',
  status: 'active',      // active/inactive/suspended
  propertyCount: 3,
  totalRooms: 35,
  monthlyRevenue: 483500,
  subscription: {
    plan: 'premium',     // free/basic/premium/enterprise
    startDate: '2024-01-15',
    endDate: '2025-01-15'
  }
}
```

---

## 🎯 Payment Status System

### Status Colors
| Status | Color | Badge Color | Meaning |
|--------|-------|-------------|---------|
| **Paid** | Green `#10b981` | Light green bg | Payment completed |
| **Pending** | Orange `#f59e0b` | Light orange bg | Payment due soon |
| **Overdue** | Red `#ef4444` | Light red bg | Payment late |

### Payment Badge Component
```javascript
// Usage throughout app
<View style={[
  styles.paymentBadge,
  { backgroundColor: `${getStatusColor(status)}15` }
]}>
  <Text style={{ color: getStatusColor(status) }}>
    {status}
  </Text>
</View>
```

---

## 🏗️ File Structure

```
src/
├── components/
│   ├── layout/
│   ├── navigation/
│   └── ui/
├── constants/
│   └── colors.js              ← Design system
├── context/
│   ├── AuthContext.js         ← Login: 8=merchant, 9=admin
│   └── FavoritesContext.js
├── navigation/
│   └── AppNavigator.js        ← Route config
├── screens/
│   ├── auth/
│   │   └── LoginScreen.js
│   ├── dashboard/
│   │   └── MerchantDashboard.js
│   ├── properties/
│   │   ├── PropertiesScreen.js
│   │   └── PropertyDetailScreen.js
│   ├── rooms/
│   │   └── RoomDetailScreen.js
│   ├── members/
│   │   └── StudentProfileScreen.js
│   └── admin/                 ← Admin screens
│       ├── dashboard/
│       ├── users/
│       ├── properties/
│       ├── analytics/
│       └── settings/
└── services/
    └── mockData.js            ← Test data
```

---

## 🔧 Common Functions

### Get Payment Status Color
```javascript
const getPaymentStatusColor = (status) => {
  if (status === 'paid') return colors.success;
  if (status === 'overdue') return colors.error;
  return colors.warning;
};
```

### Get Room Status
```javascript
const getRoomStatusColor = (room) => {
  if (room.occupied === 0) return colors.success;      // Vacant
  if (room.occupied === room.beds) return colors.error; // Full
  return colors.warning;                                // Partial
};
```

### Calculate Occupancy Rate
```javascript
const occupancyRate = (occupied / total * 100).toFixed(1);
```

### Format Currency
```javascript
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
```

---

## 📈 Charts Used

### Dashboard Charts (Merchant)
1. **Line Chart** - Revenue trend (6 months)
2. **Bar Chart** - Occupancy by room type
3. **Pie Chart** - Payment status distribution

### Admin Analytics Charts
1. **Line Chart** - User growth
2. **Line Chart** - Platform revenue
3. **Area Chart** - Occupancy trends
4. **Pie Chart** - Property distribution
5. **Bar Chart** - Revenue by city

---

## 🚀 Quick Start Guide

### For AI/Developers

1. **Clone & Install**
   ```bash
   cd merchent
   npm install
   ```

2. **Login Testing**
   - Merchant: Phone = `8`
   - Admin: Phone = `9`

3. **Mock Data Location**
   ```
   src/services/mockData.js
   ```

4. **Key Files to Review**
   - `src/constants/colors.js` - Design system
   - `src/context/AuthContext.js` - Authentication
   - `src/navigation/AppNavigator.js` - Navigation
   - `src/services/mockData.js` - Data structure

5. **Add New Screen**
   - Create file in `src/screens/[category]/`
   - Import design constants
   - Add to AppNavigator.js
   - Use design system colors/spacing

---

## 🐛 Troubleshooting

### Navigation Issues
- ✅ Check screen registered in AppNavigator.js
- ✅ Verify navigation.navigate() screen name matches
- ✅ Ensure navigation prop passed correctly

### Styling Issues
- ✅ Import from colors.js: `import colors, { typography, spacing, borderRadius } from '../../constants/colors'`
- ✅ Use constants, not hardcoded values
- ✅ Check StyleSheet.create() used

### Data Not Showing
- ✅ Check mockData.js structure
- ✅ Verify filter logic (propertyId, roomId matches)
- ✅ Console.log data to debug

### Login Not Working
- ✅ Use phone "8" for merchant, "9" for admin
- ✅ Check AuthContext wrapped in App.js
- ✅ Verify navigation structure

---

## 📝 Next Steps / TODO

### Merchant Portal
- [ ] Add new property form
- [ ] Add new room form
- [ ] Add new member form
- [ ] Record payment screen
- [ ] Payment history
- [ ] Reports/Export

### Admin Portal
- [ ] Complete AdminDashboard.js
- [ ] User management screens
- [ ] Property approval flow
- [ ] Settings screens
- [ ] Analytics screens
- [ ] Notification system

### Common
- [ ] API integration
- [ ] Real-time updates
- [ ] Image upload
- [ ] Search & filter
- [ ] Pagination
- [ ] Error handling
- [ ] Loading states
- [ ] Offline support

---

## 📚 Documentation Files

1. **MERCHANT_PORTAL_DOCUMENTATION.md** - Complete merchant guide
2. **ADMIN_PORTAL_DOCUMENTATION.md** - Complete admin guide
3. **QUICK_REFERENCE.md** - This file (overview)

---

## 💡 Tips for AI Assistants

### Understanding Context
- Phone "8" = Merchant access
- Phone "9" = Admin access
- Design system in colors.js
- Mock data in mockData.js

### Making Changes
- Always use design system constants
- Follow existing patterns
- Maintain data hierarchy: Property → Room → Student
- Use payment status colors consistently

### Adding Features
- Check both MERCHANT and ADMIN docs
- Verify permissions (merchant vs admin)
- Update navigation if needed
- Add to mockData.js for testing

### Code Patterns to Follow
```javascript
// Import pattern
import colors, { typography, spacing, borderRadius } from '../../constants/colors';

// Card pattern
<View style={styles.card}>...</View>

// Status badge pattern
<View style={[styles.badge, { backgroundColor: `${color}15` }]}>
  <Text style={{ color }}>{status}</Text>
</View>

// Info row pattern
<View style={styles.infoRow}>
  <Ionicons name="icon" size={18} color={colors.primary} />
  <View style={styles.infoContent}>
    <Text style={styles.label}>Label</Text>
    <Text style={styles.value}>Value</Text>
  </View>
</View>
```

---

**Last Updated**: October 7, 2025
**App Version**: 1.0.0
**React Native**: 0.72.6
**Expo**: 49.0.15

---

## 🆘 Quick Help

**Q: How to add new property?**
A: Navigate to Properties → Tap + button → AddPropertyScreen

**Q: How to see all students in a room?**
A: Properties → Select Property → Select Room → See student list

**Q: What's the difference between merchant and admin?**
A: Merchant manages their own properties. Admin manages entire platform.

**Q: Where is mock data?**
A: `src/services/mockData.js`

**Q: How to change colors?**
A: Edit `src/constants/colors.js`

**Q: Login not working?**
A: Use phone "8" for merchant or "9" for admin

---

**Need more details?** 
Check the full documentation files:
- MERCHANT_PORTAL_DOCUMENTATION.md
- ADMIN_PORTAL_DOCUMENTATION.md
