// JAVASCRIPT

// import { campaignData, generateNewCampaignData, matchedCampaign, campaignId } from './campaignData.js';
// import { btoa } from "abab";
import { campaignData } from './campaignData.js';
import { userData } from './userData.js';
import { surfacePayload } from './middleware.js';


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

        // Add data to the query string
        const url = new URL(window.location);
        url.searchParams.set('client_id', data.client_id);
        url.searchParams.set('session_id', data.session_id);
        url.searchParams.set('session_number', data.session_number);
        window.history.replaceState({}, '', url.toString()); // Update the URL without reloading

        return data;
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



// START // NETWORK REQUESTS : SERVER-SIDE TRACKING
document.addEventListener("DOMContentLoaded", () => {
    // Function to toggle between hidden and shown states
    const toggleResponseState = (responseItem) => {
        const isHidden = responseItem.classList.contains("responseHidden");
        const data = JSON.parse(responseItem.getAttribute("data-response"));

        if (isHidden) {
            // Show the full response
            responseItem.innerHTML = `
                <p class="event-response"><b>${data.type} Event:</b> <span>Status: ${data.status}</span></p>
                <p><b>Message:</b> ${data.message}</p>
                <p><b>Payload:</b> <pre>${JSON.stringify(data.payload, null, 2)}</pre></p>
            `;
            responseItem.classList.remove("responseHidden");
            responseItem.classList.add("responseShown");
        } else {
            // Show only the summary
            responseItem.innerHTML = `
                <p class="event-response"><b>${data.type} Event:</b> <span>Status: ${data.status}</span></p>
            `;
            responseItem.classList.remove("responseShown");
            responseItem.classList.add("responseHidden");
        }
    };

    // Attach event listeners to dynamically added response items
    const attachSegmentEventResponsesListeners = () => {
        const responseItems = document.querySelectorAll(".segment-response-item.responseHidden");
        responseItems.forEach((response) => {
            response.addEventListener("click", () => {
                toggleResponseState(response);
            });
        });
    };

    // Observe dynamically added response items and attach event listeners
    const observeDynamicResponses = () => {
        const observer = new MutationObserver(() => {
            attachSegmentEventResponsesListeners();
        });

        observer.observe(document.getElementById("segment-responses"), {
            childList: true,
            subtree: true,
        });
    };

    attachSegmentEventResponsesListeners();
    observeDynamicResponses();
});

// Add responses to the DOM dynamically
const renderResponse = (type, data) => {
    const responseContainer = document.getElementById("segment-responses");
    if (!responseContainer) return;

    const responseItem = document.createElement("div");
    responseItem.className = "segment-response-item responseHidden";
    responseItem.setAttribute(
        "data-response",
        JSON.stringify({
            type,
            status: data.status,
            message: data.message,
            payload: data.payload,
        })
    );

    // Initially render the hidden state
    responseItem.innerHTML = `
        <p><b>${type} Event:</b> <span>Status: ${data.status}</span></p>
    `;

    // Optional: Add styling or interactivity
    responseItem.style.border = "1px solid #ccc";
    responseItem.style.padding = "10px";
    responseItem.style.marginBottom = "10px";

    responseContainer.appendChild(responseItem);
};
// END // NETWORK REQUESTS : SERVER-SIDE TRACKING


// document.addEventListener("DOMContentLoaded", () => {
//     // Function to toggle between hidden and shown states
//     const toggleResponseState = (responseItem) => {
//         const isHidden = responseItem.classList.contains("responseHidden");

//         if (isHidden) {
//             // Show the full response
//             const data = JSON.parse(responseItem.getAttribute("data-response"));
//             responseItem.innerHTML = `
//                 <p class="event-response"><b>${type} Event:</b> <span>Status: ${data.status}</span></p>
//                 <p><b>Message:</b> ${data.message}</p>
//                 <p><b>Payload:</b> <pre>${JSON.stringify(data.payload, null, 2)}</pre></p>
//             `;
//             responseItem.classList.remove("responseHidden");
//             responseItem.classList.add("responseShown");
//         } else {
//             // Show only the summary
//             const data = JSON.parse(responseItem.getAttribute("data-response"));
//             responseItem.innerHTML = `
//                 <p class="event-response"><b>${type} Event:</b> <span>Status: ${data.status}</span></p>
//             `;
//                 // <p><b>${data.type} Event:</b> <span>Status: ${data.status}</span></p>
//             responseItem.classList.remove("responseShown");
//             responseItem.classList.add("responseHidden");
//         }
//     };

//     // Attach event listeners to dynamically added response items
//     const attachSegmentEventResponsesListeners = () => {
//         const responseItems = document.querySelectorAll(".segment-response-item.responseHidden");
//         responseItems.forEach((response) => {
//             response.addEventListener("click", () => {
//                 toggleResponseState(response);
//             });
//         });
//     };

//     // Observe dynamically added response items and attach event listeners
//     const observeDynamicResponses = () => {
//         const observer = new MutationObserver(() => {
//             attachSegmentEventResponsesListeners();
//         });

//         observer.observe(document.getElementById("segment-responses"), {
//             childList: true,
//             subtree: true,
//         });
//     };

//     attachSegmentEventResponsesListeners();
//     observeDynamicResponses();
// });

// // Add responses to the DOM dynamically
// const renderResponse = (type, data) => {
//     const responseContainer = document.getElementById("segment-responses");
//     if (!responseContainer) return;

//     const responseItem = document.createElement("div");
//     responseItem.className = "segment-response-item responseHidden";
//     responseItem.setAttribute(
//         "data-response",
//         JSON.stringify({
//             type,
//             status: data.status,
//             message: data.message,
//             payload: data.payload,
//         })
//     );

//     // Initially render the hidden state
//     responseItem.innerHTML = `
//         <p><b>${type} Event:</b> <span>Status: ${data.status}</span></p>
//     `;

//     // Optional: Add styling or interactivity
//     responseItem.style.border = "1px solid #ccc";
//     responseItem.style.padding = "10px";
//     responseItem.style.marginBottom = "10px";

//     responseContainer.appendChild(responseItem);
// };



// START // SEGMENT'S ANALYTICS.JS EVENTS : SPECS & FORMATS

