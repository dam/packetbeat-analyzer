# Packetbeat Analyzer
An Electron project to display simple real-time insights about your network using the Beats stack

## Environment

This project is using [packetbeat](https://www.elastic.co/products/beats/packetbeat) to collect your network data. 
The data are pushed to an Elasticsearch database. 
The goal of this project is to replace Kibana by a simplified UI that highlight your network caracteristic and problems for non network experts. 

This code can run as a native desktop application or on the cloud.

## Installation & configuration

### Dependencies

**Packetbeat**

cf. [Packetbeat Getting Started](https://www.elastic.co/guide/en/beats/packetbeat/current/packetbeat-getting-started.html) to install, configure and run packetbeat on your local system
We are currently developping on the version **1.0.0** of Packetbeat 

**Elasticsearch**

cf. [Elasticsearch Installation Section](https://www.elastic.co/guide/en/beats/libbeat/1.0.1/getting-started.html#elasticsearch-installation) to install the ElasticSearch database.
We are currently developping on the version **1.7.3** of ElasticSearch 

Edit the configuration file *elasticsearch.yml* as follow:

    http.cors.enabled: true
    http.cors.allow-origin: "*"

## Development

To install all node packages, run the following command:
    
    npm install
    
Watch your file and build your files with webpack, using the command:  

    npm run watch  
    
Then check that your application is running correctly with electron:
    
    npm run electron
    
To speed up your development, run a server with updated source code using the command:

    npm run start
