// JAVASCRIPT
// import { Analytics } from '@segment/analytics-node'
// const node = new Analytics({ writeKey: 'WOIYdGFBtpCDtCHTMenBAnuTYPA9HLMM' })

// import { campaignData, generateCampaignData, matchedCampaign, campaignId } from './campaignData.js';
import { campaignData } from './campaignData.js';
import { userData } from './userData.js';


// import { getUserData } from './Components/getUserData.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const generateFakerUserDataButton = document.getElementById('generateFakerUserData');
//     if (generateFakerUserDataButton) {
//         generateFakerUserDataButton.addEventListener('click', getUserData);
//     }
// });

// Fetch GA4 data from server
const updateGA4Fields = () => {
    console.log('GA4 context endpoint hit');
    fetch('/ga4Context')
    // .then(response => response.json())
    .then(response => {
        console.log('Fetch Response:', response); // Logs the full response object
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('GA4 Context:', data);
        
        // Save GA4 data as cookies
        document.cookie = `client_id=${data.client_id}; path=/`;
        document.cookie = `session_id=${data.session_id}; path=/`;
        document.cookie = `session_number=${data.session_number}; path=/`;
        
        // Display GA4 data in the DOM (optional)
        let ga4SessionId = document.getElementById('sessionId-input');
        if (ga4SessionId) {
            ga4SessionId.value = data.session_id;
            sessionId = data.session_id;
            // console.log('ga4SessionId:', ga4SessionId.value); // Debugging
            // console.log('sessionId:', sessionId); // Debugging
        }

        let ga4SessionNumber = document.getElementById('sessionNumber-input');
        if (ga4SessionNumber) {
            ga4SessionNumber.value = data.session_number;
            sessionNumber = data.session_number;
            // console.log('ga4SessionNumber:', ga4SessionNumber.value); // Debugging
            // console.log('sessionNumber:', sessionNumber); // Debugging
        }

        let ga4ClientId = document.getElementById('clientId-input');
        if (ga4ClientId) {
            ga4ClientId.value = data.client_id;
            clientId = data.client_id;
            cid = data.client_id;
            // console.log('ga4ClientId:', ga4ClientId.value); // Debugging
            // console.log('clientId:', clientId); // Debugging
            // console.log('cid:', cid); // Debugging
        }
    })
    .catch(error => {
        console.error('Error fetching GA4 context:', error);
    });
    // .catch(err => console.error('Error fetching GA4 context:', err));
};
// DOM Ready function for updateGA4Fields server call
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed.');
    updateGA4Fields();
});



// import {trackServer, identifyServer, pageServer, groupServer} from './server-events-node.js'

// import { userData } from './userData.js';
// import fakerUserData  from './users.json';

// let fakerUserData;

// fetch('./users.json')
//     .then(response => response.json())
//     .then(data => {
        // fakerUserData = data;
        // console.log('Loaded fakerUserData:', fakerUserData);
//     })
//     .catch(error => console.error('Error loading users.json:', error));

// fetch('./users.json') // Relative path for `http-server`
// .then(response => response.json())
// .then(users => {
//     // Select a random user from the array
//     const randomIndex = Math.floor(Math.random() * users.length);
//     const user = users[randomIndex];

//     // Display the random user in the DOM
//     const userItem = document.createElement('li');
//     userItem.textContent = `${user.firstName} ${user.lastName}, Username: ${user.username}, Phone: ${user.phone}, Email: ${user.email}, Address: ${user.streetAddress}, ${user.city}, ${user.state}, ${user.zipcode}`;
//     userList.appendChild(userItem);
// })
// .catch(err => console.error('Error fetching user data:', err));



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
    const payload = {
      event: event,
      properties: properties || {},
      context: { ...context, campaign },
  };
  
  if (currentSourceSelected === 'CLIENT') {
      analytics.track(
          event,
          ...(properties ? properties : {}),
          ...(context ? {...context,campaign} : {}),
          ...(callback ? callback : {})
        )
      // analytics.track(event, payload.properties, payload.context, callback);
      console.log('Client-side Track:', payload);
  } else {
      fetch('/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      }).then(response => console.log('Server-side Track:', response));
  }
}

