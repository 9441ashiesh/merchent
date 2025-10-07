# 🏢 Merchant Portal - Complete Implementation Guide

**Last Updated**: October 7, 2025  
**Version**: 2.0  
**Platform**: React Native Hostel Management App

---

## 📋 Table of Contents

1. [Merchant Dashboard](#merchant-dashboard)
2. [Property Management](#property-management)
3. [Room Management](#room-management)
4. [Student/Member Management](#student-management)
5. [Booking Management](#booking-management)
6. [Financial Management](#financial-management)
7. [Analytics & Reports](#analytics-reports)
8. [Communication Tools](#communication-tools)
9. [Profile & Settings](#profile-settings)
10. [Advanced Features](#advanced-features)

---

## 🎛️ Merchant Dashboard

### Overview Metrics

**Real-Time Dashboard Cards**
```javascript
{
  properties: {
    total: 3,
    active: 3,
    occupancy: 87.5, // percentage
    availableRooms: 15
  },
  
  students: {
    total: 145,
    active: 132,
    pendingPayments: 8,
    newThisMonth: 12
  },
  
  revenue: {
    thisMonth: 456000,
    lastMonth: 423000,
    growth: 7.8, // percentage
    pending: 45000
  },
  
  bookings: {
    active: 132,
    pending: 8,
    checkInsToday: 3,
    checkOutsToday: 2
  }
}
```

**Quick Actions**
- ➕ Add New Property
- 🏠 Add New Room
- 👥 Add New Member
- 📊 View Analytics
- 💰 View Payments
- 📞 Contact Support

### Visual Charts

**Revenue Trends (Line Chart)**
```javascript
{
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [345000, 378000, 412000, 389000, 423000, 456000]
  }]
}
```

**Occupancy Distribution (Pie Chart)**
```javascript
{
  labels: ['Occupied', 'Available', 'Maintenance'],
  data: [105, 15, 5],
  colors: ['#10b981', '#f59e0b', '#ef4444']
}
```

**Booking Status (Bar Chart)**
```javascript
{
  labels: ['Confirmed', 'Pending', 'Checked In', 'Completed'],
  data: [45, 8, 87, 234]
}
```

---

## 🏢 Property Management

### Current Implementation ✅

**Property List Screen**
- Search by name or location
- Filter by type (Male/Female/Mixed)
- Sort by name, occupancy, or revenue
- Property cards with key info:
  - Name and location
  - Property type badge
  - Total rooms count
  - Occupancy rate
  - Monthly revenue
  - Occupancy percentage indicator

**Property Detail Screen**
- Property header with image
- Basic information
- Statistics (rooms, occupancy, revenue)
- Rooms organized by floor
- Action buttons (Edit, Add Room)

**Add Property Form** ✅
```javascript
{
  name: 'Sunrise Boys Hostel',
  location: 'Sector 15, Delhi',
  type: 'Male', // Male/Female/Mixed
  totalCapacity: 120,
  facilities: ['WiFi', 'AC', 'Laundry', 'Mess'],
  contactPerson: 'Ram Kumar',
  contactPhone: '+91-9876543210',
  description: 'Modern hostel facility...',
  images: ['image1.jpg', 'image2.jpg']
}
```

### Property Features to Add

**Enhanced Property Details**
```javascript
{
  // Basic Info
  name: String,
  location: String,
  type: 'Male' | 'Female' | 'Mixed',
  
  // Contact
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  emergencyContact: String,
  
  // Address
  fullAddress: String,
  landmark: String,
  pincode: String,
  city: String,
  state: String,
  coordinates: { lat: Number, lng: Number },
  
  // Facilities
  amenities: ['WiFi', 'AC', 'Parking', ...],
  foodIncluded: Boolean,
  mealType: '2 Meals' | '3 Meals',
  laundryService: Boolean,
  
  // Rules
  checkInTime: '10:00 AM',
  checkOutTime: '11:00 AM',
  visitorPolicy: String,
  smokingAllowed: Boolean,
  petsAllowed: Boolean,
  
  // Pricing
  securityDeposit: 10000,
  maintenanceCharges: 2000,
  electricityCharges: 'Included' | 'Separate',
  
  // Media
  images: [String],
  virtualTour: String, // URL
  videos: [String],
  
  // Status
  verified: Boolean,
  featured: Boolean,
  status: 'Active' | 'Inactive' | 'Under Maintenance'
}
```

**Property Actions**
- ✅ Add new property
- Edit property details
- Upload/manage images
- Add virtual tour
- Toggle active/inactive
- Archive property
- View property analytics
- Share property link
- Duplicate property (for similar listings)

---

## 🚪 Room Management

### Current Implementation ✅

**Room Detail Screen**
- Room information (number, floor, type, capacity)
- Pricing details
- Current occupants list
- Student profiles
- Add Member button

**Add Room Form** ✅
```javascript
{
  propertyId: 'PROP001',
  roomNumber: '101',
  floor: 1,
  type: 'Double', // Single/Double/Triple/Dorm
  capacity: 2,
  currentOccupancy: 2,
  rentPerBed: 12000,
  facilities: ['AC', 'Attached Bathroom'],
  available: false
}
```

### Room Features to Add

**Enhanced Room Management**
```javascript
{
  // Basic Info
  roomNumber: String,
  floor: Number,
  type: 'Single' | 'Double' | 'Triple' | 'Dorm',
  capacity: Number,
  
  // Availability
  currentOccupancy: Number,
  availableFrom: Date,
  blocked: Boolean,
  blockReason: String,
  
  // Pricing
  rentPerBed: Number,
  securityDeposit: Number,
  discountAvailable: Boolean,
  discountPercentage: Number,
  
  // Features
  size: '10x12 ft',
  furnished: Boolean,
  furniture: ['Bed', 'Table', 'Chair', 'Wardrobe'],
  amenities: ['AC', 'Fan', 'Window', 'Balcony'],
  bathroom: 'Attached' | 'Common',
  
  // Utilities
  electricMeter: 'Separate' | 'Common',
  meterNumber: String,
  
  // Condition
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Repair',
  lastMaintenance: Date,
  nextMaintenance: Date,
  
  // Media
  images: [String],
  
  // Occupants
  currentOccupants: [StudentId],
  history: [PreviousOccupants]
}
```

**Room Actions**
- ✅ Add new room
- Edit room details
- Upload room images
- Assign student to room
- Remove student from room
- Block/unblock room
- Mark for maintenance
- Change room pricing
- Swap students between rooms
- View room history
- Generate room QR code

**Bulk Room Operations**
- Add multiple rooms (batch)
- Update pricing for all rooms
- Change floor mapping
- Export room list

---

## 👥 Student/Member Management

### Current Implementation ✅

**Members List Screen**
- Search by name or phone
- Filter by assignment status (All/Assigned/Unassigned)
- Member cards showing:
  - Photo and name
  - Contact info
  - Assignment status badge
  - Room and property (if assigned)
  - Payment status (if assigned)
- FAB button to add member

**Add Member Form** ✅
```javascript
{
  // Personal Info
  name: 'John Doe',
  phone: '+91-9876543210',
  email: 'john@example.com',
  dateOfBirth: '2000-01-15',
  gender: 'Male',
  
  // Guardian Info
  guardianName: 'Father Name',
  guardianPhone: '+91-9876543211',
  
  // Assignment (Optional)
  assignToRoom: true,
  propertyId: 'PROP001',
  roomId: 'ROOM101',
  
  // Payment (If assigned)
  monthlyRent: 12000,
  securityDeposit: 10000,
  joiningDate: '2025-10-01',
  
  // Emergency
  emergencyContact: '+91-9876543212',
  bloodGroup: 'O+',
  
  // Documents
  photo: 'photo.jpg',
  idProof: 'aadhar.jpg'
}
```

**Student Profile Screen**
- Complete 8-section profile view
- Personal details
- Room assignment
- Payment history
- Documents
- Emergency contacts

### Student Features to Add

**Enhanced Student Profile**
```javascript
{
  // Personal Information
  fullName: String,
  phone: String,
  email: String,
  alternatePhone: String,
  dateOfBirth: Date,
  age: Number,
  gender: 'Male' | 'Female' | 'Other',
  bloodGroup: String,
  photo: String,
  
  // Address
  permanentAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  
  // Guardian/Emergency
  guardian: {
    name: String,
    relation: String,
    phone: String,
    email: String,
    address: String
  },
  emergencyContacts: [
    { name: String, phone: String, relation: String }
  ],
  
  // Educational/Professional
  occupation: 'Student' | 'Working Professional',
  collegeName: String,
  companyName: String,
  course: String,
  designation: String,
  
  // Documents
  documents: {
    photo: String,
    idProof: { type: String, number: String, file: String },
    collegeId: String,
    companyId: String
  },
  
  // Room Assignment
  currentProperty: PropertyId,
  currentRoom: RoomId,
  bedNumber: Number,
  joinDate: Date,
  agreementPeriod: '11 Months',
  agreementEndDate: Date,
  
  // Financial
  monthlyRent: Number,
  securityDeposit: Number,
  securityDepositPaid: Boolean,
  otherCharges: Number,
  
  // Status
  status: 'Active' | 'Notice Period' | 'Vacated',
  noticePeriod: 30, // days
  noticeGivenOn: Date,
  vacatingDate: Date,
  
  // Behavior
  behaviorRating: Number,
  complaintsReceived: Number,
  warningsIssued: Number,
  
  // Preferences
  dietaryPreferences: String,
  medicalConditions: String,
  specialRequirements: String
}
```

**Student Actions**
- ✅ Add new student
- Edit student details
- Assign/reassign room
- Transfer to different property
- Change room within same property
- Record payment
- Generate invoice
- View payment history
- Send notification
- Mark for notice period
- Process checkout
- Generate member ID card
- Export student data

**Bulk Student Operations**
- Import students (CSV/Excel)
- Bulk rent collection
- Bulk invoice generation
- Bulk notifications
- Export student database

---

## 📅 Booking Management

### Features to Implement

**Booking System**
```javascript
{
  bookingId: 'BK12345',
  
  // Student Info
  studentId: 'STU789',
  studentName: 'John Doe',
  studentPhone: '+91-9876543210',
  
  // Property & Room
  propertyId: 'PROP001',
  propertyName: 'Sunrise Hostel',
  roomId: 'ROOM101',
  roomNumber: '101',
  bedNumber: 2,
  
  // Dates
  bookingDate: '2025-10-05',
  checkInDate: '2025-10-15',
  checkOutDate: '2026-09-15',
  duration: 11, // months
  
  // Pricing
  monthlyRent: 12000,
  totalRent: 132000, // 11 months
  securityDeposit: 10000,
  otherCharges: 5000,
  totalAmount: 147000,
  
  // Payment
  advancePaid: 22000, // First month + deposit
  pendingAmount: 125000,
  paymentStatus: 'Partial',
  paymentMode: 'UPI',
  
  // Status
  status: 'Confirmed', // Pending/Confirmed/CheckedIn/Completed/Cancelled
  approvedBy: 'Merchant',
  
  // Agreement
  agreementSigned: true,
  agreementFile: 'agreement.pdf',
  
  // Special Requests
  notes: 'Vegetarian food required',
  preferences: []
}
```

**Booking Management Features**
- View all bookings
- Filter by status/date/property
- Confirm pending bookings
- Process check-ins
- Process check-outs
- Cancel bookings
- Modify booking dates
- Change room assignment
- Track booking timeline
- Send booking reminders

**Booking Dashboard**
- Today's check-ins
- Today's check-outs
- Pending confirmations
- Upcoming check-ins (7 days)
- Recent cancellations

---

## 💰 Financial Management

### Revenue Tracking

**Revenue Dashboard**
```javascript
{
  thisMonth: {
    totalRevenue: 456000,
    rentCollected: 420000,
    securityDepositReceived: 30000,
    otherCharges: 6000,
    
    expenses: 125000,
    profit: 331000,
    profitMargin: 72.6
  },
  
  byProperty: [
    {
      propertyId: 'PROP001',
      propertyName: 'Sunrise Hostel',
      revenue: 180000,
      expenses: 45000,
      profit: 135000,
      occupancy: 92
    }
  ],
  
  trends: {
    revenueGrowth: 7.8, // percentage vs last month
    expenseGrowth: 5.2,
    profitGrowth: 9.1
  }
}
```

**Payment Collection**
```javascript
{
  pending: [
    {
      studentId: 'STU123',
      studentName: 'John Doe',
      amount: 12000,
      dueDate: '2025-10-05',
      overdueDays: 2,
      type: 'Monthly Rent',
      month: 'October 2025'
    }
  ],
  
  collected: {
    today: 45000,
    thisWeek: 234000,
    thisMonth: 420000
  }
}
```

**Financial Actions**
- Record payment
- Generate invoice
- Send payment reminder
- View payment history
- Track pending payments
- Manage expenses
- Generate financial reports
- Export transactions
- Reconcile accounts
- Track refunds

### Expense Management

**Expense Tracking**
```javascript
{
  categories: [
    {
      name: 'Utilities',
      thisMonth: 25000,
      items: [
        { date: '2025-10-01', description: 'Electricity Bill', amount: 15000 },
        { date: '2025-10-05', description: 'Water Bill', amount: 10000 }
      ]
    },
    {
      name: 'Maintenance',
      thisMonth: 45000
    },
    {
      name: 'Staff Salaries',
      thisMonth: 50000
    },
    {
      name: 'Other',
      thisMonth: 5000
    }
  ],
  
  totalExpenses: 125000
}
```

**Expense Actions**
- Add expense
- Categorize expenses
- Upload bills/receipts
- View expense trends
- Compare month-over-month
- Set expense budgets
- Generate expense reports

---

## 📊 Analytics & Reports

### Analytics Dashboard

**Key Performance Indicators**
```javascript
{
  occupancy: {
    current: 87.5,
    target: 90,
    trend: 'increasing',
    comparison: {
      lastMonth: 85.2,
      lastYear: 82.1
    }
  },
  
  revenue: {
    current: 456000,
    target: 500000,
    trend: 'increasing',
    comparison: {
      lastMonth: 423000,
      lastYear: 389000
    }
  },
  
  studentRetention: {
    rate: 92, // percentage
    avgStayDuration: 8.5, // months
    renewalRate: 78
  },
  
  paymentCollection: {
    onTimeRate: 87,
    averageDelay: 3, // days
    defaultRate: 2 // percentage
  }
}
```

**Property Analytics**
```javascript
{
  propertyId: 'PROP001',
  
  performance: {
    occupancyRate: 92,
    revenueGenerated: 180000,
    avgRoomRevenue: 15000,
    profitMargin: 75
  },
  
  studentStats: {
    total: 55,
    turnoverRate: 12, // percentage per year
    avgStayDuration: 9, // months
    satisfactionScore: 4.5
  },
  
  roomStats: {
    mostPopular: '101 (Double AC)',
    leastPopular: '305 (Triple Non-AC)',
    avgOccupancyByType: {
      single: 95,
      double: 92,
      triple: 85
    }
  }
}
```

### Report Generation

**Available Reports**
- Monthly Revenue Report
- Occupancy Report
- Payment Collection Report
- Student List Report
- Expense Report
- Profit & Loss Statement
- Property Performance Report
- Student Attendance Report (if tracked)
- Maintenance Schedule Report
- Vacancy Report

**Report Features**
- Filter by date range
- Filter by property
- Filter by status
- Export as PDF
- Export as Excel
- Email report
- Schedule automatic reports
- Custom report builder

---

## 💬 Communication Tools

### Student Communication

**Messaging Features**
```javascript
{
  individualChat: {
    studentId: 'STU123',
    messages: [
      {
        from: 'merchant',
        to: 'student',
        message: 'Your room maintenance is scheduled...',
        timestamp: '2025-10-07T10:00:00Z',
        read: true
      }
    ]
  },
  
  groupMessages: {
    property: 'PROP001',
    recipients: 'all_students', // or specific rooms/floors
    message: 'Electricity will be down tomorrow 2-4 PM',
    sentAt: '2025-10-07T09:00:00Z'
  }
}
```

**Notification System**
```javascript
{
  types: [
    {
      type: 'payment_reminder',
      template: 'Hi {{name}}, your rent of ₹{{amount}} is due on {{date}}',
      channels: ['sms', 'email', 'push']
    },
    {
      type: 'maintenance_alert',
      template: 'Room {{roomNumber}} maintenance scheduled for {{date}}',
      channels: ['sms', 'push']
    }
  ],
  
  scheduled: [
    {
      type: 'payment_reminder',
      sendDate: '2025-10-03',
      recipients: [studentIds],
      sent: false
    }
  ]
}
```

**Communication Actions**
- Send individual message
- Send bulk SMS
- Send email notifications
- Create announcements
- Schedule reminders
- View message history
- Track message delivery

### Support & Feedback

**Complaint Management**
```javascript
{
  complaints: [
    {
      id: 'COMP123',
      studentId: 'STU456',
      studentName: 'John Doe',
      category: 'Maintenance',
      subject: 'AC not working',
      description: 'Room 101 AC stopped working',
      priority: 'High',
      status: 'Open', // Open/In Progress/Resolved
      reportedOn: '2025-10-07',
      assignedTo: 'Maintenance Staff',
      resolvedOn: null,
      resolution: null
    }
  ]
}
```

**Feedback Collection**
```javascript
{
  surveys: [
    {
      title: 'Monthly Satisfaction Survey',
      questions: [
        'How would you rate the room cleanliness?',
        'How would you rate the food quality?',
        'Any suggestions for improvement?'
      ],
      responses: 45,
      avgRating: 4.2
    }
  ]
}
```

---

## ⚙️ Profile & Settings

### Merchant Profile

**Profile Information**
```javascript
{
  // Personal
  name: 'Ram Kumar',
  email: 'ram@example.com',
  phone: '+91-9876543210',
  alternatePhone: '+91-9876543211',
  photo: 'profile.jpg',
  
  // Business
  businessName: 'Kumar Hostels',
  businessType: 'Proprietorship',
  gstNumber: 'GSTIN123',
  panNumber: 'ABCDE1234F',
  
  // Bank Details
  bankAccount: {
    accountNumber: 'XXXXXX1234',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branch: 'Sector 15, Delhi'
  },
  
  // Documents
  documents: {
    pan: 'pan.pdf',
    gst: 'gst.pdf',
    cheque: 'cancelled_cheque.jpg',
    propertyDocs: ['doc1.pdf', 'doc2.pdf']
  },
  
  // Verification
  verified: true,
  verificationDate: '2025-01-15',
  kycStatus: 'Approved'
}
```

**Profile Actions**
- Edit profile
- Update photo
- Change password
- Update bank details
- Upload documents
- Manage notifications
- Set language preference

### Settings

**App Settings**
```javascript
{
  notifications: {
    newBooking: true,
    paymentReceived: true,
    paymentDue: true,
    studentCheckIn: true,
    studentCheckOut: true,
    complaints: true,
    systemUpdates: false
  },
  
  payment: {
    autoReminders: true,
    reminderDays: [3, 7, 10], // before due date
    latePaymentCharges: true,
    lateChargeAmount: 100, // per day
    graceperiod: 3 // days
  },
  
  booking: {
    autoConfirmation: false, // Manual confirmation required
    advancePaymentRequired: true,
    minAdvanceAmount: 12000
  },
  
  display: {
    theme: 'light', // light/dark
    language: 'en',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY'
  }
}
```

---

## 🚀 Advanced Features

### Smart Features

**Automated Rent Reminders**
- Send automatic reminders 3, 7, 10 days before due date
- Customizable message templates
- Multiple channels (SMS, Email, Push)

**Occupancy Predictions**
```javascript
{
  nextMonth: {
    predictedOccupancy: 89,
    expectedCheckOuts: 5,
    expectedCheckIns: 8,
    vacancyAlert: false
  }
}
```

**Dynamic Pricing**
```javascript
{
  suggestions: {
    roomType: 'Double AC',
    currentPrice: 12000,
    suggestedPrice: 13000,
    reasoning: 'High demand, 95% occupancy',
    potentialIncrease: 12000 // per year
  }
}
```

### Integrations

**Payment Gateway**
- UPI integration
- Card payment
- Net banking
- Wallet support
- Payment links
- QR codes

**Document Management**
- Digital agreements
- E-signatures
- Document storage
- Auto-backup

**Accounting Software**
- Export to Tally
- Export to QuickBooks
- GST report generation
- TDS calculations

---

## 📱 Mobile App Features

### Current Implementation Status

**✅ Implemented**
- Dashboard with metrics and charts
- Properties list (search, filter, sort)
- Property detail view
- Add property form (with keyboard handling)
- Room detail view
- Add room form
- Members list (search, filter)
- Add member form (with optional room assignment)
- Student profile view
- Bottom tab navigation (floating design)
- SafeAreaView implementation
- KeyboardAvoidingView on forms

**🔄 In Progress**
- Enhanced property features
- Edit forms (Property, Room, Member)
- Image upload functionality
- Payment management
- Analytics dashboard

**📋 Planned**
- Booking management
- Expense tracking
- Communication tools
- Report generation
- Advanced analytics
- Automation features

---

## 🎯 Implementation Priorities

### Phase 1: Core Features (Weeks 1-4)
1. ✅ Dashboard
2. ✅ Property Management (List, Detail, Add)
3. ✅ Room Management (Detail, Add)
4. ✅ Member Management (List, Detail, Add)
5. 🔄 Edit Forms
6. 🔄 Image Upload

### Phase 2: Financials (Weeks 5-8)
1. Payment recording
2. Invoice generation
3. Payment reminders
4. Expense tracking
5. Financial reports

### Phase 3: Bookings & Communication (Weeks 9-12)
1. Booking system
2. Check-in/out process
3. Messaging system
4. Notifications
5. Complaint management

### Phase 4: Analytics & Automation (Weeks 13-16)
1. Advanced analytics
2. Automated reminders
3. Report generation
4. Predictive insights
5. Integrations

---

**Document Version**: 2.0  
**Last Updated**: October 7, 2025  
**Maintained By**: Development Team  
**Status**: Active Development
