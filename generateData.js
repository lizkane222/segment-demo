// command
// > node generateData.js
// This will generate data for 100 new users and append it to the users.json file

const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Generate new users
const generateUsers = (num) => {
    return Array.from({ length: num }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        phone: faker.phone.number('(###) ###-####'),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode(),
    }));
};

// Number of users to generate
const numNewUsers = 100;

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
