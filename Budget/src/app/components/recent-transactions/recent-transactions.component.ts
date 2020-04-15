import { Component, OnInit, Input } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss'],
})
export class RecentTransactionsComponent implements OnInit {
  @Input('payments') payments: Payment[];
  constructor() { }

  ngOnInit() {}

  public sortPayments(): Payment[] {
    if (!this.payments) return [];
    return this.payments.sort((n1, n2) => {
      if (n1.timeStamp > n2.timeStamp) return -1;
      if (n1.timeStamp < n2.timeStamp) return 1;
      return 0;
    });
  }

  public getBudgetCategoryColor(category: BudgetCategory): string {
    return BudgetCategory.CssColor(category);
  }

  public getBudgetCategoryName(category: BudgetCategory): string {
    return BudgetCategory.Name(category);
  }

}
