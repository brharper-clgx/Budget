using Budget.Config;
using Budget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Budget.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SummariesPage : ContentPage
    {
        public SummariesPage()
        {
            InitializeComponent();
        }

        public static Dictionary<int, string> monthMap = new Dictionary<int, string>
        {
            { 1, "January" },
            { 2, "Febuary" },
            { 3, "March" },
            { 4, "April" },
            { 5, "May" },
            { 6, "June" },
            { 7, "July" },
            { 8, "August" },
            { 9, "September" },
            { 10, "October" },
            { 11, "November" },
            { 12, "December" },
        };

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            var paymentsByMonth = (await App.Database.GetPayments()).GroupBy(p => p.Date.Month);
            var paymentSummaries = paymentsByMonth
                .Select(pg => new MonthlySummary {
                    Month = monthMap[pg.Key],
                    TotalSpent = pg.Select(p => p.Amount).Sum(),
                    TotatlSaved = this.GetAmountSaved(pg.Select(p => p))
                });

            listView.ItemsSource = paymentSummaries;
        }

        private decimal GetDailyAverage(IEnumerable<Payment> payments, DateTime date)
        {
            return payments.Select(p => p.Amount).Sum() / DateTime.DaysInMonth(date.Year, date.Month);
        }

        private decimal GetAmountSaved(IEnumerable<Payment> payments)
        {
            DateTime date = payments.First().Date;
            decimal dailyAverage = this.GetDailyAverage(payments, date);
            return (Settings.DailyAlloc - dailyAverage) * DateTime.DaysInMonth(date.Year, date.Month);
        }
    }
}