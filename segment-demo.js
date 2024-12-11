// JAVASCRIPT
import { Analytics } from '@segment/analytics-node'
const node = new Analytics({ writeKey: 'WOIYdGFBtpCDtCHTMenBAnuTYPA9HLMM' })

let userId
let anonymousId
let traits
let groupId
let groupTraits







// Function to update user profile
function updateProfile(event) {
    event.preventDefault(); // Prevent default form submission

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const profileDiv = document.getElementById('user-profile');
    profileDiv.innerHTML = `<p><strong>First Name:</strong> ${firstName}</p><p><strong>Last Name:</strong> ${lastName}</p><p><strong>Username:</strong> ${username}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p>`;
    
    
    if(!userId){
        let tempUserId = uuidv4()
        console.log('tempUserId : ',tempUserId)
    }

    //analytics.identify()
}

// Function to create dynamic buttons
function createButtons(buttonNames) {
    const buttonContainer = document.getElementById('dynamic-buttons');
    buttonNames.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.classList.add('btn', 'btn-secondary', 'mr-2');
        button.addEventListener('click', () => {
            // Handle button click (replace with your desired function)
            alert(`Button "${name}" clicked!`);
        });
        buttonContainer.appendChild(button);
    });
}

// Function to display cookies
function displayCookies(cookieType, containerId) {
    const cookieList = document.getElementById(containerId);
    const cookies = cookieType === 'localStorage' ? Object.entries(localStorage) : document.cookie.split(';');

    cookies.forEach(cookie => {
        if (cookieType === 'localStorage') {
            const [key, value] = cookie;
            if (key.startsWith('ajs_')) {
                const li = document.createElement('li');
                li.textContent = `${key}: ${value}`;
                cookieList.appendChild(li);
            }
        } else if (cookie.trim().startsWith('ajs_')) {
            const li = document.createElement('li');
            li.textContent = cookie.trim();
            cookieList.appendChild(li);
        }
    });
}

// Function to display Segment network requests (replace with actual implementation)
function displaySegmentRequests() {
    const requestDiv = document.getElementById('segment-network-requests');
    requestDiv.innerHTML = '<p>Segment network request tracking coming soon!</p>';
    // Implement logic to capture and display Segment requests here
}

// Event listener for form submission
const form = document.getElementById('myForm');
form.addEventListener('submit', updateProfile);

// Example button names
const buttonNames = ['Button 1', 'Button 2', 'Button 3'];
createButtons(buttonNames);

// Display cookies on page load
displayCookies('localStorage', 'local-storage-cookies');
displayCookies('client', 'client-cookies');

// Display Segment network requests
displaySegmentRequests();


// Function to update the layout based on sidebar widths
function updateLayout() {
    const leftSidebar = document.querySelector('.sidebar');
    const rightSidebar = document.querySelector('.sidebar-right');
    const mainContent = document.querySelector('.main');

    const leftSidebarWidth = leftSidebar.offsetWidth;
    const rightSidebarWidth = rightSidebar.offsetWidth;

    mainContent.style.marginLeft = leftSidebarWidth + 'px';
    mainContent.style.marginRight = rightSidebarWidth + 'px';
}


// Function to save form data to localStorage
function saveFormData() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
  
    for (const [key, value] of formData.entries()) {
      localStorage.setItem(key, value);
    }
  }
  
  // Function to load form data from localStorage
  function loadFormData() {
    const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input, textarea, select');
  
    inputs.forEach(input => {
      const savedValue = localStorage.getItem(input.name);
      if (savedValue !== null) {
        input.value = savedValue;
      }
    });
  }
  
  // Event listeners to save and load form data
//   const form = document.getElementById('myForm');
  form.addEventListener('submit', saveFormData); // Save on submit
  window.addEventListener('load', loadFormData); // Load on page load

// Function to handle sidebar resizing
function makeResizable(sidebar, side) {
    let initialX; 
    let initialWidth;

    const dragElement = document.createElement('div');
    dragElement.classList.add('resizer', side);
    sidebar.appendChild(dragElement);

    dragElement.addEventListener('mousedown', (e) => {
        initialX = e.clientX;
        initialWidth = sidebar.offsetWidth;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        const newWidth = initialWidth + (side === 'left' ? initialX - e.clientX : e.clientX - initialX);
        const minWidth = window.innerWidth * 0.05; // Minimum 5% width
        sidebar.style.width = Math.max(minWidth, newWidth) + 'px';
        updateLayout();
    }

    function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}

// Make sidebars resizable
makeResizable(document.querySelector('.sidebar'), 'left');
makeResizable(document.querySelector('.sidebar-right'), 'right');

// Initial layout update
updateLayout();

// Update layout on window resize
window.addEventListener('resize', updateLayout);

