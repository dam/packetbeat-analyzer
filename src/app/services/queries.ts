/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Injectable } from 'angular2/core';
var es = require('elasticsearch');

export interface Data {
	date: Date,
	value: number,
	selected?: boolean // Graphical state
}

@Injectable()
export class QueriesService {
	usage_data: Data[]; 
	client;
	
	constructor() {
		this.client = new es.Client({
			host: 'localhost:9200',
			log: 'trace'
		});
	}
	
	// TODO: pass values from the main filters
	getData() {
		console.log('passing get usage');
		
		this.client.search({q: 'pants'})
		  .then((body) => { 
				console.log(body); 
			}, (error) => {
				console.log(error.message);
			});
		
		return [
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
		]
	}
}

// TODO: add a real elasticsearch query