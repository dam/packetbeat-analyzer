# Packetbeat Analyzer
Simple Network Analyzer. An Electron project to display simple real-time insights about your network using the Beats stack

## Environment

This project is using [packetbeat](https://www.elastic.co/products/beats/packetbeat) to collect your network data. 
The data are pushed to an Elasticsearch database. 
The goal of this project is to replace Kibana by a simplified UI that highlight your network caracteristic and problems for non network experts. 

This code can run as a native desktop application or on the cloud.

## Installation

### Dependencies

cf. (Elasticsearch Installation Section)[https://www.elastic.co/guide/en/beats/libbeat/1.0.1/getting-started.html#elasticsearch-installation] to install the ElasticSearch database from the Beats platform.
cf. (Packetbeat Getting Started)[https://www.elastic.co/guide/en/beats/packetbeat/current/packetbeat-getting-started.html] to install, configure and run packetbeat on your local system

### The application

To install all node packages, run the following command:
    npm install
    
Then check that your installation is running correctly, assessing the application your browser:
    npm run server

    