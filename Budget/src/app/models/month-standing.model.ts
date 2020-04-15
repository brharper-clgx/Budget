import { Payment } from './payment.model';

export class MonthStanding {
    public payments: Payment[];
    public budget: number;

    public static fromObject(standing: Object) {
		return <MonthStanding>Object.assign(new MonthStanding(), standing);
	}

    public getAmountSpentThisMonth() {
        return this.payments
            .reduce((sum, current) => sum + current.amount, 0);
    }
}