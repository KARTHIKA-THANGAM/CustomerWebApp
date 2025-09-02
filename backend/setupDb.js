import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db", "database.sqlite");

// Open database
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Drop old tables if they exist
  db.run(`DROP TABLE IF EXISTS customers`);
  db.run(`DROP TABLE IF EXISTS addresses`);

  // Create Customers table
  db.run(`
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      pin TEXT
    )
  `);

  // Create Addresses table
  db.run(`
    CREATE TABLE addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER,
      address TEXT,
      city TEXT,
      state TEXT,
      pin TEXT,
      FOREIGN KEY(customerId) REFERENCES customers(id)
    )
  `);

  // Insert demo customers
  const insertCustomer = db.prepare(`
    INSERT INTO customers (firstName, lastName, phone, address, city, state, pin)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertCustomer.run("John", "Doe", "9876543210", "123 Main St", "New York", "NY", "10001");
  insertCustomer.run("Alice", "Smith", "9123456780", "456 Park Ave", "Los Angeles", "CA", "90001");
  insertCustomer.finalize();

  // Insert demo addresses
  const insertAddress = db.prepare(`
    INSERT INTO addresses (customerId, address, city, state, pin)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertAddress.run(1, "123 Main St Apt 2", "New York", "NY", "10001");
  insertAddress.run(1, "456 Elm St", "Brooklyn", "NY", "11201");
  insertAddress.run(2, "456 Park Ave", "Los Angeles", "CA", "90001");
  insertAddress.finalize();
});

// Close database AFTER everything finishes
db.close((err) => {
  if (err) {
    console.error("❌ Error closing database:", err.message);
  } else {
    console.log("✅ Database initialized with demo data.");
  }
});
