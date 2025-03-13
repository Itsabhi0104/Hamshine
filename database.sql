-- Create database
CREATE DATABASE solar_quotation_system;
USE solar_quotation_system;

-- Customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'piece',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotations table
CREATE TABLE quotations (
    quotation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    quotation_number VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'approved', 'declined') DEFAULT 'pending',
    notes TEXT,
    expiry_date DATE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Quotation items table
CREATE TABLE quotation_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    quotation_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (quotation_id) REFERENCES quotations(quotation_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- Users table for admin authentication
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, description, category, price, unit) VALUES
('250W Monocrystalline Solar Panel', 'High-efficiency monocrystalline solar panel', 'Panels', 150.00, 'piece'),
('500W Polycrystalline Solar Panel', 'Durable polycrystalline solar panel', 'Panels', 250.00, 'piece'),
('3kW Solar Inverter', 'Grid-tied solar inverter', 'Inverters', 800.00, 'piece'),
('5kW Solar Inverter', 'Hybrid solar inverter with battery support', 'Inverters', 1200.00, 'piece'),
('100Ah Lithium Battery', 'High-capacity lithium-ion battery', 'Batteries', 950.00, 'piece'),
('Solar Panel Mounting System', 'Roof mounting system for solar panels', 'Accessories', 200.00, 'set'),
('Solar DC Cable (10m)', 'Specialized DC cable for solar installations', 'Accessories', 45.00, 'roll'),
('Solar AC Cable (10m)', 'Specialized AC cable for solar installations', 'Accessories', 35.00, 'roll');

-- Insert admin user (password: admin123)
INSERT INTO users (username, password, name, email, role) VALUES
('admin', '$2y$10$8KzO1h7Ym8KCn0ydXjHqVe5ksXQAcHzQSZRwpnT7GQRNiCD0ORyZe', 'Admin User', 'admin@solarcompany.com', 'admin');

