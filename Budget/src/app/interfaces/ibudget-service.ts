import { MonthStanding } from '../models/month-standing.model';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Payment } from '../models/payment.model';

export interface IBudgetService {
    isDarkMode(): boolean;
    getProfile(): Observable<Profile>;
    getCurrentMonthStanding(): Observable<MonthStanding>;
    getPastMonthsPayments(months: number): Observable<Payment[]>;
}