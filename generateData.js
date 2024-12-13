// command
// > node generateData.js
// This will generate data for 100 new users and append it to the users.json file

const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Function to sanitize and format phone numbers as ###-###-####
const sanitizePhoneNumber = (phone) => {
    // Match and extract the standard 10-digit phone number
    const match = phone.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (match) {
        const digits = match[0].replace(/\D/g, ''); // Remove non-numeric characters
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`; // Format as ###-###-####
    }
    // Fallback: Generate a random phone number
    const randomAreaCode = Math.floor(100 + Math.random() * 900); // Random 3-digit area code
    const randomExchange = Math.floor(100 + Math.random() * 900); // Random 3-digit exchange
    const randomLineNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit line number
    return `${randomAreaCode}-${randomExchange}-${randomLineNumber}`;
};

// Generate new users
const generateUsers = (num) => {
    return Array.from({ length: num }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            firstName,
            lastName,
            username: faker.internet.username({ firstName, lastName }).toLowerCase(), // Generates a username using the provided firstName & lastName
            email: faker.internet.email({firstName, lastName}).toLowerCase(), // Generates an email address using the provided firstName and lastName
            phone: sanitizePhoneNumber(faker.phone.number()), // Clean phone number
            streetAddress: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipcode: faker.location.zipCode().substring(0, 5), // Ensures only 5 digits
        };
    });
};

// Number of users to generate
const numNewUsers = 500;

// Read existing data, append new users, and write back to the file
fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            // If the file doesn't exist, create it with the new users
            const newUsers = generateUsers(numNewUsers);
            fs.writeFile('users.json', JSON.stringify(newUsers, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                } else {
                    console.log('File created and users added!');
                }
            });
        } else {
            console.error('Error reading file:', err);
        }
    } else {
        // File exists, append new users to existing data
        let users = JSON.parse(data);
        const newUsers = generateUsers(numNewUsers);
        users = users.concat(newUsers);
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log(`${numNewUsers} users appended to users.json!`);
            }
        });
    }
});
