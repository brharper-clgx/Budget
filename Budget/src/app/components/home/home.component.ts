import { Component, ViewChild } from '@angular/core';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('paymentsChart', { static: false }) paymentsChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');
  public newPayment: Payment = new Payment();
  public currentMonthStanding: MonthStanding;

  constructor(private budgetService: BudgetService) {
  }

  ionViewDidEnter() {
    this.getCurrentlyMonthStanding();
  }

  public getBudgetCategoryColor(category: BudgetCategory): string {
    return BudgetCategory.CssColor(category);
  }

  public getBudgetCategoryName(category: BudgetCategory): string {
    return BudgetCategory.Name(category);
  }

  public getBudgetCategoryOptions() {
    return this.getBudgetCategories()
      .filter(c => BudgetCategory[c] != BudgetCategory.Available)
      .map(c => {
        return { id: BudgetCategory[c], name: c };
      });
  }

  public addPayment() {
    if (!this.newPayment.category || !this.newPayment.amount) return;
    
    this.newPayment.timeStamp = new Date();
    this.currentMonthStanding.payments.push(this.newPayment);
    this.newPayment = new Payment();
  }

  private getCurrentlyMonthStanding() {
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
          backgroundColor: this.getBudgetCategoryColors(),
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.getBudgetCategories(),
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

  private getBudgetCategories(): string[] {
    return Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number');
  }

  private getBudgetCategoryColors(): string[] {
    return this.getBudgetCategories()
      .map(c => this.getBudgetCategoryColor(BudgetCategory[c]));
  }

  private getAmountPerCategory(): number[] {
    return this.getBudgetCategories()
      .map(c => this.getCategoryTotal(BudgetCategory[c]));
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
