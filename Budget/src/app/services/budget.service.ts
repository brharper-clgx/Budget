import { Injectable } from '@angular/core';
import { IBudgetService } from '../interfaces/ibudget-service';
import { Observable } from 'rxjs';
import { MonthStanding } from '../models/month-standing.model';

@Injectable()
export class BudgetService implements IBudgetService {
    getCurrentMonthStanding(): Observable<MonthStanding> {
        throw new Error("Method not implemented.");
    }
}