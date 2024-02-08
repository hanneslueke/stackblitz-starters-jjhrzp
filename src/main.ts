import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

import { HighchartsChartModule } from 'highcharts-angular';
import more from 'highcharts/highcharts-more';
import * as Highcharts from 'highcharts/highstock';
import exportingdata from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';


more(Highcharts);
exporting(Highcharts);
exportingdata(Highcharts);

const DEFAULT_CONFIG: Highcharts.Options = {
	chart: {
		type: 'line',
		zooming: {
			type: 'x',
		},
	},
	credits: {
		enabled: false,
	},
	navigator: {
		enabled: true,
	},
	legend: {
		enabled: true,
	},
	plotOptions: {
		series: {
			turboThreshold: 20,
			events: {
				// Set Y-axis title to 0px to hide the title when the series is hidden
				hide: function () {
					this.yAxis.setTitle({ style: { fontSize: '0px' } });
				},
				// Set Y-axis title to 12px to show the title when the series is shown
				show: function () {
					this.yAxis.setTitle({ style: { fontSize: '12px' } });
				},
			},
		},
	},
	tooltip: {
		snap: 1,
		enabled: true,
	},
	exporting: {
		buttons: {
			contextButton: {
				menuItems: [
					'toggle-tooltip',
					'viewFullscreen',
					'separator',
					'downloadPNG',
					'downloadSVG',
					'downloadCSV',
				],
				symbol: 'menuball',
			},
		},
	},
	series: [],
};

Highcharts.setOptions({
	time: {
		timezoneOffset: new Date().getTimezoneOffset(),
		useUTC: false,
	},
});


@Component({
  selector: 'app-root',
  imports: [
    HighchartsChartModule
  ],
  standalone: true,
  template: `
  t
  <highcharts-chart
    
    [Highcharts]="Highcharts"
    [constructorType]="chartConstructor"
    [options]="chartOptions"
    [callbackFunction]="chartCallback"
    (chart)="(chart)"
    [(update)]="updateFlag"
    [oneToOne]="oneToOneFlag"
    [runOutsideAngular]="runOutsideAngular"
  >
  </highcharts-chart>

  `,
})
export class App {
  chartOptions: Highcharts.Options = DEFAULT_CONFIG;
	chart?: Highcharts.Chart;
	chartCallback: Highcharts.ChartCallbackFunction;
	Highcharts: typeof Highcharts = Highcharts; // required
	chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
	updateFlag = false; // optional boolean
	oneToOneFlag = false; // optional boolean, defaults to false
	runOutsideAngular = false; // optional boolean, defaults to false


  constructor(){
    this.chartCallback =  (c: Highcharts.Chart) => {
			if (this.chart == null) {
				this.chart = c;
        
			} 
		};

  }
}

bootstrapApplication(App).catch(e => console.log(e));
