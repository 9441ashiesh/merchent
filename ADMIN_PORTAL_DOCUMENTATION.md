# Admin Portal Documentation

## Project Overview
This is a React Native mobile application for hostel/property management. The admin portal provides system-wide oversight, user management, property approval, analytics, and platform configuration for administrators.

## Technology Stack
- **Framework**: React Native with Expo (~49.0.15)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Charts**: React Native Chart Kit
- **State Management**: React Context API
- **Authentication**: Phone-based login (phone='9' for admin)

## Design System
Same minimalist dark theme as Merchant Portal (see MERCHANT_PORTAL_DOCUMENTATION.md for details)

## Authentication

### Login Credentials
- **Admin Login**: 
  - Phone Number: `9`
  - No password required
  - Role: `admin`

### Authentication Flow
1. User enters phone number "9"
2. AuthContext validates and sets user role to "admin"
3. Navigation redirects to Admin Bottom Tabs
4. User data stored in context with full admin permissions

### Admin User Object Structure
```javascript
{
  id: 'admin-user',
  phone: '9',
  role: 'admin',
  name: 'Admin User',
  permissions: [
    'manage_users',
    'approve_properties',
    'view_all_analytics',
    'manage_settings',
    'manage_bookings',
    'view_payments',
    'manage_permissions'
  ]
}
```

## Navigation Structure

### Admin Bottom Tabs
1. **Dashboard** - System-wide overview and metrics
2. **Users** - Merchant and user management
3. **Properties** - All properties across platform
4. **Analytics** - Platform-wide analytics
5. **Settings** - System configuration and settings

### Screen Flow
```
Admin Dashboard:
├── System Overview
├── Platform Metrics
└── Recent Activities

Users Tab:
├── UsersList (All merchants)
│   └── UserDetail (Merchant info + properties)
│       └── UserProperties (List of merchant's properties)

Properties Tab:
├── PropertiesList (All properties on platform)
│   ├── PropertyDetail (Property info + approval)
│   └── PropertyAnalytics (Performance metrics)

Analytics Tab:
├── AnalyticsDashboard
│   ├── Revenue Analytics
│   ├── Occupancy Trends
│   ├── User Growth
│   └── Payment Analytics

Settings Tab:
├── SettingsMain
│   ├── Platform Settings
│   ├── Payment Configuration
│   ├── Notification Settings
│   └── User Permissions
```

## Data Structure

### Admin-Specific Data Models

#### Platform Users (Merchants)
```javascript
{
  id: 'm1',
  name: 'John Doe',
  phone: '+91 98765 43210',
  email: 'john@example.com',
  role: 'merchant',
  status: 'active',           // active/inactive/suspended
  joinDate: '2024-01-15',
  propertyCount: 3,
  totalRooms: 35,
  totalMembers: 52,
  monthlyRevenue: 483500,
  lastActive: '2024-10-07',
  verificationStatus: 'verified',  // verified/pending/rejected
  documents: {
    pan: 'verified',
    aadhar: 'verified',
    gst: 'pending'
  },
  subscription: {
    plan: 'premium',          // free/basic/premium/enterprise
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    autoRenew: true
  }
}
```

#### Platform Properties (All)
```javascript
{
  id: 'p1',
  merchantId: 'm1',
  merchantName: 'John Doe',
  name: 'Sunrise Hostel',
  location: 'Mumbai, Maharashtra',
  status: 'active',           // active/pending/rejected/inactive
  approvalStatus: 'approved', // pending/approved/rejected
  submittedDate: '2024-01-20',
  approvedDate: '2024-01-22',
  approvedBy: 'admin-user',
  totalRooms: 12,
  occupiedRooms: 9,
  monthlyRevenue: 190000,
  rating: 4.5,
  reviewCount: 128,
  documents: {
    ownership: 'verified',
    license: 'verified',
    safety: 'pending'
  },
  compliance: {
    fireaSafety: true,
    securityClearance: true,
    healthPermit: true
  }
}
```

