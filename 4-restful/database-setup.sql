-- Create the pets table
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    kind VARCHAR(255),
    name VARCHAR(255),
    age INT
);

-- Adds the first few pets
INSERT INTO pets (kind, name, age) VALUES ('dog', 'chula', 5);
INSERT INTO pets (kind, name, age) VALUES ('cat', 'horchata', 11);
INSERT INTO pets (kind, name, age) VALUES ('bird', 'bluey', 1);