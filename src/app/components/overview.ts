/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';
import { DevicePickerComponent } from './device-picker';
import { TimePickerComponent } from './time-picker';
import { TimeGraphComponent } from './time-graph';

declare var templateBaseUrl:string;

@Component({
	templateUrl: templateBaseUrl + '/components/overview.html',
	directives: [DevicePickerComponent, TimePickerComponent, TimeGraphComponent]
})
export class OverviewComponent {
	
}