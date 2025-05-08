
This repository contains both the **backend** and **frontend** code for a fullstack
assignment project.
Repository Structure
--------------------
assessment/
├── backend/
└── frontend/
Clone the Repository
--------------------
git clone https://github.com/Bhuwan-cha21/assessment.git
Running the Backend
-------------------
1. Navigate to the backend folder:
 cd assessment/backend
Fullstack Assessment Project
2. Install dependencies:
 npm install
3. Create a `.env` file in the `backend` folder and configure the database credentials:
 Example `.env`:
 DB_USER=your_db_user
 DB_HOST=localhost
 DB_NAME=studentdb
 DB_PASSWORD=your_db_password
 DB_PORT=5432
4. Run this query in postgres in PgAdmin
   CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  middleName TEXT,
  lastName TEXT,
  dob DATE,
  gender TEXT,
  phone TEXT,
  secondaryPhone TEXT,
  email TEXT,
  occupation TEXT,
  company TEXT,
  province TEXT,
  district TEXT,
  municipality TEXT,
  ward TEXT,
  streetAddress TEXT,
  course TEXT,
  courseType TEXT,
  courseFee TEXT,
  startDate DATE,
  endDate DATE,
  courseCenter TEXT,
  teacher TEXT,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
6. Start the backend server:
 node index.js
Running the Frontend
--------------------
1. Navigate to the frontend folder:
 cd ../frontend
Fullstack Assessment Project
2. Install dependencies:
 npm install
3. Start the development server:
 npm run dev

For questions or issues, please reach out to Bhuwan sharma:
bhuwanschalise21@gmail.com
