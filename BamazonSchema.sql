DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(5,2) NULL,
stock_quantity INTEGER(10) NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pure Protein Bars", "Food", 10.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Case", "Electronics", 8.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Heels", "Clothing", 25.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FireStick", "Electronics", 15.00, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow Case", "Home", 30.00, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Poster", "Home", 12.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BVitamins", "Food", 10.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 15.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camping tent", "Outdoors", 70.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Key cover", "Electronics", 5.00, 17);

SELECT * FROM products;
