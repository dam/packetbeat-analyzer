/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';

declare var $:any;

class Metric {
	constructor( public name:string) {}
}

@Component({
	selector: 'metric-picker',
	template: `
	<div>
	  <a id="metric-selector" class='dropdown-button btn' href='#' data-activates='dropdown-metrics'>{{selected_metric.name}} <i class="fa fa-caret-down right"></i></a>
	  <ul id='dropdown-metrics' class="dropdown-content">
	    <li *ngFor="#metric of metrics" (click)="selectMetric(metric)">
		    <span>{{ metric.name }}</span>
		  </li>
	  </ul>
	</div>
	`
})
export class MetricPickerComponent {
	metrics = [
		new Metric("Upload usage"),
		new Metric("Download usage")
	];	
	selected_metric = this.metrics[0];
	
	ngAfterContentInit() {
		$('#metric-selector').dropdown();
	}
	
	selectMetric = (metric: Metric) => {
		this.selected_metric = metric;
	}
}