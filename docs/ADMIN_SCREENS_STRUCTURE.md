# 🎯 Admin Portal - Screen Structure & Implementation Status

**Last Updated**: October 7, 2025  
**Based on**: Essential Admin Panel Features Research  
**Purpose**: Complete admin portal screen structure for hostel property listing platform

---

## 📁 Folder Structure

```
src/screens/admin/
├── dashboard/              # Super Admin Dashboard & Analytics
│   └── AdminDashboard.js ✅
│
├── users/                  # Multi-Level User Control & Management
│   ├── AdminUsersScreen.js ✅
│   ├── UserDetailScreen.js 📋
│   ├── KYCVerificationScreen.js 📋
│   ├── StaffManagementScreen.js 📋
│   └── RolePermissionsScreen.js 📋
│
├── properties/             # Property & Listing Management
│   ├── AdminPropertiesScreen.js ✅
│   ├── PropertyApprovalScreen.js 📋
│   ├── PropertyDetailScreen.js 📋
│   ├── ContentModerationScreen.js 📋
│   └── RoomInventoryScreen.js 📋
│
├── bookings/               # Booking & Transaction Management
│   ├── AdminBookingsScreen.js ✅
│   ├── BookingDetailScreen.js 📋
│   ├── PaymentAdminScreen.js 📋
│   └── RefundManagementScreen.js 📋
│
├── disputes/               # Dispute Resolution & Support
│   ├── DisputesListScreen.js 📋
│   ├── DisputeDetailScreen.js 📋
│   └── ComplaintTicketsScreen.js 📋
│
├── settings/               # Platform Configuration & Settings
│   ├── AdminSettingsScreen.js ✅
│   ├── SystemConfigScreen.js 📋
│   ├── CommissionSettingsScreen.js 📋
│   ├── NotificationTemplatesScreen.js 📋
│   └── APIIntegrationsScreen.js 📋
│
├── security/               # Security & Compliance
│   ├── SecurityDashboardScreen.js 📋
│   ├── AuditTrailScreen.js 📋
│   ├── AccessControlScreen.js 📋
│   └── DataBackupScreen.js 📋
│
├── communications/         # Communication & Support Tools
│   ├── HelpdeskScreen.js 📋
│   ├── InternalChatScreen.js 📋
│   ├── FeedbackManagementScreen.js 📋
│   └── AnnouncementsScreen.js 📋
│
├── marketing/              # Marketing & Promotion Controls
│   ├── FeaturedListingsScreen.js 📋
│   ├── CampaignManagementScreen.js 📋
│   ├── DiscountCodesScreen.js 📋
│   └── PartnershipScreen.js 📋
│
└── reports/                # Reports & Analytics
    ├── RevenueReportsScreen.js 📋
    ├── UserGrowthReportsScreen.js 📋
    ├── OccupancyReportsScreen.js 📋
    ├── PerformanceReportsScreen.js 📋
    └── CustomReportBuilderScreen.js 📋
```

**Legend**:
- ✅ = Implemented (basic version exists)
- 📋 = To be implemented (detailed in guide)
- 🔄 = In progress

---

## 🎛️ 1. Super Admin Dashboard & Analytics

### ✅ AdminDashboard.js (Implemented)
**Current Features**:
- Total users, merchants, properties, bookings
- Revenue overview with line chart
- User growth bar chart
- Quick actions grid
- Recent activity feed
- Platform health indicators

**To Add (Based on Research)**:
- [ ] Real-time occupancy data across all properties
- [ ] AI-powered predictive insights (demand forecasting)
- [ ] Seasonal demand pattern analysis
- [ ] Commission tracking detailed breakdown
- [ ] Payment processing metrics dashboard
- [ ] Advanced filters (time range: day/week/month/year)
- [ ] KPI cards with trend indicators
- [ ] Interactive charts (click to drill down)
- [ ] Export reports functionality

---

## 👥 2. User Management & Authentication

### ✅ AdminUsersScreen.js (Implemented - Basic)
**Current Features**:
- User list display
- Basic search and filter

### 📋 Screens to Create:

