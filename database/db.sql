CREATE DATABASE chat CHARACTER SET utf8 COLLATE utf8_general_ci; 

CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    userlogin VARCHAR(30),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payload JSON
);

ALTER TABLE Messages
 CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