// Spec Track : https://segment.com/docs/connections/spec/track/
//    The Track method follows this format :
//    analytics.track(event, [properties], [options], [callback]);
let Track = async ({event, properties, context, anonymousId, userId, callback}) => {
    // console.log('@Track - anonymousId : ', event.anonymousId)
    // console.log('@TRACK param event : ',event)
    // console.log('@TRACK params : ', 'event : ', event, 'properties : ', event.properties, 'context : ', event.context, 'anonymousId : ', event.anonymousId, 'userId : ', event.userId)  
    // let eventName = event.event
    // let eventProperties = event.properties
    // let eventContext = event.context
    // let eventAnonymousId = event.anonymousId
    // let eventUserId = event.userId

    //   1/21 ADDED LINE BELOW
    let campaignData = await sendCampaignServerSide()
    //   1/21 ADDED LINE BELOW
    let ga4Data = await updateGA4Fields()

    const pageData = {
        path : window.location.pathname,
        referrer : document.getElementById('referrer-input').value,
        search : window.location.search,
        title : document.title,
        url : window.location.href
    }
    // console.log('pageData : ', pageData)    
    const payload = {
      event: event,
      properties : properties ? properties : {},
      page : pageData,
      anonymousId : anonymousId ? anonymousId : analytics.user().anonymousId(),
    //   1/21 ADDED LINE BELOW
      context : { campaign:campaignData, page : pageData, google:ga4Data} || {},
    //   context : context ? context : {},
  };
  console.log(`Initiating Track Event on ${currentSourceSelected}`)
  
  if (currentSourceSelected === 'CLIENT') {
      analytics.track(payload)
      // analytics.track(event, payload.properties, payload.context, callback);
      console.log('Client-side Track:', payload);
  } else {
      console.log('Server-side Track:', payload);
      fetch('/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      })
    //   .then(response => console.log('Server-side Track:', response));
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status on Server-side Track: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Server-side Track response:', data);
        if (callback) callback(data);

        renderResponse('Track', data); // Render the response

    })
    .catch((err) => {
        console.error('Error triggering server-side Track:', err);
        console.log(JSON.stringify(payload));
    });
  }
}

// Spec Identify : https://segment.com/docs/connections/spec/identify/
//    The Identify method follows this format : 
//    analytics.identify([userId], [traits], [options], [callback]);
let Identify = async (userId, anonymousId, traits, context, campaign, globalVariables, callback) => {
    const pageData = {
        path : window.location.pathname,
        referrer : context.referrer,
        search : window.location.search,
        title : document.title,
        url : window.location.href
    }

    let campaignData = await sendCampaignServerSide()
    // console.log('campaignData : ', campaignData)

    // let {usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, currentUser} = globalVariables
    // console.log('IDENTIFY globalVariables : ',globalVariables);
    // let globalUserId = globalVariables.userId
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

    console.log('!!! IDENTIFY !!! userId : ', userId)
    // console.log('!!! IDENTIFY !!! anonymousId : ', anonymousId)

    currentUser = {
        userId : userId ? userId : analytics.user().id() || null, 
        anonymousId : anonymousId ? analytics.user().anonymousId() : anonymousId || null, 
        traits : traits? traits : usertraits || {}, 
        context: context || {}, 
        campaign : campaign || null
    }
    console.log('IDENTIFY currentUser : ',currentUser)
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
        userId: currentUser.userId ? currentUser.userId  : userId || null,
        anonymousId: currentUser.anonymousId ? currentUser.anonymousId  : anonymousId || null,
        traits: currentUser.traits ? currentUser.traits : traits || null,
        context: { ...context, campaign : campaignData? campaignData : null , page : pageData},
        globalVariables : globalVariables,
        page : pageData
    };
    console.log('IDENTIFY PAYLOAD (SERVER) : ', payload)
    console.log('IDENTIFY PAYLOAD (SERVER) context : ', payload.context)


    // updateGA4Fields();

    if (currentSourceSelected==='CLIENT') {
        // Send data client-side via Segment's analytics.js library
        analytics.identify(
            (payload.userId ? payload.userId : {}),
            (payload.traits ? payload.traits
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
            renderResponse('Identify', data); // Render the response
            if (callback) callback(data);
        })
        .catch((err) => {
            console.error('Error triggering server-side identify:', err);
            console.log(JSON.stringify(payload));
        });
    }
}

// Spec Page : https://segment.com/docs/connections/spec/page/
//    The Page method follows this format : 
//    analytics.page([category], [name], [properties], [options], [callback]);
let Page = async (name, category, properties, context, campaign, userId, anonymousId, callback) => {
    //   1/21 ADDED LINE BELOW
    let campaignData = await sendCampaignServerSide()
    //   1/21 ADDED LINE BELOW
    let ga4Data = await updateGA4Fields()
    
    const pageData = {
        path : window.location.pathname,
        referrer : context.referrer,
        search : window.location.search,
        title : document.title,
        url : window.location.href
    }

    const payload = {
        name: name? name: null,
        category: category? category : null,
        properties: properties? properties : {},
        //   1/21 ADDED LINE BELOW
        context : { campaign:campaignData, page:pageData, google:ga4Data, traits:context.traits} || {},
        // PREVIOUSLY before : //   1/21 ADDED LINE BELOW
        // context: context ? {traits : context.traits, campaign : context.campaign, page : pageData} : {},
        ...(userId ?  userId  : analytics.user().id() ||  ''),
        // userId : userId ? userId : analytics.user().id() ||  '',
        anonymousId : anonymousId ? anonymousId : analytics.user().anonymousId() || '',
  };
  console.log('PAGE PAYLOAD : ', payload)

//   updateGA4Fields();
  
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
      })
    //   .then(response => console.log('Server-side Page:', response));
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Server-side Page response:', data);
        renderResponse('Page', data); // Render the response
        if (callback) callback(data);
    })
    .catch((err) => {
        console.error('Error triggering server-side Page:', err);
    });
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
      })
    //   .then(response => console.log('Server-side Group:', response));
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Server-side Group response:', data);
        renderResponse('Group', data); // Render the response
        if (callback) callback(data);
    })
    .catch((err) => {
        console.error('Error triggering server-side Group:', err);
    });
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
       })
        // .then(response => console.log('Server-side Alias:', response));
        .then((data) => {
            console.log('Server-side Alias response:', data);
            renderResponse('Alias', data); // Render the response
            if (callback) callback(data);
        })
        .catch((err) => {
            console.error('Error triggering server-side Alias:', err);
        });
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

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('sessionId-input').value = sessionId;
//     document.getElementById('sessionNumber-input').value = sessionNumber;
//     document.getElementById('clientId-input').value = clientId;
// })
let userFormFields = {firstName, lastName, username, phone, street, city, state, zipcode, email}


// Get the toggle checkbox element
const toggleCheckbox = document.getElementById('source-selection');

// analytics.ready(() => {
    
    // campaign = {
    //     utm_id:document.getElementById('campaignId'),
    //     utm_campaign: document.getElementById('campaign'),
    //     utm_source: document.getElementById('campaignSource'),
    //     utm_medium: document.getElementById('campaignMedium'),
    //     utm_term: document.getElementById('campaignTerm'),
    //     utm_content : document.getElementById('campaignContent'),
    // }
    // referrer = document.getElementById('referrer')
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('campaignId')
//     document.getElementById('campaign')
//     document.getElementById('campaignSource')
//     document.getElementById('campaignMedium')
//     document.getElementById('campaignTerm')
//     document.getElementById('campaignContent')
//     document.getElementById('referrer')
//     let data = getCampaignFormValues()
    
