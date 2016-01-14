/// <reference path="../../../typings/tsd.d.ts" />
'use strict';
import { Data } from '../../services/queries';

interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export class TimeGraph {
	container;
	data: Data[];
	private svgWidth: number;
	private svgHeight: number;
	private margin: Margin;
	private chartWidth: number;
	private chartHeight: number;
	private detailWidth: number;
	private detailHeight: number;
	private detailMargin: number;
	
	constructor(public selector: string, private queries) {
		this.container    = $(selector);
		this.margin       = { top: 80, right: 60, bottom: 40, left: 60 };
		this.detailWidth  = 98;
    this.detailHeight = 55;
    this.detailMargin = 10;
		
		this.data = this.queries.getUsage();		
		this.data.forEach(datum => datum.selected = false);
	}
	
	private resetView() {
		d3.select(`${this.selector} svg`).remove();
	}
	
	private drawNoData() {
		// TODO
	}
	
	private drawLineChart(svg: d3.Selection<any>) {
		var self = this;
		var format = d3.time.format("%Y-%m-%d");
 
		// Example: http://codepen.io/stefanjudis/pen/gkHwJ.js
		var x = d3.time.scale().range([0, this.chartWidth]);
		var xAxis = d3.svg.axis().scale(x);
		var xAxisGrid = d3.svg.axis().scale(x).orient('bottom').tickSize(-this.chartHeight).tickFormat('');

		var y = d3.scale.linear().range([this.chartHeight, 0]);	
		var yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);
		var yAxisGrid = d3.svg.axis().scale(y).orient('left').tickSize(-this.chartWidth).tickFormat('');
		// TODO: find a better display for graph ticks
		
		var data = svg.datum();
		
		x.domain([data[0].date, data[data.length - 1].date]);
		y.domain([0, d3.max(data, function(d:any) { return d.value; })]);
		
		var line = d3.svg.line().interpolate( 'linear' )
      .x(function(d:any) { return x(d.date); })
      .y(function(d:any) { return y(d.value); });
			
	  // Add Title
		svg.append('text')
	    .attr('id', 'time-graph-title')
			.attr("transform", `translate(-20,-40)`)
			.text('Upload Usage over Time');
			
	  // Add axis
		svg.append('g')
      .attr('class', 'x axis')
      .attr("transform", `translate(0,${this.chartHeight + 10})`)
      .call(xAxis);
		svg.append('g')
      .attr('class', 'grid')
			.attr("transform", `translate(0,${this.chartHeight})`)
      .call(xAxisGrid);
			
		svg.append('g')
		  .attr('class', 'y axis')
			.call(yAxis);
		svg.append('g')
      .attr('class', 'grid')
      .call(yAxisGrid);
		
	  // Draw Path line		
    svg.append('path')
	   .attr('class', 'time-graph-line')
		 .attr('d', line);
		
		// Draw circles to represent values
		svg.append('g')
		  .selectAll('circle')
			.data(data)
			.enter().append('circle')
        .attr('class', 'time-graph-circle')
        .attr('r', 6)
        .attr('cx', function(d:Data) { return x(d.date); })
        .attr('cy', function(d:Data) { return y(d.value); })
				.on('mouseenter', function(d:Data) {
          d3.select(this).attr('r', 10);
					if(!d.selected) { 
						showCircleDetail(d,x,y);
					}
				})
				.on('mouseout', function(d:Data) {
					if(!d.selected) {
						d3.select(this).attr('r', 6);
						hideCircleDetail(d);
					}
				})
				.on('click', function(d:Data) {
          d.selected = !d.selected;
        });
				
	  // Helpers
		function showCircleDetail(d:Data,x,y) {			
		  var details = svg.append('g')
        .attr('class', 'time-graph-bubble')
				.attr('id', `bubble-${format(d.date)}`)
				.attr('transform',`translate(${x(d.date) - (self.detailWidth / 2)},${y(d.value) - self.detailHeight - self.detailMargin})`);
      
      details.append('path')
        .attr( 'd', 'M2.99990186,0 C1.34310181,0 0,1.34216977 0,2.99898218 L0,47.6680579 C0,49.32435 1.34136094,50.6670401 3.00074875,50.6670401 L44.4095996,50.6670401 C48.9775098,54.3898926 44.4672607,50.6057129 49,54.46875 C53.4190918,50.6962891 49.0050244,54.4362793 53.501875,50.6670401 L94.9943116,50.6670401 C96.6543075,50.6670401 98,49.3248703 98,47.6680579 L98,2.99898218 C98,1.34269006 96.651936,0 95.0000981,0 L2.99990186,0 Z M2.99990186,0');

      var text = details.append('text').attr('class', 'time-graph-bubble-text');
		
      text.append('tspan')
          .attr('class', 'time-graph-bubble-date')
          .attr('x', self.detailWidth / 2)
          .attr('y', self.detailHeight / 3)
          .attr('text-anchor', 'middle')
          .text(format(d.date));
 
      text.append('tspan')
        .attr('class', 'time-graph-bubble-value')
        .attr('x', self.detailWidth / 2)
        .attr('y', self.detailHeight / 4 * 3)
        .attr('text-anchor', 'middle')
        .text(d.value);	
		}
		
		function hideCircleDetail(d) {	
			svg.select(`#bubble-${format(d.date)}`).remove();
		}
	}
	
	public draw() {	
		this.svgWidth     = parseInt(this.container.css('width'));
		this.svgHeight    = parseInt(this.container.css('height'));
		this.chartWidth   = this.svgWidth - this.margin.left - this.margin.right;
		this.chartHeight  = this.svgHeight - this.margin.top - this.margin.bottom;
		
		this.resetView();
		
		var svg = d3.select(this.selector).append('svg')
		  .attr('height', this.svgHeight)
			.attr('width', this.svgWidth)
			.append('g')
			  .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
				
		svg.datum(this.data);
		var noUsage = function (datum: Data) : boolean { return datum.value === 0; };
		
		if(this.data.length === 0 || this.data.every(noUsage)) {
		  this.drawNoData();	
		} else {
			this.drawLineChart(svg);
		}
	}
}