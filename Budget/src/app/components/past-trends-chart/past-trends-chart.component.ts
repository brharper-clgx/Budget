import { Component, ViewChild } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';
import { BudgetService } from 'src/app/services/budget.service';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';

@Component({
  selector: 'app-past-trends-chart',
  templateUrl: './past-trends-chart.component.html',
  styleUrls: ['./past-trends-chart.component.scss'],
})
export class PastTrendsChartComponent {
  @ViewChild('pastMonthsChart', { static: true }) pastMonthsChart;

  public pastMonthsToDisplay: number = 3;
  public pastPayments: Payment[] = [];
  
  constructor(private budgetService: BudgetService) { 
  }

  public getBadgeColor(months: number) {
    if (months == this.pastMonthsToDisplay) return '#50C8FF';
    return '#969a9b';
  }

  public setPastMonthsToDisplay(months: number) {
    this.pastMonthsToDisplay = months;
    this.displayPastMonthsPayments();
  }

  public displayPastMonthsPayments() {
    this.budgetService.getPastMonthsPayments(this.pastMonthsToDisplay)
      .subscribe(x => {
        this.pastPayments = x;
        this.populatePastMonthsChart();
      });
  }

  private getPastMonthsLabels(): string[] {
    let today = moment();
    let labels = [];
    for (let i = this.pastMonthsToDisplay; i > 0; i--) {
      labels.push(moment().set('month', today.get('month') - i).format('MMMM'));
    }

    return labels;
  }

  private populatePastMonthsChart() {
    new Chart(this.pastMonthsChart.nativeElement, {
      type: 'line',
      data: {
        datasets: this.getPastMonthsData(),
        labels: this.getPastMonthsLabels(),
      },
      options: {
        legend: {
          display: false,
        }
      }
    });
  }

  private getBudgetCategories(): string[] {
    return Array.from(new Set(Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number')
      .map(c => BudgetCategory.Name(BudgetCategory[c]))));
  }

  private getBudgetCategoryColor(category: BudgetCategory): string {
    return BudgetCategory.CssColor(category);
  }

  private getPastMonthsData(): any[] {
    return this.getBudgetCategories()
      .map(c => {
        let categoryColor = this.getBudgetCategoryColor(BudgetCategory[c]);

        return {
          label: BudgetCategory.Name(BudgetCategory[c]),
          data: this.getPastPaymentsInCategory(BudgetCategory[c]),
          backgroundColor: categoryColor,
          pointColor: categoryColor,
          borderColor: categoryColor,
          showLine: true,
          fill: false,
        };
      });
  }

  private getPastPaymentsInCategory(category: BudgetCategory): number[] {
    let totalPaymentsInMonth = [];
    let today = moment();
    for (let i = this.pastMonthsToDisplay; i > 0; i--) {
      totalPaymentsInMonth.push(this.pastPayments
        .filter(p => p.category === category && moment(p.timeStamp).get('year') == today.get('year') && moment(p.timeStamp).get('month') == moment(today).get('month') - i)
        .reduce((sum, current) => sum + current.amount, 0));
    }

    return totalPaymentsInMonth;
  }

}
