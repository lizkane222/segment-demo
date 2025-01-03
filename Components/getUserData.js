// Fetch JSON data from users.json
export const getUserData = () => {
    const userList = document.getElementById('user-list');
    let fakerUserData;
    // Fetch users from the JSON file
    const getUserData = () => {
        console.log('Fetching user data...');
        fetch('users.json') // Adjust path if necessary based on server setup
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                if (users.length === 0) {
                    console.log('No users found in users.json.');
                    alert('No users found. Please append users first!');
                    return;
                }

                // Select a random user from the array
                const randomIndex = Math.floor(Math.random() * users.length);
                const user = users[randomIndex];

                // Display the random user in the DOM (Optional)
                // const userItem = document.// createElement('li');
                // userItem.textContent = `
                //     ${user.firstName} ${user.// lastName} 
                //     Username: ${user.username} 
                //     Phone: ${user.phone} 
                //     Email: ${user.email} 
                //     Address: ${user.streetAddress}, $// {user.city}, ${user.state}, $// {user.zipcode}`;
                // userList.appendChild(userItem);
                userList.innerHTML = '';

                // Create and append individual <li> elements for each piece of user information
                const userInfo = [
                    `<span class="bold">Name: </span> ${user.firstName} ${user.lastName}`,
                    `<span class="bold">Username: </span>${user.username}` ,
                    `<span class="bold">Phone: </span>${user.phone}` ,
                    `<span class="bold">Email: </span>${user.email}` ,
                    `<span class="bold">Address: </span> ${user.streetAddress}, ${user.city}, ${user.state}, ${user.zipcode}`
                ];

                userInfo.forEach(info => {
                    const userItem = document.createElement('li');
                    userItem.innerHTML = info;
                    userList.appendChild(userItem);
                });


                // Populate form fields
                document.getElementById('firstName').value = user.firstName;
                document.getElementById('lastName').value = user.lastName;
                document.getElementById('username').value = user.username;
                document.getElementById('phone').value = user.phone;
                document.getElementById('street').value = user.streetAddress;
                document.getElementById('city').value = user.city;
                document.getElementById('state').value = user.state;
                document.getElementById('zipcode').value = user.zipcode;
                document.getElementById('email').value = user.email;

                // Update Global Variables
                firstName = user.firstName
                lastName = user.lastName
                username = user.username
                phone = user.phone
                street = user.streetAddress
                city = user.city
                state = user.state
                zipcode = user.zipcode
                email = user.email
                
                currentUser= {...currentUser, firstName, lastName, username, phone, street, city, state, zipcode, email, }
                console.log('currentUser : ',currentUser);
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
                alert('Error fetching user data. Check console for details.');
            });
                
    };
    document.getElementById('generateFakerUserData').addEventListener('click', getUserData)
}