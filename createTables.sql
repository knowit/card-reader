CREATE TABLE Events (
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(255) UNIQUE
);

CREATE TABLE Companies (
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(255) UNIQUE
);

CREATE TABLE Persons (
    id SERIAL NOT NULL PRIMARY KEY,
    last_name varchar(255),
    first_name varchar(255),
    card_id varchar(255) UNIQUE,
    company_id INTEGER,
    FOREIGN KEY (company_id) REFERENCES Companies (id) 
);

CREATE TABLE PARTICIPATION (
    id SERIAL NOT NULL PRIMARY KEY,
    event_id INTEGER,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES Persons (id),
    FOREIGN KEY (event_id) REFERENCES Events (id) 
);

INSERT INTO Companies (name) VALUES ('Knowit Objectnet'), ('Knowit Amende'), ('Knowit Quality'), ('Knowit Insight'), ('Knowit Experience'), ('Knowit Dataess'), ('Knowit Decision')