// Spec Identify : https://segment.com/docs/connections/spec/identify/
//    The Identify method follows this format : 
//    analytics.identify([userId], [traits], [options], [callback]);
let Identify = (userId, anonymousId, traits, context, campaign, globalVariables, callback) => {
    // let globalUserId = globalVariables[userId] ? globalVariables[userId] : ''
    // let globalAnonymousId = globalVariables[anonymousId] ? globalVariables[anonymousId] : ''
    // let globalCampaign = globalVariables[campaign] ? globalVariables[campaign] : {}
    // let {usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, currentUser} = globalVariables
    console.log('IDENTIFY globalVariables : ',globalVariables);
    // let globalUserId = globalVariablesuserId
    // let globalAnonymousId = globalVariables.anonymousId
    // let usertraits = globalVariables.usertraits
    // let groupId = globalVariables.groupId
    // let groupTraits = globalVariables.groupTraits
    // let sessionId = globalVariables.sessionId
    // let sessionNumber = globalVariables.sessionNumber
    // let clientId = globalVariables.clientId
    // let cid = globalVariables.cid
    // let globalCampaign = globalVariables.campaign
    // let currentUser = globalVariables. currentUser
        // usertraits = {...usertraits, ...traits}

    currentUser = {
        userId : userId || analytics.user().id() || null, 
        anonymousId : anonymousId || analytics.user().anonymousId() || null, 
        traits : traits || usertraits || {}, 
        context: context || {}, 
        campaign : campaign || null
    }
    // console.log('IDENTIFY currentUser : ',currentUser)
    // console.log('IDENTIFY userId : ',userId)
    // console.log('IDENTIFY anonymousId : ',anonymousId)
    // console.log('IDENTIFY traits : ',traits)
    // console.log('IDENTIFY context : ',context)
    // console.log('IDENTIFY campaign : ',campaign)
    

    userList.innerHTML = '';

    const userInfo = [
        firstName || lastName ? `<span class="bold">Name: </span> ${firstName} ${lastName}` : '',
        username?`<span class="bold">Username: </span>${username}` :'',
        phone? `<span class="bold">Phone: </span>${phone}` : '',
        email?`<span class="bold">Email: </span>${email}` : '',
        street || city || state || zipcode?`<span class="bold">Address: </span> ${street}, ${city}, ${state}, ${zipcode}` : ''
    ];

    userInfo.forEach(info => {
        const userItem = document.createElement('li');
        userItem.innerHTML = info;
        userList.appendChild(userItem);
    });

    const payload = {
        userId: userId ? userId  : null,
        anonymousId: anonymousId ? anonymousId  : null,
        traits: traits,
        context: { context, campaign : campaign? campaign : null },
        globalVariables : globalVariables
    };
    console.log('payload : ', payload)

    updateGA4Fields();

    if (currentSourceSelected==='CLIENT') {
        // Send data client-side via Segment's analytics.js library
        analytics.identify(
            (payload.userId ? payload.userId : {}),
            // (payload.anonymousId ? payload.anonymousId : {}),
            (payload.traits ? payload.traits
            //   ...(traits.firstName ? { firstName : traits.firstName } : {}),
            //   ...(traits.lastName ? { lastName : traits.lastName } : {}),
            //   ...(traits.email ? { email : traits.email } : {}),
            //   ...(traits.username ? { username : traits.username } : {}),
            //   ...(traits.phone ? { phone : traits.phone } : {})
             : {}),
             payload.context ? {...payload['context'], anonymousId : payload.anonymousId} : {}
            )
    }
    else {
        // Send data to the server via Segment's Node.js library
        fetch('/identify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Server-side identify response:', data);
            if (callback) callback(data);
        })
        .catch((err) => {
            console.error('Error triggering server-side identify:', err);
            console.log(JSON.stringify(payload));
        });
    // if(callback){{
    //     callback()
    // }
    // usertraits = {...usertraits, ...traits}
    // currentUser.traits = usertraits
    }
}

// Spec Page : https://segment.com/docs/connections/spec/page/
//    The Page method follows this format : 
//    analytics.page([category], [name], [properties], [options], [callback]);
let Page = (name, category, properties, context, campaign, userId, anonymousId, callback) => {
    const payload = {
        name: name? name: null,
        category: category? category : null,
        properties: properties? properties : {},
        context: context ? {...context, campaign} : {},
        ...(userId ?  userId  : analytics.user().id() ||  ''),
        // userId : userId ? userId : analytics.user().id() ||  '',
        anonymousId : anonymousId ? anonymousId : analytics.user().anonymousId(),
  };
  console.log('PAGE PAYLOAD : ', payload)

  updateGA4Fields();
  
  if (currentSourceSelected === 'CLIENT') {
      // analytics.page(payload.name, payload.category, payload.properties, payload.context, callback);
      analytics.page(
          name,
          payload.category ? payload.category : {},
          payload.properties ? payload.properties : {},
          payload.context ? payload.context : {}
        )
      console.log('Client-side Page:', payload);
  } else {
      fetch('/page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      }).then(response => console.log('Server-side Page:', response));
  }
}

// Spec Group : https://segment.com/docs/connections/spec/group/
//    The Group method follows this format : 
//    analytics.group(groupId, [traits], [options], [callback]);
let Group = (groupId, traits, context, callback) => {
    console.log("GROUP TRAITS : ", groupTraits)
  
    const payload = {
      groupId: groupId,
      traits: traits || {},
      context: context || {},
  };
  
  if (currentSourceSelected === 'CLIENT') {
      // analytics.group(groupId, payload.traits, payload.context, callback);
      analytics.group(
          groupId,
          ...(traits ? {traits} : {}),
          ...(context ? context : {}),
          ...(callback ? callback : {})
        )
      console.log('Client-side Group:', payload);
  } else {
      fetch('/group', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      }).then(response => console.log('Server-side Group:', response));
  }
}

// Spec Alias : https://segment.com/docs/connections/spec/alias/
//    The Alias method follows this format : 
//    analytics.alias(userId, [previousId], [options], [callback]);
let Alias = (userId, previousId, context, callback) => {
    const payload = {
       userId: userId,
       previousId: previousId,
       context: context || {},
   };

   if (currentSourceSelected === 'CLIENT') {
       // analytics.alias(payload.userId, payload.previousId, payload.context, callback);
       analytics.alias(
           userId,
           previousId,
           ...(context ? context : {}),
           ...(callback ? callback : {})
          )
       console.log('Client-side Alias:', payload);
   } else {
       fetch('/alias', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(payload),
       }).then(response => console.log('Server-side Alias:', response));
   }
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

// let firstName
// let lastName
// let username
// let phone
// let street
// let city
// let state
// let zipcode
// let email


document.getElementById('sessionId-input').value = sessionId;
document.getElementById('sessionNumber-input').value = sessionNumber;
document.getElementById('clientId-input').value = clientId;

let userFormFields = {firstName, lastName, username, phone, street, city, state, zipcode, email}


// Get the toggle checkbox element
const toggleCheckbox = document.getElementById('source-selection');

// Function to handle toggle state and update global variable

document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.getElementById('source-selection'); // Ensure the element ID matches the nav HTML
    if (!toggleCheckbox) {
        console.error('Toggle checkbox not found in DOM');
        return;
    }

    const updateSourceSelected = () => {
        // Update the global variable based on the checkbox state
        currentSourceSelected = toggleCheckbox.checked ? 'CLIENT' : 'SERVER';
        console.log('currentSourceSelected:', currentSourceSelected);
    };

    // Event listener for the toggle input
    toggleCheckbox.addEventListener('change', updateSourceSelected);

    // Initialize the state on load
    updateSourceSelected();
});

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

