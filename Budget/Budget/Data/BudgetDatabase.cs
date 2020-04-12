using Budget.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Budget.Data
{
    public class BudgetDatabase
    {
        private readonly SQLiteAsyncConnection database;

        public BudgetDatabase(string dbPath)
        {
            this.database = new SQLiteAsyncConnection(dbPath);
            this.database.CreateTableAsync<Payment>().Wait();
        }

        public Task<List<Payment>> GetPayments()
        {
            return this.database
                .Table<Payment>()
                .OrderByDescending(p => p.Date)
                .ToListAsync();
        }

        public Task<int> SavePaymentAsync(Payment payment)
        {
            return payment.Id != 0
                ? this.database.UpdateAsync(payment)
                : this.database.InsertAsync(payment);
        }

        public Task<int> DeletePaymentAsync(Payment payment)
        {
            return this.database.DeleteAsync(payment);
        }
    }
}