#### **UserDetailScreen.js**
**Purpose**: Comprehensive user profile oversight  
**Features**:
- View complete user profile (merchant/student/admin)
- Account status management (active/suspended/banned)
- Activity logs and login history
- Booking history
- Payment history
- KYC document verification status
- Manual profile editing capabilities
- Password reset functionality
- Notes and flags system
- Account actions: suspend, ban, delete

#### **KYCVerificationScreen.js**
**Purpose**: Document verification for hostel owners  
**Features**:
- Pending KYC requests queue
- Document viewer (Aadhar, PAN, business license)
- Verification workflow (approve/reject/request more info)
- Verification checklist
- Rejection reason templates
- Bulk approval functionality
- Verification history
- Auto-flagging suspicious documents

#### **StaffManagementScreen.js**
**Purpose**: Admin staff account management  
**Features**:
- Create sub-admin accounts
- Assign roles (Super Admin/Admin/Moderator)
- Permission management per role
- Staff activity monitoring
- Access logs
- Role-based dashboard customization
- Team hierarchy view
- Staff performance metrics

#### **RolePermissionsScreen.js**
**Purpose**: Granular permission control  
**Features**:
- Define custom roles
- Permission matrix (read/write/delete per module)
- Role templates
- Permission inheritance
- Permission audit trail
- Test permission sets
- Role assignment history

---

## 🏢 3. Property & Listing Management

### ✅ AdminPropertiesScreen.js (Implemented - Basic)
**Current Features**:
- Property list display
- Basic filters

### 📋 Screens to Create:

#### **PropertyApprovalScreen.js**
**Purpose**: Hostel listing approval workflow  
**Features**:
- Pending properties queue (priority sorted)
- Property review checklist:
  - Property details accuracy
  - Image quality verification
  - Pricing reasonableness
  - Amenities verification
  - Location verification (Google Maps integration)
  - Owner KYC status check
- Side-by-side comparison with platform standards
- Approval/rejection workflow
- Request modification feature with comments
- Rejection reason templates
- Bulk approval for verified merchants
- Auto-approval rules based on merchant rating
- Approval history and statistics

#### **PropertyDetailScreen.js**
**Purpose**: Admin view of complete property details  
**Features**:
- All property information (editable by admin)
- Owner information with quick contact
- Room inventory overview
- Booking history for this property
- Revenue generated
- Reviews and ratings analysis
- Occupancy trends
- Compliance status
- Manual property editing
- Featured listing toggle
- Property status control (active/inactive/suspended)
- Photo management (add/remove/reorder)

#### **ContentModerationScreen.js**
**Purpose**: Monitor and moderate all user-generated content  
**Features**:
- Flagged listings review
- Inappropriate content detection (AI-powered)
- User-reported content queue
- Review moderation (inappropriate reviews)
- Image moderation
- Bulk actions
- Moderation rules setup
- Automated filtering rules
- Moderation history

#### **RoomInventoryScreen.js**
**Purpose**: Oversee room allocation across platform  
**Features**:
- Platform-wide room inventory
- Room availability calendar
- Occupancy rate by room type
- Vacant rooms alert
- Overbooking detection
- Room pricing analysis
- Room condition tracking
- Inventory forecasting

---

## 📅 4. Booking & Transaction Management

### ✅ AdminBookingsScreen.js (Implemented - Basic)
**Current Features**:
- Bookings list
- Status filters

### 📋 Screens to Create:

#### **BookingDetailScreen.js**
**Purpose**: Complete booking oversight  
**Features**:
- Full booking details
- Student information
- Property and room details
- Payment status and history
- Booking timeline
- Communication logs between student and merchant
- Manual booking modification
- Cancellation with reason
- Refund initiation
- Booking notes
- Related bookings (same user)

#### **PaymentAdminScreen.js**
**Purpose**: Financial transaction administration  
**Features**:
- All transactions list
- Payment gateway status monitoring
- Failed payments queue
- Transaction success rate analytics
- Commission calculation breakdown
- Merchant payouts pending
- Payment disputes
- Reconciliation tools
- Financial reports export
- Payment method analytics
- Gateway performance comparison

#### **RefundManagementScreen.js**
**Purpose**: Handle all refund requests  
**Features**:
- Pending refund requests
- Refund eligibility checker
- Automated refund rules
- Manual refund processing
- Refund reason analytics
- Dispute-related refunds
- Bulk refund processing
- Refund history and reporting
- Merchant balance adjustment

