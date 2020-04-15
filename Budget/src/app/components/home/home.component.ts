import { Component, OnInit, ViewChild } from '@angular/core';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';
import { PaymentCategory } from 'src/app/enums/payment-category.enum';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('paymentsChart', { static: false }) paymentsChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');
  
  private currentMonthStanding: MonthStanding;
  private colorArray: string[] = ['#DE5B84', '#35A2EA', '#FFCE56', '#FE777B'];

  constructor(private budgetService: BudgetService) {
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
    new Chart(this.paymentsChart.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'dollars spent',
          data: this.getPaymentsPerCategory(),
          backgroundColor: this.colorArray,
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.getPaymentCategories(),
      },
      options: {
        plugins: {
          // https://emn178.github.io/chartjs-plugin-labels/samples/demo/
          labels: {
            render: 'value',
            fontSize: 14,
            fontStyle: 'bold',
            fontColor: '#fff',
          },
        },
      },
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
