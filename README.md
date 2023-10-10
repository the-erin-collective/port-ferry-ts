# port-ferry-ts

## Overview
port-ferry is a dev utility designed to assist with local HTTP request logging and forwarding between local ports. This tool is not recommended for production use.

## Installation
Clone the Repository

`git clone https://github.com/the-erin-collective/port-ferry-ts.git`

Navigate to the Directory

`cd port-ferry-ts`

Install Dependencies

`npm install`

Start the Application

`npm start`

## Configuration
Configuration settings for the application are stored in appConfig.json. This file allows you to specify the location of the portMappings.json file, specify the directory for log files, and identify which status codes should be logged.

Example appConfig.json
```
{
    "portMappings": "./portMappings.json",
    "internalErrorLogs": "./port-ferry.log",
    "logFolder": "./logs/",
    "statusCodesToLog": [400, 404, 405],
    "listenPort" : 80
}
```

Port mappings, specifying which route maps to which target port, are defined in a separate portMappings.json file.

Example portMappings.json
```
{
    "/3000": "http://localhost:3000",
    "/3001": "http://localhost:3001"
}
```

## Logging
HTTP request logs are saved to the directory specified in appConfig.json. port-ferry will log any unexpected internal errors to a separate file.

### License
port-ferry is available under the MIT License.
