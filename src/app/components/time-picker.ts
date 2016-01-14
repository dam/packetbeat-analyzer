/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';

declare var $:any;

class TimePeriod {
	constructor(public name:string) {}
}

@Component({
	selector: 'time-picker',
	template: `
	<div>
	  <a id="time-selector" class='dropdown-button btn' href='#' data-activates='dropdown-time-period'>{{selected_time_period.name}} <i class="fa fa-caret-down right"></i></a>
	  <ul id='dropdown-time-period' class="dropdown-content">
	    <li *ngFor="#time_period of time_periods" (click)="selectTimePeriod(time_period)">
		    <span>{{time_period.name}}</span>
		  </li>
	  </ul>
	</div>
	`
})
export class TimePickerComponent {
  time_periods = [
		new TimePeriod('This Month'),
		new TimePeriod('This Week')
	];	
	selected_time_period = this.time_periods[0];
	
	ngAfterContentInit() {
	  $('#time-selector').dropdown();
  }
	
	selectTimePeriod = (time_period: TimePeriod) => {
		this.selected_time_period = time_period;
	}
}