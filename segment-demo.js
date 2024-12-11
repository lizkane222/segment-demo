// JAVASCRIPT
// import { Analytics } from '@segment/analytics-node'
// const node = new Analytics({ writeKey: 'WOIYdGFBtpCDtCHTMenBAnuTYPA9HLMM' })
console.log("JS FILE")

// EVENTS
let Identify = () => {
    analytics.identify(
        userId,
        {
           ...(firstName ? { firstName } : {}),
           ...(lastName ? { lastName } : {}),
           ...(email ? { email } : {}),
           ...(username ? { username } : {}),
           ...(phone ? { phone } : {})
         }
       )
}



// let userId = () => {analytics.user().id()}
// let anonymousId = () => {analytics.user().anonymousId()}
// let traits = () => {analytics.user().traits()}
// let groupId = () => {analytics.group().id()}
// let groupTraits = () => {analytics.group().traits()}


// Generic function to update the <span> with the result of the passed function
let updateCookie = (getValueFunc, spanId) => {
    // Check if getValueFunc is an object or a function
    let value = typeof getValueFunc === "function" ? getValueFunc() : getValueFunc;

    // If the value is an object, convert it to a readable JSON string
    if (typeof value === "object") {
        value = JSON.stringify(value, null, 2); // Pretty-print the JSON
    }

    // Update the span with the formatted value or a default message if not set
    document.getElementById(spanId).innerText = value || "not set";
};

// Function to copy text to the clipboard
function copyToClipboard(pId) {
    var text = document.getElementById(pId).innerText; // Get text content from the <p> element
    var textArea = document.createElement("textarea"); // Create a temporary textarea element
    textArea.value = text; // Set its value to the text to copy
    document.body.appendChild(textArea); // Append the textarea to the document body
    textArea.select(); // Select the text in the textarea
    document.execCommand("copy"); // Execute the copy command
    document.body.removeChild(textArea); // Remove the temporary textarea element
    // alert("Copied: " + text); // Optional: show a confirmation message
    // Show the toast message
    showToast();
}

// Function to display the toast message
function showToast() {
    var toast = document.getElementById("toast");
    toast.classList.add("show");

    // Hide the toast after 2 seconds
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}

// Bind buttons to update respective <p> tags
document.getElementById("userId-cookie-get").addEventListener("click", () => updateCookie(userId, "userId-p"));
document.getElementById("anonymousId-cookie-get").addEventListener("click", () => updateCookie(anonymousId, "anonymousId-p"));
document.getElementById("traits-cookie-get").addEventListener("click", () => updateCookie(traits, "traits-p"));
document.getElementById("groupId-cookie-get").addEventListener("click", () => updateCookie(groupId, "groupId-p"));
document.getElementById("groupTraits-cookie-get").addEventListener("click", () => updateCookie(groupTraits, "groupTraits-p"));

const getAnonymousId = () => {
    console.log("HI")
    console.log(analytics.user().anonymousId())
    return analytics.user().anonymousId()
}

let firstName
let lastName
let username
let phone
let email


// Function to update user profile
function updateProfile(event) {
    event.preventDefault(); // Prevent default form submission

    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    username = document.getElementById('username').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value;

    const profileDiv = document.getElementById('user-profile');
    profileDiv.innerHTML = `<p><strong>First Name:</strong> ${firstName}</p><p><strong>Last Name:</strong> ${lastName}</p><p><strong>Username:</strong> ${username}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p>`;
    
    
    if(!userId){
        let tempUserId = uuidv4()
        console.log('tempUserId : ',tempUserId)
        analytics.user().id(tempUserId);
    }

    Identify()
    autoUpdate()
}


// Function to clear the form and reset the traits object
const clearForm = () => {
    // Reset form fields
    document.getElementById('myForm').reset();

    // Clear the traits object using analytics.js method
    analytics.user().traits({}); // This clears all user traits

};

const checkData = () => {
    // Bind buttons to update respective <p> tags
    updateCookie(userId, "userId-p")
    updateCookie(anonymousId, "anonymousId-p")
    updateCookie(traits, "traits-p")
    updateCookie(groupId, "groupId-p")
    updateCookie(groupTraits, "groupTraits-p")
}

const resetAjsUser = () => {
    localStorage.clear()
    console.log("LocalStorage cleared");
    const cookies = document.cookie.split(";"); // Get all cookies
    for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie; // Extract cookie name
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; // Clear it
    }
    console.log("Cookies cleared");
    // reset()
    window.location.reload(true);
    // autoUpdate()
}


// ANALYTICS RESET
    // const reset = () => {
        // Step 1: Reset the analytics state
        // analytics.reset();
    
        // Step 2: Remove the existing Segment analytics script tag
        // var scriptTag = document.querySelector('script[data-global-segment-analytics-key]');
        // if (scriptTag) {
        // scriptTag.parentNode.removeChild(scriptTag);
        // }
    
        // // Step 3: Reinsert the Segment script tag to reload the snippet
        // var newScript = document.createElement('script');
        // newScript.type = 'text/javascript';
        // newScript.async = true;
        // newScript.src = 'https://cdn.segment.com/analytics.js/v1/mzFg1bcMNNrz9AsGargWg9cFrA0ddnO3/analytics.min.js';
        // newScript.setAttribute('data-global-segment-analytics-key', 'mzFg1bcMNNrz9AsGargWg9cFrA0ddnO3');
        // document.head.appendChild(newScript);
    
        // Optionally, you can call `analytics.page()` or any other method to initialize the new session
        // newScript.onload = function() {
        //     analytics.page();
        // };
        // autoUpdate()
        // window.location.reload(true);
    // }


// Add event listener to the Clear Form button
document.getElementById('clearForm').addEventListener('click', clearForm);
document.getElementById('check-data').addEventListener('click', checkData);
document.getElementById('reset-ajs-user').addEventListener('click', resetAjsUser);




// Function to create dynamic buttons
// function createButtons(buttonNames) {
//     const buttonContainer = document.getElementById('dynamic-buttons');
//     buttonNames.forEach(name => {
//         const button = document.createElement('button');
//         button.textContent = name;
//         button.classList.add('btn', 'btn-secondary', 'mr-2');
//         button.addEventListener('click', () => {
//             // Handle button click (replace with your desired function)
//             alert(`Button "${name}" clicked!`);
//         });
//         buttonContainer.appendChild(button);
//     });
// }

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
// const buttonNames = ['Button 1', 'Button 2', 'Button 3'];
// createButtons(buttonNames);


const autoUpdate = () => {
    // Display cookies on page load
    displayCookies('localStorage', 'local-storage-cookies');
    displayCookies('client', 'client-cookies');

    // Display Segment network requests
    displaySegmentRequests();    
}
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


