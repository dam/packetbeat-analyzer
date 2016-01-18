/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component, Input, Inject, forwardRef,
	AfterContentInit } from 'angular2/core';
import { OverviewComponent } from './overview';
import { Filter } from '../definitions';

declare var $:any;

@Component({
	selector: 'time-picker',
	template: `
	<div>
	  <a id="time-selector" class='dropdown-button btn' href='#' data-activates='dropdown-time-period'>{{selected_time_period.label}} <i class="fa fa-caret-down right"></i></a>
	  <ul id='dropdown-time-period' class="dropdown-content">
	    <li *ngFor="#time_period of time_periods" (click)="selectTimePeriod(time_period)">
		    <span>{{time_period.label}}</span>
		  </li>
	  </ul>
	</div>
	`
})
export class TimePickerComponent implements AfterContentInit {
	@Input() state;
  time_periods: Filter[];
	selected_time_period: Filter;
	private parent;
	
	constructor(@Inject(forwardRef(() => OverviewComponent)) overviewComponent) {
		this.time_periods = [
			{ id: 'today', label: 'Today',      value: 'day' },
			{ id: 'week',  label: 'This Week',  value: 'week' },
			{ id: 'month', label: 'This Month', value: 'month' }
		];
		this.parent = overviewComponent;
	}
	
	ngAfterContentInit() {
		this.selected_time_period = _.find(this.time_periods, (metric) => metric.id === this.state.time);
	  $('#time-selector').dropdown();
  }
	
	selectTimePeriod = (time_period: Filter) => {
		this.selected_time_period = time_period;
		this.parent.uiStateChanged('time', this.selected_time_period.id);
	}
}