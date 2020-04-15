import { Injectable } from "@angular/core";
import { IBudgetService } from 'src/app/interfaces/ibudget-service';
import { Observable, of } from 'rxjs';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';

@Injectable()
export class MockBudgetService implements IBudgetService {
    getCurrentMonthStanding(): Observable<MonthStanding> {
        return of({
            payments: [
                {
                    amount: 20,
                    category: BudgetCategory.Restaurant,
                    timeStamp: new Date(),
                },
                {
                    amount: 150,
                    category: BudgetCategory.Grocery,
                    timeStamp: new Date(),
                },
                {
                    amount: 40,
                    category: BudgetCategory.Entertainment,
                    timeStamp: new Date(),
                },
                {
                    amount: 50,
                    category: BudgetCategory.Utility,
                    timeStamp: new Date(),
                },
                {
                    amount: 15,
                    category: BudgetCategory.Utility,
                    timeStamp: new Date(),
                },
            ],
            budget: 1000,
        } as MonthStanding);
    }

}