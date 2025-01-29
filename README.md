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
    Create a new .env at the top-level with these variables. Update the links with the links to your Segment Resources.
        GTAGID=""

        # https://app.segment.com/liz-kane/sources/segment_demo/debugger
        SEGMENTAJSWRITEKEY=""

        # https://app.segment.com/liz-kane/sources/segment_demo_node/debugger
        SEGMENTNODEWRITEKEY=""

        # Segment Demo Space
        SPACEID=""

        PROFILEAPIKEY=""

        BASE64PROFILEAPIKEY = ""

    In the Components/nav.html file, past in your AJS source's writeKey in 2 places within the Segment Snippet 