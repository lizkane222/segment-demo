

// WOIYdGFBtpCDtCHTMenBAnuTYPA9HLMM

import Analytics from '@segment/analytics-node';
import dotenv from './dotenv';
// import {*} from './segment-demo.js';

dotenv.config(); // Load environment variables if using a .env file

// Initialize Segment client
const analytics = new Analytics({
  writeKey: process.env.SEGMENT_WRITE_KEY // Store your Write Key securely
});

// HANDLE TRACK EVENTS
const trackServer = (event, userId, anonymousId, properties, context) => {
    console.log('Track Event Server Side')
    analytics.track({
        userId: userId || {},
        anonymousId: anonymousId,
        event: event,
        properties: properties || {},
        context: context || {},
    });
}

// HANDLE IDENTIFY EVENTS

const identifyServer = (userId, anonymousId, traits, context, callback) => {
    analytics.identify({
        userId: userId,
        anonymousId: anonymousId,
        traits: traits,
        context: context
    });
    console.log('Server-side identify triggered:', { userId, anonymousId, traits, context });
    if (callback) callback();
};

// HANDLE PAGE EVENTS
const pageServer = () => {
    analytics.page({
        userId: userId,
        anonymousId: anonymousId,
        name: 'Home Page',
        properties: {
          title: 'Welcome to the App',
          url: 'https://example.com/home'
        }
      });
}

// HANDLE GROUP EVENTS
const groupServer = (name, category, properties, context) => {
    analytics.group({
    userId: userId,
    anonymousId: anonymousId,
    groupId: 'org_67890',
    traits: {
        organization: 'Acme Corp',
        industry: 'Software'
    }
    });
}

// HANDLE ALIAS EVENTS
const aliasServer = (userId, previousId) => {
    analytics.alias({
        previousId: previousId,
        userId: userId
    });
}