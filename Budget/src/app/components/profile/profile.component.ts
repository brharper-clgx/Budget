import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Profile } from 'src/app/models/profile.model';
import { Chart } from 'chart.js';
import * as moment from 'moment/moment';
import 'chartjs-plugin-labels';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('paymentsChart', { static: false }) paymentsChart;

  public monthLabel: string = moment(new Date()).format('MMMM	YYYY');
  public profile: Profile = new Profile();

  constructor(private budgetService: BudgetService) { }

  ionViewDidEnter() {
    this.getProfile();
  }

  private getProfile() {
    this.budgetService.getProfile()
      .subscribe(x => {
        this.profile = x;
        this.populateMonthChart();
      });
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

}
