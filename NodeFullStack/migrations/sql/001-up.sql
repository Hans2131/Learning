-- Create an ENUM type for the Status column
CREATE TYPE task_status AS ENUM ('Pending', 'In Progress', 'Completed');

-- Create the Tasks table
CREATE TABLE IF NOT EXISTS Tasks (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Status task_status DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

