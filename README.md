# Segment Demo

## Getting Started

### Install Node
This project requires Node.js to be installed on your machine. If you don't have it installed, you can download it [here](https://nodejs.org/en/download/).
Another option is to use a package manager like [Homebrew](https://brew.sh/) to install Node.js. If you have Homebrew installed, you can run the following command:

```sh
$ brew install node
```

### Install all dependencies
> npm i 

### There are a few existing options to be able to serve this site on your local machine (HTTP-Server or Node.js Server): 

#### Use HTTP-Server : [http-server](https://www.npmjs.com/package/http-server) package to serve the files locally. You can install it globally by running the following command:
```sh 
$ npm i
```
Then you can start the server by running the following command:

```sh
$ http-server
```
Open your browser and visit http://localhost:8080. These files will now be served over HTTP, which will bypass the CORS restrictions.


#### Use Local Node.js Server to serve this project locally : 
Run this command to start the Node.js server :  
```sh
$ node server.js
```
Open your browser and visit http://localhost:3001/. 


## Configure the Analytics.js & Server Sources with your writeKey

1. Update the `.env.primary` file with these variables and their values from your Segment workspace. Update the links with the links to your Segment Resources.

```ini
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
```

2. Update the `index.html` file's `<head>` with your AJS source's writeKey in 2 places within the Segment Snippet.

## Upcoming Features

1. The Config page (`config.html`) will locally store the provided values from the form to be used throughout the app.
2. Code blocks will be added the User Page to allow pasting, manual modification, and translating of event payloads between different languages (analytics.js, Node.js, Python, Ruby, JSON) which can be sent to the currently configured sources.
3. Ecommerce page needs to be updated with more accurate e-commerce data that also includes images.