/// <reference path="../typings/tsd.d.ts" />
'use strict';
import { Component, Output, EventEmitter, AfterContentInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { OverviewComponent } from './components/overview';
import { NetworkComponent } from './components/network';
import { AlertsComponent } from './components/alerts';

declare var $:any;
declare var isElectronApp: boolean;
declare var ipc:any;

@Component({
	selector: 'app',
	templateUrl: 'app/root.html', 
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'Overview', component: OverviewComponent },
	{ path: '/network', name: 'Network', component: NetworkComponent },
	{ path: '/alerts', name: 'Alerts', component: AlertsComponent }	
])
export class AppComponent implements AfterContentInit {
	ngAfterContentInit() {
	  $(".button-collapse").sideNav();
		$('#desktop-links-container a, #mobile-links a').click(function() {
			let $item = $(this).parent();
			let $collection = $item.parent(); 
			
			$collection.find('li').removeClass('active');
			$item.addClass('active');
		});
	}
}