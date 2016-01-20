/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Injectable } from 'angular2/core';
var es = require('elasticsearch');

declare var isElectronApp: boolean;
declare var ipc:any;

var default_config = {
	es: { 
		hosts: ['localhost:9200'],
	  log: 'trace',
		apiVersion: '1.7',
		requestTimeout: 4000
	}
};

@Injectable()
export class QueriesService {
	private client;

	constructor() {
		var self = this;
		
	  if(isElectronApp && ipc) {
		  ipc.send('get-configuration');
		  ipc.on('configuration', function(event, conf) {
				self.client = es.Client(conf.es);
			});
		} else {
			this.client = es.Client(default_config.es);
		}
  }
	
	getData(state) {
		var self = this;

		let promise = new Promise((resolve, reject) => {
		  if(!self.client) { reject('ElasticSearch client not initialized'); }
					
			let query = { 
				index: 'packetbeat-2016.01.20',
				type: 'http',
				body: {
					query: {
						term: {
							client_ip: '192.168.2.10'
						}
					}
				}
			};
				
			self.client.search(query).then(function (body) {
				console.log(body.hits.hits);
				resolve([
					{ date: new Date('2015-12-01'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-02'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-03'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-04'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-05'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-06'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-07'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-08'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-09'), value: Math.floor(Math.random() * 1000) },
					{ date: new Date('2015-12-10'), value: Math.floor(Math.random() * 1000) }
				]);
			}, function (error) {
				reject('Problem with your data query. Please check your User Settings and refresh your dashboard'); 
			});		
		});
		
		return promise;		
	}
}