-- Drop old tables if they exist
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS customers;

-- Create Customers Table
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pin TEXT
);

-- Create Addresses Table
CREATE TABLE addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    address TEXT,
    city TEXT,
    state TEXT,
    pin TEXT,
    FOREIGN KEY(customerId) REFERENCES customers(id)
);

-- Insert Demo Customers
INSERT INTO customers (firstName, lastName, phone, address, city, state, pin) VALUES
('John', 'Doe', '9876543210', '123 Main St', 'New York', 'NY', '10001'),
('Alice', 'Smith', '9123456780', '456 Park Ave', 'Los Angeles', 'CA', '90001'),
('Robert', 'Brown', '9012345678', '789 Market St', 'San Francisco', 'CA', '94103'),
('Mary', 'Johnson', '9898989898', '55 Queen St', 'Toronto', 'ON', 'M5H 2N2'),
('David', 'Lee', '9876501234', '88 Orchard Rd', 'Singapore', 'SG', '238841');

-- Insert Demo Addresses
INSERT INTO addresses (customerId, address, city, state, pin) VALUES
(1, '123 Main St Apt 2', 'New York', 'NY', '10001'),
(1, '456 Elm St', 'Brooklyn', 'NY', '11201'),
(2, '456 Park Ave', 'Los Angeles', 'CA', '90001'),
(3, '101 Mission St', 'San Francisco', 'CA', '94105'),
(3, '202 Pine St', 'San Francisco', 'CA', '94104'),
(4, '77 King St', 'Toronto', 'ON', 'M5C 1E3'),
(5, '99 Marina Bay Sands', 'Singapore', 'SG', '018956');