#### Platform Analytics
```javascript
{
  // User Metrics
  totalUsers: 150,
  activeUsers: 142,
  newUsersThisMonth: 12,
  suspendedUsers: 8,
  
  // Property Metrics
  totalProperties: 450,
  activeProperties: 428,
  pendingApprovals: 15,
  rejectedProperties: 7,
  
  // Room Metrics
  totalRooms: 5250,
  occupiedRooms: 4120,
  occupancyRate: 78.5,
  
  // Member Metrics
  totalMembers: 7800,
  activeMembers: 7650,
  newMembersThisMonth: 230,
  
  // Revenue Metrics
  totalRevenue: 18500000,
  platformFee: 925000,        // 5% commission
  merchantEarnings: 17575000,
  avgRevenuePerProperty: 41111,
  
  // Payment Metrics
  totalPayments: 7800,
  paidPayments: 7350,
  pendingPayments: 380,
  overduePayments: 70,
  
  // Growth Metrics
  userGrowthRate: 8.7,        // percentage
  propertyGrowthRate: 12.3,
  revenueGrowthRate: 15.2
}
```

#### Platform Bookings
```javascript
{
  id: 'b1',
  propertyId: 'p1',
  propertyName: 'Sunrise Hostel',
  merchantId: 'm1',
  merchantName: 'John Doe',
  guestName: 'Rahul Sharma',
  guestPhone: '+91 98765 43210',
  roomNumber: '101',
  checkIn: '2024-10-01',
  checkOut: '2024-10-31',
  duration: 30,               // days
  amount: 8000,
  platformFee: 400,           // 5%
  merchantEarning: 7600,
  status: 'confirmed',        // pending/confirmed/cancelled/completed
  paymentStatus: 'paid',      // pending/paid/refunded
  bookingDate: '2024-09-25'
}
```

## Admin Portal Screens

### 1. Admin Dashboard
**Path**: `src/screens/admin/dashboard/AdminDashboard.js`

**Purpose**: System-wide overview of entire platform

**Components**:

1. **Header Section**:
   - Welcome message
   - Platform health indicator
   - Quick actions menu

2. **Platform Overview Cards** (8 cards in 2 rows):
   - Total Users (Merchants)
   - Active Properties
   - Total Rooms
   - Occupancy Rate %
   - Platform Revenue
   - Pending Approvals
   - Active Members
   - Payment Success Rate

3. **Growth Charts**:
   - **User Growth**: Line chart (last 6 months)
   - **Revenue Trend**: Line chart with platform fee vs merchant earnings
   - **Occupancy Trend**: Area chart showing platform-wide occupancy
   - **Property Distribution**: Pie chart by location/city

4. **Recent Activities Feed**:
   - New user registrations
   - New property submissions
   - Property approvals/rejections
   - Subscription renewals
   - System alerts

5. **Quick Stats Grid**:
   - New Users Today
   - New Properties Today
   - Pending Approvals
   - Support Tickets
   - Revenue Today
   - System Uptime

6. **Alerts & Notifications**:
   - Pending property approvals (red badge)
   - Document verifications needed
   - Subscription expirations
   - System maintenance alerts
   - Payment disputes

**Data Displayed**:
```javascript
platformMetrics: {
  totalUsers: 150,
  activeProperties: 428,
  totalRooms: 5250,
  occupancyRate: 78.5,
  platformRevenue: 925000,
  pendingApprovals: 15,
  activeMembers: 7650,
  paymentSuccessRate: 94.2
}

growthData: {
  users: [130, 135, 140, 142, 145, 150],
  revenue: [750000, 810000, 850000, 880000, 905000, 925000],
  occupancy: [72, 74, 76, 77, 78, 78.5]
}
```

### 2. Users Management Screen
**Path**: `src/screens/admin/users/AdminUsersScreen.js`

**Purpose**: Manage all merchants and users on platform

**Components**:

1. **Search & Filter Bar**:
   - Search by name, phone, email
   - Filter by status (Active/Inactive/Suspended)
   - Filter by subscription plan
   - Filter by verification status
   - Sort by: Join date, Revenue, Properties

2. **Summary Cards**:
   - Total Merchants
   - Active This Month
   - Pending Verifications
   - Suspended Users

