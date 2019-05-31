import { Component, OnInit, Input, Output } from '@angular/core';
import { ScriptModel } from '@skribo/client';
import * as _ from 'lodash';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  @Input()
  data: any;

  @Input()
  script: ScriptModel;

  public chartData: any;
  public chartDataArray: any[];
  public chartLabels: string[];

  @Output()
  public chartLabel: string;

  public chartValues: string[];

  @Output()
  public chartValue: string;

  public chartType = 'PieChart';


  applyIdemtifierFiter() { }

  draw() {
    if (!this.data) {
      return;
    }
    const identifier_prop = this.script.ResultsDescriptor.chartDescriptor.identifiers[0];
    const timeOptions = this.script.ResultsDescriptor.chartDescriptor.timeOptions[0];
    const measurements = this.script.ResultsDescriptor.chartDescriptor.measurements[0];

    switch (this.chartType) {
      case 'line':
        {
          const groups = _.groupBy(this.data, identifier_prop);
          const lineOptions = [];

          Object.keys(groups).forEach((key) => {
            lineOptions.push({
              name: key, series: groups[key].sort((a, b) => Number(a[timeOptions]) > Number(b[timeOptions]) ? 1 : -1).map((item) => {
                return { value: item[measurements], name: item[timeOptions] };
              })
            });

          });
          this.chartData = lineOptions;
          break;
        }
      case 'bar':
        {
          const groups = _.groupBy(this.data, identifier_prop);
          const barOptions = [];

          Object.keys(groups).forEach((key) => {
            const item = groups[key][0];
            barOptions.push({ value: item[measurements], name: item[timeOptions] });
            // lineOptions.push({
            //   name: key, series: groups[key].sort((a, b) => Number(a[timeOptions]) > Number(b[timeOptions]) ? 1 : -1).map((item) => {
            //     return { value: item[measurements], name: item[timeOptions] };
            //   })
            // });

          });
          this.chartData = barOptions;
          break;

        }
      case 'pie':
        if (Object.keys(this.data[0])) {
          this.data.map((item) => {
            return { name: item['label'], value: item['value'] };
          });
        }


        this.chartLabels.push('label');
        this.chartValues.push('value');
        this.chartData = this.data.map((item) => {
          return { name: item['label'], value: item['value'] };
        });
        break;
    }
  }
  ngOnInit() {
    this.chartLabels = [];
    this.chartValues = [];
    this.chartType = this.script.ResultsDescriptor.chartType[0];
    this.draw();
    let originalData = this.data;
    setInterval(() => {
      if (originalData !== this.data) {
        originalData = this.data;
        this.draw();
      }
    }, 1000);
  }


  redraw() {
    this.chartData = this.data.map((item) => {
      return { name: item[this.chartLabel], value: item[this.chartValue] };
    });
  }

}
