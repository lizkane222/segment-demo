# Segment Demo


### Install all dependencies
> npm i 

## There are a few existing options to be able to serve this site on your local machine : 

    ### Use HTTP-Server to serve this project locally
    Run this command to start the server : 
        > http-server
    Open your browser and visit http://localhost:8080. These files will now be served over HTTP, which will bypass the CORS restrictions.


    ### Use Local Node.js Server to serve this project locally : 
    Run this command to start the server : 
        > node server.js
    Open your browser and visit http://localhost:3001/. 


## Configure the Analytics.js & Server Sources with your writeKey : 
    Update the .env.primary file with these variables and their values from your Segment workspace. Update the links with the links to your Segment Resources.
        GTAGID=""

        
        # LINK TO AJS SOURCE : https://app.segment.com/
        SEGMENTAJSWRITEKEY=""

        # LINK TO SERVER SOURCE : https://app.segment.com/
        SEGMENTNODEWRITEKEY=""

        # LINK TO UNIFY SPACE : "Segment Demo Space"
        SPACEID=""

        # UNIFY SPACE'S PROFILE API KEY
        PROFILEAPIKEY=""

        # UNIFY SPACE'S PROFILE API KEY base64 encoded value
        BASE64PROFILEAPIKEY = ""


    Update the index.html file's <head> with your AJS source's writeKey in 2 places within the Segment Snippet.


## Upcoming Features : 
    1. The Config page (config.html) will locally store the provided values from the form to be used throughout the app.
    
    2. Code blocks will be added the User Page to allow pasting, manual modification, and translating of event payloads between different languages (AJS, Node.js, Python, Ruby, JSON) which can be sent to the currently configured sources.

    3. Ecommerce page needs to be updated with more accurate Ecommerce data that also includes images.