---

## ⚠️ 5. Disputes & Support

### 📋 Screens to Create:

#### **DisputesListScreen.js**
**Purpose**: Centralized dispute management  
**Features**:
- Active disputes queue (priority-based)
- Dispute categories (payment, property, booking, service)
- Status tracking (open, in progress, resolved, escalated)
- Assignment to support staff
- SLA timer for resolution
- Dispute severity levels
- Bulk actions
- Dispute analytics
- Resolution rate metrics

#### **DisputeDetailScreen.js**
**Purpose**: Detailed dispute resolution  
**Features**:
- Complete dispute information
- Involved parties (student/merchant)
- Dispute timeline
- Evidence uploads (images, documents, chat logs)
- Communication thread
- Resolution actions:
  - Refund processing
  - Property suspension
  - User warning
  - Account suspension
  - Custom resolution
- Resolution templates
- Escalation to senior admin
- Case notes (internal)
- Related disputes
- Resolution history

#### **ComplaintTicketsScreen.js**
**Purpose**: Customer support ticket management  
**Features**:
- Ticket queue (categorized)
- Priority levels (low, medium, high, urgent)
- Auto-assignment rules
- Support staff assignment
- Response templates
- Ticket status workflow
- SLA tracking
- Satisfaction ratings
- Ticket analytics
- Knowledge base integration

---

## ⚙️ 6. Platform Configuration & Settings

### ✅ AdminSettingsScreen.js (Implemented - Basic)

### 📋 Screens to Create:

#### **SystemConfigScreen.js**
**Purpose**: Platform-wide settings control  
**Features**:
- Search filters configuration
- Pricing parameters (min/max)
- Booking rules (advance booking, cancellation policy)
- Property listing requirements
- User registration settings
- Default values configuration
- Feature flags (enable/disable features)
- Maintenance mode toggle
- System announcements
- Platform branding settings

#### **CommissionSettingsScreen.js**
**Purpose**: Manage platform revenue model  
**Features**:
- Base commission rate
- Commission tiers (based on merchant performance)
- Featured listing premium pricing
- Subscription plans management
- Promotional commission rates
- Merchant commission history
- Commission calculation rules
- Special rate agreements
- Commission forecasting
- Payout schedule settings

#### **NotificationTemplatesScreen.js**
**Purpose**: Manage all automated communications  
**Features**:
- Email templates editor
- SMS templates editor
- Push notification templates
- Template variables (merge fields)
- Template preview
- A/B testing templates
- Send test notifications
- Template categories:
  - Booking confirmations
  - Payment reminders
  - Property approvals
  - User verifications
  - Marketing campaigns
- Multilingual templates
- Template scheduling

#### **APIIntegrationsScreen.js**
**Purpose**: Third-party service management  
**Features**:
- Payment gateway configuration
- SMS gateway settings
- Email service provider
- Google Maps API
- Analytics integrations
- Social media integrations
- Channel manager integrations
- API health monitoring
- API usage statistics
- Integration logs
- Test API connections

---

## 🔒 7. Security & Compliance

### 📋 Screens to Create:

#### **SecurityDashboardScreen.js**
**Purpose**: Platform security overview  
**Features**:
- Security health score
- Recent security events
- Failed login attempts
- Suspicious activity alerts
- Data encryption status
- SSL certificate status
- Vulnerability scan results
- Security policy compliance
- Incident response logs
- Security recommendations

#### **AuditTrailScreen.js**
**Purpose**: Complete activity logging  
**Features**:
- All admin actions log
- User activity tracking
- System changes history
- Data modification logs
- Search and filter audit logs
- Export audit reports
- Compliance reporting
- Anomaly detection
- Real-time activity stream
- Audit log retention settings

#### **AccessControlScreen.js**
**Purpose**: RBAC management  
**Features**:
- User access levels overview
- Permission matrix
- Role assignments
- Access request approvals
- Temporary access grants
- Access revocation
- IP whitelisting
- Two-factor authentication enforcement
- Session management
- Access violation alerts

