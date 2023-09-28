# Patient Record System with MERN Stack 

A patient record system built using Node.js, Express, ReactJS and MongoDB for secure user registration, login, and maintaing a record system. This application will enable the authenticated user to input, update, delete, and view these records.

The project is organized as follows:

client: Contains the frontend React application.
server: Contains the backend Node.js application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Setting Up the Environment](#setting-up-the-environment)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Protected Routes](#protected-routes)

## Features

- User registration with email, password, and name.
- Secure password hashing for user data storage.
- User login with email and password.
- User logout with token invalidation.
- JWT Token-based session management with token expiration.
- Authentication middleware for protecting routes.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB instance (local or remote) and connection URI.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/ibr03/patient-record-system.git
   ```

2. Navigate to project server directory:

   ```
   cd patient-record-system/server
   ```   

3. Install dependencies:

   ```
   npm install
   ```

4. Navigate to project client directory:

   ```
   cd patient-record-system/client
   ```   

5. Install dependencies:

   ```
   npm install
   ```

## Usage

### Setting up environment

1. Create a .env file in the project server directory with the following content:

   ```
   PORT=4000
   MONGODB_URI=your-mongodb-connection-uri
   JWT_SECRET=your-jwt-secret-key
   ```
   Replace your-mongodb-connection-uri with your MongoDB connection URI and your-jwt-secret-key with your JWT secret key for token signing.

### Running the application

1. Navigate to server directory:

   ```
   cd server
   ```   

2. Run the server:

   ```
   npm start
   ```
   The application will be available at http://localhost:4000.

3. Navigate to client directory:

   ```
   cd client
   ```   

2. Run the client app:

   ```
   npm start
   ```
   The application will be available at http://localhost:3000.

## API Documentation

### User Registration
    Endpoint: POST /signup

    Request Payload:

   ```
   {
    "email": "user@example.com",
    "password": "Password123",
    "name": "John Doe"
   }
   ```

    Response:
    * HTTP Status: 201 Created
    * Response Payload: { message: "User signed in successfully" }

### User Login
    Endpoint: POST /login

    Request Payload:
    
   ```
   {
    "email": "user@example.com",
    "password": "Password123",
   }
   ```

    Response:
    * HTTP Status: 200 OK
    * Response Payload: { message: "User logged in successfully" }

### Protected Routes
    To access protected routes, include the Authorization header with your session token.

   #### Postman Collection 
    Following postman collection documents all API endpoint usage examples - 

    https://www.postman.com/telecoms-technologist-44260770/workspace/my-workspace/collection/26804310-ca340991-cd66-432e-8824-29eb112aea78?action=share&creator=26804310

