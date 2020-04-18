import { Component, ViewChild } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Profile } from 'src/app/models/profile.model';
import { CurrentMonthChartComponent } from '../current-month-chart/current-month-chart.component';
import { PastTrendsChartComponent } from '../past-trends-chart/past-trends-chart.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('currentMonth', { static: false }) currentMonth: CurrentMonthChartComponent;
  @ViewChild('pastTrends', { static: true }) pastTrends: PastTrendsChartComponent;

  public profile: Profile = new Profile();

  constructor(private budgetService: BudgetService) { }

  ionViewDidEnter() {
    this.budgetService.getProfile()
      .subscribe(x => {
        this.profile = x;
        this.currentMonth.displayCurrentMonthStanding(this.profile.currentMonthStanding);
        this.pastTrends.displayPastMonthsPayments();
      });
  }

}
