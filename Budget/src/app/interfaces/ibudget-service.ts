import { MonthStanding } from '../models/month-standing.model';
import { Observable } from 'rxjs';

export interface IBudgetService {
    getCurrentMonthStanding(): Observable<MonthStanding>;
}