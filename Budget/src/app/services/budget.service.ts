import { Injectable } from '@angular/core';
import { IBudgetService } from '../interfaces/ibudget-service';
import { Observable } from 'rxjs';
import { MonthStanding } from '../models/month-standing.model';
import { Profile } from '../models/profile.model';
import { Payment } from '../models/payment.model';

@Injectable()
export class BudgetService implements IBudgetService {
    isDarkMode(): boolean {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    getProfile(): Observable<Profile> {
        throw new Error("Method not implemented.");
    }
    getCurrentMonthStanding(): Observable<MonthStanding> {
        throw new Error("Method not implemented.");
    }
    getPastMonthsPayments(months: number): Observable<Payment[]> {
        throw new Error("Method not implemented.");
    }
}