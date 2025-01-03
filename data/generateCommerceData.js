// command to run file : node generateCommerceData.js => appends 150 new products to the products.json file
// the products.json file is then imported into the ecommerce.js file as the products array for the ecommerce page
// the products array is then used to display the products on the ecommerce page
// the products are displayed in a grid format with the product image, name, price, and category

// The faker-js library is used to generate fake data for the products
import fs from 'fs';
import { faker } from '@faker-js/faker';

const generateData = (numProducts = 50) => {
    const categories = ['Electronics', 'Fashion', 'Home', 'Toys', 'Books', 'Sports'];
    const products = [];

    for (let i = 0; i < numProducts; i++) {
        const category = faker.helpers.arrayElement(categories);
        products.push({
            id: faker.string.uuid(), // Updated UUID generation method
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            category,
            description: faker.commerce.productDescription(),
            image: `https://source.unsplash.com/300x300/?${category}`,
        });
    }

    return products;
};

const appendDataToFile = (filePath, newData) => {
    let existingData = [];

    // Check if file exists and read its contents
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
    }

    // Append new data
    const combinedData = [...existingData, ...newData];

    // Write combined data back to the file
    fs.writeFileSync(filePath, JSON.stringify(combinedData, null, 2), 'utf-8');
    console.log(`Data appended to ${filePath}`);
};

const filePath = './data/products.json';
const newCommerceData = generateData(150); // Generate 50 new products
appendDataToFile(filePath, newCommerceData);
