/// <reference path="../typings/tsd.d.ts" />
'use strict';

export interface State { [key:string]:string; };

export interface Filter {
	id:    string;  // For easy lookup 
	label: string;  // value displayed to the user 
	value: string;  // ES column mapping
}

export interface Data {
	date: Date,
	value: number,
	selected?: boolean // Graphical state
}

export const TOAST_DURATION = 5000;
export const DEBOUNCE_DURATION = 200;