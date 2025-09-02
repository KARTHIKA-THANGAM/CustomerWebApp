# Customer & Address Management App

This is a **Full Stack CRUD Web App** to manage Customers and their Multiple Addresses.  
It is built with:

- **Frontend**: React (React Router + Context API + CSS per component)  
- **Backend**: Node.js + Express.js  
- **Database**: SQLite with demo data  

---

## ⚙️ 0. Prerequisites (Install Before Starting)

### Install Node.js & npm
1. Download Node.js LTS from [https://nodejs.org](https://nodejs.org)  
2. During installation, ensure "Install npm" is checked  
3. Verify installation:
   ```bash
   node -v
   npm -v
Install SQLite3
Windows:
Download from: https://www.sqlite.org/download.html

Extract and place sqlite3.exe in C:\sqlite\

Add C:\sqlite\ to PATH environment variable

Verify:

bash
Copy code
sqlite3 --version
Linux / Mac:
bash
Copy code
sudo apt-get install sqlite3   # Ubuntu/Debian
# or
brew install sqlite3           # macOS (Homebrew)
🚀 1. Project Setup
Create project folder:

bash
Copy code
cd C:\
mkdir WebApp
cd WebApp
Inside WebApp/ you will have:

Copy code
backend/
frontend/
README.md
🚀 2. Backend Setup
Go to backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create & seed database:

bash
Copy code
node setupDb.js
✅ Expected output:

pgsql
Copy code
Database initialized with demo data.
This creates:

bash
Copy code
backend/db/database.sqlite
Start backend server:

bash
Copy code
npm start
Backend runs at:

arduino
Copy code
http://localhost:5000
Test API in browser or Postman:

bash
Copy code
http://localhost:5000/api/customers
🚀 3. Frontend Setup
Open new terminal and go to frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start frontend:

bash
Copy code
npm start
Frontend runs at:

arduino
Copy code
http://localhost:3000
📂 4. Database Details
Tables created:

customers → stores customer details (firstName, lastName, phone, address, city, state, pin)

addresses → stores multiple addresses linked to customers

Demo data inserted:

Customers: John Doe (NY), Alice Smith (CA)

Addresses: multiple addresses for each customer

🔗 5. API Endpoints
Base URL → http://localhost:5000/api

Customers
GET /customers → List all customers

POST /customers → Add new customer

PUT /customers/:id → Update a customer

DELETE /customers/:id → Delete a customer

Addresses
GET /addresses/:customerId → Get all addresses for a customer

POST /addresses → Add new address for a customer

🛠️ 6. Common Issues & Fixes
Error: file is not a database

Delete backend/db/database.sqlite

Run:

bash
Copy code
node setupDb.js
Backend not starting

Ensure server.js exists inside backend/

Ensure routes/customers.js and routes/addresses.js exist

Frontend not fetching data

Check frontend/package.json has:

json
Copy code
"proxy": "http://localhost:5000"
Port already in use

Stop other apps on 3000 or 5000, or change ports in config

📁 7. Folder Structure
pgsql
Copy code
WebApp/
│
├── backend/
│   ├── server.js
│   ├── setupDb.js
│   ├── routes/
│   │   ├── customers.js
│   │   └── addresses.js
│   ├── db/
│   │   └── database.sqlite
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
│
└── README.md
