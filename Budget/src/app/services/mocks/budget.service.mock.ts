import { Injectable } from "@angular/core";
import { IBudgetService } from 'src/app/interfaces/ibudget-service';
import { Observable, of } from 'rxjs';
import { MonthStanding } from 'src/app/models/month-standing.model';
import { PaymentCategory } from 'src/app/enums/payment-category.enum';

@Injectable()
export class MockBudgetService implements IBudgetService {
    getCurrentMonthStanding(): Observable<MonthStanding> {
        return of({
            payments: [
                {
                    amount: 20,
                    category: PaymentCategory.Restaurant,
                },
                {
                    amount: 150,
                    category: PaymentCategory.Grocery,
                },
                {
                    amount: 40,
                    category: PaymentCategory.Entertainment,
                },
                {
                    amount: 50,
                    category: PaymentCategory.Utility,
                },
                {
                    amount: 15,
                    category: PaymentCategory.Utility,
                },
            ],
            income: 1000,
        } as MonthStanding);
    }

}