3. **User Cards/List**:
   Each user card shows:
   - Profile photo
   - Name and phone number
   - Status badge (Active/Inactive/Suspended)
   - Subscription plan badge
   - Property count
   - Total revenue
   - Join date
   - Last active timestamp
   - Verification status icons
   - Quick action buttons (View/Edit/Suspend)

**User Detail Screen**:
**Path**: `src/screens/admin/users/UserDetailScreen.js`

Sections:
1. **User Profile**:
   - Photo, name, contact info
   - Status and subscription
   - Join date, last active

2. **Business Information**:
   - Number of properties
   - Total rooms managed
   - Total members
   - Monthly revenue
   - Average rating

3. **Documents & Verification**:
   - PAN Card (status + view)
   - Aadhar Card (status + view)
   - GST Certificate (status + view)
   - Bank Details (status + view)
   - Approval/Rejection buttons

4. **Properties List**:
   - All properties owned by merchant
   - Click to view property details

5. **Transaction History**:
   - Subscription payments
   - Platform fees paid
   - Refunds/Adjustments

6. **Activity Log**:
   - Login history
   - Property additions
   - Member additions
   - Payment records

7. **Admin Actions**:
   - Verify Documents
   - Approve/Reject User
   - Suspend Account
   - Reset Password
   - Send Notification
   - View Analytics
   - Export Data

### 3. Properties Management Screen
**Path**: `src/screens/admin/properties/AdminPropertiesScreen.js`

**Purpose**: Manage all properties across entire platform

**Components**:

1. **Search & Filter**:
   - Search by property name, location
   - Filter by status (Active/Pending/Rejected)
   - Filter by merchant
   - Filter by city/location
   - Sort by: Revenue, Rating, Occupancy, Date added

2. **Summary Stats**:
   - Total Properties
   - Pending Approvals (with alert badge)
   - Active Properties
   - Average Occupancy Rate

3. **Property Cards**:
   Each card shows:
   - Property image
   - Property name
   - Merchant name
   - Location
   - Status badge (Active/Pending/Rejected)
   - Approval status
   - Total rooms / Occupied
   - Occupancy percentage
   - Monthly revenue
   - Rating and review count
   - Submitted date
   - Quick actions (Approve/Reject/View)

**Property Detail Screen (Admin View)**:
**Path**: `src/screens/admin/properties/PropertyDetailScreen.js`

Sections:
1. **Property Overview**:
   - Images gallery
   - Property name and description
   - Merchant information
   - Location and address
   - Status badges

2. **Verification Documents**:
   - Property ownership proof
   - Business license
   - Fire safety certificate
   - Health permit
   - Insurance documents
   - Document approval checkboxes

3. **Property Metrics**:
   - Total rooms by type
   - Occupancy statistics
   - Revenue performance
   - Rating and reviews
   - Member demographics

4. **Compliance Checklist**:
   - Fire safety compliance ✓
   - Security clearance ✓
   - Health & hygiene ✓
   - Legal documentation ✓
   - Insurance coverage ✓

5. **Rooms Overview**:
   - List of all rooms
   - Room types distribution
   - Pricing information
   - Occupancy status

6. **Reviews & Ratings**:
   - Average rating
   - Review count
   - Recent reviews
   - Rating distribution

7. **Admin Actions**:
   - **Approve Property** (Green button)
   - **Reject Property** (Red button with reason)
   - **Request More Info** (Orange button)
   - **Suspend Property** (Gray button)
   - **View Full Analytics**
   - **Contact Merchant**
   - **Export Report**

**Approval Workflow**:
```
Pending → Admin Review → Approve/Reject
                       ↓
              Request More Info
                       ↓
              Merchant Resubmits
                       ↓
              Admin Re-review
```

### 4. Analytics Dashboard
**Path**: `src/screens/admin/analytics/AnalyticsScreen.js`

**Purpose**: Platform-wide analytics and insights

**Tabs/Sections**:

1. **Overview Tab**:
   - Key metrics summary
   - Growth indicators
   - Trends at a glance

