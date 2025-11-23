# Healthcare API - Bruno Collection

This collection contains all API endpoints for the Healthcare Management System.

## Setup

1. Install Bruno: https://www.usebruno.com/
2. Open Bruno and import this collection folder
3. Ensure the server is running: `pnpm start` or `pnpm dev`
4. The API runs on `http://localhost:3000`

## Endpoints

### Doctors
- **GET** `/api/doctors` - Get all doctors
- **POST** `/api/doctors` - Create a new doctor

### Patients
- **GET** `/api/patients` - Get all patients
- **POST** `/api/patients` - Create a new patient

### Appointments
- **GET** `/api/appointments` - Get all appointments
- **POST** `/api/appointments` - Create a new appointment

### Metrics
- **GET** `/api/metrics` - Get system metrics and hospital status

## Testing

Each request includes automated tests that verify:
- Correct HTTP status codes
- Response data structure
- Expected values

You can run all tests by clicking "Run Collection" in Bruno.
