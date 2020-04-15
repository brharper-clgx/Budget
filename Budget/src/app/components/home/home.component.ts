import { Component, OnInit, ViewChild } from '@angular/core';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('paymentsChart', { static: false }) paymentsChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');

  private currentMonthStanding: MonthStanding;
  private colorArray: string[] = ['#e5e5e5', '#DE5B84', '#35A2EA', '#FFCE56', '#FE777B'];

  constructor(private budgetService: BudgetService) {
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
          data: this.getAmountPerCategory(),
          backgroundColor: this.colorArray,
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.getPaymentCategories(),
      },
      options: {
        plugins: {
          // https://emn178.github.io/chartjs-plugin-labels/samples/demo/
          labels: [
            {
              render: 'value',
              fontSize: 14,
              fontStyle: 'bold',
              fontColor: '#000',
              position: 'outside',
            },
          ],
        },
      },
    });
  }

  private getPaymentCategories(): string[] {
    var labels = Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number');
    return labels;
  }

  private getAmountPerCategory(): number[] {
    var amounts = this.getPaymentCategories()
      .map(c => this.getCategoryTotal(BudgetCategory[c]));
    return amounts;
  }

  private getCategoryTotal(category: BudgetCategory): number {
    if (category === BudgetCategory.Available) {
      return this.currentMonthStanding.budget - this.currentMonthStanding.payments.reduce((sum, current) => sum + current.amount, 0);
    }

    return this.currentMonthStanding.payments
      .filter(p => p.category === category)
      .reduce((sum, current) => sum + current.amount, 0);
  }

}
