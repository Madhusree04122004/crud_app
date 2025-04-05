# User CRUD Application

This is a simple full-stack User CRUD (Create, Read, Update, Delete) application built with:

- **Node.js** + **Express** for backend API
- **PostgreSQL** for database
- **HTML**, **Bootstrap**, and **jQuery** for frontend

## Features

- Add a new user (name, password, age, date of birth, degree)
- View all users with pagination
- Update existing user details
- Delete a user
- Passwords are securely hashed using bcrypt

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup Instructions

1. Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

2. Install dependencies
npm install

3. Setup PostgreSQL Database
Create a PostgreSQL database named userdb
users table structure:
    CREATE TABLE users (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,password TEXT NOT NULL,age INTEGER,dob DATE,degree VARCHAR(100));
Update the PostgreSQL credentials in server.js:
    const pool = new Pool({user: 'your_postgres_user',host: 'localhost',database: 'userdb',password: 'your_password',port: 5432,});
   
4. Run the Server
    node server.js
The backend will run on: http://localhost:3000

5. Access the Frontend
    Open your browser and visit http://localhost:3000

## Project Structure

├── public/
│   └── index.html        
├── server.js              
├── package.json           
├── package-lock.json

## Dependencies

express
body-parser
cors
pg
bcrypt

## Notes

Passwords are hashed with bcrypt before being stored.
All API responses return relevant fields except the password for security.
Pagination is implemented on the client side.