// document.addEventListener('DOMContentLoaded', () => {
//     document.addEventListener("DOMContentLoaded", () => {
//         const externalIdMappings = ["userId", "anonymousId", "groupId", "email"];
    
//         const updateProfileAPIField = (fieldValue, targetFieldId) => {
//             const targetField = document.getElementById(targetFieldId);
//             if (targetField) {
//                 targetField.value = fieldValue;
//                 console.log(`Updated ${targetFieldId} with value: ${fieldValue}`);
//             } else {
//                 console.error(`Target field with ID ${targetFieldId} not found.`);
//             }
//         };
    
//         document.querySelectorAll(".unify-svg-icon").forEach(icon => {
//             icon.addEventListener("click", event => {
//                 const parent = event.target.closest("label, .get-cookie-btns, .form-group");
//                 const inputField = parent?.querySelector("input");
//                 const pTag = parent?.querySelector("p");
    
//                 let fieldValue = "";
//                 let inputId = "";
    
//                 if (inputField) {
//                     fieldValue = inputField.value.trim();
//                     inputId = inputField.id;
//                 } else if (pTag) {
//                     fieldValue = pTag.textContent.trim();
//                     inputId = pTag.id.replace("-p", ""); // Map `-p` IDs to input IDs
//                 }
    
//                 if (fieldValue) {
//                     if (externalIdMappings.includes(inputId)) {
//                         updateProfileAPIField(fieldValue, "externalId");
//                     } else {
//                         const queryParametersInput = document.getElementById("queryParameters");
//                         const currentParams = queryParametersInput.value.trim();
//                         const newParam = `${inputId}=${fieldValue}`;
//                         queryParametersInput.value = currentParams ? `${currentParams},${newParam}` : newParam;
//                         console.log(`Added query parameter: ${newParam}`);
//                     }
//                 } else {
//                     console.error("No valid input or p tag value found, or value is empty.");
//                 }
//             });
//         });
//     });
document.addEventListener("DOMContentLoaded", () => {
    const externalIdMappings = ["userId", "anonymousId", "groupId", "email"];

    const updateProfileAPIField = (fieldValue, targetFieldId) => {
        const targetField = document.getElementById(targetFieldId);
        if (targetField) {
            targetField.value = fieldValue;
            console.log(`Updated ${targetFieldId} with value: ${fieldValue}`);
        } else {
            console.error(`Target field with ID ${targetFieldId} not found.`);
        }
    };

    document.querySelectorAll(".unify-svg-icon").forEach(icon => {
        icon.addEventListener("click", event => {
            const parent = event.target.closest("label, .get-cookie-btns, .form-group");
            const inputField = parent?.querySelector("input");
            const pTag = parent?.querySelector("p");

            let fieldValue = "";
            let inputId = "";

            if (inputField) {
                fieldValue = inputField.value.trim();
                inputId = inputField.id;
            } else if (pTag) {
                fieldValue = pTag.textContent.trim();
                inputId = pTag.id.replace("-p", ""); // Map `-p` IDs to input IDs
            }

            if (fieldValue) {
                if (externalIdMappings.includes(inputId)) {
                    updateProfileAPIField(fieldValue, "externalId");
                } else {
                    const queryParametersInput = document.getElementById("queryParameters");
                    const currentParams = queryParametersInput.value.trim();
                    const newParam = `${inputId}=${fieldValue}`;
                    queryParametersInput.value = currentParams ? `${currentParams},${newParam}` : newParam;
                    console.log(`Added query parameter: ${newParam}`);
                }
            } else {
                console.error("No valid input or p tag value found, or value is empty.");
            }
        });
    });

    document.getElementById("userId-cookie-get").addEventListener("click", () => updateCookie(userId, "userId-p"));
    document.getElementById("userId-p").addEventListener("click", () => copyToClipboard("userId-p"));
    document.getElementById("anonymousId-cookie-get").addEventListener("click", () => updateCookie(anonymousId, "anonymousId-p"));
    document.getElementById("anonymousId-p").addEventListener("click", () => copyToClipboard("anonymousId-p"));
    document.getElementById("traits-cookie-get").addEventListener("click", () => updateCookie(usertraits, "traits-p"));
    document.getElementById("traits-p").addEventListener("click", () => copyToClipboard("traits-p"));
    document.getElementById("groupId-cookie-get").addEventListener("click", () => updateCookie(groupId, "groupId-p"));
    document.getElementById("groupId-p").addEventListener("click", () => copyToClipboard("groupId-p"));
    document.getElementById("groupTraits-cookie-get").addEventListener("click", () => updateCookie(groupTraits, "groupTraits-p"));
    document.getElementById("groupTraits-p").addEventListener("click", () => copyToClipboard("groupTraits-p"));
});



const getUserFormValues = () => {
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    username = document.getElementById('username').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value;
    street = document.getElementById('street').value;
    city = document.getElementById('city').value;
    state = document.getElementById('state').value;
    zipcode = document.getElementById('zipcode').value;

    return {firstName, lastName, username, phone, email, street, city, state, zipcode};
    // Put lines below in original function : 
    // const userFormFields = getUserFormValues() 
    // const {firstName, lastName, username, phone, email, street, city, state, zipcode} = userFormFields;
}

const getGlobalVariables = () => {
    console.log('GLOBAL userId : ', userId);
    console.log('GLOBAL anonymousId : ', anonymousId);
    console.log('GLOBAL usertraits : ', usertraits);
    usertraits = analytics.user().traits();
    console.log('GLOBAL groupId : ', groupId);
    console.log('GLOBAL groupTraits : ', groupTraits);
    console.log('GLOBAL sessionId : ', sessionId);
    console.log('GLOBAL sessionNumber : ', sessionNumber);
    console.log('GLOBAL clientId : ', clientId);
    console.log('GLOBAL cid : ', cid);
    console.log('GLOBAL campaign : ', campaign);
    console.log('GLOBAL currentUser : ', currentUser);

    return {userId, anonymousId, usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, campaign, currentUser}
    // PUT LINES BELOW IN ORIGINAL FUNCTION
    // const globalVariables = getGlobalVariables()
    // {userId, anonymousId, usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, campaign, currentUser} = globalVariables
    
}