//     Track('campaign_details',{clientId, sessionId, sessionNumber, campaign : data.campaign, referrer : data.referrer, anonymousId}, {campaign : data.campaign, referrer : data.referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId)
// })



// Function to handle toggle state and update global variable
analytics.ready(() => {
// document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.getElementById('source-selection'); // Ensure the element ID matches the nav HTML
    if (!toggleCheckbox) {
        console.error('Toggle checkbox not found in DOM');
        return;
    }

    const updateSourceSelected = () => {
        // Update the global variable based on the checkbox state
        currentSourceSelected = toggleCheckbox.checked ? 'CLIENT' : 'SERVER';
        console.log('currentSourceSelected:', currentSourceSelected);
        
        // Persist the current state in localStorage
        localStorage.setItem('currentSourceSelected', currentSourceSelected);
    };

    // Load the persisted state from localStorage
    const savedSourceSelected = localStorage.getItem('currentSourceSelected');
    if (savedSourceSelected) {
        toggleCheckbox.checked = savedSourceSelected === 'CLIENT';
    }

    // Event listener for the toggle input
    toggleCheckbox.addEventListener('change', updateSourceSelected);

    // Initialize the state on load
    updateSourceSelected();
// });
})

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


// ------------------------------------

// START // TRACK EVENT : CAMPAIGN_DETAILS EVENT

// Refactored getCampaignFormValues function

// analytics.ready(() => {
//     // const getCampaignFormValues = async () => {
//     //     const campaign = {
//     //         utm_id: document.getElementById('campaignId-input')?.value || '',
//     //         utm_campaign: document.getElementById('campaign-input')?.value || '',
//     //         utm_source: document.getElementById('campaignSource-input')?.value || '',
//     //         utm_medium: document.getElementById('campaignMedium-input')?.value || '',
//     //         utm_term: document.getElementById('campaignTerm-input')?.value || '',
//     //         utm_content: document.getElementById('campaignContent-input')?.value || '',
//     //     };

//     //     const referrer = document.getElementById('referrer-input')?.value || '';
//     //     console.log('getCampaignFormValues campaign : ', { ...campaign, referrer, campaign });
//     //     return { ...campaign, referrer, campaign };
//     // };

//     // document.addEventListener('DOMContentLoaded', async () => {
//     document.addEventListener('DOMContentLoaded',  () => {
      
//         // const triggerDetails = async () => {
//         const triggerDetails = () => {
//             // let data = await getCampaignFormValues()
//             // let data =  getCampaignFormValues()
//             // console.log('getCampaignFormValues data : ', data)
            
//             // if(data){
//                 // console.log('getCampaignFormValues IF data.campaign : ', data.campaign)
//                 console.log('getCampaignFormValues IF data.campaign : ', campaign)
//                 try{
//                     Track('campaign_details',{clientId, sessionId, sessionNumber, campaign : campaign, referrer : referrer, anonymousId}, {campaign : {...campaign}, referrer : referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId)
//                     // Track('campaign_details',{clientId, sessionId, sessionNumber, campaign : data.campaign, referrer : data.referrer, anonymousId}, {campaign : {...data.campaign}, referrer : data.referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId)
//                 } catch (error) {console.log('TRACK ERROR : ',error)}
//             // }
//           }
//           triggerDetails() 
//     })
// })


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Wait for all fields to become available
//         await waitForFields([
//             'campaignId-input',
//             'campaign-input',
//             'campaignSource-input',
//             'campaignMedium-input',
//             'campaignTerm-input',
//             'campaignContent-input',
//             'referrer-input'
//         ]);

//         // Run getCampaignFormValues once fields are available
//         const data = await getCampaignFormValues();

//         // Run Track once data is available
//         Track(
//             'campaign_details',
//             {
//                 clientId,
//                 sessionId,
//                 sessionNumber,
//                 campaign: data.campaign,
//                 referrer: data.referrer,
//                 anonymousId
//             },
//             {
//                 campaign: data.campaign,
//                 referrer: data.referrer,
//                 google: { clientId, sessionId, sessionNumber }
//             },
//             anonymousId
//         );
//     } catch (error) {
//         console.error('Error processing campaign form values:', error);
//     }
// });

// // Utility to wait for all required fields to be available in the DOM
// const waitForFields = async (fieldIds, timeout = 5000) => {
//     const pollInterval = 100; // Check every 100ms
//     const maxChecks = timeout / pollInterval;

//     for (let i = 0; i < maxChecks; i++) {
//         const allFieldsAvailable = fieldIds.every(id => document.getElementById(id));
//         if (allFieldsAvailable) {
//             return true; // All fields are available
//         }
//         await new Promise(resolve => setTimeout(resolve, pollInterval));
//     }
//     throw new Error('Timeout waiting for fields to be available');
// };




// END // TRACK CAMPAIGN DETAILS EVENT


// ------------------------------------



// Generic function to update the <span> with the result of the passed function
// const updateCookie = async (getValueFunc, spanId) => {
//     return new Promise((resolve, reject) => {
//         try {
//             // Check if getValueFunc is an object or a function
//             let value = typeof getValueFunc === "function" ? getValueFunc() : getValueFunc;

//             // If the value is an object, convert it to a readable JSON string
//             if (typeof value === "object") {
//                 value = JSON.stringify(value, null, 2); // Pretty-print the JSON
//             }

//             // Update the span with the formatted value or a default message if not set
//             const spanElement = document.getElementById(spanId);
//             if (spanElement) {
//                 spanElement.innerText = value || "not set";
//                 resolve(value); // Resolve with the value
//             } else {
//                 reject(`Element with ID ${spanId} not found.`);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let updateCookie = (getValueFunc, spanId) => {
    // Check if getValueFunc is an object or a function
    let value = typeof getValueFunc === "function" ? getValueFunc() : getValueFunc;

    // If the value is an object, convert it to a readable JSON string
    if (typeof value === "object") {
        value = JSON.stringify(value, null, 2); // Pretty-print the JSON
    }

    // Update the span with the formatted value or a default message if not set
    document.getElementById(spanId).innerText = value || "not set";
    return value;
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
function showToast(responseType, responseData, color) {
    var toast = document.getElementById("toast");
    // ADD LINE BREAK TO TOAST MESSAGE
    toast.innerText = responseType + responseData || "Copied to clipboard!";
    toast.classList.add("show");
    // toast.classList.add("show");
    toast.style.backgroundColor = color || "green";
    
    // Hide the toast after 2 seconds
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}



// START : PROFILE API 

