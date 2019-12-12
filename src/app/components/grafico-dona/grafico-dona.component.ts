import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  
  @Input('ChartLabels') doughnutChartLabels: String[] = [];
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