// ------------------------------------
// START // PROFILE API REQUEST @ LEFT SIDEBAR

// THIRD ITERATION

document.addEventListener("DOMContentLoaded", () => {
    // Fetch sensitive data from the server
    fetch('/api/config')
        .then(response => response.json())
        .then(data => {
            const spaceIdInput = document.getElementById('spaceId');
            const profileAPIKeyInput = document.getElementById('profileAPIKey');
    
            if (spaceIdInput) spaceIdInput.value = data.spaceId || '';
            if (profileAPIKeyInput) profileAPIKeyInput.value = data.profileAPIKey || '';
        })
        .catch(err => {
            console.error('Error fetching config:', err);
        });

    // DOM Elements
    const spaceIdInput = document.getElementById("spaceId");
    const externalIdInput = document.getElementById("externalId");
    const queryParametersInput = document.getElementById("queryParameters");
    const addAudienceClassButton = document.getElementById("addAudienceClass");
    const addComputedTraitClassButton = document.getElementById("addComputedTraitClass");
    const sendApiRequestButton = document.getElementById("sendApiRequest");
    const queryStringDisplay = document.getElementById("queryStringDisplay");

    // Default Endpoint Template
    const defaultEndpointTemplate = "https://profiles.segment.com/v1/spaces/<space_id>/collections/";

    // Function to Update Query String Display
    const updateQueryStringDisplay = () => {
        const spaceId = spaceIdInput.value.trim() || "<space_id>";
        const externalId = externalIdInput.value.trim() || "<external_id>";
        const queryParams = new URLSearchParams();

        // Build Query Parameters
        if (queryParametersInput.value.trim()) {
            queryParametersInput.value
                .split(",")
                .forEach(param => {
                    const [key, value] = param.split("=");
                    if (key && value) queryParams.append(key.trim(), value.trim());
                });
        }

        // Construct the Full Endpoint
        const endpoint = `${defaultEndpointTemplate.replace("<space_id>", spaceId)}users/profiles/${externalId}/traits${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

        // Update Query String Display
        queryStringDisplay.value = endpoint || "No query string present.";
    };

    // Add Query Parameters for Audience Class
    addAudienceClassButton.addEventListener("click", () => {
        const currentParams = queryParametersInput.value.trim();
        queryParametersInput.value = currentParams
            ? `${currentParams},class=audience`
            : "class=audience";
        updateQueryStringDisplay();
    });

    // Add Query Parameters for Computed Trait Class
    addComputedTraitClassButton.addEventListener("click", () => {
        const currentParams = queryParametersInput.value.trim();
        queryParametersInput.value = currentParams
            ? `${currentParams},class=computed_trait`
            : "class=computed_trait";
        updateQueryStringDisplay();
    });

    // Send API Request
    sendApiRequestButton.addEventListener("click", async () => {
        const spaceId = spaceIdInput.value.trim();
        const externalId = externalIdInput.value.trim();
        const queryParams = queryParametersInput.value.trim();

        if (!spaceId || !externalId) {
            alert("Space ID and External ID are required.");
            return;
        }

        try {
            const queryString = queryParams
                ? `?${queryParametersInput.value}`
                : "";
            const endpoint = `https://profiles.segment.com/v1/spaces/${spaceId}/collections/users/profiles/${externalId}/traits${queryString}`;

            console.log("Sending API request to:", endpoint);

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer YOUR_SEGMENT_ACCESS_TOKEN`, // Replace with a valid token
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log("API Response:", data);
                alert("API Request Successful!");
            } else {
                console.error("API Error:", data);
                alert("API Request Failed!");
            }
        } catch (error) {
            console.error("Request Error:", error);
            alert("An error occurred while sending the request.");
        }
    });

    // Update query string display whenever inputs change
    [spaceIdInput, externalIdInput, queryParametersInput].forEach(input =>
        input.addEventListener("input", updateQueryStringDisplay)
    );

    // Initialize query string display
    updateQueryStringDisplay();
});

// END // PROFILE API REQUEST @ LEFT SIDEBAR
// ------------------------------------
                                    
// Function to update user profile (LEFT SIDEBAR)
function updateProfile(event, button, type) {
    event.preventDefault(); // Prevent default form submission
    let identifierType, forceType
    
    if(button==='identifyAnonymousId'){
        identifierType='anonymousId'
        console.log('ANONYMOUS IDENTIFY : no PII exist so no userId generated', )
    }
    if(button==='identifyUserId'){
        identifierType='userId'
        console.log('ANONYMOUS IDENTIFY : PII exists so generating userId', )
    }
    
    // GET CURRENT DATA FROM USER FORM
    const userFormFields = getUserFormValues() 
    let {firstName, lastName, username, phone, email, street, city, state, zipcode} = userFormFields;

    // GET CURRENT DATA FROM GLOBAL VARIABLES
    const globalVariables = getGlobalVariables()
    let {userId :userId , anonymousId :anonymousId , usertraits :usertraits , groupId :groupId , groupTraits :groupTraits , sessionId :sessionId , sessionNumber :sessionNumber , clientId :clientId , cid :cid , campaign :campaign , currentUser : currentUser} = globalVariables
    // GET CURRENT DATA FROM CAMPAIGN FORM

    if(username || phone || email || street || city || state || zipcode){
      forceType='userId'  
      console.log('FORCE TYPE : ',forceType, 'forcing userId generation')
    }
    else{
        forceType='anonymousId'
        console.log()
    }

    userList.innerHTML = '';

    const tempUserInfo = [
        `<span class="bold">Name: </span> ${firstName} ${lastName}`,
        `<span class="bold">Username: </span>${username}` ,
        `<span class="bold">Phone: </span>${phone}` ,
        `<span class="bold">Email: </span>${email}` ,
        `<span class="bold">Address: </span> ${street}, ${city}, ${state}, ${zipcode}`
    ];

    tempUserInfo.forEach(info => {
        const userItem = document.createElement('li');
        userItem.innerHTML = info;
        userList.appendChild(userItem);
    });
    
    // IF IDENTIFY:USERID IS CLICKED OR IF PII IS INCLUDED IN FORM THEN FORCE USERID GENERATION
    if(identifierType==='userId' ||  forceType==='userId'){
        if(!userId){
            let tempUserId = uuidv4()
            console.log('tempUserId : ',tempUserId)
            analytics.user().id(tempUserId);
            userId=tempUserId;
            console.log('USERID CREATED : ', analytics.user().id())
        }
    }
    let data = updateCampaignFormAndQueryString(true)

    let tempTraits = {
        firstName : (firstName ? firstName : {}),
        lastName : (lastName ? lastName : {}),
        username : (username ? username : {}),
        phone : (phone ? phone : {}),
        email : (email ? email : {}),
        street : (street ? street : {}),
        city : (city ? city : {}),
        state : (state ? state : {}),
        zipcode : (zipcode ? zipcode : {}),
        referrer : (referrer ? referrer : {}),
        sessionId : (sessionId ? sessionId : {}),
        sessionNumber : (sessionNumber ? sessionNumber : {}),
        clientId : (clientId ? clientId : {}),
        cid : (cid ? cid : {})
    }
    console.log('TEMP TRAITS : ',tempTraits)
    usertraits = tempTraits

    if(type==='identify'){
        console.log('testing currentUser', currentUser)
        Identify(
            userId || analytics.user().id() || null,
            anonymousId || analytics.user().anonymousId() || null, 
            tempTraits, 
            data.context, 
            campaign, 
            globalVariables
        )
    }

    autoUpdate()
}

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // Call the function with the button.id
//     updateProfile(event, event.submitter.id);
// });

/// Function to clear the form and reset the traits object
window.clearForm = (formId) => {
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Form with ID ${formId} not found.`);
        return;
    }

    // Reset form fields except for specific inputs
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        // Skip clearing specific inputs
        if (['sessionId', 'sessionNumber', 'clientId'].includes(input.name)) {
            // console.log(`Skipping reset for input: ${input.name}`);
            return;
        }
        input.value = ''; // Clear other inputs
    });

    // Clear additional data based on the form ID
    if (formId === 'userForm') {
        // Clear the traits object using analytics.js method
        analytics.user().traits({}); // This clears all user traits
        console.log('User form and traits reset.');
    } else if (formId === 'campaignForm') {
        // Clear localStorage and query string display for the campaign form
        inputs.forEach(input => {
            if (!['sessionId', 'sessionNumber', 'clientId'].includes(input.name)) {
                localStorage.removeItem(input.name);
            }
        });
        
        // Clear the query string display
        const queryStringDisplay = document.getElementById('querystring-display');
        if (queryStringDisplay) {
            queryStringDisplay.textContent = '';
            window.location.search = ''
        }
        console.log('Campaign form cleared, localStorage and query string display reset.');
    }
};
// document.getElementById('clearUserForm').addEventListener('click', () => clearForm('userForm'));
// document.getElementById('clearCampaignForm').addEventListener('click', () => clearForm('campaignForm'));


