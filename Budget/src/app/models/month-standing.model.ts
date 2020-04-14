import { Payment } from './payment.model';
import { PaymentCategory } from '../enums/payment-category.enum';

export class MonthStanding {
    public payments: Payment[];
    public income: number;
}