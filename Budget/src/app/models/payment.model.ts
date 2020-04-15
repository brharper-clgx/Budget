import { BudgetCategory } from '../enums/budget-category.enum';

export class Payment
{
    public amount: number;
    public category: BudgetCategory;
    public timeStamp: Date;
}