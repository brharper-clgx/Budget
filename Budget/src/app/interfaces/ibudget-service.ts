import { MonthStanding } from '../models/month-standing.model';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

export interface IBudgetService {
    getProfile(): Observable<Profile>;
    getCurrentMonthStanding(): Observable<MonthStanding>;
}