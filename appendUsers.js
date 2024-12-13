// Append new users by making a POST request to the Node.js server
const appendUsers = () => {
    console.log('Appending new users...');
    fetch('http://127.0.0.1:8080/append-users', {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Notify user of success
            console.log('Users appended:', data);
            // Optionally re-fetch data to display the updated list
            getUserData();
        })
        .catch(err => {
            console.error('Error appending users:', err);
            alert('Error appending users. Check console for details.');
        });
};

// Add event listeners
document.getElementById('append-users').addEventListener('click', appendUsers);



// HTML ELEMENT
<button id="append-users">Append Users</button>