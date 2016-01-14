/// <reference path="../typings/tsd.d.ts" />
'use strict';
import { Component, Output, EventEmitter } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, Location } from 'angular2/router';
import { OverviewComponent } from './components/overview';
import { FilesComponent } from './components/files';
import { NetworkComponent } from './components/network';
import { ContactsComponent } from './components/contacts';
import { AlertsComponent } from './components/alerts';

declare var $:any;
declare var isElectronApp: boolean;
var logo: any;

@Component({
	selector: 'app',
	templateUrl: 'app/root.html', 
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'Overview', component: OverviewComponent },
	{ path: '/files', name: 'Files', component: FilesComponent },
	{ path: '/network', name: 'Network', component: NetworkComponent },
	{ path: '/contacts', name: 'Contacts', component: ContactsComponent },
	{ path: '/alerts', name: 'Alerts', component: AlertsComponent }	
])
export class AppComponent {
	constructor(private location: Location) {
		location.go('/'); //Fixing first display for Electron App 
	}
		
	ngAfterContentInit() {
	  $(".button-collapse").sideNav();
	}
}