const checkData = () => {
    // Bind buttons to update respective <p> tags
    updateCookie(userId, "userId-p")
    updateCookie(anonymousId, "anonymousId-p")
    updateCookie(usertraits, "traits-p")
    updateCookie(groupId, "groupId-p")
    updateCookie(groupTraits, "groupTraits-p")
    autoUpdate()
}
// document.getElementById('check-data').addEventListener('click', checkData);

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

    // Reset GA4 context on the server each time reset is clicked on client
    console.log('PREVIOUS clientId : ', clientId)
    console.log('PREVIOUS cid : ', cid)
    console.log('PREVIOUS sessionId : ', sessionId)
    console.log('PREVIOUS sessionNumber : ', sessionNumber)

    fetch('/reset-ga4-context', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('GA4 Context Reset:', data);

            // Save new GA4 data as cookies
            document.cookie = `client_id=${data.client_id}; path=/`;
            document.cookie = `session_id=${data.session_id}; path=/`;
            document.cookie = `session_number=${data.session_number}; path=/`;

            // Optionally update the UI
            const sessionIdInput = document.getElementById('sessionId-input');
            const sessionNumberInput = document.getElementById('sessionNumber-input');
            const clientIdInput = document.getElementById('clientId-input');
            if (sessionIdInput) sessionIdInput.value = data.session_id;
            if (sessionNumberInput) sessionNumberInput.value = data.session_number;
            if (clientIdInput) clientIdInput.value = data.client_id;

            // Reload the page to simulate a new session
            window.location.reload();
        })
        .catch(err => console.error('Error resetting GA4 context:', err))
    updateGA4Fields();
    console.log('CURRENT clientId : ', clientId)
    console.log('CURRENT cid : ', cid)
    console.log('CURRENT sessionId : ', sessionId)
    console.log('CURRENT sessionNumber : ', sessionNumber)
}
// document.getElementById('reset-ajs-user').addEventListener('click', resetAjsUser);


// Add event listener to the Clear Form button
// document.getElementById('clearUserForm').addEventListener('click', clearForm('userForm'));
document.getElementById('check-data').addEventListener('click', checkData);
document.getElementById('reset-ajs-user').addEventListener('click', resetAjsUser);

// document.getElementById('clearCampaignForm').addEventListener('click', clearForm,'clearCampaignForm');

