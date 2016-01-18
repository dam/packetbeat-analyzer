/// <reference path="./typings/tsd.d.ts" />
'use strict';
import "./assets/stylesheets/application.scss";
require('jquery/dist/jquery.js');
require('materialize-css/dist/js/materialize.js');
require('font-awesome/scss/font-awesome.scss');
require('d3/d3.js');
require('lodash');

import { provide } from "angular2/core";
import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { AppComponent } from './app/root';
import { QueriesService } from './app/services/queries';
import { config } from './app/services/config';

bootstrap(AppComponent, [
	HTTP_PROVIDERS, 
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }), 
	provide('App.config', { useValue: config }),
	QueriesService
]);