2. **Revenue Analytics**:
   - **Total Revenue Chart**: Line/Area chart
   - **Revenue Breakdown**: Platform fee vs Merchant earnings
   - **Revenue by City**: Bar chart
   - **Revenue by Property Type**: Pie chart
   - **Top Earning Properties**: List
   - **Top Earning Merchants**: List
   - **Revenue Growth Rate**: Percentage with trend

3. **Occupancy Analytics**:
   - **Overall Occupancy Trend**: Line chart
   - **Occupancy by City**: Bar chart
   - **Occupancy by Property Type**: Comparison
   - **Occupancy by Room Type**: Breakdown
   - **Seasonal Trends**: Monthly patterns
   - **Best Performing Properties**: List

4. **User Analytics**:
   - **User Growth Chart**: Line chart
   - **Active vs Inactive Users**: Comparison
   - **User Distribution by Plan**: Pie chart
   - **User Retention Rate**: Percentage
   - **Churn Rate**: Percentage with trend
   - **Average Properties per Merchant**: Number

5. **Member Analytics**:
   - **Total Members Trend**: Line chart
   - **Member Demographics**: Age, Occupation breakdown
   - **Member by Location**: Geographic distribution
   - **Average Stay Duration**: Days
   - **Member Satisfaction**: Ratings

6. **Payment Analytics**:
   - **Payment Success Rate**: Percentage
   - **Payment Methods**: Distribution
   - **Pending Payments**: Amount and count
   - **Overdue Payments**: Trend
   - **Refund Rate**: Percentage
   - **Average Transaction Value**: Amount

7. **Booking Analytics**:
   - **Total Bookings**: Trend chart
   - **Booking Conversion Rate**: Percentage
   - **Cancellation Rate**: Trend
   - **Average Booking Value**: Amount
   - **Peak Booking Times**: Heatmap
   - **Booking Sources**: Web/App/Direct

**Export Options**:
- Export to PDF
- Export to Excel
- Download Charts as images
- Schedule automated reports
- Email reports

### 5. Settings Screen
**Path**: `src/screens/admin/settings/AdminSettingsScreen.js`

**Purpose**: Platform configuration and system settings

**Settings Categories**:

1. **Platform Settings**:
   - Platform name
   - Platform logo
   - Contact information
   - Business hours
   - Support email/phone
   - Terms & Conditions URL
   - Privacy Policy URL

2. **Commission & Pricing**:
   - Platform commission rate (%)
   - Minimum commission amount
   - Payment processing fee
   - Subscription plan pricing
   - Feature pricing
   - Discount codes management

3. **Subscription Plans**:
   - **Free Plan**:
     - Max properties: 1
     - Max rooms: 10
     - Features: Basic listing
     
   - **Basic Plan**:
     - Price: ₹999/month
     - Max properties: 3
     - Max rooms: 50
     - Features: Analytics, Reports
     
   - **Premium Plan**:
     - Price: ₹2999/month
     - Max properties: 10
     - Max rooms: 200
     - Features: Advanced analytics, Priority support
     
   - **Enterprise Plan**:
     - Price: Custom
     - Unlimited properties
     - Unlimited rooms
     - Features: All features, Dedicated support

4. **Payment Configuration**:
   - Payment gateway settings
   - Razorpay/Stripe configuration
   - Payment methods enabled
   - Auto-refund settings
   - Payment reminders schedule

5. **Notification Settings**:
   - Email notifications toggle
   - SMS notifications toggle
   - Push notifications toggle
   - Notification templates
   - Notification schedule
   - Admin alert preferences

6. **User Permissions**:
   - Role-based access control
   - Admin permissions
   - Merchant permissions
   - Feature flags
   - API access settings

7. **Document Requirements**:
   - Required documents list
   - Document validation rules
   - Auto-verification settings
   - Document expiry reminders

8. **Approval Workflow**:
   - Auto-approval criteria
   - Manual review requirements
   - Approval SLA (Service Level Agreement)
   - Rejection reasons templates

9. **System Configuration**:
   - Database settings
   - API rate limits
   - Cache settings
   - Backup schedule
   - Maintenance mode

