/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component, Input, Inject, forwardRef,
	AfterContentInit } from 'angular2/core';
import { OverviewComponent } from './overview';
import { Filter } from '../definitions';

declare var $:any;

@Component({
	selector: 'metric-picker',
	template: `
	<div>
	  <a id="metric-selector" class='dropdown-button btn' href='#' data-activates='dropdown-metrics'>{{selected_metric.label}} <i class="fa fa-caret-down right"></i></a>
	  <ul id='dropdown-metrics' class="dropdown-content">
	    <li *ngFor="#metric of metrics" (click)="selectMetric(metric)">
		    <span>{{ metric.label }}</span>
		  </li>
	  </ul>
	</div>
	`
})
export class MetricPickerComponent implements AfterContentInit {
	@Input() state;
	metrics: Filter[];
	selected_metric: Filter;
	private parent;

	constructor(@Inject(forwardRef(() => OverviewComponent)) overviewComponent) {
		this.metrics = [
			{ id: 'traffic',  label: 'Network traffic', value: 'net' },
			{ id: 'upload',   label: 'Upload usage',    value: 'up' },
			{ id: 'download', label: 'Download usage',  value: 'down' }
		];
		this.parent = overviewComponent;
	}	
	
	ngAfterContentInit() {
		this.selected_metric = _.find(this.metrics, (metric) => metric.id === this.state.metric);
		$('#metric-selector').dropdown();
	}
	
	selectMetric = (metric: Filter) => {
		this.selected_metric = metric;
		this.parent.uiStateChanged('metric', this.selected_metric.id)
	}
}