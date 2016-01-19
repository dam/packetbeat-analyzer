/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Injectable } from 'angular2/core';
var es = require('elasticsearch');
import { config } from './config';

@Injectable()
export class QueriesService {
	client;
	
	constructor() {
		this.client = new es.Client(config.es);
	}
	
	// Note: use the following methods to test the UI
	getFakeData(state) {
		let query = new Promise((resolve, reject) => {
		  setTimeout(() => {
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
			}, Math.floor(Math.random() * 1000));	
		});
		return query;
	}
	
	getError(state) {
		let query = new Promise((resolve, reject) => {
		  setTimeout(() => {
				reject('Unable to reach ES server. Refresh your dashboard in few time.');
			}, Math.floor(Math.random() * 1000));	
		});
		return query;
	}
}