document.getElementById('clearUserForm').addEventListener('click', () => clearForm('userForm'));
document.getElementById('clearCampaignForm').addEventListener('click', () => clearForm('campaignForm'));


// Function to display cookies
function displayCookies(cookieType, containerId) {
    const cookieList = document.getElementById(containerId);
    const cookies = cookieType === 'localStorage' ? Object.entries(localStorage) : document.cookie.split(';');

    // Clear the existing list items
    cookieList.innerHTML = '';

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
const form = document.getElementById('userForm');
// form.addEventListener('submit', updateProfile(this));
const identifyAnonymousIdButton = document.getElementById('identifyAnonymousId');
const identifyUserIdButton = document.getElementById('identifyUserId');

// Add submit event listener to the form
form.addEventListener('submit', (event) => {
    // Call the function with the button.id
    updateProfile(event, event.submitter.id, 'identify');
});


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


// Function to save form data to localStorage
function saveFormData() {
    event.preventDefault()
    const form = document.getElementById('userForm');
    const formData = new FormData(form);
  
    for (const [key, value] of formData.entries()) {
      localStorage.setItem(key, value);
    }
}
// Event listener to save form data
// form.addEventListener('submit', saveFormData); // Save on submit


// Function to load form data from localStorage & querystring
function loadFormData() {
    let userForm = document.getElementById('userForm');
    let campaignForm = document.getElementById('campaignForm');
    const queryParams = new URLSearchParams(window.location.search);
    
    let contextTraits = {}
    // Populate User Form Fields from localStorage
    if (userForm) {
        const userFormInputs = userForm.querySelectorAll('input, textarea, select');
        userFormInputs.forEach(input => {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                contextTraits[input.name] = input.value;
                input.value = savedValue;
            }
        });
    }

    let properties = {}
    let context = {traits : contextTraits, campaign:{}}

    if (campaignForm) {
        // Populate Campaign Form Fields from localStorage or query string
        const campaignInputs = campaignForm.querySelectorAll('input, textarea, select');
        campaignInputs.forEach(input => {
            const paramValue = queryParams.get(input.name);
            if (paramValue !== null) {
                input.value = paramValue;
            }

            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                input.value = savedValue;
            }
        });
         // Update the query string and display it
         const queryStringDisplay = document.getElementById('querystring-display');
         if (queryStringDisplay) {
             const newQueryParams = new URLSearchParams();
             campaignInputs.forEach(input => {
                 if (input.value.trim() !== '') {
                     newQueryParams.set(input.name, input.value.trim());
                 }
             });
 
             // Update the URL and query string display
             const newQueryString = `?${newQueryParams.toString()}`;
             window.history.replaceState({}, '', newQueryString);
             queryStringDisplay.textContent = newQueryString || 'No query string present.';
         }
    }

    // Extract the `utm_campaign` or `utm_id` from the URL query string
    const campaignId = queryParams.get('utm_id') || queryParams.get('utm_campaign');

    // Find Matching Campaign in `campaignData`
    const matchedCampaign = campaignData.find(campaign => 
        campaign.utm.campaignId === campaignId || campaign.utm.campaign === campaignId
    );

    // Populate the `referrer` field if a matching campaign is found
    if (matchedCampaign) {
        const referrerInput = campaignForm.querySelector('input[name="referrer"]');
        if (referrerInput) {
            referrerInput.value = matchedCampaign.utm.referrer || '';
            // console.log("Referrer field set to:", referrerInput.value);
        }
    }
    if(clientId || cid){
        // console.log('clientId exists', clientId, 'cid exist', cid)
        document.getElementById('clientId-input').value = clientId
    }
    else{
        console.log('clientId does not exist')
    }
    // console.log('loadFormData document.title : ',document.title);
    // console.log('loadFormData Campaign : ','Campaign');
    // console.log('loadFormData properties : ',properties);
    // console.log('loadFormData context : ',context);
    // console.log('loadFormData campaign : ',campaign);
    userId = userId ? userId : analytics.user().id() ||  {};
    anonymousId = anonymousId ? anonymousId : analytics.user().anonymousId() ||  {};
    // console.log('loadFormData userId : ',userId);
    // console.log('loadFormData anonymousId : ',anonymousId);
    Page(document.title, 'Campaign', properties, context, campaign, userId, anonymousId)
}
/// Call `loadFormData` on DOMContentLoaded
// document.addEventListener('DOMContentLoaded', loadFormData);

// CLICK LABEL UPDATES INPUT BY GLOBAL VARIABLE VALUE
const clickLabelUpdateInputGlobalVariable = (labelId, inputId, variable) => {
    console.log(labelId, inputId, variable)
    const label = document.getElementById(labelId);
    // label.addEventListener('click', ()=> {console.log(labelId, inputId, variable)})
        // {document.getElementById(inputId).value = variable})
}

document.addEventListener('DOMContentLoaded', ()=> {
    let sessionIdInput = document.getElementById('sessionId-input');
    let sessionIdLabel = document.getElementById('sessionIdLabel');
    sessionIdLabel.addEventListener('click', () => {sessionIdInput.value = sessionId});
    
    let sessionNumberInput = document.getElementById('sessionNumber-input');
    let sessionNumberLabel = document.getElementById('sessionNumberLabel');
    sessionNumberLabel.addEventListener('click', () => {sessionNumberInput.value = sessionNumber});

    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('firstNameLabel', 'firstName-input', firstName));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('lastNameLabel', 'lastName-input', lastName));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('usernameLabel', 'username-input', username));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('phoneLabel', 'phone-input', phone));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('emailLabel', 'email-input', email));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('streetLabel', 'street-input', street));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('cityLabel', 'city-input', city));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('stateLabel', 'state-input', state));
    document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('zipcodeLabel', 'zipcode-input', zipcode));
    
});

document.addEventListener('DOMContentLoaded', clickLabelUpdateInputGlobalVariable);


