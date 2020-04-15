import { Injectable } from '@angular/core';
import { IBudgetService } from '../interfaces/ibudget-service';
import { Observable } from 'rxjs';
import { MonthStanding } from '../models/month-standing.model';
import { Profile } from '../models/profile.model';

@Injectable()
export class BudgetService implements IBudgetService {
    getProfile(): Observable<Profile> {
        throw new Error("Method not implemented.");
    }
    getCurrentMonthStanding(): Observable<MonthStanding> {
        throw new Error("Method not implemented.");
    }
}