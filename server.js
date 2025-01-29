import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Analytics } from '@segment/analytics-node'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { btoa } from "abab";


import dotenv from 'dotenv';
// CHOOSE FILE TO SELECT
// require('dotenv').config({ path: './.env.primary' });
dotenv.config(); // Load environment variables if using a .env file
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();


// Check if the primary `.env` has data
const primaryEnvExists = fs.existsSync('./.env.primary');
const primaryEnvContent = primaryEnvExists ? fs.readFileSync('./.env.primary', 'utf8') : '';

// If primary `.env` is empty, load the secondary `.env`
if (!primaryEnvContent.trim()) {
    console.log('Primary .env is empty. Loading secondary .env file.');
    dotenv.config({ path: './.env.secondary' });
} else {
    console.log('Primary .env loaded successfully.');
}
console.log('Database URL:', process.env.DATABASE_URL_PRIMARY || process.env.DATABASE_URL_SECONDARY);


// Initialize Segment Analytics
// const analytics = new Analytics({ writeKey: process.env.SEGMENT_WRITE_KEY });
const nodeWriteKey = {SEGMENTNODEWRITEKEY : process.env.SEGMENTNODEWRITEKEY}
const analytics = new Analytics({ writeKey: nodeWriteKey.SEGMENTNODEWRITEKEY })
console.log('nodeWriteKey : ', nodeWriteKey)
const profileAPIKey = { PROFILEAPIKEY: process.env.PROFILEAPIKEY }
const base64ProfileAPIKey = { BASE64PROFILEAPIKEY: process.env.BASE64PROFILEAPIKEY }
console.log('profileAPIKey : ', profileAPIKey)
// const serverProfileAPIKey = { PROFILEAPIKEY: process.env.PROFILEAPIKEY }
const spaceId = { SPACEID: process.env.SPACEID }

const app = express();
const PORT = process.env.PORT || 3001;

// .ENV FILE VARIABLES
    // GTAGID
    // SEGMENTAJSWRITEKEY
    // SEGMENTNODEWRITEKEY
    // SPACEID
    // PROFILEAPIKEY
    // BASE64PROFILEAPIKEY


// require('dotenv').config(); // Load .env variables


// Global GA4 context store
const globalGA4Context = {
    client_id: uuidv4(),
    session_id: Date.now().toString(),
    session_number: 1,
    last_active: Date.now(),
};



// Function to initialize or reset GA4 context
function initializeGA4Context() {
    globalGA4Context.session_id = Date.now().toString();
    globalGA4Context.last_active = Date.now();
    globalGA4Context.session_number = 1;
    // console.log('GA4 Context Initialized:', globalGA4Context);
    // console.log('GA4 Context Initialized client_id:', globalGA4Context.client_id);
    // console.log('GA4 Context Initialized session_id:', globalGA4Context.session_id);
    // console.log('GA4 Context Initialized last_active:', globalGA4Context.last_active);
    // console.log('GA4 Context Initialized session_number:', globalGA4Context.session_number);
}



// Trigger initialization on server startup
initializeGA4Context();

// For parsing application/json in POST requests
app.use(express.json());

app.use(cors());
// app.use(cors(corsOptions));

// Get __dirname for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Serve static files (like CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Serve the main HTML file at the root
app.get('./', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve index.html
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/config', (req, res) => {
  res.sendFile(path.join(__dirname, 'config.html'));
});

// Route to serve ecommerce.html
app.get('/ecommerce', (req, res) => {
    res.sendFile(path.join(__dirname, 'ecommerce.html'));
});

// Endpoint to get GA4 context
app.get('/ga4Context', (req, res) => {
    res.json(globalGA4Context); // Send the global GA4 context as a JSON response to CLIENT
});

// app.get('/api/config', (req, res) => {
//     res.json({
//         spaceId: process.env.SPACEID,
//         // profileAPIKey: process.env.PROFILEAPIKEY,
//         // base64ProfileAPIKey: process.env.BASE64PROFILEAPIKEY
//         profileAPIKey: process.env.BASE64PROFILEAPIKEY
//     });
// });
// Endpoint to update the .env.primary file
app.post('/update-config', (req, res) => {
    const { key, value } = req.body;

    if (!key || typeof value === 'undefined') {
        return res.status(400).json({ error: 'Invalid key or value' });
    }

    const envPath = '.env.primary';

    try {
        // Read the current .env.primary file
        let envContent = fs.readFileSync(envPath, 'utf8');

        // Check if the key exists; if so, update it; otherwise, append it
        const regex = new RegExp(`^${key}=.*`, 'm');
        if (regex.test(envContent)) {
            envContent = envContent.replace(regex, `${key}="${value}"`);
        } else {
            envContent += `\n${key}="${value}"`;
        }

        // Write the updated content back to .env.primary
        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log(`${key} updated in ${envPath}`);

        // Respond with success
        res.status(200).json({ message: `${key} updated successfully` });
    } catch (error) {
        console.error(`Error updating ${key} in ${envPath}:`, error);
        res.status(500).json({ error: 'Failed to update configuration' });
    }
});


