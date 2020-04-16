import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Profile } from 'src/app/models/profile.model';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('currentMonthChart', { static: false }) currentMonthChart;
  @ViewChild('pastMonthsChart', { static: false }) pastMonthsChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');
  public profile: Profile = new Profile();
  public pastMonthsToDisplay: number = 3;
  public pastPayments: Payment[] = [];

  constructor(private budgetService: BudgetService) { }

  ionViewDidEnter() {
    this.getProfile();
  }

  public getBadgeColor(months: number) {
    if (months == this.pastMonthsToDisplay) return '#50C8FF';
    return '#969a9b';
  }

  public setPastMonthsToDisplay(months: number) {
    this.pastMonthsToDisplay = months;
    this.getPastMonthsPayments();
  }

  private getProfile() {
    this.budgetService.getProfile()
      .subscribe(x => {
        this.profile = x;
        this.populateCurrentMonthChart();
        this.getPastMonthsPayments();
      });
  }

  private getPastMonthsPayments() {
    this.budgetService.getPastMonthsPayments(this.pastMonthsToDisplay)
      .subscribe(x => {
        this.pastPayments = x;
        this.populatePastMonthsChart();
      });
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

  private getLegendLabelColor(): string {
    return this.budgetService.isDarkMode() ? 'white' : 'black';
  }

  private getBudgetCategories(): string[] {
    return Array.from(new Set(Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number')
      .map(c => BudgetCategory.Name(BudgetCategory[c]))));
  }

  private getBudgetCategoryColors(): string[] {
    return this.getBudgetCategories()
      .map(c => this.getBudgetCategoryColor(BudgetCategory[c]));
  }

  private getBudgetCategoryColor(category: BudgetCategory): string {
    return BudgetCategory.CssColor(category);
  }

  private getAmountPerCategory(): number[] {
    return this.getBudgetCategories()
      .map(c => this.getCategoryTotal(BudgetCategory[c]));
  }

  private getCategoryTotal(category: BudgetCategory): number {
    if (category === BudgetCategory.Available) {
      return this.profile.currentMonthStanding.budget - this.profile.currentMonthStanding.getAmountSpentThisMonth();
    }

    if (category === BudgetCategory.Utility || category === BudgetCategory.Restaurant) {
      return this.profile.currentMonthStanding.payments
        .filter(p => p.category == BudgetCategory.Utility || p.category === BudgetCategory.Restaurant)
        .reduce((sum, current) => sum + current.amount, 0);
    }

    return this.profile.currentMonthStanding.payments
      .filter(p => p.category === category)
      .reduce((sum, current) => sum + current.amount, 0);
  }

  private getPastMonthsLabels(): string[] {
    let today = moment();
    let labels = [];
    for (let i = this.pastMonthsToDisplay; i > 0; i--) {
      labels.push(moment().set('month', today.get('month') - i).format('MMMM'));
    }

    return labels;
  }

  private getPastMonthsData(): any[] {
    return this.getBudgetCategories()
      .map(c => {
        return {
          label: BudgetCategory.Name(BudgetCategory[c]),
          data: this.getPastPaymentsInCategory(BudgetCategory[c]),
          backgroundColor: this.getBudgetCategoryColor(BudgetCategory[c]),
          pointColor: this.getBudgetCategoryColor(BudgetCategory[c]),
          borderColor: this.getBudgetCategoryColor(BudgetCategory[c]),
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