#### **DataBackupScreen.js**
**Purpose**: Data protection and recovery  
**Features**:
- Automated backup schedule
- Manual backup trigger
- Backup history
- Storage usage
- Restore point management
- Test restore functionality
- Backup verification
- Disaster recovery plan
- Data retention policies
- Backup encryption status

---

## 💬 8. Communication & Support

### 📋 Screens to Create:

#### **HelpdeskScreen.js**
**Purpose**: Customer support interface  
**Features**:
- Support ticket dashboard
- Live chat integration
- FAQ management
- Canned responses library
- Multi-channel support (email, chat, phone)
- Customer satisfaction tracking
- Response time analytics
- Support team performance
- Knowledge base articles
- Escalation workflows

#### **InternalChatScreen.js**
**Purpose**: Admin team communication  
**Features**:
- Team chat channels
- Direct messaging
- File sharing
- Mentions and notifications
- Thread conversations
- Search chat history
- Pin important messages
- Chat analytics
- Integration with support tickets
- Broadcast announcements

#### **FeedbackManagementScreen.js**
**Purpose**: Monitor user and merchant feedback  
**Features**:
- Review moderation queue
- Rating analytics by property
- Sentiment analysis (AI-powered)
- Fake review detection
- Response templates
- Merchant reputation scoring
- Feedback trends
- Review response rate
- Feature request tracking
- User satisfaction metrics

#### **AnnouncementsScreen.js**
**Purpose**: Platform-wide notifications  
**Features**:
- Create announcements
- Target audience selection (all users, merchants only, students only)
- Schedule announcements
- Announcement templates
- Rich text editor
- Preview before sending
- Announcement history
- View statistics (open rate, click rate)
- Emergency announcements
- Maintenance notifications

---

## 📊 9. Marketing & Promotions

### 📋 Screens to Create:

#### **FeaturedListingsScreen.js**
**Purpose**: Premium placement management  
**Features**:
- Featured properties dashboard
- Manual feature assignment
- Automated featuring rules (based on rating, bookings)
- Featured listing duration
- Featured slots availability
- Performance metrics (featured vs. regular)
- Featured listing revenue
- Merchant feature requests
- Feature pricing tiers
- Featured listing history

#### **CampaignManagementScreen.js**
**Purpose**: Marketing campaign administration  
**Features**:
- Create marketing campaigns
- Campaign types (email, SMS, push, in-app)
- Target audience segmentation
- Campaign scheduling
- A/B testing setup
- Campaign performance analytics
- ROI tracking
- Campaign templates
- Budget allocation
- Conversion tracking

#### **DiscountCodesScreen.js**
**Purpose**: Promotional code management  
**Features**:
- Create discount codes
- Code types (percentage, fixed amount, first booking)
- Usage limits (per user, total)
- Validity period
- Minimum booking amount
- Property/category restrictions
- Bulk code generation
- Code usage analytics
- Auto-apply rules
- Partner codes

#### **PartnershipScreen.js**
**Purpose**: External partner management  
**Features**:
- Partner organizations list
- Partnership agreements
- Revenue sharing settings
- API access credentials
- Channel manager integrations
- OTA (Online Travel Agency) connections
- Partner performance metrics
- Co-marketing campaigns
- Partner commission tracking
- Integration health monitoring

---

## 📈 10. Reports & Analytics

### 📋 Screens to Create:

#### **RevenueReportsScreen.js**
**Purpose**: Financial reporting and analysis  
**Features**:
- Total revenue dashboard
- Revenue by time period (daily, weekly, monthly, yearly)
- Revenue by property type
- Revenue by location
- Commission earned breakdown
- Payment method distribution
- Refund statistics
- Revenue forecasting
- Merchant payout reports
- Export to Excel/PDF
- Customizable date ranges

#### **UserGrowthReportsScreen.js**
**Purpose**: User acquisition and retention analytics  
**Features**:
- New user registrations trend
- User retention rate
- Merchant growth rate
- Student acquisition channels
- Churn rate analysis
- User lifetime value
- Referral program performance
- Geographic distribution
- Demographic insights
- User engagement metrics

#### **OccupancyReportsScreen.js**
**Purpose**: Platform-wide occupancy analytics  
**features**:
- Overall occupancy rate
- Occupancy by property
- Occupancy trends (seasonal patterns)
- Peak booking periods
- Low-demand identification
- Property performance comparison
- Room type occupancy
- Location-based occupancy
- Occupancy forecasting
- Optimization recommendations

