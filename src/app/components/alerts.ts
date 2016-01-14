/// <reference path="../../typings/tsd.d.ts" />
'use strict';
import { Component } from 'angular2/core';

declare var templateBaseUrl:string;

@Component({
	templateUrl: templateBaseUrl + '/components/alerts.html'
})
export class AlertsComponent {
	
}