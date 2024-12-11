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


// CAMPAIGN DATA : GA4 PROTOCOLS MEASURES
// GA4 DOCS : https://support.google.com/analytics/answer/11242841?hl=en#zippy=%2Cin-this-article
// GSHEET : https://docs.google.com/spreadsheets/d/1mjVdj5VtywFVOPWFvvoJywKpMBznLIiRbAgn4oHLUss/edit?usp=sharing
function generateCampaignData() {
    const campaignData = [
      {
        utm: {
          campaignId: 'xyz123',
          campaign: 'Summer Sale',
          campaignSource: 'google',
          campaignMedium: 'cpc',
          campaignTerm: 'beachwear',
          campaignContent: 'ad_variation_a',
          referrer: 'https://www.example-referring-site.com/blog/summer-fashion',
        },
        queryString: '?utm_campaign=Summer%20Sale&utm_source=google&utm_medium=cpc&utm_term=beachwear&utm_content=ad_variation_a&utm_id=xyz123&dr=https%3A%2F%2Fwww.example-referring-site.com%2Fblog%2Fsummer-fashion',
      },
      {
        utm: {
          campaignId: 'abc789',
          campaign: 'Winter Promo',
          campaignSource: 'facebook',
          campaignMedium: 'social',
          campaignTerm: 'ski%20gear',
          campaignContent: 'image_ad_1',
          referrer: 'https://www.another-referrer.net/page?someparam=value',
        },
        queryString: '?utm_campaign=Winter%20Promo&utm_source=facebook&utm_medium=social&utm_term=ski%2520gear&utm_content=image_ad_1&utm_id=abc789&dr=https%3A%2F%2Fwww.another-referrer.net%2Fpage%3Fsomeparam%3Dvalue',
      },
      {
        utm: {
          campaignId: 'efg456',
          campaign: 'Spring Collection',
          campaignSource: 'newsletter',
          campaignMedium: 'email',
          campaignTerm: '',
          campaignContent: 'header_link',
          referrer: '',
        },
        queryString: '?utm_campaign=Spring%20Collection&utm_source=newsletter&utm_medium=email&utm_content=header_link&utm_id=efg456',
      },
      {
        utm: {
          campaignId: 'hij123',
          campaign: 'Autumn Deals',
          campaignSource: 'bing',
          campaignMedium: 'cpc',
          campaignTerm: 'fall%20fashion',
          campaignContent: 'dynamic_ad_v2',
          referrer: 'https://search.yahoo.com/search?p=autumn%20clothes',
        },
        queryString: '?utm_campaign=Autumn%20Deals&utm_source=bing&utm_medium=cpc&utm_term=fall%2520fashion&utm_content=dynamic_ad_v2&utm_id=hij123&dr=https%3A%2F%2Fsearch.yahoo.com%2Fsearch%3Fp%3Dautumn%2520clothes',
      },
      {
        utm: {
          campaignId: 'klm456',
          campaign: 'Black Friday Sale',
          campaignSource: 'email_list',
          campaignMedium: 'email',
          campaignTerm: '',
          campaignContent: 'promo_banner',
          referrer: '',
        },
        queryString: '?utm_campaign=Black%20Friday%20Sale&utm_source=email_list&utm_medium=email&utm_content=promo_banner&utm_id=klm456',
      },
      {
        utm: {
          campaignId: 'nop789',
          campaign: 'Cyber Monday Deals',
          campaignSource: 'social_media',
          campaignMedium: 'instagram',
          campaignTerm: 'holiday%20gifts',
          campaignContent: 'story_swipe_up',
          referrer: 'https://www.instagram.com/my_brand/',
        },
        queryString: '?utm_campaign=Cyber%20Monday%20Deals&utm_source=social_media&utm_medium=instagram&utm_term=holiday%2520gifts&utm_content=story_swipe_up&utm_id=nop789&dr=https%3A%2F%2Fwww.instagram.com%2Fmy_brand%2F',
      },
      {
        utm: {
          campaignId: 'qrs123',
          campaign: 'New Year New You',
          campaignSource: 'affiliate',
          campaignMedium: 'referral',
          campaignTerm: '',
          campaignContent: 'blog_post_link',
          referrer: 'https://www.partner-website.com/articles/new-year-resolutions',
        },
        queryString: '?utm_campaign=New%20Year%20New%20You&utm_source=affiliate&utm_medium=referral&utm_content=blog_post_link&utm_id=qrs123&dr=https%3A%2F%2Fwww.partner-website.com%2Farticles%2Fnew-year-resolutions',
      },
      {
        utm: {
          campaignId: 'tuv456',
          campaign: 'Back to School',
          campaignSource: 'display_network',
          campaignMedium: 'banner_ad',
          campaignTerm: 'school%20supplies',
          campaignContent: 'animated_banner',
          referrer: '',
        },
        queryString: '?utm_campaign=Back%20to%20School&utm_source=display_network&utm_medium=banner_ad&utm_term=school%2520supplies&utm_content=animated_banner&utm_id=tuv456',
      },
      {
        utm: {
          campaignId: 'wxy789',
          campaign: 'Summer Flash Sale',
          campaignSource: 'google',
          campaignMedium: 'cpc',
          campaignTerm: 'summer%20deals',
          campaignContent: 'responsive_search_ad',
          referrer: 'https://www.google.com/search?q=summer+sales',
        },
        queryString: '?utm_campaign=Summer%20Flash%20Sale&utm_source=google&utm_medium=cpc&utm_term=summer%2520deals&utm_content=responsive_search_ad&utm_id=wxy789&dr=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsummer%2Bsales',
      },
      {
        utm: {
          campaignId: 'zab123',
          campaign: 'Holiday Gift Guide',
          campaignSource: 'social_media',
          campaignMedium: 'facebook',
          campaignTerm: 'christmas%20presents',
          campaignContent: 'video_ad',
          referrer: 'https://www.facebook.com/my_brand_page/',
        },
        queryString: '?utm_campaign=Holiday%20Gift%20Guide&utm_source=social_media&utm_medium=facebook&utm_term=christmas%2520presents&utm_content=video_ad&utm_id=zab123&dr=https%3A%2F%2Fwww.facebook.com%2Fmy_brand_page%2F',
      },
    ];
  
    // Generate random index to select data
    const randomIndex = Math.floor(Math.random() * campaignData.length);
    return campaignData[randomIndex];
  }
  
  function updateFormAndQueryString() {
    const data = generateCampaignData();
    const utmParams = data.utm;
  
    // Update form fields
    for (const key in utmParams) {
      const inputField = document.getElementById(key);
      if (inputField) {
        inputField.value = utmParams[key];
      }
    }
  
    // Update query string
    const queryString = data.queryString;
    const newUrl = window.location.pathname + queryString;
    window.history.pushState({}, '', newUrl); // Update URL without reloading
  
    // Generate Segment page call
    const segmentPayload = {
        type: 'page',
        name: window.document.title, // Replace with your actual page name
        properties: {
          // Add other page properties as needed
        },
        context: {
          campaign: {
            id: utmParams.campaignId,
            name: utmParams.campaign,
            source: utmParams.campaignSource,
            medium: utmParams.campaignMedium,
            term: utmParams.campaignTerm,
            content: utmParams.campaignContent,
          },
        },
      };
      
      // Output the Segment payload to the console
      console.log('Segment page call:', segmentPayload);
      // You can now send this payload to Segment using analytics.page()
    }
    
    // Add event listener to your button
    const generateButton = document.getElementById('generateButton'); // Replace 'generateButton' with your button's ID
    getElementById('getCampaign').addEventListener('click', updateFormAndQueryString);