// document.addEventListener('DOMContentLoaded', clickLabelUpdateInputGlobalVariable);

// Define the function
// const clickLabelUpdateInputGlobalVariable = (labelId, inputId, variable) => {
//     console.log('INSIDE clickLabelUpdateInputGlobalVariable')
//     console.log(labelId, inputId, variable)
//     const label = document.getElementById(labelId);
//     if (label) {
//         label.addEventListener('click', () => {
//             const input = document.getElementById(inputId);
//             if (input) {
//                 input.value = variable;
//                 console.log(`Updated ${inputId} with value: ${variable}`);
//             } else {
//                 console.error(`Input with ID ${inputId} not found.`);
//             }
//         });
//     } else {
//         console.error(`Label with ID ${labelId} not found.`);
//     }
// };

// // Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', () => {
//     // Call the function with relevant IDs and variables
//     clickLabelUpdateInputGlobalVariable('sessionNumber-row', 'sessionNumber-input', sessionNumber);
//     clickLabelUpdateInputGlobalVariable('clientId-row', 'clientId-input', clientId);
// });


// ------------------------------------

// Call the loadFormData function on DOM load
// document.addEventListener('DOMContentLoaded', () => {loadFormData()});
document.addEventListener('DOMContentLoaded', loadFormData);

// Event listeners to save and load form data
//   const form = document.getElementById('userForm');
form.addEventListener('submit', saveFormData); // Save on submit
  
// ------------------------------------

// START // RESIZING SIDEBARS
// since both of my sidebars, how do I prevent the resizer from exceeding 20%


function makeResizable(resizer, direction) {
    const leftSidebar = document.querySelector('#leftSidebarWrapper');
    const rightSidebar = document.querySelector('#rightSidebarWrapper');
    const sidebarLeftContent = document.querySelector("#leftSidebarContent");
    const sidebarRightContent = document.querySelector("#rightSidebarContent");

    const MAX_WIDTH = window.innerWidth * 0.2; // Maximum width constraint (20% of viewport)
    const MIN_WIDTH = 0; // Minimum width constraint
    let startX


    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent text selection
        startX = e.clientX;

        // Add active class for visual feedback
        resizer.classList.add('active');

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        if (direction === 'left') {
            // Calculate the new width for the left sidebar
            const newWidth = e.clientX;

            if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                leftSidebar.style.width = `${newWidth}px`;
                sidebarLeftContent.style.width = `${newWidth}px`;
                resizer.style.left = `${newWidth}px`; // Move resizer with sidebar

            // Adjust resizer width dynamically
            if (newWidth < 20) {
                leftSidebar.style.display = newWidth === 0 ? 'none' : 'block';
                resizer.style.width = `${Math.max(2, 20 - newWidth)}px`; // Increase resizer width as sidebar shrinks
            } else {
                resizer.style.width = `2px`; // Reset resizer width
            }

            resizer.style.left = `${newWidth}px`; // Move resizer with sidebar
                
            }
        } else if (direction === 'right') {
            // Calculate the new width for the right sidebar
            const newWidth = window.innerWidth - e.clientX;

            if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                rightSidebar.style.width = `${newWidth}px`;
                sidebarRightContent.style.width = `${newWidth}px`;
                resizer.style.right = `${newWidth}px`; // Move resizer with sidebar

                // Adjust resizer width dynamically
                if (newWidth < 20) {
                    rightSidebar.style.display = newWidth === 0 ? 'none' : 'block';
                    rightSidebar.style.maxWidth = '0px' ;
                    resizer.style.width = `${Math.max(2, 20 - newWidth)}px`; // Increase resizer width as sidebar shrinks
                } else {
                    resizer.style.width = `2px`; // Reset resizer width
                }

                resizer.style.right = `${newWidth}px`; // Move resizer with sidebar
                
            }
        }
    }

    function stopResize() {
        // Remove active class for visual feedback
        resizer.classList.remove('active');

        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }

    // Add ARIA attributes for accessibility
    resizer.setAttribute('role', 'separator');
    resizer.setAttribute('aria-orientation', 'vertical');
}

document.addEventListener('DOMContentLoaded', () => {
    const leftResizer = document.querySelector('.resizer.left');
    const rightResizer = document.querySelector('.resizer.right');
    const leftSidebar = document.querySelector('#leftSidebarWrapper');
    const rightSidebar = document.querySelector('#rightSidebarWrapper');
    const leftIcon = document.querySelector('.toggle-icon.left'); // Left sidebar icon
    const rightIcon = document.querySelector('.toggle-icon.right'); // Right sidebar icon
    const DEFAULT_WIDTH = window.innerWidth * 0.2; // 20% of viewport width

    // Make the sidebars resizable
    makeResizable(leftResizer, 'right');
    makeResizable(rightResizer, 'left');

    // const newWidth = e.clientX;

    // Add event listener to the toggle icons
    if (leftIcon) {
        leftIcon.addEventListener('click', () => {
            toggleSidebar(leftSidebar, leftIcon, rightResizer);
        });
    }

    if (rightIcon) {
        rightIcon.addEventListener('click', () => {
            toggleSidebar(rightSidebar, rightIcon, leftResizer);
        });
    }
});