document.addEventListener("DOMContentLoaded", () => {
    // Field Mappings
    const fieldMappings = {
        "unify-i-userId": { field: "externalId", name: "user_id", spanId: "userId-p", getValue: () => userId },
        "unify-i-anonymousId": { field: "externalId", name: "anonymous_id", spanId: "anonymousId-p", getValue: () => anonymousId },
        // resolve unify-i-traits obj to queryParameters field with proper QUERYSTRING syntax
        "unify-i-traits": { field: "queryParameters", name: "traits", spanId: "traits-p", getValue: () => usertraits },
        "unify-i-groupTraits": { field: "externalId", name: "group_traits", spanId: "groupTraits-p", getValue: () => groupTraits },
        "unify-i-groupId": { field: "externalId", name: "groupId", spanId: "groupId-p", getValue: () => groupId },
        "unify-i-firstName": { field: "queryParameters", name: "firstName" },
        "unify-i-lastName": { field: "queryParameters", name: "lastName" },
        "unify-i-username": { field: "queryParameters", name: "username" },
        "unify-i-phone": { field: "queryParameters", name: "phone" },
        "unify-i-email": { field: "externalId", name: "email" },
        "unify-i-street": { field: "queryParameters", name: "street" },
        "unify-i-city": { field: "queryParameters", name: "city" },
        "unify-i-state": { field: "queryParameters", name: "state" },
        "unify-i-zipcode": { field: "queryParameters", name: "zipcode" },
        "unify-i-audience": { field: "queryParameters", name: "audience" },
        "unify-i-computed-trait": { field: "queryParameters", name: "computed_trait" },
    };

    // Helper Functions
    const updateProfileAPIField = (fieldName, fieldValue, targetFieldId) => {
        const targetField = document.getElementById(targetFieldId);
        console.log('fieldName : ', fieldName)
        console.log('fieldValue : ', fieldValue)
        console.log('targetFieldId : ', targetFieldId)
        // if(fieldName==='traits'){{
        //     fieldValue= 
        // }
        if (targetField) {
            if (targetFieldId === "externalId") {
                targetField.value = `${fieldName}:${fieldValue}`;
                console.log(`Updated ${targetFieldId} with value: ${targetField.value}`);
            } else if (targetFieldId === "queryParameters") {
                if(fieldName=== "audience" || fieldName=== "computed_trait"){
                    targetField.value = targetField.value
                    ? `${targetField.value}&class=${fieldName}`
                    : `class=${fieldName}`;
                    console.log(`Updated ${targetFieldId} with value: ${targetField.value}`);
                }
                else {
                    targetField.value = targetField.value
                        ? `${targetField.value}&includes=${fieldName}`
                        : `includes=${fieldName}`;
                    console.log(`Updated ${targetFieldId} with value: ${targetField.value}`);
                }
            }
        } else {
            console.error(`Target field with ID ${targetFieldId} not found.`);
        }
    };

    const handleIconClick = async (iconId) => {
        const mapping = fieldMappings[iconId];
        if (!mapping) {
            console.error(`No mapping found for iconId: ${iconId}`);
            return;
        }

        const { field, name, spanId, getValue } = mapping;

        try {
            const value = spanId ? await updateCookie(getValue, spanId) : document.getElementById(name)?.value.trim();
            if (value) {
                updateProfileAPIField(name, value, field);
                updateQueryStringDisplay()
            } else {
                console.error(`No value returned for iconId: ${iconId}`);
            }
        } catch (error) {
            console.error(`Error handling icon click for ${iconId}:`, error);
        }
    };

    // Add Event Listeners
    document.querySelectorAll(".unify-svg-icon").forEach((icon) => {
        icon.addEventListener("click", (event) => {
            const iconId = event.target.id;
            handleIconClick(iconId).catch((error) =>
                console.error("Error handling icon click:", error)
            );
        });
    });

    // Cookie Management
    document.querySelectorAll(".get-cookie-btns button").forEach((button) => {
        button.addEventListener("click", () => {
            const spanId = button.dataset.target;
            const value = updateCookie(button.id.replace("-cookie-get", ""), spanId);
            console.log(`Updated cookie for ${button.id}:`, value);
            // copyToClipboard("userId-p")
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

    

    // Session Field Clicks
    const sessionFields = [
        { label: "sessionIdLabel", input: "sessionId-input", value: "sessionId" },
        { label: "sessionNumberLabel", input: "sessionNumber-input", value: "sessionNumber" },
    ];
    sessionFields.forEach(({ label, input, value }) => {
        document.getElementById(label)?.addEventListener("click", () => {
            document.getElementById(input).value = window[value] || "";
        });
    });

    // Fetch Sensitive Data
    fetch("/api/config")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("spaceId").value = data.spaceId || "";
            document.getElementById("profileAPIKey").value = data.profileAPIKey || "";
        })
        .catch((err) => console.error("Error fetching config:", err));

    // Query String Display
    const updateQueryStringDisplay = () => {
        const spaceId = document.getElementById("spaceId").value.trim() || "<space_id>";
        const externalId = document.getElementById("externalId").value.trim() || "<external_id>";
        const queryParams = new URLSearchParams();
        const queryParametersInput = document.getElementById("queryParameters");

        if (queryParametersInput.value.trim()) {
            queryParametersInput.value.split("&").forEach((param) => {
                const [key, value] = param.split("=");
                if (key && value) queryParams.append(key.trim(), value.trim());
            });
        }

        const endpoint = `https://profiles.segment.com/v1/spaces/${spaceId}/collections/users/profiles/${externalId}/traits${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
        document.getElementById("queryStringDisplay").value = endpoint || "No query string present.";
        console.log(`Query String Updated: ${endpoint}`); // Debug log
    };

    // Add event listeners to fields and update on change
    ["spaceId", "externalId", "queryParameters"].forEach((id) => {
        document.getElementById(id)?.addEventListener("input", (event) => {
            console.log(`Input changed for ${id}: ${event.target.value}`); // Debug log
            updateQueryStringDisplay();
        });
    });

    // Initialize Query String Display
    updateQueryStringDisplay();
    });



    
    // Function to send the Profile API request with retry logic
    const sendProfileApiRequest = async (endpointUrl, profileAPIKey, retryCount = 0, maxRetries = 5, retryDelay = 60000) => {
        try {
            console.log(`Attempt ${retryCount + 1}: Sending API request to ${endpointUrl}`);

            const response = await fetch("/profile-api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ endpointUrl, profileAPIKey }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("API Response:", data);
                showToast("API Request Successful!", response, "green");
                return; // Exit function on success
            } else if (response.status === 404) {
                console.warn(`User does not yet exist. Retrying... ${retryCount+1}/${maxRetries}`);
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        sendProfileApiRequest(endpointUrl, profileAPIKey, retryCount + 1, maxRetries, retryDelay*(retryCount+1));
                    }, retryDelay*(retryCount+1));
                } else {
                    console.error("Max retries reached. User does not exist.");
                    showToast("Max retries reached. User does not exist.", null, "yellow");
                }
            } else {
                console.error("API Error:", data);
                showToast("API Request Failed!", data, "red");
            }
        } catch (error) {
            console.error("Request Error:", error);
            showToast("API Request Error!", error, "orange");
        }
    };
    
    // Send PROFILE API Request
    const sendApiRequestButton = document.getElementById("sendApiRequest");
    sendApiRequestButton.addEventListener("click", async () => {
        const spaceIdInput = document.getElementById("spaceId");
        const profileAPIKeyInput = document.getElementById("profileAPIKey");
        const externalIdInput = document.getElementById("externalId");
        const queryParametersInput = document.getElementById("queryParameters");
    
        const spaceId = spaceIdInput?.value.trim();
        const profileAPIKey = profileAPIKeyInput?.value.trim();
        const externalId = externalIdInput?.value.trim();
        const queryParams = queryParametersInput?.value.trim();
    
        if (!spaceId || !externalId) {
            alert("Space ID and External ID are required.");
            return;
        }
        
        const queryString = queryParams ? `?${queryParams}` : "";
        const endpointUrl = `https://profiles.segment.com/v1/spaces/${spaceId}/collections/users/profiles/${externalId}/traits${queryString}`;

        sendProfileApiRequest(endpointUrl, profileAPIKey);
        
    });


// END // PROFILE API REQUEST @ LEFT SIDEBAR
// ------------------------------------



// ------------------------------------
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
// const getCampaignFormValues = () => {
//     utm_id=document.getElementById('campaignId'),
//     utm_campaign= document.getElementById('campaign'),
//     utm_source= document.getElementById('campaignSource'),
//     utm_medium= document.getElementById('campaignMedium'),
//     utm_term= document.getElementById('campaignTerm'),
//     utm_content = document.getElementById('campaignContent'),
//     campaign = {
//         utm_id:document.getElementById('campaignId'),
//         utm_campaign: document.getElementById('campaign'),
//         utm_source: document.getElementById('campaignSource'),
//         utm_medium: document.getElementById('campaignMedium'),
//         utm_term: document.getElementById('campaignTerm'),
//         utm_content : document.getElementById('campaignContent'),
//     },
//     referrer = document.getElementById('referrer')
//     return {utm_id, utm_campaign, utm_source, utm_medium, utm_term, utm_content, referrer, campaign};
//     // Put lines below in original function : 
//     // const userFormFields = getUserFormValues() 
//     // const {firstName, lastName, username, phone, email, street, city, state, zipcode} = userFormFields;
// }

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

const displayUserFormData = () => {
    // GET CURRENT DATA FROM USER FORM
    const userFormFields = getUserFormValues() 
    let {firstName, lastName, username, phone, email, street, city, state, zipcode} = userFormFields;
    console.log('userFormFields : ', userFormFields)

    // GET CURRENT DATA FROM GLOBAL VARIABLES
    const globalVariables = getGlobalVariables()
    let {userId, anonymousId , usertraits , groupId , groupTraits , sessionId , sessionNumber , clientId , cid , campaign , currentUser} = globalVariables

    console.log('GLOBAL VARIABLES @901 : ', userId, anonymousId, usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, campaign, currentUser)
    console.log('GLOBAL VARIABLES @902 : ', globalVariables)

    // GET CURRENT DATA FROM CAMPAIGN FORM
    // let data = updateCampaignFormAndQueryString(true)
    let data = currentCampaign

    userList.innerHTML = '';

    const tempUserInfo = [
        `<span class="bold">Name: </span> ${firstName} ${lastName}`,
        `<span class="bold">Username: </span>${username}` ,
        `<span class="bold">Phone: </span>${phone}` ,
        `<span class="bold">Email: </span>${email}` ,
        `<span class="bold">Address: </span> ${street}, ${city}, ${state}, ${zipcode}`,
        clientId?`<span class="bold">clientId: </span>${clientId}` : '',
        sessionId?`<span class="bold">sessionId: </span>${sessionId}` : '',
        sessionNumber?`<span class="bold">sessionNumber: </span>${sessionNumber}` : '',
        userId?`<span class="bold">userId: </span>${userId}` : '',
        anonymousId?`<span class="bold">anonymousId: </span>${anonymousId}`: '',
        usertraits?`<span class="bold">usertraits: </span>${usertraits}` :'',
        groupId?`<span class="bold">groupId: </span>${groupId}` :'',
        groupTraits?`<span class="bold">groupTraits: </span>${groupTraits}`:'' 
    ];

    tempUserInfo.forEach(info => {
        const userItem = document.createElement('li');
        userItem.innerHTML = info;
        userList.appendChild(userItem);
    });
    

    

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

    return {firstName, lastName, username, phone, email, street, city, state, zipcode, userId, anonymousId , usertraits , groupId , groupTraits , sessionId , sessionNumber , clientId , cid , campaign , currentUser, tempTraits, data}
}
                                    
// Function to update user profile (LEFT SIDEBAR)
async function updateProfile(event, button, type) {
    event.preventDefault(); // Prevent default form submission
    let btnIDType, forceType
    
    if(button==='identifyAnonymousId'){
        btnIDType='anonymousId'
        console.log('ANONYMOUS IDENTIFY : no PII exist so no userId generated', )
    }
    if(button==='identifyUserId'){
        btnIDType='userId'
        console.log('ANONYMOUS IDENTIFY : PII exists so generating userId', )
    }
    // displayUserFormData()

    // GET CURRENT DATA FROM USER FORM
    const userFormFields = await getUserFormValues() 
    let {firstName, lastName, username, phone, email, street, city, state, zipcode} = userFormFields;

    // GET CURRENT DATA FROM GLOBAL VARIABLES
    // const globalVariables = getGlobalVariables()
    // let {userId, anonymousId , usertraits , groupId , groupTraits , sessionId , sessionNumber , clientId , cid , campaign , currentUser} = globalVariables
    // GET CURRENT DATA FROM CAMPAIGN FORM

    // console.log('GLOBAL VARIABLES @901 : ', userId, anonymousId, usertraits, groupId, groupTraits, sessionId, sessionNumber, clientId, cid, campaign, currentUser)
    // console.log('GLOBAL VARIABLES @902 : ', globalVariables)

    if(username || phone || email || street || city || state || zipcode){
      forceType='userId'  
      console.log('FORCE TYPE : ',forceType, 'forcing userId generation')
    }
    else{
        forceType='anonymousId'
        console.log('FORCE TYPE : ',forceType, ' - fallback to anonymousId')
    }

    console.log('@updateProfile - userId : ', userId)

    // IF IDENTIFY:USERID IS CLICKED OR IF PII IS INCLUDED IN FORM THEN FORCE USERID GENERATION
    if(btnIDType==='userId' ||  forceType==='userId'){
        console.log('INSIDE btnIDType | forceType: ',btnIDType, ' | ', forceType)
        if(!analytics.user().id()){
            console.log('INSIDE !userId (1) : ', userId)
            
            let tempUserId = uuidv4()
            console.log('INSIDE !userId (2) : ', tempUserId)
            analytics.user().id(tempUserId);
            console.log('INSIDE !userId (3) : ', analytics.user().id())
            userId=tempUserId;
            console.log('USERID CREATED : ', analytics.user().id())
            console.log('INSIDE !userId (4) : ', userId)
        }
    }
    // Await the completion of updateCampaignFormAndQueryString
    let data = await updateCampaignFormAndQueryString(true)
    
    userList.innerHTML = '';

    const tempUserInfo = [
        `<span class="bold">Name: </span> ${firstName} ${lastName}`,
        `<span class="bold">Username: </span>${username}` ,
        `<span class="bold">Phone: </span>${phone}` ,
        `<span class="bold">Email: </span>${email}` ,
        `<span class="bold">Address: </span> ${street}, ${city}, ${state}, ${zipcode}`,
        clientId?`<span class="bold">clientId: </span>${clientId}` : '',
        sessionId?`<span class="bold">sessionId: </span>${sessionId}` : '',
        sessionNumber?`<span class="bold">sessionNumber: </span>${sessionNumber}` : '',
        userId?`<span class="bold">userId: </span>${userId}` : '',
        anonymousId?`<span class="bold">anonymousId: </span>${anonymousId}`: '',
        usertraits?`<span class="bold">usertraits: </span>${usertraits}` :'',
        groupId?`<span class="bold">groupId: </span>${groupId}` :'',
        groupTraits?`<span class="bold">groupTraits: </span>${groupTraits}`:'' 
    ];

    tempUserInfo.forEach(info => {
        const userItem = document.createElement('li');
        userItem.innerHTML = info;
        userList.appendChild(userItem);
    });
    

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
            // globalVariables
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
    // populate userForm fields by traits cookie
    loadFormData()
    displayUserFormData()
}
// document.getElementById('check-data').addEventListener('click', checkData);

const resetAjsUser = () => {
    // Save the current source-selection value before clearing localStorage
    const currentSourceSelected = localStorage.getItem('currentSourceSelected');

    
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
    
    // window.location.reload(true);
    // autoUpdate()

    // Restore the source-selection state in localStorage
    if (currentSourceSelected) {
        localStorage.setItem('currentSourceSelected', currentSourceSelected);
        console.log('Persisted source-selection:', currentSourceSelected);
    }


    // Reset GA4 context on the server each time reset is clicked on client
    // console.log('PREVIOUS clientId : ', clientId)
    // console.log('PREVIOUS cid : ', cid)
    // console.log('PREVIOUS sessionId : ', sessionId)
    // console.log('PREVIOUS sessionNumber : ', sessionNumber)

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
    // console.log('CURRENT clientId : ', clientId)
    // console.log('CURRENT cid : ', cid)
    // console.log('CURRENT sessionId : ', sessionId)
    // console.log('CURRENT sessionNumber : ', sessionNumber)
    
    // Track('campaign_details',{campaign : campaign, referrer : referrer, anonymousId}, {campaign : {...campaign}, referrer : referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId);

    // analytics.ready(() => {
    //     Track('campaign_details',{campaign : campaign, referrer : referrer, anonymousId}, {campaign : {...campaign}, referrer : referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId);
    // })
}

// document.getElementById('reset-ajs-user').addEventListener('click', resetAjsUser);


// Add event listener to the Clear Form button
// document.getElementById('clearUserForm').addEventListener('click', clearForm('userForm'));
document.getElementById('check-data').addEventListener('click', checkData);
document.getElementById('reset-ajs-user').addEventListener('click', resetAjsUser);

// document.getElementById('clearCampaignForm').addEventListener('click', clearForm,'clearCampaignForm');

document.getElementById('clearUserForm').addEventListener('click', () => clearForm('userForm'));
document.getElementById('clearCampaignForm').addEventListener('click', () => clearForm('campaignForm'));







// START // RIGHT SIDEBAR 
// some code for cookie buttons are included above in left sidebar


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




// Append Network Request to UI
const appendNetworkRequest = (type, name, status, duration, payload, response) => {
    const networkRequestsList = document.getElementById("network-requests-list");

    // Determine the section (CLIENT, SERVER, SERVER INTERNAL, PROFILE API)
    const sectionId =
        type === "CLIENT" ? "client-requests" :
        type === "SERVER" ? "server-requests" :
        type === "SERVER_INTERNAL" ? "server-internal-requests" :
        "profile-api-requests";

    let section = document.getElementById(sectionId);
    if (!section) {
        section = document.createElement("ul");
        section.id = sectionId;
        section.className = "network-request-section";
        section.innerHTML = `<h6 class="network-request-header">${type} Requests</h6>`;
        networkRequestsList.appendChild(section);
    }

    // Create <li> for the request
    const listItem = document.createElement("div");
    listItem.className = "network-request-item";
    listItem.innerHTML = `
        <p><b>URL:</b><span> ${name}</span><br>
        <b>Status:</b><span> ${status || "N/A"}</span></p>
        <div class="payload" style="display:none;">
            <b>Payload:</b> <pre>${JSON.stringify(payload, null, 2)}</pre>
            <b>Response:</b> <pre>${response ? JSON.stringify(response, null, 2) : "No response available"}</pre>
        </div>
    `;

    listItem.addEventListener("click", () => {
        const payloadDiv = listItem.querySelector(".payload");
        payloadDiv.style.display = payloadDiv.style.display === "none" ? "block" : "none";
        listItem.classList.add("active");
        payloadDiv.style.margin = "0 auto";
    });

    section.appendChild(listItem);
};

// Monitor Performance API for Requests
const monitorPerformance = () => {
    const observedRequests = new Set();

    const logRequests = () => {
        const resources = performance.getEntriesByType("resource");
        resources.forEach(async (resource) => {
            if (!observedRequests.has(resource.name)) {
                let type;
                let payload = { method: "GET", body: "" }; // Example payload, replace as necessary
                let displayName = resource.name;
                let response = null;

                if (resource.name.startsWith("https://api.segment.io/v1/")) {
                    type = "CLIENT";
                } else if (resource.name.startsWith("http://localhost:3001/track") ||
                           resource.name.startsWith("http://localhost:3001/identify") ||
                           resource.name.startsWith("http://localhost:3001/page") ||
                           resource.name.startsWith("http://localhost:3001/group") ||
                           resource.name.startsWith("http://localhost:3001/alias")) {
                    type = "SERVER";
                    displayName = resource.name.replace("http://localhost:3001/", "analytics.");
                } else if (resource.name.startsWith("http://localhost:3001/config") ||
                           resource.name.startsWith("http://localhost:3001/ga4Context") ||
                           resource.name.startsWith("http://localhost:3001/reset-ga4-context")) {
                    type = "SERVER_INTERNAL";
                } else if (resource.name.startsWith("http://localhost:3001/profile-api")) {
                    type = "PROFILE_API";
                    try {
                        const res = await fetch(resource.name);
                        if (res.ok) {
                            response = await res.json();
                        } else {
                            response = { error: `HTTP ${res.status}: ${res.statusText}` };
                        }
                    } catch (error) {
                        response = { error: error.message };
                    }
                }

                if (type) {
                    appendNetworkRequest(type, displayName, resource.status, resource.duration, payload, response);
                }

                observedRequests.add(resource.name);
            }
        });
    };

    // Observe performance entries periodically
    setInterval(logRequests, 1000);
};

// Initialize Monitoring
monitorPerformance();


// Toggle content open/closed when clicking on <h5> and <h6> headers
document.addEventListener("DOMContentLoaded", () => {
    // Function to attach click event listeners to <h5> tags
    const attachHeader5Listeners = () => {
        const headers5 = document.querySelectorAll("#rightSidebarContent h5");
        headers5.forEach((header) => {
            header.addEventListener("click", () => {
                const content = header.nextElementSibling;
                if (content) {
                    content.style.display = content.style.display === "none" ? "block" : "none";
                }
            });
        });
    };

    // Function to attach click event listeners to <h6> tags
    const attachHeader6Listeners = () => {
        const headers6 = document.querySelectorAll("#segment-network-requests h6");
        headers6.forEach((header) => {
            header.addEventListener("click", () => {
                const content = header.nextElementSibling;
                if (content) {
                    content.style.display = content.style.display === "none" ? "block" : "none";
                }
            });
        });
    };
    
    // Function to attach click event listeners to <h6> tags
    const attachSegmentEventResponsesListeners = () => {
        const responseItem = document.querySelectorAll(".segment-response-item");
        responseItem.forEach((response) => {
            response.addEventListener("click", () => {
                const content = response.nextElementSibling;
                if (content) {
                    content.style.display = content.style.display === "none" ? "block" : "none";
                }
            });
        });
    };


    // Initially hide all content following <h5> and <h6> tags
    const hideInitialContent = () => {
        const contents5 = document.querySelectorAll("#rightSidebarContent h5 + *");
        const contents6 = document.querySelectorAll("#segment-network-requests h6 + *");
        contents5.forEach((content) => (content.style.display = "none"));
        contents6.forEach((content) => (content.style.display = "none"));
    };

    // Observe dynamically added <h6> elements and attach event listeners
    const observeDynamicH6 = () => {
        const observer = new MutationObserver(() => {
            attachHeader6Listeners();
        });

        observer.observe(document.getElementById("segment-network-requests"), {
            childList: true,
            subtree: true,
        });
    };
    
    // // Observe dynamically added <h6> elements and attach event listeners
    // const observeDynamicResponses = () => {
    //     const observer = new MutationObserver(() => {
    //         attachSegmentEventResponsesListeners();
    //     });

    //     observer.observe(document.getElementsByClassName("segment-response-item"), {
    //         childList: true,
    //         subtree: true,
    //     });
    // };

    // Run setup functions
    attachHeader5Listeners();
    attachHeader6Listeners();
    attachSegmentEventResponsesListeners();
    // observeDynamicResponses();
    // hideInitialContent();
    observeDynamicH6();
});

//   Use the middleware function
analytics.addSourceMiddleware(surfacePayload);



// Function to display Segment network requests (replace with actual implementation)
// function displaySegmentRequests() {
//     const requestDiv = document.getElementById('segment-network-requests');
//     requestDiv.innerHTML = '<p>Segment network request tracking coming soon!</p>';
//     // Implement logic to capture and display Segment requests here
// }

// // List all completed network requests
// const getNetworkRequests = () => {
//     const resources = performance.getEntriesByType("resource");
//     resources.forEach(resource => {
//         console.log("Network Request:", {
//             name: resource.name, // URL
//             type: resource.initiatorType, // e.g., "fetch", "xmlhttprequest"
//             duration: resource.duration, // Time taken
//             size: resource.transferSize // Size in bytes
//         });
//     });
// };

// Call after page load
// window.addEventListener("load", getNetworkRequests);



// END // RIGHT SIDEBAR 


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
    // displaySegmentRequests();    
}
// Display cookies on page load
displayCookies('localStorage', 'local-storage-cookies');
displayCookies('client', 'client-cookies');

// Display Segment network requests
// displaySegmentRequests();


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
    
    // let userFormInputVars = {}
    // let campaignFormInputVars = {}

    let contextTraits = {}
    // Populate User Form Fields from localStorage
    if (userForm) {
        const userFormInputs = userForm.querySelectorAll('input, textarea, select');
        userFormInputs.forEach(input => {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                contextTraits[input.name] = input.value;
                input.value = savedValue;
                // console.log('input.value = savedValue : ',input.value = savedValue)
                // console.log('contextTraits[input.name] = input.value : ',contextTraits[input.name],' | ', input.value)
            }
        });
    }

    let properties = {}
    let context = {traits : contextTraits, campaign:{}, referrer : ''}

    if (campaignForm) {
        // Populate Campaign Form Fields from localStorage or query string
        const campaignInputs = campaignForm.querySelectorAll('input, textarea, select');
        campaignInputs.forEach(input => {
            const paramValue = queryParams.get(input.name);
            if (paramValue !== null) {
                properties[input.name] = paramValue;
                context.campaign[input.name] = paramValue;
                input.value = paramValue;
                // console.log('input.value = paramValue : ',input.value = paramValue)
                // console.log('context.campaign[input.name] = input.value : ',context.campaign[input.name],' | ', input.value)
                // console.log('properties[input.name] = paramValue : ',properties[input.name],' | ', paramValue)
            }

            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                input.value = savedValue;
                // console.log('input.value = savedValue : ',input.value,' | ', savedValue)
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
             console.log('Query string updated:', newQueryString);
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
            referrer = matchedCampaign.utm.referrer
            context['referrer'] = referrer
            // console.log("Referrer field set to:", referrer);
            // console.log("@loadFormData - Referrer field set to:", referrerInput.value);
        }
    }
    if(clientId || cid){
        // console.log('clientId exists', clientId, 'cid exist', cid)
        document.getElementById('clientId-input').value = clientId
    } else{console.log('clientId does not exist')}
    
    // console.log('loadFormData document.title : ',document.title);
    // console.log('loadFormData Campaign : ','Campaign');
    console.log('loadFormData properties : ',properties);
    // console.log('loadFormData context : ',context);
    // console.log('loadFormData context.campaign : ',context.campaign);
    
    userId = userId ? analytics.user().id() :  '';
    anonymousId = anonymousId ? analytics.user().anonymousId() :  '';
    // console.log('loadFormData userId : ',userId);
    // console.log('loadFormData anonymousId : ',anonymousId);
    
    
    analytics.ready(() => {
        Page(document.title, 'Campaign', properties, context, campaign, userId, anonymousId);
        
        Track({event : 'campaign_details', properties : {campaign : context.campaign, referrer : referrer, anonymousId}, context : {campaign : {...context.campaign}, referrer : referrer, google : {clientId, sessionId, sessionNumber}}, anonymousId, userId});
        // loadFormData()
    })
}


/// Call `loadFormData` on DOMContentLoaded
// document.addEventListener('DOMContentLoaded', loadFormData);

// CLICK LABEL UPDATES INPUT BY GLOBAL VARIABLE VALUE
// const clickLabelUpdateInputGlobalVariable = (labelId, inputId, variable) => {
//     console.log(labelId, inputId, variable)
//     const label = document.getElementById(labelId);
//     // label.addEventListener('click', ()=> {console.log(labelId, inputId, variable)})
//         // {document.getElementById(inputId).value = variable})
// }

// document.addEventListener('DOMContentLoaded', ()=> {
//     let sessionIdInput = document.getElementById('sessionId-input');
//     let sessionIdLabel = document.getElementById('sessionIdLabel');
//     sessionIdLabel.addEventListener('click', () => {sessionIdInput.value = sessionId});
    
//     let sessionNumberInput = document.getElementById('sessionNumber-input');
//     let sessionNumberLabel = document.getElementById('sessionNumberLabel');
//     sessionNumberLabel.addEventListener('click', () => {sessionNumberInput.value = sessionNumber});

//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('firstNameLabel', 'firstName-input', firstName));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('lastNameLabel', 'lastName-input', lastName));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('usernameLabel', 'username-input', username));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('phoneLabel', 'phone-input', phone));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('emailLabel', 'email-input', email));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('streetLabel', 'street-input', street));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('cityLabel', 'city-input', city));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('stateLabel', 'state-input', state));
//     document.getElementById('firstNameLabel').addEventListener('click', () => clickLabelUpdateInputGlobalVariable('zipcodeLabel', 'zipcode-input', zipcode));
    
// });

// document.addEventListener('DOMContentLoaded', clickLabelUpdateInputGlobalVariable);


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
analytics.ready(() => {
    document.addEventListener('DOMContentLoaded', loadFormData);
    sendCampaignServerSide();
})

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


// CREATE
let currentCampaign = {}
function generateNewCampaignData() {
    // Generate random index to select data
    const randomIndex = Math.floor(Math.random() * campaignData.length);
    // /campaignObject
    currentCampaign = campaignData[randomIndex]
    return campaignData[randomIndex];
}

// READ
let getCurrentCampaign = () => {
    return currentCampaign
}


// ------------------------------------
const sendCampaignServerSide = async (campaign, referrer) => {
    let latest_campaign = {
        utm_id: document.getElementById('campaignId-input').value,
        utm_campaign: document.getElementById('campaign-input').value,
        utm_source: document.getElementById('campaignSource-input').value,
        utm_medium: document.getElementById('campaignMedium-input').value,
        utm_term: document.getElementById('campaignTerm-input').value,
        utm_content: document.getElementById('campaignContent-input').value,
    };
    let latest_referrer = document.getElementById('referrer-input').value;
    console.log('campaign and referrer', latest_campaign, latest_referrer, {...latest_campaign});
    try {
        let response = await fetch('/campaignDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latest_campaign, latest_referrer, ...latest_campaign }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        console.log('Campaign details sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Error sending campaign details:', error);
    }
};



// UPDATE
function updateCampaignFormAndQueryString(ignore) {
    // console.log('Button clicked'); // Debug log
    
    // if(ignore !== false){
        const data = generateNewCampaignData();
        // console.log('updateCampaignFormAndQueryString / generateNewCampaignData : (data)', data)
        // let data = loadFormData()
        let formData = loadFormData()
        console.log('Generated Campaign Data:', data);
        
        const utmParams = data.utm;
        // console.log(data.utm)
    // }

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
            utm_id: utmParams.campaignId,
            utm_campaign: utmParams.campaign,
            utm_source: utmParams.campaignSource,
            utm_medium: utmParams.campaignMedium,
            utm_term: utmParams.campaignTerm,
            utm_content: utmParams.campaignContent,
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
    // console.log('Segment page call'); // Log Segment call
    let resData = {pageName : pageName, category:'', properties : properties, context : context, campaign : data, userId : userId, anonymousId : anonymousId}
    if(ignore === false){
        Page(resData)
        // console.log('Page(resData)')
    }
    else{

    }
    // Page(pageName, "Campaign", properties,context)
    sendCampaignServerSide()
    return resData
}
// document.getElementById('newCampaign').addEventListener('click', updateCampaignFormAndQueryString);

// ADDED to user.js
document.getElementById('newCampaign').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    updateCampaignFormAndQueryString();
});

