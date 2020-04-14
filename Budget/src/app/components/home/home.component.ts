import { Component, OnInit, ViewChild } from '@angular/core';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';
import { Chart } from 'chart.js';
import { Payment } from 'src/app/models/payment.model';
import { PaymentCategory } from 'src/app/enums/payment-category.enum';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('barChart', { static: true }) barChart;

  public currentMonthStanding: MonthStanding;
  public monthLabel: string;
  public bars: any;
  public colorArray: any;

  constructor(private budgetService: BudgetService) {
    this.monthLabel = moment(new Date()).format('MMMM	YYYY')
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getCurrentlyMonthStanding();
  }

  getCurrentlyMonthStanding() {
    this.budgetService.getCurrentMonthStanding()
      .subscribe(x => {
        this.currentMonthStanding = x;
        this.populateMonthChart();
      })
  }

  private populateMonthChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getPaymentCategories(),
        datasets: [{
          label: 'dollars spent',
          data: this.getPaymentsPerCategory(),
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private getPaymentCategories(): string[] {
    return Object.keys(PaymentCategory)
      .filter(c => typeof PaymentCategory[c] === "number");
  }

  private getPaymentsPerCategory(): number[] {
    return this.getPaymentCategories()
      .map(c => this.getCategoryTotal(PaymentCategory[c]));
  }

  private getCategoryTotal(category: PaymentCategory): number {
    return this.currentMonthStanding.payments
      .filter(p => p.category === category)
      .reduce((sum, current) => sum + current.amount, 0);
  }

}
