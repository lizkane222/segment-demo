// JAVASCRIPT
// import { Analytics } from '@segment/analytics-node'
// const node = new Analytics({ writeKey: 'WOIYdGFBtpCDtCHTMenBAnuTYPA9HLMM' })

// import { campaignData, generateCampaignData, matchedCampaign, campaignId } from './campaignData.js';
import { campaignData } from './campaignData.js';
// import { v4 as uuidv4 } from 'uuid';

// const uuid = uuidv4();
// console.log(uuid);



console.log("JS FILE")

// ------------------------------------

// START // SEGMENT'S ANALYTICS.JS EVENTS : SPECS & FORMATS

// Spec Track : https://segment.com/docs/connections/spec/track/
//    The Track method follows this format :
//    analytics.track(event, [properties], [options], [callback]);
let Track = (event, properties, context, callback) => {
  analytics.page(
    event,
    ...(properties ? properties : {}),
    ...(context ? {...context,campaign} : {}),
    ...(callback ? callback : {})
  )
}

// Spec Identify : https://segment.com/docs/connections/spec/identify/
//    The Identify method follows this format : 
//    analytics.identify([userId], [traits], [options], [callback]);
let Identify = (userId, traits, context, callback) => {
    // console.log('IDENTIFY TRAITS ',traits)
    // console.log('IDENTIFY CONTEXT',context)
    analytics.identify(
        (userId ? userId : {}),
        (traits ? {
          ...usertraits,
          ...traits
        //   ...(traits.firstName ? { firstName : traits.firstName } : {}),
        //   ...(traits.lastName ? { lastName : traits.lastName } : {}),
        //   ...(traits.email ? { email : traits.email } : {}),
        //   ...(traits.username ? { username : traits.username } : {}),
        //   ...(traits.phone ? { phone : traits.phone } : {})
        } : {}),
        context || undefined,
        callback || undefined
       )
}

// Spec Page : https://segment.com/docs/connections/spec/page/
//    The Page method follows this format : 
//    analytics.page([category], [name], [properties], [options], [callback]);
let Page = (name, category, properties, context, callback) => {
  analytics.page(
    name,
    ...(category ? category : {}),
    ...(properties ? properties : {}),
    ...(context ? {...context,campaign} : {}),
    ...(callback ? callback : {})
  )
}

// Spec Group : https://segment.com/docs/connections/spec/group/
//    The Group method follows this format : 
//    analytics.group(groupId, [traits], [options], [callback]);
let Group = (groupId, traits, context, callback) => {
  analytics.group(
    groupId,
    ...(traits ? {traits} : {}),
    ...(context ? context : {}),
    ...(callback ? callback : {})
  )
  console.log("GROUP TRAITS : ", groupTraits)
}

// Spec Alias : https://segment.com/docs/connections/spec/alias/
//    The Alias method follows this format : 
//    analytics.alias(userId, [previousId], [options], [callback]);
let Alias = (userId, previousId, context, callback) => {
  analytics.alias(
      userId,
      previousId,
      ...(context ? context : {}),
      ...(callback ? callback : {})
     )
}

// END // SEGMENT'S ANALYTICS.JS EVENTS

// ------------------------------------

// START // CLIENT-SIDE AJS COOKIE METHODS
//  https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/cookie-validity-update/#client-side-cookie-methods-get-set-clear
//    userId = analytics.user().id();
//    anonymousId =analytics.user().anonymousId();
//    traits =analytics.user().traits();
//    groupId =analytics.group().id();
//    groupTraits =analytics.group().traits();
// END // CLIENT-SIDE AJS COOKIE METHODS

// ------------------------------------

// START // GLOBAL VARIABLES

let firstName
let lastName
let username
let phone
let email

  // GLOBAL VARIABLES FOUND IN INDEX.HTML FILE'S <HEAD>
  // let userId
  // let anonymousId
  // let traits
  // let groupId
  // let groupTraits
  // let sessionId
  // let sessionNumber
  // let clientId
  // let cid

// START // GLOBAL VARIABLES


// ------------------------------------

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
document.getElementById("traits-cookie-get").addEventListener("click", () => updateCookie(usertraits, "traits-p"));
document.getElementById("groupId-cookie-get").addEventListener("click", () => updateCookie(groupId, "groupId-p"));
document.getElementById("groupTraits-cookie-get").addEventListener("click", () => updateCookie(groupTraits, "groupTraits-p"));

const getAnonymousId = () => {
    console.log("HI")
    console.log(analytics.user().anonymousId())
    return analytics.user().anonymousId()
}



// Function to update user profile (LEFT SIDEBAR)
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
        console.log('USERID CREATED : ', analytics.user().id())
    }
    let data = updateFormAndQueryString()

    let traits = {
        firstName : firstName,
        lastName : lastName,
        username : username,
        phone : phone,
        email : email,
        ...(sessionId ? { sessionId } : {}),
        ...(sessionNumber ? { sessionNumber } : {}),
        ...(clientId ? { clientId } : {})
    }


    Identify(traits, data.context)
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
    updateCookie(usertraits, "traits-p")
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

// Find the matching campaign from the campaignData array
const matchedCampaign = campaignData.find(campaign => 
  campaign.utm.campaignId === campaign.campaignId || campaign.utm.campaign === campaign.campaignId
);

