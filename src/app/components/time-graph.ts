/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { 
	Component, Inject, Input, 
  OnInit, AfterContentInit, DoCheck } from 'angular2/core';
import { TimeGraph } from './graphics/time-graph'; 
import { QueriesService } from '../services/queries';

declare var $:any;

@Component({
	selector: 'time-graph',
	template: `
	<div id="time-graph"></div>
	`
})
export class TimeGraphComponent implements OnInit, AfterContentInit, DoCheck {
	@Input() state;
	graph: TimeGraph;
	savedState;

	constructor(private queriesService: QueriesService, @Inject('App.config') config) {
	}

	ngOnInit() {
		this.graph = new TimeGraph('#time-graph');
		this.refreshGraph();
	}

	ngAfterContentInit() {
		$(window).on('resize', _.debounce(this.redrawGraph, 500));
	}	
	
	ngDoCheck() {
		if(this.stateChanged()) {
			this.refreshGraph();
		}
	}

	private redrawGraph = () => this.graph.draw();
	private refreshGraph = () => {
		if(this.graph) {
			let data = this.queriesService.getData(this.state);
			this.savedState = _.clone(this.state);
      this.graph.data = data; 
		  this.graph.draw();
		}
	}
	private stateChanged(): boolean {
		return (this.state.metric !== this.savedState.metric) || 
		       (this.state.time !== this.savedState.time);
	}
}