// Function to toggle the visibility of the sidebar
function toggleSidebar(sidebar, icon, resizer) {
    const DEFAULT_WIDTH = window.innerWidth * 0.2; // 20% of viewport width
    
    sidebar.style.transition = 'flex-basis 0.3s ease, width 0.3s ease';
    resizer.style.transition = 'left 0.3s ease, right 0.3s ease, width 0.3s ease';
    sidebar.classList.toggle('hidden');

    if (sidebar.classList.contains('hidden')) {
        icon.style.position = 'absolute';
        icon.style.top = '0';
        if (sidebar === document.querySelector("#leftSidebarWrapper")) {
            icon.style.left = '.5em';
            icon.style.right = 'auto';
            resizer.style.left = `0px`; // Move resizer with sidebar
        } else {
            icon.style.left = 'auto';
            icon.style.right = '.5em';
            resizer.style.right = `0px`; // Move resizer with sidebar
        }
        icon.style.zIndex = '1000';
        resizer.style.width = `${Math.max(2, 20 - 0)}px`; // Increase resizer width as sidebar shrinks
            
    } else {
        icon.style.position = 'absolute';
        icon.style.top = '0';
        if (sidebar === document.querySelector("#leftSidebarWrapper")) {
            icon.style.left = '.5em';
            icon.style.right = 'auto';
            resizer.style.left = `${DEFAULT_WIDTH}px`; // Move resizer with sidebar
        } else if (sidebar === document.querySelector("#rightSidebarWrapper")) {
            icon.style.left = 'auto';
            icon.style.right = '.5em';
            resizer.style.right = `${DEFAULT_WIDTH}px`; // Move resizer with sidebar
        }
        icon.style.zIndex = '10';
        resizer.style.width = `2px`; // Reset resizer width

    }
    // Remove transition styles after the transition duration
    setTimeout(() => {
        sidebar.style.transition = 'flex-basis 0.3s ease, width 0.3s ease';
        resizer.style.transition = 'left 0.3s ease, right 0.3s ease, width 0.3s ease';
    }, 300); // Match the duration of the transition
}

// END // RESIZING SIDEBARS

// ------------------------------------

// START // PROFILE API 




// END // PROFILE API 


function generateCampaignData() {
    // Generate random index to select data
    const randomIndex = Math.floor(Math.random() * campaignData.length);
    return campaignData[randomIndex];
}


// ------------------------------------

function updateCampaignFormAndQueryString(ignore) {
    // console.log('Button clicked'); // Debug log

    const data = generateCampaignData();
    // let data = loadFormData()
    let formData = loadFormData()
    console.log('Generated Campaign Data:', data);

    const utmParams = data.utm;
    console.log(data.utm)

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

    // Display Query String
    const queryStringDisplay = document.getElementById('querystring-display');
    // if (queryStringDisplay) {
        queryStringDisplay.textContent = data.queryString;
    // }

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
    }
    console.log('Segment page call'); // Log Segment call
    let resData = {pageName : pageName, category:'', properties : properties, context : context, campaign : data, userId : userId, anonymousId : anonymousId}
    if(ignore === false){
        Page(resData)
    }
    // Page(pageName, "Campaign", properties,context)
    return resData
}
// document.getElementById('newCampaign').addEventListener('click', updateCampaignFormAndQueryString);
document.getElementById('newCampaign').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    updateCampaignFormAndQueryString();
});

// document.getElementById('useCampaign').addEventListener('click', (event) => {
//     event.preventDefault(); // Prevent form submission and page reload
//     loadFormData(); // Trigger the loadFormData function to populate the form when the button is clicked
// });


document.addEventListener('DOMContentLoaded', () => {
    // Ensure the DOM is fully loaded before accessing elements

    // Function to populate the form with random user data
    function populateFormWithUserData() {
        console.log("inside populateFormWithUserData")
        // Select a random user from the userData array
        const randomIndex = Math.floor(Math.random() * userData.length);
        const randomUser = userData[randomIndex];

        // Populate form fields with the selected user data
        document.getElementById('firstName').value = randomUser.traits.firstName || '';
        document.getElementById('lastName').value = randomUser.traits.lastName || '';
        document.getElementById('username').value = randomUser.traits.username || '';
        document.getElementById('email').value = randomUser.traits.email || '';
        document.getElementById('state').value = randomUser.traits.state || '';
        document.getElementById('zipcode').value = randomUser.traits.zipcode || '';
        // Add more fields as needed
    }
    document.getElementById('generateFakerUserData').addEventListener('click', getUserData);
});

const triggerEvent = (type) => {
    if(type ==='page'){
        console.log('Page event triggered');
        loadFormData()
    }
    if(type ==='identify'){
        console.log('Identify event triggered');
        console.log("identify button : campaignData obj",campaignData)
        // console.log("identify button : google obj", google)
        Identify(userId, anonymousId, usertraits, context)
    }
    if(type ==='track'){
        Track(userId, anonymousId, 'General Event', properties, context)
    }
    if(type ==='group'){
        Group(userId, groupId, groupTraits, context)
    }
    if(type ==='alias'){
        Alias(userId, anonymousId, context)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pageTrigger').addEventListener('click', () => triggerEvent('page'));
    document.getElementById('identifyTrigger').addEventListener('click', () => triggerEvent('identify'));
    document.getElementById('trackTrigger').addEventListener('click', () => triggerEvent('track'));
    document.getElementById('groupTrigger').addEventListener('click', () => triggerEvent('group'));
    document.getElementById('aliasTrigger').addEventListener('click', () => triggerEvent('alias'));
});

// ------------------------------------
// START : TOOLTIP

document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    let hoverTimeout;

    const showTooltip = (e) => {
        const target = e.target;
        const tooltipText = target.getAttribute('data-tooltip');
        if (tooltipText) {
            hoverTimeout = setTimeout(() => {
                tooltip.textContent = tooltipText;
                tooltip.style.left = `${e.pageX + 10}px`;
                tooltip.style.top = `${e.pageY + 10}px`;
                tooltip.classList.add('show');
            }, 2000); // Delay of 2 seconds
        }
    };

    const moveTooltip = (e) => {
        if (tooltip.classList.contains('show')) {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        }
    };

    const hideTooltip = () => {
        clearTimeout(hoverTimeout); // Clear timeout to prevent tooltip from showing
        tooltip.classList.remove('show');
    };

    document.body.addEventListener('mouseover', showTooltip);
    document.body.addEventListener('mousemove', moveTooltip);
    document.body.addEventListener('mouseout', hideTooltip);
});

// END : TOOLTIP
// ------------------------------------