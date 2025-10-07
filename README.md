# 🏨 Hostel Management Platform

A comprehensive React Native application for managing hostel properties, bookings, and student accommodations with separate portals for Merchants and Admins.

---

## 📱 About

This platform provides a complete solution for hostel management with two distinct portals:

- **Merchant Portal**: Property owners manage their hostels, rooms, students, and finances
- **Admin Portal**: Platform administrators oversee all operations, users, and business metrics

---

## ✨ Features

### Merchant Portal ✅
- 📊 Dashboard with real-time metrics & charts
- 🏢 Property Management (Add, View, Search, Filter, Sort)
- 🚪 Room Management (Add, View, Assign Students)
- 👥 Student/Member Management (Add, View, Search, Filter)
- 💰 Revenue Tracking
- 📈 Analytics & Insights
- 🎨 Modern Floating Bottom Navigation

### Admin Portal 📋
- 🎛️ Super Admin Dashboard
- 👥 User Management (Merchants, Students, Admins)
- ✅ Property Approval System
- 💳 Transaction Management
- 🔒 Security & Compliance
- 📊 Advanced Analytics & AI
- ⚙️ Platform Configuration

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 14.0.0
npm >= 6.0.0
expo-cli
```

### Installation
```bash
# Clone the repository
git clone https://github.com/9441ashiesh/merchent.git

# Navigate to project
cd merchent

# Install dependencies
npm install

# Start the app
npm start
```

---

## 📚 Documentation

**Complete guides available in `/docs` folder:**

### For Developers
- **[Admin Portal Guide](docs/ADMIN_PORTAL_COMPLETE_GUIDE.md)** - 600+ lines, all admin features
- **[Merchant Portal Guide](docs/MERCHANT_PORTAL_COMPLETE_GUIDE.md)** - 500+ lines, all merchant features
- **[Documentation Index](docs/README.md)** - Overview and quick reference

### Project Docs
- `DESIGN_SYSTEM.md` - Design specifications
- `TECHNICAL_SPECS.md` - Technical architecture
- `FEATURE_IMPLEMENTATION_STATUS.md` - Progress tracker

---

## 🛠️ Tech Stack

- **Framework**: React Native 0.72.6
- **Navigation**: React Navigation 6.x
- **State Management**: Context API
- **UI Components**: React Native built-in + Custom
- **Charts**: React Native Chart Kit
- **Platform**: Expo 49.0.15

---

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── layout/
│   ├── navigation/    # Custom tab bar
│   └── ui/
├── constants/         # Colors, design system
├── context/           # Auth, state management
├── navigation/        # App navigation config
├── screens/
│   ├── admin/        # Admin portal screens
│   ├── merchant/     # Merchant portal screens (in progress)
│   ├── auth/         # Authentication screens
│   └── user/         # User-facing screens
├── services/         # API, mock data
└── utils/            # Helper functions

docs/                  # Documentation
```

---

## 🎨 Design System

### Colors
```javascript
{
  primary: '#1f2937',      // Dark gray
  background: '#f8f9fa',   // Light background
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b'
}
```

### Key Features
- ✅ Minimalist dark theme (#1f2937)
- ✅ 4px grid system
- ✅ Complete typography scale
- ✅ Consistent spacing
- ✅ Modern floating navigation
- ✅ Professional keyboard handling

---

## 📊 Current Status

### Implementation Progress

**Merchant Portal**: 70% Complete
- ✅ Dashboard
- ✅ Properties (List, Add, Detail)
- ✅ Rooms (Add, Detail)
- ✅ Members (List, Add, Detail)
- ✅ Search & Filter
- 🔄 Edit Forms
- 🔄 Image Upload
- 📋 Payments
- 📋 Bookings

**Admin Portal**: Documented (Implementation Pending)
- 📋 All features documented
- 📋 Ready for development

---

## 🔐 Authentication

**Phone-based authentication with role detection:**
- Phone starting with **'8'** → Merchant
- Phone starting with **'9'** → Admin
- Others → User

---

## 🗺️ Roadmap

### Phase 1: Core Features (Weeks 1-4) ✅
- [x] Dashboard
- [x] Property Management
- [x] Room Management
- [x] Member Management
- [x] Navigation System

### Phase 2: Enhancements (Weeks 5-8) 🔄
- [ ] Edit Forms
- [ ] Image Upload
- [ ] Payment Management
- [ ] Expense Tracking

### Phase 3: Advanced (Weeks 9-12) 📋
- [ ] Booking System
- [ ] Analytics Dashboard
- [ ] Communication Tools
- [ ] Report Generation

### Phase 4: Admin Portal (Weeks 13-16) 📋
- [ ] Admin Dashboard
- [ ] User Management
- [ ] Property Approval
- [ ] Platform Configuration

---

## 🤝 Contributing

1. Read the appropriate guide in `/docs`
2. Follow the design system
3. Implement keyboard handling
4. Test on iOS and Android
5. Update documentation

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Ashiesh Mittapalli**
- GitHub: [@9441ashiesh](https://github.com/9441ashiesh)

---

## 📞 Support

For questions or issues:
1. Check documentation in `/docs`
2. Review implementation guides
3. Check existing code examples

---

**Last Updated**: October 7, 2025  
**Version**: 2.0  
**Status**: Active Development

