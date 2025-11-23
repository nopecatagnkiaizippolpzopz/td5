# Healthcare API - Lab 5

A Node.js/Express REST API for managing doctors, patients, and appointments in a hospital system.

## Project Overview

This project implements a full Healthcare Management API with the following features:
- **Doctors Management**: Create and retrieve doctors
- **Patients Management**: Create and retrieve patients  
- **Appointments**: Schedule appointments between doctors and patients
- **Metrics**: Monitor system health and hospital status

## Setup

### Prerequisites
- Node.js 18+
- pnpm 10+

### Installation

```bash
pnpm install
```

## Running the Application

### Development Mode
```bash
pnpm dev
```
Server will run on `http://localhost:3000`

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

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create a new doctor
  ```json
  { "name": "Dr. Name", "specialty": "Specialty" }
  ```

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create a new patient
  ```json
  { "name": "Patient Name", "age": 30 }
  ```

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create an appointment
  ```json
  { "doctorId": 1, "patientId": 1, "date": "2025-04-15", "time": "11:00" }
  ```

### Metrics
- `GET /api/metrics` - Get system metrics and hospital status

## Project Structure

```
├── src/
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── routes/
│   ├── doctors.js      # Doctor routes
│   ├── patients.js     # Patient routes
│   ├── appointments.js # Appointment routes
│   └── metrics.js      # Metrics routes
├── test/
│   └── routes/         # API tests
├── bruno/              # Bruno API collection
│   └── Healthcare API/ # Request files (.bru)
├── jest.config.js      # Jest configuration
├── .eslintrc.json      # ESLint configuration
└── package.json        # Dependencies and scripts
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

- **Express.js**: Web framework
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **ESLint**: Code quality
- **Node.js ES Modules**: Modern JavaScript syntax

## Learning Outcomes

This lab covers:
- ✓ JavaScript fundamentals (variables, arrays, objects, functions)
- ✓ ES6+ features (arrow functions, destructuring, template literals)
- ✓ Async/await and Promises
- ✓ Express.js routing and middleware
- ✓ REST API design principles
- ✓ Testing with Jest and Supertest
- ✓ Code quality with ESLint
- ✓ CI/CD with GitHub Actions
- ✓ API testing with Postman

## Next Steps

1. Add database persistence (MongoDB, PostgreSQL)
2. Implement authentication and authorization
3. Add input validation and error handling
4. Create additional routes (GET by ID, DELETE, UPDATE)
5. Add API documentation with Swagger/OpenAPI
