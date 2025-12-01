# Healthcare API - Labs 5 & 6

A Node.js/Express REST API for managing doctors, patients, and appointments in a hospital system with MongoDB persistence.

## Project Overview

This project implements a full Healthcare Management API with the following features:
- **Doctors Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Patients Management**: Full CRUD operations
- **Appointments**: Full CRUD operations with doctor/patient references
- **Metrics**: Monitor system health and hospital status
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas

## Setup

### Prerequisites
- Node.js 18+
- pnpm 10+
- MongoDB Atlas account (or local MongoDB instance)

### Installation

```bash
pnpm install
```

### Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
```

## Database Setup

### Seed the Database

Populate MongoDB with initial data (5 doctors, 5 patients, 5 appointments):

```bash
pnpm seed
```

This will:
- Clear existing collections
- Insert 5 sample doctors
- Insert 5 sample patients
- Insert 5 sample appointments with references

## Running the Application

### Development Mode
```bash
pnpm dev
```
Server will run on `http://localhost:3000` and connect to MongoDB

### Production Mode
```bash
pnpm start
```

## Testing

### Run All Tests
```bash
pnpm test
```

Tests include:
- API endpoint validation (GET/POST)
- Response status codes verification
- Data structure validation
- Error handling validation

Coverage target: 80%+

### Code Linting
```bash
pnpm lint
```

## API Endpoints

### Doctors (Full CRUD)
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create a new doctor
  ```json
  { "name": "Dr. Name", "specialty": "Specialty" }
  ```
- `PUT /api/doctors/:id` - Update a doctor
  ```json
  { "name": "Dr. Updated", "specialty": "New Specialty" }
  ```
- `DELETE /api/doctors/:id` - Delete a doctor

### Patients (Full CRUD)
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create a new patient
  ```json
  { "name": "Patient Name", "age": 30 }
  ```
- `PUT /api/patients/:id` - Update a patient
  ```json
  { "name": "Updated Name", "age": 31 }
  ```
- `DELETE /api/patients/:id` - Delete a patient

### Appointments (Full CRUD)
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create an appointment
  ```json
  { 
    "doctorId": "507f1f77bcf86cd799439011", 
    "patientId": "507f191e810c19729de860ea",
    "date": "2025-04-15", 
    "time": "11:00" 
  }
  ```
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Delete an appointment

### Metrics
- `GET /api/metrics` - Get system metrics and hospital status

## Project Structure

```
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── db.js               # Mongoose connection management
│   ├── models/             # Mongoose schemas and models
│   │   ├── doctor.model.js
│   │   ├── patient.model.js
│   │   └── appointment.model.js
│   ├── controllers/        # Business logic (MVC)
│   │   ├── doctor.controller.js
│   │   ├── patient.controller.js
│   │   └── appointment.controller.js
│   ├── routes/             # Route definitions (MVC)
│   │   ├── doctors.js
│   │   ├── patients.js
│   │   └── appointments.js
│   └── utils/              # Utility functions
│       └── validation.js
├── routes/                 # Legacy metrics route
│   └── metrics.js
├── tests/
│   ├── setup.js            # Vitest configuration
│   ├── unit/               # Unit tests
│   │   └── validation.test.js
│   └── integration/        # Integration tests
│       ├── doctors.test.js
│       ├── patients.test.js
│       └── appointments.test.js
├── bruno/                  # Bruno API collection
│   └── Healthcare API/     # Request files (.bru)
├── seed.js                 # Database seeding with Mongoose
├── .env.example            # Environment variables template
├── vitest.config.js        # Vitest configuration
├── .eslintrc.json          # ESLint configuration
└── package.json            # Dependencies and scripts
```


## CI/CD Pipeline

GitHub Actions workflow runs on every push and pull request:
1. Install dependencies
2. Run linting checks
3. Execute tests with coverage report
4. Verify coverage is ≥ 80%

## Testing with Bruno

Open the Bruno collection from `bruno/Healthcare API/` to manually test all endpoints.

Steps:
1. Download and install Bruno from https://www.usebruno.com/
2. Open Bruno
3. Click "Open Collection" and select the `bruno/Healthcare API` folder
4. Ensure server is running on `http://localhost:3000`
5. Execute requests and verify responses with built-in tests

## Technologies Used

- **Express.js 5.1**: Web framework
- **MongoDB 7.0**: NoSQL database
- **Mongoose 9.0**: ODM for MongoDB with schema validation
- **dotenv**: Environment variable management
- **Vitest**: Modern testing framework
- **Supertest**: HTTP assertion library
- **ESLint**: Code quality
- **Node.js ES Modules**: Modern JavaScript syntax


## Learning Outcomes

### Lab 5 - REST API Fundamentals
- ✓ JavaScript fundamentals (variables, arrays, objects, functions)
- ✓ ES6+ features (arrow functions, destructuring, template literals)
- ✓ Async/await and Promises
- ✓ Express.js routing and middleware
- ✓ REST API design principles
- ✓ Testing with Jest and Supertest
- ✓ Code quality with ESLint
- ✓ CI/CD with GitHub Actions
- ✓ API testing with Bruno

### Lab 6 - MongoDB Integration
- ✓ MongoDB connection management
- ✓ CRUD operations with MongoDB driver
- ✓ ObjectId handling and references
- ✓ Database seeding scripts
- ✓ Environment variable configuration
- ✓ Async/await with database operations
- ✓ Error handling with MongoDB

### Lab 7 - Mongoose & MVC Architecture
- ✓ Mongoose schema design and validation
- ✓ MVC architecture (Model-View-Controller)
- ✓ Mongoose middleware and query helpers
- ✓ Schema relationships with references
- ✓ Virtual properties and instance methods
- ✓ Migration from Vitest testing framework
- ✓ Unit tests (pure functions)
- ✓ Integration tests (full API flow)
- ✓ Test coverage ≥ 80%


## Next Steps

1. Implement authentication and authorization (JWT)
2. Add input validation with Joi or Zod
3. Implement data aggregation queries
4. Add pagination and filtering
5. Create API documentation with Swagger/OpenAPI
6. Add indexes for performance optimization