10. **Security Settings**:
    - Password policies
    - Session timeout
    - Two-factor authentication
    - IP whitelist
    - Failed login attempts limit
    - Account lockout duration

11. **Localization**:
    - Supported languages
    - Default currency
    - Date format
    - Time zone
    - Number format

12. **Analytics & Tracking**:
    - Google Analytics integration
    - Custom event tracking
    - Data retention period
    - Privacy compliance (GDPR)

### 6. Bookings Management (Admin)
**Path**: `src/screens/admin/bookings/AdminBookingsScreen.js`

**Purpose**: Manage all bookings across platform

**Components**:

1. **Booking Filters**:
   - Filter by status
   - Filter by date range
   - Filter by property
   - Filter by merchant
   - Search by guest name/phone

2. **Booking Stats**:
   - Total bookings
   - Active bookings
   - Pending confirmations
   - Cancellations this month

3. **Booking List**:
   Each booking shows:
   - Booking ID
   - Guest name and photo
   - Property name
   - Room number
   - Check-in / Check-out dates
   - Status badge
   - Payment status
   - Amount and platform fee
   - Merchant name
   - Booking date
   - Actions (View/Modify/Cancel)

**Booking Detail Screen**:
- Complete booking information
- Guest details
- Property and room details
- Payment breakdown
- Booking timeline
- Communication history
- Admin actions (Modify/Cancel/Refund)

## Admin-Specific Features

### 1. Property Approval System
**Workflow**:
1. Merchant submits property with documents
2. Admin receives notification
3. Admin reviews:
   - Property details
   - Documents
   - Compliance checklist
4. Admin decision:
   - **Approve**: Property goes live
   - **Reject**: Merchant notified with reason
   - **Request Info**: Merchant must provide additional details

### 2. User Verification System
**Verification Steps**:
1. User submits documents (PAN, Aadhar, GST)
2. Admin reviews documents
3. Verification status updated
4. User notified
5. Account privileges updated

### 3. Subscription Management
**Features**:
- View all subscriptions
- Manual subscription creation
- Subscription upgrades/downgrades
- Refund processing
- Trial period management
- Bulk subscription operations

### 4. Dispute Resolution
**Process**:
1. Dispute reported (by merchant or member)
2. Admin reviews case details
3. Admin investigates:
   - Chat history
   - Payment records
   - Property details
4. Admin decision:
   - Refund
   - Warning
   - Account suspension
   - Case closed

### 5. Platform Notifications
**Admin can send**:
- System-wide announcements
- User-specific notifications
- Property-specific alerts
- Promotional messages
- Maintenance notifications

### 6. Reporting System
**Available Reports**:
- Revenue reports (daily/weekly/monthly)
- Occupancy reports
- User growth reports
- Property performance reports
- Payment reconciliation reports
- Commission reports
- Tax reports

### 7. Audit Logs
**Tracked Actions**:
- All admin actions
- Property approvals/rejections
- User account changes
- Payment modifications
- Settings updates
- Document verifications
- Subscription changes

## Admin Permissions

### Super Admin Permissions
- Full access to all features
- User management (create/edit/delete)
- Property approval/rejection
- Settings configuration
- Financial operations
- System configuration
- Export sensitive data
- View audit logs

### Support Admin Permissions
- View all users and properties
- Assist with support tickets
- View analytics (read-only)
- Send notifications
- Limited user editing

### Finance Admin Permissions
- View financial reports
- Process refunds
- View payment data
- Export financial data
- Manage subscriptions
- Generate invoices

## API Integration (Future)

