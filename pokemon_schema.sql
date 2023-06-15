-- DROP DATABASE IF EXISTS pokemon_db;

-- CREATE DATABASE pokemon_db;

-- Change connection to pokemon_db

DROP TABLE IF EXISTS nameid;
-- DROP TABLE IF EXISTS metadata;
-- DROP TABLE IF EXISTS statistics;
-- DROP TABLE IF EXISTS sprites;

CREATE TABLE nameid(
			name VARCHAR (255), 
			order_id INT PRIMARY KEY);

CREATE TABLE metadata (
			name VARCHAR (255),
			order_id INT NOT NULL,
			FOREIGN KEY(order_id) REFERENCES nameid(order_id),
			weight INT,
			abilities VARCHAR (255),
			types VARCHAR (255));

CREATE TABLE statistics(
			name VARCHAR (255),
			order_id INT NOT NULL,
			FOREIGN KEY(order_id) REFERENCES nameid(order_id),
			stats_name VARCHAR (255) NOT NULL,
			stats_data VARCHAR (255));

CREATE TABLE sprites(
			name VARCHAR (255),
			order_id INT NOT NULL,
			FOREIGN KEY(order_id) REFERENCES nameid(order_id),
			sprites_male VARCHAR (255),
			sprites_female VARCHAR(255));

-- IMPORT CSV FILES IN THE ORDER OF TABLES CREATED

SELECT * FROM nameid;

SELECT * FROM metadata;

SELECT * FROM statistics;

SELECT * FROM sprites;