// Function to load form data from localStorage & querystring
function loadFormData() {
  // Select the form and its input fields
  const form = document.getElementById('myForm');
  const inputs = form.querySelectorAll('input, textarea, select');
  
  // Populate from localStorage
  inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.name);
    if (savedValue !== null) {
      input.value = savedValue;
    }
  });
  
  // Select the campaign fields form
  const campaignForm = document.getElementById('campaign-fields');
  const campaignInputs = campaignForm.querySelectorAll('input, textarea, select');

  // Populate from localStorage (for campaign form fields)
  campaignInputs.forEach(input => {
      const savedValue = localStorage.getItem(input.name);
      if (savedValue !== null) {
          input.value = savedValue;
      }
  });

  // Populate from query string (for campaign form fields)
  const queryParams = new URLSearchParams(window.location.search);
  campaignInputs.forEach(input => {
      const paramValue = queryParams.get(input.name);
      if (paramValue !== null) {
          input.value = paramValue;
      }
  });

  // Function to display the entire query string in the #querystring-display div
  const queryStringDisplay = document.getElementById('querystring-display');
  queryStringDisplay.textContent = window.location.search; // Display the entire query string

  // // Extract the `utm_campaign` or `utm_id` from the URL query string
  const campaignId = queryParams.get('utm_id') || queryParams.get('utm_campaign');


  // If a matching campaign is found, update the referrer field
  if (matchedCampaign) {
      const referrerInput = campaignForm.querySelector('input[name="referrer"]');
      if (referrerInput) {
          referrerInput.value = matchedCampaign.utm.referrer; // Populate the referrer with the matching campaign data
      }
  }

  // Function to display the query string in the display area
  function displayQueryString() {
      const queryStringDisplay = document.getElementById('querystring-display');
      queryStringDisplay.textContent = window.location.search; // Display the entire query string
  }

  // Call the functions after the page loads
  document.addEventListener('DOMContentLoaded', () => {
      loadFormData();
      displayQueryString();
  });
}

// Event listener for the "Use Campaign Data" button
document.getElementById('useCampaign').addEventListener('click', () => {
    loadFormData();  // Trigger the loadFormData function to populate the form when the button is clicked
});

// Call the loadFormData function on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadFormData();
});

// Event listeners to save and load form data
//   const form = document.getElementById('myForm');
form.addEventListener('submit', saveFormData); // Save on submit
// window.addEventListener('load', loadFormData); // Load on page load
  
// ------------------------------------

// START // RESIZING SIDEBARS

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

// START // RESIZING SIDEBARS

function generateCampaignData() {
  // Generate random index to select data
  const randomIndex = Math.floor(Math.random() * campaignData.length);
  return campaignData[randomIndex];
}



// ------------------------------------

function updateFormAndQueryString() {
    console.log('Button clicked'); // Debug log

    const data = generateCampaignData();
    console.log('Generated Campaign Data:', data);

    const utmParams = data.utm;

    // Update form fields
    for (const key in utmParams) {
        const inputField = document.getElementById(`${key}-input`); // Match IDs
        if (inputField) {
            inputField.value = utmParams[key];
        }
    }

    // Update query string
    const queryString = data.queryString;
    const newUrl = window.location.pathname + queryString;
    window.history.pushState({}, '', newUrl); // Update URL without reload


    // If a matching campaign is found, update the referrer field
    let referrer
    if (matchedCampaign) {
        const referrerInput = campaignForm.querySelector('input[name="referrer"]');
        if (referrerInput) {
            referrer = matchedCampaign.utm.referrer; 
            referrerInput.value = matchedCampaign.utm.referrer; // Populate the referrer with the matching campaign data
        }
    }


    // Generate Segment page call

    let pageName = window.document.title
    let context = {
        campaign: {
        id: utmParams.campaignId,
        name: utmParams.campaign,
        source: utmParams.campaignSource,
        medium: utmParams.campaignMedium,
        term: utmParams.campaignTerm,
        content: utmParams.campaignContent,
        },
        page : {
            referrer : referrer
        },
        google : {
        // referrer: utmParams.referrer,
        ...(referrer ? referrer : {}),
        ...(sessionId ? { sessionId } : {}),
        ...(sessionNumber ? { sessionNumber } : {}),
        ...(clientId ? { cid } : {})
        }
    }
    let properties = {
        campaignId: utmParams.campaignId,
        campaign: utmParams.campaign,
        campaignSource: utmParams.campaignSource,
        campaignMedium: utmParams.campaignMedium,
        campaignTerm: utmParams.campaignTerm,
        campaignContent: utmParams.campaignContent,
        referrer: utmParams.referrer,
        ...(sessionId ? { sessionId } : {}),
        ...(sessionNumber ? { sessionNumber } : {}),
        ...(clientId ? { cid } : {})
        // sessionId: sessionId,
        // sessionNumber: sessionNumber,
        // client_id: cid
    }
    // console.log('Segment page call:', segmentPayload); // Log Segment call
    Page = ({name : pageName, category : "Campaign", properties : properties, context : context} ) 
    let resData = {pageName : pageName, context : context, properties : properties, campaignData : data}
    return resData
}
document.getElementById('newCampaign').addEventListener('click', updateFormAndQueryString);






  