### Admin-Specific Endpoints
```
// User Management
GET    /api/admin/users
GET    /api/admin/users/:id
PUT    /api/admin/users/:id/status
PUT    /api/admin/users/:id/verify
POST   /api/admin/users/:id/suspend

// Property Management
GET    /api/admin/properties
GET    /api/admin/properties/pending
PUT    /api/admin/properties/:id/approve
PUT    /api/admin/properties/:id/reject
POST   /api/admin/properties/:id/request-info

// Analytics
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/revenue
GET    /api/admin/analytics/users
GET    /api/admin/analytics/occupancy
GET    /api/admin/analytics/payments

// Settings
GET    /api/admin/settings
PUT    /api/admin/settings
GET    /api/admin/settings/plans
PUT    /api/admin/settings/plans/:id

// Notifications
POST   /api/admin/notifications/broadcast
POST   /api/admin/notifications/send
GET    /api/admin/notifications/history

// Reports
GET    /api/admin/reports/revenue
GET    /api/admin/reports/occupancy
GET    /api/admin/reports/users
POST   /api/admin/reports/export

// Audit Logs
GET    /api/admin/audit-logs
GET    /api/admin/audit-logs/:id
```

## Key Differences: Admin vs Merchant

| Feature | Merchant Portal | Admin Portal |
|---------|----------------|--------------|
| **Scope** | Own properties only | All properties |
| **Users** | Own members only | All merchants + members |
| **Analytics** | Own performance | Platform-wide |
| **Permissions** | Limited to owned data | Full platform access |
| **Approvals** | Cannot approve | Can approve properties |
| **Settings** | Personal settings | Platform settings |
| **Revenue** | Own earnings | Platform revenue + commission |
| **Notifications** | Receive only | Send + Receive |
| **Reports** | Own properties | All properties |
| **Support** | Request support | Provide support |

## Security Considerations

### Data Access Control
- Row-level security for data access
- Role-based access control (RBAC)
- IP-based access restrictions
- Audit logging for all actions

### Sensitive Data Handling
- Encrypted storage for documents
- Masked PII in logs
- Secure document viewing
- Limited data export

### Admin Account Security
- Mandatory 2FA for admins
- Strong password requirements
- Session timeout (15 minutes)
- Login attempt monitoring
- Account activity notifications

## Testing

### Admin Test Scenarios
1. Login with phone "9"
2. View platform dashboard
3. Review pending property approvals
4. Approve/reject a property
5. Verify user documents
6. View platform-wide analytics
7. Update commission settings
8. Send broadcast notification
9. Export revenue report
10. Check audit logs

## Performance Optimization

### Data Loading Strategies
- Pagination for large lists
- Virtual scrolling for long lists
- Lazy loading for images
- Data caching
- Background data refresh

### Chart Rendering
- Limit data points displayed
- Use chart placeholders
- Progressive chart loading
- Chart data aggregation

## Future Admin Features

### Phase 2
1. **Advanced Analytics**:
   - Predictive analytics
   - AI-powered insights
   - Custom dashboard builder
   - Real-time metrics

2. **Automation**:
   - Auto-approval rules
   - Automated notifications
   - Scheduled reports
   - Auto-refunds

3. **Communication**:
   - In-app chat with merchants
   - Email templates
   - SMS campaigns
   - Push notification composer

4. **Content Management**:
   - Blog management
   - FAQ management
   - Help center
   - Policy updates

### Phase 3
1. Multi-admin support
2. Role-based workflows
3. Advanced reporting
4. AI-powered fraud detection
5. Automated compliance checking
6. Integration marketplace
7. White-label platform

## Troubleshooting

### Common Admin Issues

**Issue**: Cannot see pending approvals
- Check filters are not hiding items
- Verify admin permissions
- Refresh data

**Issue**: Analytics not loading
- Check date range selection
- Verify API connection
- Check data availability

**Issue**: Cannot approve property
- Verify admin role
- Check document completeness
- Review compliance checklist

## Best Practices

### For Admins
1. Review properties within 24 hours
2. Document rejection reasons clearly
3. Maintain communication with merchants
4. Monitor platform health daily
5. Review audit logs regularly
6. Keep settings documented
7. Test changes before deployment

### For Development
1. Implement proper authorization checks
2. Log all admin actions
3. Validate all inputs
4. Handle errors gracefully
5. Optimize data queries
6. Cache frequently accessed data
7. Monitor API performance

---

**Last Updated**: October 7, 2025
**Version**: 1.0.0
**Platform**: React Native (iOS & Android)
**Admin Access**: Phone: 9
