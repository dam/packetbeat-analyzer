/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';
import { TimeGraph } from './graphics/time-graph'; 
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

	constructor(private queriesService: QueriesService) {
	}

	ngOnInit() {
		this.graph = new TimeGraph('#time-graph');
		this.refreshGraph();
	}

	ngAfterContentInit() {
		$(window).on('resize', _.debounce(this.redrawGraph, 500));
	}	

	private redrawGraph = () => this.graph.draw();
	private refreshGraph = () => {
		if(this.graph) {
			let data = this.queriesService.getData();
      this.graph.data = data; 
		  this.graph.draw();
		}
	}
}