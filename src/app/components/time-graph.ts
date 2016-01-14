/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';
import { TimeGraph } from './classes/time-graph'; 
import { QueriesService } from '../services/queries';

declare var $:any;
declare var _:any;

@Component({
	selector: 'time-graph',
	template: `
	<div id="time-graph"></div>
	`
})
export class TimeGraphComponent {
	graph: TimeGraph;

	ngOnInit() {
		this.graph = new TimeGraph('#time-graph', new QueriesService);
		this.graph.draw();
	}

	ngAfterContentInit() {
		$(window).on('resize', _.debounce(this.redrawGraph, 150));
	}	

	private redrawGraph = () => this.graph.draw();
}