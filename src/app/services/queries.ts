/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Injectable } from 'angular2/core';

export interface Data {
	date: Date,
	value: number,
	selected?: boolean // Graphical state
}

@Injectable()
export class QueriesService {
	usage_data: Data[];
	
	getUsage() {
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