#### **PerformanceReportsScreen.js**
**Purpose**: Platform performance metrics  
**Features**:
- Top performing properties
- Best rated merchants
- Booking conversion rates
- Search to booking ratio
- User satisfaction scores
- App performance metrics
- API response times
- System uptime
- Error rates
- Customer support metrics

#### **CustomReportBuilderScreen.js**
**Purpose**: Create custom analytical reports  
**Features**:
- Drag-and-drop report builder
- Choose data dimensions
- Select metrics
- Add filters
- Visualization options (tables, charts, graphs)
- Save report templates
- Schedule automated reports
- Share reports with team
- Export in multiple formats
- Report version history

---

## 🤖 11. Advanced Features (AI-Powered)

### 📋 Screens to Create:

#### **AIPricingScreen.js**
**Purpose**: AI-powered pricing recommendations  
**Features**:
- Dynamic pricing suggestions
- Demand-based pricing
- Competitor price analysis
- Seasonal pricing optimization
- Price elasticity insights
- Revenue optimization algorithms
- A/B pricing tests
- Price confidence scores (87% accuracy)
- Historical pricing performance
- Manual override options

#### **FraudDetectionScreen.js**
**Purpose**: AI-powered fraud prevention  
**Features**:
- Fraud score dashboard (85% accuracy)
- Suspicious activity alerts
- Pattern recognition
- User behavior analysis
- Payment fraud detection
- Fake listing identification
- Bot detection
- Investigation tools
- Blacklist management
- Fraud prevention rules

#### **DemandForecastingScreen.js**
**Purpose**: Predictive analytics for demand  
**Features**:
- Demand predictions (next 30/60/90 days)
- Seasonal trend analysis
- Event-based demand spikes
- Location demand mapping
- Capacity planning recommendations
- Price optimization based on forecast
- Inventory alerts
- Historical accuracy tracking
- Confidence intervals
- Export forecasts

#### **AutomatedWorkflowsScreen.js**
**Purpose**: Platform automation management  
**Features**:
- Workflow builder (visual)
- Trigger configuration (events, schedules, conditions)
- Action setup (notifications, approvals, updates)
- Workflow templates:
  - Auto-approve verified merchants
  - Auto-refund cancellations
  - Auto-feature high-rated properties
  - Auto-send payment reminders
  - Auto-escalate disputes
- Workflow testing
- Execution logs
- Performance analytics
- Workflow versioning

---

## 🎯 Implementation Priority

### **Phase 1: Core Admin Functions** (Weeks 1-4)
**Priority: CRITICAL**
- ✅ AdminDashboard.js (Done)
- ✅ AdminUsersScreen.js (Done - enhance)
- ✅ AdminPropertiesScreen.js (Done - enhance)
- ✅ AdminBookingsScreen.js (Done - enhance)
- 📋 PropertyApprovalScreen.js
- 📋 UserDetailScreen.js
- 📋 BookingDetailScreen.js

### **Phase 2: Security & Compliance** (Weeks 5-6)
**Priority: HIGH**
- 📋 KYCVerificationScreen.js
- 📋 SecurityDashboardScreen.js
- 📋 AuditTrailScreen.js
- 📋 AccessControlScreen.js
- 📋 DataBackupScreen.js

### **Phase 3: Support & Communication** (Weeks 7-8)
**Priority: HIGH**
- 📋 DisputesListScreen.js
- 📋 DisputeDetailScreen.js
- 📋 HelpdeskScreen.js
- 📋 ComplaintTicketsScreen.js
- 📋 FeedbackManagementScreen.js

### **Phase 4: Platform Configuration** (Weeks 9-10)
**Priority: MEDIUM**
- 📋 SystemConfigScreen.js
- 📋 CommissionSettingsScreen.js
- 📋 NotificationTemplatesScreen.js
- 📋 APIIntegrationsScreen.js

### **Phase 5: Marketing & Analytics** (Weeks 11-13)
**Priority: MEDIUM**
- 📋 FeaturedListingsScreen.js
- 📋 CampaignManagementScreen.js
- 📋 DiscountCodesScreen.js
- 📋 RevenueReportsScreen.js
- 📋 UserGrowthReportsScreen.js
- 📋 OccupancyReportsScreen.js

