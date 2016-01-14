/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';

declare var $:any;

class Device {
	constructor(public id: number, public name:string) {}
}

@Component({
	selector: 'device-picker',
	template: `
	<div>
	  <a id="device-selector" class='dropdown-button btn' href='#' data-activates='dropdown-devices'>{{selected_device.name}} <i class="fa fa-caret-down right"></i></a>
	  <ul id='dropdown-devices' class="dropdown-content">
	    <li *ngFor="#device of devices" (click)="selectDevice(device)">
		    <span>{{ device.name }}</span>
		  </li>
	  </ul>
	</div>
	`
})
export class DevicePickerComponent {
	devices = [
		new Device(1, "Dave's Mac OSX"),
		new Device(2, "Dave's second device")
	];	
	selected_device = this.devices[0];
	
	ngAfterContentInit() {
		$('#device-selector').dropdown();
	}
	
	selectDevice = (device: Device) => {
		this.selected_device = device;
	}
}