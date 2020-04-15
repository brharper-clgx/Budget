import { Component } from '@angular/core';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public newPayment: Payment = new Payment();
  public currentMonthStanding: MonthStanding;
  public spentBudgetPercentage: number;

  constructor(private budgetService: BudgetService) {
  }

  ionViewDidEnter() {
    this.getCurrentlyMonthStanding();
  }

  public getBudgetCategoryOptions(): any[] {
    return this.getBudgetCategories()
      .filter(c => BudgetCategory[c] != BudgetCategory.Available)
      .map(c => {
        return { id: BudgetCategory[c], name: c };
      });
  }

  public addPayment(): void {
    if (!this.newPayment.category || !this.newPayment.amount) return;

    this.newPayment.timeStamp = new Date();
    this.currentMonthStanding.payments.push(this.newPayment);
    this.newPayment = new Payment();
  }

  public getAvailableBudget(): number {
    return this.currentMonthStanding.budget -
      this.currentMonthStanding.getAmountSpentThisMonth();
  }

  private getCurrentlyMonthStanding(): void {
    this.budgetService.getCurrentMonthStanding()
      .subscribe(x => {
        this.currentMonthStanding = x;
        this.spentBudgetPercentage = 1 - this.getAvailableBudget() / this.currentMonthStanding.budget;
      });
  }

  private getBudgetCategories(): string[] {
    return Array.from(new Set(Object.keys(BudgetCategory)
      .filter(c => typeof BudgetCategory[c] === 'number')
      .map(c => BudgetCategory.Name(BudgetCategory[c]))));
  }

}
