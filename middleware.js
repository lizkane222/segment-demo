// https://segment.atlassian.net/wiki/spaces/CSEng/pages/1575387453/Middlewares+Analytics.js

// ----------------------------------------------

// Source Middleware: validate UTM parameters 
// In this middleware, the context.campaign field is updated to only include valid UTM parameters. If a parameter contains "utm" but is not a valid UTM parameter, it is removed from the URL. If no UTM parameters are present in the URL, the context.campaign field is left as it is.

var utmFilterMiddleware = function({ payload, next }) {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const utmParams = ['utm_content', 'utm_medium', 'utm_source', 'utm_campaign', 'utm_term'];
  let campaign = {};
  // Iterate over all query parameters
  for (let [key, value] of params.entries()) {
    // If the parameter contains "utm" but is not a valid UTM parameter, remove it
    if (key.includes('utm') && !utmParams.includes(key)) {
      params.delete(key);
    } else if (utmParams.includes(key)) {
      // If the parameter is a valid UTM parameter, add it to the campaign object
      campaign[key] = value;
    }
  }
  // Update the URL without the invalid UTM parameters
  window.history.replaceState({}, '', url.toString());
  // Only update the context.campaign field if it contains UTM parameters
  if (Object.keys(campaign).length > 0) {
    payload.obj.context.campaign = campaign;
  }
  next(payload);
};
analytics.addSourceMiddleware(utmFilterMiddleware);


// ----------------------------------------------

// Source Middleware: Adds context.traits to all events

// Source middleware 1 (Adds context.traits to all events)
var smw1 = function ({ payload, next }) {
  let traits = window.analytics.user().traits();
  payload.obj.context.traits = traits;
  next(payload);
};
window.addMiddlewares = function () {
  window.analytics.addSourceMiddleware(smw1);
};

// ----------------------------------------------

// Source Middleware: Passing integrations as false


analytics.addSourceMiddleware(({
  payload, next, integrations
}) => {
  payload.obj.integrations.All = false;
  console.log(payload);
  next(payload);
})

// ----------------------------------------------





// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------