// document.getElementById('useCampaign').addEventListener('click', (event) => {
//     event.preventDefault(); // Prevent form submission and page reload
//     loadFormData(); // Trigger the loadFormData function to populate the form when the button is clicked
// });


// ADDED to user.js
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the DOM is fully loaded before accessing elements

    // Function to populate the form with random user data
    function populateFormWithUserData() {
        // console.log("inside populateFormWithUserData")
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
        // console.log('Page event triggered');
        loadFormData()
    }
    if(type ==='identify'){
        // console.log('Identify event triggered');
        // console.log("identify button : campaignData obj",campaignData)
        // console.log("identify button : google obj", google)
        Identify(userId, anonymousId, usertraits, context)
    }
    if(type ==='track'){
        Track('General Event', {},{},anonymousId, userId)
        // Track(userId, anonymousId, 'General Event', properties, context)
    }
    if(type ==='group'){
        Group(userId, groupId, groupTraits, context)
    }
    if(type ==='alias'){
        Alias(userId, anonymousId, context)
    }
}

// ADDED to user.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pageTrigger').addEventListener('click', () => triggerEvent('page'));
    document.getElementById('identifyTrigger').addEventListener('click', () => triggerEvent('identify'));
    document.getElementById('trackTrigger').addEventListener('click', () => triggerEvent('track'));
    document.getElementById('groupTrigger').addEventListener('click', () => triggerEvent('group'));
    document.getElementById('aliasTrigger').addEventListener('click', () => triggerEvent('alias'));
});

// ------------------------------------
// ADDED to user.js
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
                tooltip.style.left = `${e.pageX + 0}px`;
                tooltip.style.top = `${e.pageY + 15}px`;
                tooltip.classList.add('show');
            }, 2000); // Delay of 2 seconds
        }
    };

    const moveTooltip = (e) => {
        if (tooltip.classList.contains('show')) {
            tooltip.style.left = `${e.pageX + 0}px`;
            tooltip.style.top = `${e.pageY + 15}px`;
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