### **Phase 6: Advanced Features** (Weeks 14-16)
**Priority: LOW (Nice to have)**
- 📋 AIPricingScreen.js
- 📋 FraudDetectionScreen.js
- 📋 DemandForecastingScreen.js
- 📋 AutomatedWorkflowsScreen.js
- 📋 CustomReportBuilderScreen.js

---

## 📊 Progress Tracking

**Total Screens Needed**: 60+ screens  
**Currently Implemented**: 5 screens (8%)  
**To Be Implemented**: 55+ screens (92%)  

**Implementation Progress by Module**:
- Dashboard & Analytics: 20% ✅
- User Management: 20% 📋
- Property Management: 20% 📋
- Booking Management: 20% 📋
- Disputes & Support: 0% 📋
- Platform Settings: 20% 📋
- Security & Compliance: 0% 📋
- Communications: 0% 📋
- Marketing & Promotions: 0% 📋
- Reports & Analytics: 0% 📋
- Advanced Features: 0% 📋

---

## 🛠️ Technical Requirements

### **Common Components Needed**:
- DataTable component (sortable, filterable, paginated)
- Chart components (Line, Bar, Pie, Donut)
- DateRangePicker
- SearchBar with advanced filters
- StatusBadge component
- ActionButtons component
- Modal/Drawer components
- FileUploader component
- RichTextEditor component
- Breadcrumb navigation
- Loading skeletons
- Empty states
- Error boundaries

### **Shared Services/APIs**:
- Admin authentication service
- User management API
- Property management API
- Booking management API
- Payment processing API
- Notification service
- File upload service
- Analytics service
- Reporting service
- Audit logging service

### **State Management**:
- Admin context (current admin, permissions)
- Dashboard stats context
- Notification context
- Filter/search state management

---

## 📱 Navigation Structure

```javascript
// AdminNavigator.js
const AdminStack = () => (
  <Stack.Navigator>
    {/* Main Tabs */}
    <Stack.Screen name="AdminTabs" component={AdminTabs} />
    
    {/* User Management Screens */}
    <Stack.Screen name="UserDetail" component={UserDetailScreen} />
    <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
    <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
    
    {/* Property Management Screens */}
    <Stack.Screen name="PropertyApproval" component={PropertyApprovalScreen} />
    <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
    <Stack.Screen name="ContentModeration" component={ContentModerationScreen} />
    
    {/* Booking Management Screens */}
    <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
    <Stack.Screen name="PaymentAdmin" component={PaymentAdminScreen} />
    <Stack.Screen name="RefundManagement" component={RefundManagementScreen} />
    
    {/* More screens... */}
  </Stack.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={AdminDashboard} />
    <Tab.Screen name="Users" component={AdminUsersScreen} />
    <Tab.Screen name="Properties" component={AdminPropertiesScreen} />
    <Tab.Screen name="Bookings" component={AdminBookingsScreen} />
    <Tab.Screen name="More" component={AdminMoreScreen} />
  </Tab.Navigator>
);
```

---

## 🎨 Design Guidelines

### **Consistent Admin UI**:
- Use data-dense layouts (tables, grids)
- Provide powerful filtering and search
- Include bulk actions where applicable
- Show loading states and skeleton screens
- Implement error handling and user feedback
- Use consistent colors for statuses:
  - Success/Approved: Green (#10B981)
  - Pending/Warning: Orange (#F59E0B)
  - Rejected/Error: Red (#EF4444)
  - Info: Blue (#3B82F6)
- Responsive design for tablet support
- Accessibility considerations (WCAG 2.1)

### **Admin Color Palette**:
```javascript
adminColors = {
  primary: '#1F2937',      // Dark gray
  secondary: '#3B82F6',    // Blue
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Orange
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
  background: '#F9FAFB',   // Light gray
  card: '#FFFFFF',         // White
  border: '#E5E7EB',       // Gray
  text: '#111827',         // Almost black
  textSecondary: '#6B7280', // Gray
}
```

---

**This structure ensures comprehensive admin capabilities based on industry best practices and research findings for hostel property listing platforms.**
