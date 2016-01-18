/// <reference path="../typings/tsd.d.ts" />
'use strict';

export interface State { [key:string]:string; };

export interface Filter {
	id:    string;  // For easy lookup 
	label: string;  // value displayed to the user 
	value: string;  // ES column mapping
}