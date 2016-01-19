/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { 
	Component, Inject, Input, forwardRef,
  OnInit, AfterContentInit, DoCheck } from 'angular2/core';
import { TimeGraph } from './graphics/time-graph'; 
import { QueriesService } from '../services/queries';
import { OverviewComponent } from './overview';
import { Data, TOAST_DURATION, DEBOUNCE_DURATION } from '../definitions';

declare var $:any;
declare var Materialize;

@Component({
	selector: 'time-graph',
	template: `
	<div id="time-graph"></div>
	`
})
export class TimeGraphComponent implements OnInit, AfterContentInit, DoCheck {
	@Input() state;
	@Input() refresh;
	graph: TimeGraph;
	private parent;

	constructor(private queriesService: QueriesService, @Inject(forwardRef(() => OverviewComponent)) overviewComponent) {
	  this.parent = overviewComponent;
  }

	ngOnInit() {
		this.graph = new TimeGraph('#time-graph');
		this.refreshGraph();
	}

	ngAfterContentInit() {
		$(window).on('resize', _.debounce(this.redrawGraph, DEBOUNCE_DURATION));
	}	
	
	ngDoCheck() {
		if(this.refresh) {
			this.refresh = false;
			this.refreshGraph();
	  }
	}

	private redrawGraph = () => this.graph.draw();
	
	private refreshGraph() {
		if(this.graph) {
			this.queriesService.getFakeData(this.state).then((data: Data[]) => {
        this.graph.data = data; 
				this.graph.state = this.state;
		    this.graph.draw();	
				this.parent.refreshComplete();
			}).catch((reason) => {
				Materialize.toast(reason, TOAST_DURATION, 'error');
				this.parent.refreshComplete();
			})	
		}
	}
}