/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';
import { MetricPickerComponent } from './metric-picker';
import { TimePickerComponent } from './time-picker';
import { TimeGraphComponent } from './time-graph';

declare var templateBaseUrl:string;

@Component({
	templateUrl: templateBaseUrl + '/components/overview.html',
	directives: [MetricPickerComponent, TimePickerComponent, TimeGraphComponent]
})
export class OverviewComponent {
	
}