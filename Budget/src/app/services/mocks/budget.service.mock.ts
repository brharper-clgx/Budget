import { Injectable } from "@angular/core";
import { IBudgetService } from 'src/app/interfaces/ibudget-service';
import { Observable, of } from 'rxjs';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Profile } from 'src/app/models/profile.model';

@Injectable()
export class MockBudgetService implements IBudgetService {
    private currentMonthStanding: MonthStanding = {
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
            {
                amount: 23,
                category: BudgetCategory.ReoccuringUtility,
                timeStamp: new Date(),
            },
        ],
        budget: 1500,
    } as MonthStanding;

    isDarkMode(): boolean {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    getProfile(): Observable<Profile> {
       return of({
        name: 'Sarah Odom',
        currentMonthStanding: MonthStanding.fromObject(this.currentMonthStanding),
       } as Profile);
    }

    getCurrentMonthStanding(): Observable<MonthStanding> {
        return of(MonthStanding.fromObject(this.currentMonthStanding));
    }

}