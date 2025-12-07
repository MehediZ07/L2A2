# Vehicle Rental Management System

A comprehensive RESTful API for managing vehicle rentals with user authentication, vehicle management, and booking functionality.

**Live URL:** [https://expressserver-liard.vercel.app/](https://expressserver-liard.vercel.app/)

## Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (Admin/Customer)

- **Vehicle Management**
  - CRUD operations for vehicles
  - Vehicle availability tracking
  - Support for multiple vehicle types (Car, Bike, Van, SUV)
  - Admin-only vehicle management

- **Booking System**
  - Create and manage vehicle bookings
  - Automatic price calculation
  - Booking status tracking (Active, Cancelled, Returned)
  - Date-based rental periods

- **Database Integration**
  - PostgreSQL database with proper relationships
  - Automatic table creation and schema management
  - Data validation and constraints

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **tsx** - TypeScript execution
- **Vercel** - Deployment platform
- **dotenv** - Environment configuration

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login

### Vehicles
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:vehicleId` - Get vehicle by ID
- `POST /api/v1/vehicles` - Create vehicle (Admin only)
- `PUT /api/v1/vehicles/:vehicleId` - Update vehicle (Admin only)
- `DELETE /api/v1/vehicles/:vehicleId` - Delete vehicle (Admin only)

### Bookings
- `POST /api/v1/bookings` - Create booking (Authenticated)
- `GET /api/v1/bookings` - Get user bookings (Authenticated)
- `PUT /api/v1/bookings/:bookingId` - Update booking (Authenticated)

### Users
- User management endpoints (Authenticated)

## Setup & Usage Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd L2A2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   CONNECTION_STR=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**
   The application will automatically create required tables on startup.

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or your specified PORT).

### Testing the API

Visit the root endpoint to verify the API is running:
```
GET http://localhost:5000/
```

Expected response:
```json
{
  "message": "Vehicle Rental API is running!",
  "version": "1.0.0"
}
```

## Project Structure

```
src/
├── config/
│   ├── database.ts      # Database configuration and initialization
│   └── index.ts         # Environment configuration
├── middleware/
│   └── auth.ts          # Authentication middleware
├── modules/
│   ├── auth/            # Authentication module
│   ├── bookings/        # Booking management
│   ├── users/           # User management
│   └── vehicles/        # Vehicle management
├── types/
│   └── index.ts         # TypeScript type definitions
└── server.ts            # Application entry point
```

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## License

This project is licensed under the MIT License.

---

**Built using Node.js, Express, and TypeScript**