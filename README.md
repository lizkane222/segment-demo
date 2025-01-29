# Segment Demo

## Getting Started

This project requires Node.js to be installed on your machine. If you don't have it installed, you can download it [here](https://nodejs.org/en/download/).

Another option is to use a package manager like [Homebrew](https://brew.sh/) to install Node.js. If you have Homebrew installed, you can run the following command:

```sh
$ brew install node
```

For this project, we will be using the [http-server](https://www.npmjs.com/package/http-server) package to serve the files locally. You can install it globally by running the following command:

```sh 
$ npm i
```

Then you can start the server by running the following command:

```sh
$ http-server
```

Open your browser and visit http://localhost:8080. These files will now be served over HTTP, which will bypass the CORS restrictions.

Optionally, you can use: 

```sh
$ node server.js
```

Open your browser and visit http://localhost:3001/. 


## Configuring the Analytics.js & Server Sources with your `writeKey`

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

In the `Components/nav.html` file, past in your Analytics.js source's `writeKey` in 2 places within the Segment Snippet.

## Upcoming Features

1. The Config page (config.html) will locally store the provided values from the form to be used throughout the app.

2. Code blocks will be added the User Page to allow pasting, manual modification, and translating of event payloads between different languages (AJS, Node.js, Python, Ruby, JSON) which can be sent to the currently configured sources.

3. Ecommerce page needs to be updated with more accurate Ecommerce data that also includes images.
