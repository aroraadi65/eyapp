import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../products.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart;
  material: string;

  fullData = [];
  prices = [];
  times = [];

  currPrices = [];
  currTimes = [];

  showLoader = true;

  constructor(
    private _products: ProductsService,
    private data: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.data.currentMessage.subscribe(message => {
      this.material = message;
      if(this.chart) { this.changeChart(); }
    });

    this._products.fetchPrices()
      .subscribe(data => {
        let arrayData = Object.keys(data).map(key => {
          return data[key];
        });

        this.fullData = arrayData;
        this.prices = arrayData.map(res => res.Price);
        this.times = arrayData.map(res => res.Time);

        arrayData.forEach(res => {
          if (res.Material.includes(this.material)) {
            this.currPrices.push(res.Price);
            this.currTimes.push(res.Time);
          }
        });

        // this.spinner.hide();
        this.showLoader = false;

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.currTimes,
            datasets: [
              {
                data: this.currPrices,
                borderColor: '#007bff',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

      });
  }

  changeChart() {
    console.log('chart changed')
    this.currPrices = [];
    this.currTimes = [];
    this.fullData.forEach(res => {
      if (res.Material.includes(this.material)) {
        this.currPrices.push(res.Price);
        this.currTimes.push(res.Time);
      }
    });
    this.chart.data.labels = this.currTimes;
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = this.currPrices;
    })
    this.chart.update();
  }

}
