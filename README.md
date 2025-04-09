# Kadra - School Management App for Specialized Education

![Kadra Logo](./assets/images/icon.png)

Kadra is a comprehensive platform connecting specialized educational institutions with students seeking specific skill development. From martial arts dojos to music schools, dance academies to language centers, Kadra streamlines the discovery, application, and management processes for specialized education.

## 🌟 Features

### For Students & Parents

- **School Discovery**: Browse and search for specialized schools and programs
- **Streamlined Application**: Apply for classes with a few taps
- **Lesson Management**: Track appointments, view calendars, and manage schedules
- **Family Coordination**: Manage multiple children's lessons and activities
- **Direct Communication**: Message teachers and school administrators
- **Progress Tracking**: View attendance, assignments, and progress reports

### For Educational Institutions

- **School Profile Management**: Create and maintain detailed school profiles
- **Student Management**: Process applications and manage student information
- **Schedule Administration**: Create and adjust class schedules
- **Communication Tools**: Direct messaging with students and parents
- **Attendance Tracking**: Record and monitor student attendance
- **Payment Integration**: Manage tuition and fee collection

## 🛠️ Technology Stack

Kadra is built using modern technologies ensuring a robust, scalable, and user-friendly application:

- **React Native & Expo**: For cross-platform mobile development
- **TypeScript**: For type-safe code and improved developer experience
- **NativeWind (Tailwind CSS)**: For styling across all platforms
- **AWS Amplify Gen 2**: For backend services, authentication, and data management
- **Expo Router**: For navigation with deep-linking support
- **Reanimated**: For smooth animations and transitions

## 📋 Architecture

The application follows a modular architecture with clear separation of concerns:

```
kadra/
├── amplify/             # AWS Amplify configuration
│   ├── auth/            # Authentication resources
│   └── data/            # Data models and schema
├── assets/              # Static assets (images, fonts)
├── src/
│   ├── app/             # Application routes (Expo Router)
│   │   ├── (auth)/      # Authenticated routes
│   │   │   └── (tabs)/  # Tab navigation screens
│   │   └── (public)/    # Public (non-authenticated) routes
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   ├── main/        # Main app components
│   │   └── messages/    # Messaging components
│   ├── context/         # React context providers
│   ├── data/            # Data management
│   ├── lib/             # Utility libraries
│   ├── styles/          # Global styles
│   ├── svg/             # SVG components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- AWS account (for Amplify backend services)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/kadra.git
   cd kadra
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure AWS Amplify

   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

4. Start the development server

   ```bash
   npm start
   # or
   yarn start
   ```

5. Run on specific platforms
   ```bash
   # For iOS
   npm run ios
   # For Android
   npm run android
   # For web
   npm run web
   ```

## 🔧 Development Workflow

### Authentication Flow

Kadra implements a comprehensive authentication system using AWS Amplify with:

- Email-based registration and verification
- Profile creation with required user attributes
- Secure session management
- Role-based access control

### Data Management

Data is managed through AWS Amplify's data services with:

- GraphQL API for data operations
- Real-time data synchronization
- Secure data access with fine-grained permissions
- Offline support with conflict resolution

### UI/UX Design Principles

- **Consistent Design Language**: Using NativeWind to ensure consistent styling
- **Responsive Layouts**: Adapting to different screen sizes and orientations
- **Accessibility**: Following best practices for accessible mobile applications
- **Performance**: Optimizing rendering and minimizing unnecessary re-renders

## 🧪 Testing

Run tests using:

```bash
npm test
# or
yarn test
```

## 📱 Deployment

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📊 Business Model

Kadra operates on a freemium model with tiered subscriptions:

### For Educational Institutions

- **Standard Tier**: Enhanced profile features, full student management, and basic analytics
- **Premium Tier**: Advanced analytics, marketing tools, and priority support

### For Students/Parents

- **Free**: School discovery, application management, and communication
