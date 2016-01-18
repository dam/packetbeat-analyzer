/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';
import { MetricPickerComponent } from './metric-picker';
import { TimePickerComponent } from './time-picker';
import { TimeGraphComponent } from './time-graph';
import { State } from '../definitions';

@Component({
	templateUrl: 'app/components/overview.html',
	directives: [MetricPickerComponent, TimePickerComponent, TimeGraphComponent]
})
export class OverviewComponent {
	public uiState: State;
	
	constructor() {
		// Initializing UI state
		this.uiState = {
			'metric': 'traffic',
			'time': 'week'
		};
	}
	
	uiStateChanged(type, value) {
		this.uiState[type] = value;
	}
}
