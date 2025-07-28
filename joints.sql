-- Step 11 - Joins
-- Defining relationships is easy.
-- What’s hard is joining  data from two (or more) tables together.
-- For example, if I ask you to fetch me a users details and  their address, what SQL would you run?


-- Benefits of using a join - 
-- Reduced Latency
-- Simplified Application Logic
-- Transactional Integrity
 

-- Approach 1 (Bad)



-- Query 1: Fetch user's details
SELECT id, username, email
FROM users
WHERE id = YOUR_USER_ID;

-- Query 2: Fetch user's address
SELECT city, country, street, pincode
FROM addresses
WHERE user_id = YOUR_USER_ID;

-- Approach 2 (Good)

SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = '1';

SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
FROM users u
JOIN addresses a ON u.id = a.user_id
WHERE u.id = YOUR_USER_ID;




-- . INNER JOIN
-- Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
-- Use Case: Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned

SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;


-- LEFT JOIN
-- Returns all rows from the left table, and the matched rows from the right table.
-- Use case - To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.

SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;

-- 3. RIGHT JOIN
-- Returns all rows from the right table, and the matched rows from the left table.
-- Use case - Given the structure of the database, a RIGHT JOIN would be less common since the addresses table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the addresses table and optionally include user information, this would be the theoretical use case.

SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;


-- 4. FULL JOIN
-- Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.
-- Use case - A FULL JOIN would combine all records from both users and addresses, showing the relationship where it exists. Given the constraints, this might not be as relevant because every address should be linked to a user, but if there were somehow orphaned records on either side, this query would reveal them.

SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
FULL JOIN addresses ON users.id = addresses.user_id;