// Endpoint to reset GA4 context
app.post('/reset-ga4-context', (req, res) => {
    // Reset GA4 context
    globalGA4Context.client_id = uuidv4();
    globalGA4Context.session_id = Date.now().toString();
    globalGA4Context.session_number = 1;
    globalGA4Context.last_active = Date.now();

    console.log('GA4 Context Reset:', globalGA4Context);
    res.json(globalGA4Context); // Send the updated context to the client
});

// PROFILE API ENDPOINT
const PROFILE_API_KEY = process.env.PROFILE_API_KEY;

app.post("/profile-api", async (req, res) => {
    const { endpointUrl } = req.body;

    if (!endpointUrl) {
        return res.status(400).send({ error: "Endpoint URL is required." });
    }

    try {
        let btoaProfileApiKey = btoa(process.env.PROFILEAPIKEY+':').toString("base64");
        console.log('btoaProfileApiKey : ', btoaProfileApiKey)

        const response = await fetch(endpointUrl, {
            method: "GET",
            headers: {                
                "Authorization": `Basic ${btoaProfileApiKey}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).send({ error: errorText });
        }

        const data = await response.json();
        console.log("PROFILE API RES:", data);
        res.send(data);
    } catch (error) {
        console.error("Error calling Segment API:", error);
        res.status(500).send({ error: "Internal server error." });
    }
});

let campaignDetails, referrer, campaignFields
app.post('/campaignDetails', (req, res) => {
    campaignDetails = req.body.latest_campaign
    referrer = req.body.latest_referrer
    campaignFields = req.body.latest_campaign
    console.log('POST /campaignDetails : ', campaignDetails, referrer, campaignFields)
    res.send({...campaignDetails, referrer, ...campaignFields})
});

app.get('/campaignDetails', (req, res) => {
    // campaignDetails = req.body
    console.log('campaignDetails : ', campaignDetails)
    referrer = req.body.latest_referrer
    campaignFields = req.body.latest_campaign
    // res.send(campaignDetails)
    res.send(campaignDetails, referrer, campaignFields)
});


// Append user data to users.json
// app.post('/append-users', (req, res) => {
//   const newUser = req.body;

//   // Read the existing users.json file
//   fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return res.status(500).send('Error reading user data.');
//     }

//     // Parse the existing users and append the new user
//     const users = JSON.parse(data);
//     users.push(newUser);

//     // Write the updated users back to the file
//     fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing to file:', err);
//         return res.status(500).send('Error saving user data.');
//       }
//       res.send('User appended successfully.');
//     });
//   });
// });


// Track Event

app.post('/track', (req, res) => {
    const { event, properties, context, anonymousId, userId, page} = req.body;
    // const body = req.body;
    // const userId = body.userId || null; // Extract userId as string
    // const anonymousId = body.anonymousId || null; // Extract anonymousId as string
    // let properties = body.properties || {}; // Extract properties as object
    // let context = body.context || {}; // Extract context as object
    // let campaign = body.context?.campaign || {}; // Extract campaign from context

    console.log('Track Event Server Side');
    // console.log('client_id : ', globalGA4Context.client_id)
    // console.log('session_id : ', globalGA4Context.session_id)
    // console.log('session_number : ', globalGA4Context.session_number)
    // console.log('campaignDetails : ', campaignDetails)

    // globalGA4Context.client_id
    // globalGA4Context.session_id
    // globalGA4Context.last_active
    // globalGA4Context.session_number

    let payload = {
        anonymousId : anonymousId,
        event : event,
        properties : (properties ? {
            ...properties,
            campaign : campaignDetails ? {...campaignDetails, referrer } : context?.campaign || {},
            ...campaignDetails,
            client_id: globalGA4Context.client_id,
            clientId: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number,
        } : {
            campaign : {...campaignDetails},
            ...campaignDetails,
            referrer,
            client_id: globalGA4Context.client_id,
            clientId: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number
        }),
        context : (context ? {
            ...context,
            campaign : {...campaignDetails},
            referrer,
            ...campaignDetails,
            google: {
                client_id: globalGA4Context.client_id,
                clientId: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            },
            page
        } : {
            campaign : {...campaignDetails},
            referrer,
            ...campaignDetails,
            google: {
                client_id: globalGA4Context.client_id,
                clientId: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            },
            page
        }),
      }
    
      console.log('SERVER TRACK : payload', payload)

    // analytics.track(payload)
    // res.status(200).json({ message: 'Track event sent successfully' });
    // res.send({ payload : payload });

    try {
        analytics.track(payload)
        // res.status(200).json({ message: 'Track event sent successfully' });
        // res.send({ payload : payload });
        // Send a single response containing both status and payload
        res.status(200).json({
            message: 'Track event sent successfully',
            status: 200,
            payload: payload
        });
    } catch (error) {
        console.error('Error sending Track event:', error);
        res.status(500).json({ error: 'Error sending Track event' });
    }
});

// Identify Event
app.post('/identify', (req, res) => {
    const body = req.body;
    const userId = body.userId || null; // Extract userId as string
    const anonymousId = body.anonymousId || null; // Extract anonymousId as string
    let traits = body.traits || {}; // Extract traits as object
    let context = body.context || {}; // Extract context as object
    let campaign = body.context?.campaign || {}; // Extract campaign from context
    let page = body.page
    
    // console.log('Identify Event Server Side');
    // console.log('Server Side req.body : ', body);
    // console.log('Server Side userId : ', userId);
    // console.log('Server Side anonymousId : ', anonymousId);
    // console.log('Server Side traits : ', traits);
    // console.log('Server Side context : ', context);
    // console.log('Server Side campaign : ', campaign);

    // const ga4Data = checkGA4Data();


    // Validate that userId or anonymousId exists
    if (!userId && !anonymousId) {
        console.error('Error: userId or anonymousId is required');
        return res.status(400).json({ error: 'userId or anonymousId is required' });
    }
    let tempContext

    if(campaign){
        if(context){
            // console.log('context : ', context)
            // console.log('context.context : ', context.context)
            // console.log('context.campaign : ', context.campaign)
            // console.log('context.context.campaign : ', context.context.campaign)
            tempContext = {...context, ...campaign}
            // console.log('if tempContext : ', tempContext)
            // context = tempContext
        }
        else {
            tempContext = campaign
            // console.log('else tempContext : ', tempContext)
            // context = tempContext
        }
    }

    let payload = {
        userId : userId ? userId : '',
        anonymousId : anonymousId ? anonymousId : '',
        traits : traits ? {
            // ...usertraits, 
            ...traits,
            client_id: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number,
        } : {
            client_id: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number,
        },
        // context : req.body.context ? context : {}
        context : {
            campaign : campaignDetails,
            referrer,
            ...campaignFields,
            page : {...page, referrer},
            google: {
                client_id: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            }, 
        }
        // context : (tempContext ? {
        //     ...tempContext,
        //     google: {
        //         client_id: globalGA4Context.client_id,
        //         session_id: globalGA4Context.session_id,
        //         session_number: globalGA4Context.session_number,
        //     },
        // } : {
        //     ...context,
            // google: {
            //     client_id: globalGA4Context.client_id,
            //     session_id: globalGA4Context.session_id,
            //     session_number: globalGA4Context.session_number,
            // },
        // }),
    }
    
    console.log('SERVER IDENTIFY : payload', payload)

    try {
        analytics.identify(payload);
        res.status(200).json({
            message: 'Identify event sent successfully',
            status: 200,
            payload: payload
        });
    } catch (error) {
        console.error('Error sending identify event:', error);
        res.status(500).json({ error: 'Error sending identify event' });
    }
});

// Page Event
app.post('/page', (req, res) => {
    const body = req.body;
    const name = body.name
    const category = body.category
    const properties = body.properties
    const context = body.context
    const page = context.page
    const campaign = body.campaign
    const userId = body.userId
    const anonymousId = body.anonymousId
    const callback = body.callback
    
    // if(!campaignDetails){
        campaignDetails = properties
        console.log('Page Server setting campaignDetails = properties', campaignDetails )
    // }
    if(!referrer && page.referrer){
        referrer = page.referrer
        console.log('Page Server setting referrer = page.referrer', referrer )
    }


    // console.log('Page Event Server Side');
    // console.log('SERVER PAGE : body', body)
    // console.log('SERVER PAGE : name', name)
    // console.log('SERVER PAGE : category', category)
    // console.log('SERVER PAGE : properties', properties)
    // console.log('SERVER PAGE : context', context)
    // console.log('SERVER PAGE : campaign', campaign)
    // console.log('SERVER PAGE : userId', userId)
    // console.log('SERVER PAGE : anonymousId', anonymousId)
    // console.log('SERVER PAGE : callback', callback)
    
    let payload = {
        userId : userId,
        anonymousId : anonymousId,
        name : name,
        category : (category ? category : {}),
        properties : (properties ? {
            ...properties, 
            ...page,
            client_id: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number
        } : {
            ...page,
            client_id: globalGA4Context.client_id,
            session_id: globalGA4Context.session_id,
            session_number: globalGA4Context.session_number
        }),
        // context : (context ? {...context, campaign} : {}),
        context : (context ? {
            ...context,
            campaign,
            ...properties,
            google: {
                client_id: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            },
        }: {
            campaign : campaignDetails,
            ...properties,
            google: {
                client_id: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            },
        }),
      }
    console.log('SERVER PAGE : payload', payload)
    // analytics.page(payload)
    // res.status(200).json({ message: 'Page event sent successfully'});

    try {
        analytics.page(payload)
        // res.status(200).json({ message: 'Page event sent successfully'});
        res.status(200).json({
            message: 'Page event sent successfully',
            status: 200,
            payload: payload
        });
    } catch (error) {
        console.error('Error sending Page event:', error);
        res.status(500).json({ error: 'Error sending Page event' });
    }
});

// Group Event
app.post('/group', (req, res) => {
    const { groupId, traits, context, campaign } = req.body;
     // const ga4Context = req.body.ga4Context;
    // console.log('ga4Context : ', ga4Context)
    // const client_id = ga4Context.client_id;
    // const session_id = ga4Context.session_id;
    // const session_number = ga4Context.session_number;

    
    console.log('Group Event Server Side');
    // res.status(200).json({ message: 'Group event sent successfully' });
    // res.send({ payload : payload });
    
    try {
        analytics.group({
            groupId : groupId,
            traits : (traits ? {traits} : {}),
            // context : (context ? {...context, campaign} : {}),
            context : (context ? {
                ...context,
                campaign: campaign,
                google: {
                    client_id: globalGA4Context.client_id,
                    session_id: globalGA4Context.session_id,
                    session_number: globalGA4Context.session_number,
                },
            } : {}),
          })
        // res.status(200).json({ message: 'Group event sent successfully' });
        res.status(200).json({
            message: 'Group event sent successfully',
            status: 200,
            payload: payload
        });
    } catch (error) {
        console.error('Error sending Group event:', error);
        res.status(500).json({ error: 'Error sending Group event' });
    }
});

// Alias Event
app.post('/alias', (req, res) => {
    const { userId, previousId, context, campaign } = req.body;
     // const ga4Context = req.body.ga4Context;
    // console.log('ga4Context : ', ga4Context)
    // const client_id = ga4Context.client_id;
    // const session_id = ga4Context.session_id;
    // const session_number = ga4Context.session_number;

    
    console.log('Alias Event Server Side');
    analytics.alias({
        userId : userId,
        previousId: previousId,
        // context : (context ? {...context, campaign} : {}),
        context : (context ? {
            ...context,
            campaign: campaign,
            google: {
                client_id: globalGA4Context.client_id,
                session_id: globalGA4Context.session_id,
                session_number: globalGA4Context.session_number,
            },
        } : {}),
       })
    // res.status(200).json({ message: 'Alias event sent successfully' });
    // res.send({ payload : payload });

    try {
        // res.status(200).json({ message: 'Alias event sent successfully' });
        res.status(200).json({
            message: 'Alias event sent successfully',
            status: 200,
            payload: payload
        });
    } catch (error) {
        console.error('Error sending Alias event:', error);
        res.status(500).json({ error: 'Error sending Alias event' });
    }
});



// Google Gemini
const serverToServerGA4 = () => {
    const https = require('https');

    const data = JSON.stringify({
    "client_id": "YOUR_CLIENT_ID",
    "events": [
        {
        "name": "campaign_details",
        "params": {
            "source": "google",
            "medium": "cpc",
            "campaign": "summer_sale"
        }
        }
    ]
    });

    const options = {
    hostname: 'www.google-analytics.com',
    path: '/mp/collect?measurement_id=YOUR_MEASUREMENT_ID&api_secret=YOUR_API_SECRET',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
    };

    const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
    });

    req.on('error', (error) => {
    console.error(error);
    });

    req.write(data);
    req.end();
}




// Start the Express server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error("PORT 3001 is already in use.");
    } else {
        console.error("Server error:", err);
    }
});


// Can you help me make the request to Segment's Profile API from the server side?
// CORS Error visible on client : 
// Access to fetch at 'https://profiles.segment.com/v1/spaces/spa_8hTmsKx9TQPcw2nRsKWB1D/collections/users/profiles/anonymous_id:79af6a45-c6d9-4e04-a1e9-a66703c32b41/traits' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.