import { Injectable } from "@angular/core";
import { IBudgetService } from 'src/app/interfaces/ibudget-service';
import { Observable, of } from 'rxjs';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { BudgetCategory } from 'src/app/enums/budget-category.enum';
import { Profile } from 'src/app/models/profile.model';
import { Payment } from 'src/app/models/payment.model';
import * as moment from 'moment/moment';

@Injectable()
export class MockBudgetService implements IBudgetService {
    private payments: Payment[] = [
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
    ];
    private currentMonthStanding: MonthStanding = {
        payments: this.payments,
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

    getPastMonthsPayments(months: number): Observable<Payment[]> {
        let pastPayments = [];
        let today = moment();
        for(let i = 1; i <= months; i++) {
            pastPayments = pastPayments.concat([
                {
                    amount: 40 + 3 * i,
                    category: BudgetCategory.Entertainment,
                    timeStamp: moment().set('month', today.get('month') - i),
                },
                {
                    amount: 10 + 5 * i,
                    category: BudgetCategory.Utility,
                    timeStamp: moment().set('month', today.get('month') - i),
                },
                {
                    amount: 14 + 4 * i,
                    category: BudgetCategory.Restaurant,
                    timeStamp: moment().set('month', today.get('month') - i),
                },
            ]);
        }

        return of(pastPayments);
    }

}