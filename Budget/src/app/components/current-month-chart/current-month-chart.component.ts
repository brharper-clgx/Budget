import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-current-month-chart',
  templateUrl: './current-month-chart.component.html',
  styleUrls: ['./current-month-chart.component.scss'],
})
export class CurrentMonthChartComponent {
  @ViewChild('currentMonthChart', { static: true }) currentMonthChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');
  private currentMonth: MonthStanding;

  constructor(private budgetService: BudgetService) { }

  public displayCurrentMonthStanding(currentMonth: MonthStanding) {
    this.currentMonth = currentMonth;
    this.populateCurrentMonthChart();
  }

  private populateCurrentMonthChart() {
    new Chart(this.currentMonthChart.nativeElement, {
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
        legend: {
          labels: {
            fontColor: this.getLegendLabelColor(),
          }
        },
        plugins: {
          // https://emn178.github.io/chartjs-plugin-labels/samples/demo/
          labels: [
            {
              render: 'value',
              fontSize: 14,
              fontStyle: 'bold',
              fontColor: this.getLegendLabelColor(),
              position: 'outside',
              textMargin: 4,
              outsidePadding: 4,
            },
          ],
        },
      },
    });
  }

  private getBudgetCategories(): string[] {
    return Array.from(new Set(Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number')
      .map(c => BudgetCategory.Name(BudgetCategory[c]))));
  }

  private getCategoryTotal(category: BudgetCategory): number {
    if (category === BudgetCategory.Available) {
      return this.currentMonth.budget - this.currentMonth.getAmountSpentThisMonth();
    }

    if (category === BudgetCategory.Utility || category === BudgetCategory.Restaurant) {
      return this.currentMonth.payments
        .filter(p => p.category == BudgetCategory.Utility || p.category === BudgetCategory.Restaurant)
        .reduce((sum, current) => sum + current.amount, 0);
    }

    return this.currentMonth.payments
      .filter(p => p.category === category)
      .reduce((sum, current) => sum + current.amount, 0);
  }

  private getAmountPerCategory(): number[] {
    return this.getBudgetCategories()
      .map(c => this.getCategoryTotal(BudgetCategory[c]));
  }

  private getLegendLabelColor(): string {
    return this.budgetService.isDarkMode() ? 'white' : 'black';
  }

  private getBudgetCategoryColor(category: BudgetCategory): string {
    return BudgetCategory.CssColor(category);
  }

  private getBudgetCategoryColors(): string[] {
    return this.getBudgetCategories()
      .map(c => this.getBudgetCategoryColor(BudgetCategory[c]));
  }

}
