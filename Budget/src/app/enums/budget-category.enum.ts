export enum BudgetCategory {
    Available,
    Restaurant,
    Grocery,
    Entertainment,
    Utility,
}

export namespace BudgetCategory {
    export function CssColor(category: BudgetCategory): string {
        var map = new Map<BudgetCategory, string>([
            [BudgetCategory.Available, '#e5e5e5'],
            [BudgetCategory.Restaurant, '#DE5B84'],
            [BudgetCategory.Grocery, '#35A2EA'],
            [BudgetCategory.Entertainment, '#FFCE56'],
            [BudgetCategory.Utility, '#FE777B'],
        ]);
        return map.get(category);
    };

    export function Name(category: BudgetCategory): string {
        var map = new Map<BudgetCategory, string>([
            [BudgetCategory.Available, 'Available Budget'],
            [BudgetCategory.Restaurant, 'Restuarant'],
            [BudgetCategory.Grocery, 'Grocery'],
            [BudgetCategory.Entertainment, 'Entertainment'],
            [BudgetCategory.Utility, 'Utility'],
        ]);
        return map.get(category);
    };
}